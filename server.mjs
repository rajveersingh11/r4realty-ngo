import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'r4realty.db');
const ADMIN_USERNAME = process.env.R4REALTY_ADMIN_USERNAME || 'r4realty-admin';
const ADMIN_PASSWORD = process.env.R4REALTY_ADMIN_PASSWORD || 'foundation-ngo-local';
const ADMIN_TOKEN = process.env.R4REALTY_ADMIN_TOKEN || 'r4realty-admin-token-local';
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const rateLimits = new Map();

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize SQLite Database with built-in node:sqlite
const db = new DatabaseSync(DB_PATH);

// Enable WAL mode for high concurrency & reliability
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS scam_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference_id TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    city TEXT NOT NULL,
    builder_name TEXT NOT NULL,
    project_name TEXT,
    scam_category TEXT NOT NULL,
    description TEXT NOT NULL,
    approx_loss_or_exposure TEXT,
    contact_info TEXT,
    status TEXT DEFAULT 'pending_review'
  );

  CREATE TABLE IF NOT EXISTS citizen_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    full_name TEXT NOT NULL,
    contact_mode TEXT NOT NULL,
    contact_value TEXT NOT NULL,
    city TEXT NOT NULL,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'open'
  );

  CREATE TABLE IF NOT EXISTS event_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    event_id TEXT NOT NULL,
    event_title TEXT NOT NULL,
    attendee_name TEXT NOT NULL,
    attendee_email TEXT NOT NULL,
    attendee_phone TEXT,
    city TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS volunteer_signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    volunteer_id TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    profession TEXT NOT NULL,
    state TEXT NOT NULL,
    skills TEXT NOT NULL,
    availability_hours_per_week INTEGER DEFAULT 2
  );
`);

// Pre-seed sample authentic community watchdog alerts if table is empty
const reportCount = db.prepare('SELECT COUNT(*) as count FROM scam_reports').get().count;
if (reportCount === 0) {
  const insertSeed = db.prepare(`
    INSERT INTO scam_reports (reference_id, city, builder_name, project_name, scam_category, description, approx_loss_or_exposure, contact_info, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertSeed.run(
    'SR-2026-N901',
    'Noida / Greater Noida',
    'Apex Earth Infra (Demo Alert)',
    'Green Meadows Sector 143',
    'excessive_advance',
    'Demanding 35% advance via cash before executing registered Agreement for Sale. Direct violation of RERA §13.',
    '₹28,00,000 cash demand',
    'anonymous_citizen@whistleblower.ngo',
    'verified'
  );

  insertSeed.run(
    'SR-2026-B412',
    'Bengaluru',
    'Silicon Horizon Developers (Demo Alert)',
    'Tech Vista Phase 2',
    'unregistered_rera',
    'Marketing and pre-launch booking of flats on banner ads without obtaining Karnataka RERA registration number.',
    '₹2,00,000 token booking',
    'homebuyer.blr@gmail.com',
    'verified'
  );

  insertSeed.run(
    'SR-2026-M803',
    'Mumbai MMR',
    'Oceanic Urban Ventures (Demo Alert)',
    'Thane Horizon Heights',
    'assured_returns',
    'Offering 14% guaranteed monthly rental returns till possession. Direct violation of Banning of Unregulated Deposit Schemes (BUDS) Act 2019.',
    '₹75,00,000 investment scheme',
    'confidential@ghar-margdarshan.ngo',
    'verified'
  );
}

// Helper functions
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token'
  });
  res.end(JSON.stringify(data));
}

function sanitizeText(value) {
  if (value == null) return '';
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) return realIp.trim();
  return req.socket?.remoteAddress || 'unknown';
}

function enforceRateLimit(req, res) {
  const clientIp = getClientIp(req);
  const now = Date.now();
  const existing = rateLimits.get(clientIp) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > existing.resetAt) {
    rateLimits.set(clientIp, { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  const bucket = rateLimits.get(clientIp) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  bucket.count += 1;
  rateLimits.set(clientIp, bucket);

  if (bucket.count > RATE_LIMIT_MAX_REQUESTS) {
    sendJson(res, 429, {
      success: false,
      error: 'Rate limit exceeded. Please wait a moment before trying again.'
    });
    return true;
  }

  return false;
}

function isValidAdminAuth(req, url) {
  const tokenHeader = req.headers['x-admin-token'];
  if (tokenHeader && String(tokenHeader) === ADMIN_TOKEN) {
    return true;
  }

  const queryToken = url.searchParams.get('token') || url.searchParams.get('auth');
  if (queryToken && queryToken === ADMIN_TOKEN) {
    return true;
  }

  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'string' && bearerHeader.startsWith('Bearer ')) {
    return bearerHeader.slice('Bearer '.length).trim() === ADMIN_TOKEN;
  }

  if (typeof bearerHeader === 'string' && bearerHeader.startsWith('Basic ')) {
    const encoded = bearerHeader.slice('Basic '.length).trim();
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  }

  return false;
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function generateId(prefix) {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${rand}`;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    if (pathname.startsWith('/api/admin/')) {
      if (!isValidAdminAuth(req, url)) {
        return sendJson(res, 401, {
          success: false,
          error: 'Administrative access denied. Provide valid admin credentials.'
        });
      }
    }

    if (
      pathname === '/api/scam-reports' ||
      pathname === '/api/inquiries' ||
      pathname === '/api/event-registrations' ||
      pathname === '/api/volunteers'
    ) {
      if (enforceRateLimit(req, res)) {
        return;
      }
    }
    // 1. Health & Database Overview
    if (pathname === '/api/health' && req.method === 'GET') {
      const scamCount = db.prepare('SELECT COUNT(*) as count FROM scam_reports').get().count;
      const inquiryCount = db.prepare('SELECT COUNT(*) as count FROM citizen_inquiries').get().count;
      const eventCount = db.prepare('SELECT COUNT(*) as count FROM event_registrations').get().count;
      const volunteerCount = db.prepare('SELECT COUNT(*) as count FROM volunteer_signups').get().count;
      const verifiedScams = db.prepare("SELECT COUNT(*) as count FROM scam_reports WHERE status = 'verified'").get().count;

      return sendJson(res, 200, {
        status: 'online',
        database: 'SQLite (node:sqlite native)',
        path: DB_PATH,
        timestamp: new Date().toISOString(),
        counts: {
          scam_reports: scamCount,
          verified_scams: verifiedScams,
          citizen_inquiries: inquiryCount,
          event_registrations: eventCount,
          volunteer_signups: volunteerCount
        }
      });
    }

    // 2. Scam Reports - GET (verified & public list)
    if (pathname === '/api/scam-reports' && req.method === 'GET') {
      const city = url.searchParams.get('city');
      let query = 'SELECT reference_id, created_at, city, builder_name, project_name, scam_category, description, status FROM scam_reports ORDER BY id DESC LIMIT 50';
      let rows;
      if (city) {
        query = 'SELECT reference_id, created_at, city, builder_name, project_name, scam_category, description, status FROM scam_reports WHERE city LIKE ? ORDER BY id DESC LIMIT 50';
        rows = db.prepare(query).all(`%${city}%`);
      } else {
        rows = db.prepare(query).all();
      }
      return sendJson(res, 200, { success: true, count: rows.length, data: rows });
    }

    // 3. Scam Reports - POST
    if (pathname === '/api/scam-reports' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      if (!body.city || !body.builderName || !body.description || !body.category) {
        return sendJson(res, 400, { success: false, error: 'City, Builder Name, Category, and Description are required.' });
      }

      const refId = generateId('SR');
      const city = sanitizeText(body.city);
      const builderName = sanitizeText(body.builderName);
      const projectName = sanitizeText(body.projectName || '');
      const category = sanitizeText(body.category);
      const description = sanitizeText(body.description);
      const approxLoss = sanitizeText(body.approxLoss || '');
      const contactInfo = sanitizeText(body.contactInfo || 'anonymous');

      if (!city || !builderName || !category || !description) {
        return sendJson(res, 400, { success: false, error: 'Invalid form values were provided.' });
      }

      const insert = db.prepare(`
        INSERT INTO scam_reports (reference_id, city, builder_name, project_name, scam_category, description, approx_loss_or_exposure, contact_info, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending_review')
      `);
      insert.run(
        refId,
        city,
        builderName,
        projectName,
        category,
        description,
        approxLoss,
        contactInfo
      );

      return sendJson(res, 201, {
        success: true,
        message: 'Scam alert submitted to watchdog desk for verification.',
        referenceId: refId
      });
    }

    // 4. Citizen Inquiries - POST
    if (pathname === '/api/inquiries' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      if (!body.name || !body.contactValue || !body.topic || !body.message) {
        return sendJson(res, 400, { success: false, error: 'Name, Contact, Topic, and Message are required.' });
      }

      const ticketId = generateId('TKT');
      const name = sanitizeText(body.name);
      const contactMode = sanitizeText(body.contactMode || 'whatsapp');
      const contactValue = sanitizeText(body.contactValue);
      const city = sanitizeText(body.city || 'Pan-India');
      const topic = sanitizeText(body.topic);
      const message = sanitizeText(body.message);

      if (!name || !contactValue || !topic || !message) {
        return sendJson(res, 400, { success: false, error: 'Invalid inquiry values were provided.' });
      }

      const insert = db.prepare(`
        INSERT INTO citizen_inquiries (ticket_id, full_name, contact_mode, contact_value, city, topic, message, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'open')
      `);
      insert.run(
        ticketId,
        name,
        contactMode,
        contactValue,
        city,
        topic,
        message
      );

      return sendJson(res, 201, {
        success: true,
        message: 'Inquiry ticket generated. An R4Realty volunteer advisor will review your query.',
        ticketId: ticketId
      });
    }

    // 5. Event Registrations - POST
    if (pathname === '/api/event-registrations' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      if (!body.eventId || !body.name || !body.email) {
        return sendJson(res, 400, { success: false, error: 'Event, Name, and Email are required.' });
      }

      const regId = generateId('REG');
      const eventId = sanitizeText(body.eventId);
      const eventTitle = sanitizeText(body.eventTitle || 'Community Real Estate Masterclass');
      const name = sanitizeText(body.name);
      const email = sanitizeText(body.email);
      const phone = sanitizeText(body.phone || '');
      const city = sanitizeText(body.city || 'Pan-India');

      if (!eventId || !name || !email) {
        return sendJson(res, 400, { success: false, error: 'Invalid registration details were provided.' });
      }

      const insert = db.prepare(`
        INSERT INTO event_registrations (registration_id, event_id, event_title, attendee_name, attendee_email, attendee_phone, city)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      insert.run(
        regId,
        eventId,
        eventTitle,
        name,
        email,
        phone,
        city
      );

      return sendJson(res, 201, {
        success: true,
        message: 'Registration confirmed for free masterclass.',
        registrationId: regId
      });
    }

    // 6. Volunteer Signups - POST
    if (pathname === '/api/volunteers' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      if (!body.name || !body.email || !body.profession || !body.skills) {
        return sendJson(res, 400, { success: false, error: 'Name, Email, Profession, and Skills are required.' });
      }

      const volId = generateId('VOL');
      const name = sanitizeText(body.name);
      const email = sanitizeText(body.email);
      const phone = sanitizeText(body.phone || '');
      const profession = sanitizeText(body.profession);
      const state = sanitizeText(body.state || 'Pan-India');
      const skills = sanitizeText(body.skills);
      const hours = Number(body.hours || 2);

      if (!name || !email || !profession || !skills) {
        return sendJson(res, 400, { success: false, error: 'Invalid volunteer details were provided.' });
      }

      const insert = db.prepare(`
        INSERT INTO volunteer_signups (volunteer_id, name, email, phone, profession, state, skills, availability_hours_per_week)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insert.run(
        volId,
        name,
        email,
        phone,
        profession,
        state,
        skills,
        Number.isFinite(hours) ? hours : 2
      );

      return sendJson(res, 201, {
        success: true,
        message: 'Volunteer application submitted. Welcome to the Foundation network!',
        volunteerId: volId
      });
    }

    // 7. NGO Admin Data Hub - GET
    if (pathname === '/api/admin/data' && req.method === 'GET') {
      const scams = db.prepare('SELECT * FROM scam_reports ORDER BY id DESC LIMIT 100').all();
      const inquiries = db.prepare('SELECT * FROM citizen_inquiries ORDER BY id DESC LIMIT 100').all();
      const events = db.prepare('SELECT * FROM event_registrations ORDER BY id DESC LIMIT 100').all();
      const volunteers = db.prepare('SELECT * FROM volunteer_signups ORDER BY id DESC LIMIT 100').all();

      return sendJson(res, 200, {
        success: true,
        data: {
          scams,
          inquiries,
          events,
          volunteers
        }
      });
    }

    // 8. NGO Admin Status Update - PATCH
    if (pathname === '/api/admin/status' && req.method === 'PATCH') {
      const body = await parseJsonBody(req);
      const { type, id, status } = body;
      if (!type || !id || !status) {
        return sendJson(res, 400, { success: false, error: 'type, id, and status are required.' });
      }

      if (type === 'scam') {
        db.prepare('UPDATE scam_reports SET status = ? WHERE id = ?').run(status, id);
      } else if (type === 'inquiry') {
        db.prepare('UPDATE citizen_inquiries SET status = ? WHERE id = ?').run(status, id);
      } else {
        return sendJson(res, 400, { success: false, error: 'Invalid entity type' });
      }

      return sendJson(res, 200, { success: true, message: 'Status updated successfully' });
    }

    // 9. Export SQLite Database File - GET
    if (pathname === '/api/admin/export-db' && req.method === 'GET') {
      // Flush WAL to main DB file before export
      db.exec('PRAGMA wal_checkpoint(FULL);');

      if (!fs.existsSync(DB_PATH)) {
        return sendJson(res, 404, { success: false, error: 'Database file not found' });
      }

      const stat = fs.statSync(DB_PATH);
      res.writeHead(200, {
        'Content-Type': 'application/x-sqlite3',
        'Content-Length': stat.size,
        'Content-Disposition': 'attachment; filename="r4realty-community.db"',
        'Access-Control-Allow-Origin': '*'
      });
      const stream = fs.createReadStream(DB_PATH);
      stream.pipe(res);
      return;
    }

    // 10. Export CSV - GET
    if (pathname === '/api/admin/export-csv' && req.method === 'GET') {
      const table = url.searchParams.get('table') || 'scam_reports';
      const allowedTables = ['scam_reports', 'citizen_inquiries', 'event_registrations', 'volunteer_signups'];
      if (!allowedTables.includes(table)) {
        return sendJson(res, 400, { success: false, error: 'Invalid table name' });
      }

      const rows = db.prepare(`SELECT * FROM ${table} ORDER BY id DESC`).all();
      if (rows.length === 0) {
        res.writeHead(200, {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${table}.csv"`,
          'Access-Control-Allow-Origin': '*'
        });
        res.end('No records found\n');
        return;
      }

      const headers = Object.keys(rows[0]);
      const csvLines = [headers.join(',')];

      for (const row of rows) {
        const line = headers.map(h => {
          let val = row[h] == null ? '' : String(row[h]);
          // Escape quotes and commas
          val = val.replace(/"/g, '""');
          if (val.includes(',') || val.includes('\n') || val.includes('"')) {
            val = `"${val}"`;
          }
          return val;
        }).join(',');
        csvLines.push(line);
      }

      const csvContent = csvLines.join('\n');
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${table}.csv"`,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(csvContent);
      return;
    }

    // 404 Not Found
    sendJson(res, 404, { error: 'Not Found', path: pathname });
  } catch (err) {
    console.error('API Error:', err);
    sendJson(res, 500, { error: 'Internal Server Error', details: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`\x1b[32m✔ R4Realty SQLite Micro-API listening on http://localhost:${PORT}\x1b[0m`);
  console.log(`\x1b[36m📁 Database Path: ${DB_PATH}\x1b[0m`);
});
