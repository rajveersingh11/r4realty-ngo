import type { D1Database, Env } from '../types.ts';

let schemaInitialized = false;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

export const DEFAULT_ADMIN_USERNAME = 'r4realty-admin';
export const DEFAULT_ADMIN_PASSWORD = 'foundation-ngo-local';
export const DEFAULT_ADMIN_TOKEN = 'r4realty-admin-token-local';

export const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Token',
  'X-Content-Type-Options': 'nosniff'
};

export function jsonResponse(data: unknown, status = 200, customHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS,
      ...customHeaders
    }
  });
}

export function sanitizeText(value: unknown): string {
  if (value == null) return '';
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function generateId(prefix: string): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `${prefix}-${year}-${rand}`;
}

export function getClientIp(request: Request): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function enforceRateLimit(request: Request): boolean {
  const clientIp = getClientIp(request);
  const now = Date.now();
  const existing = rateLimitMap.get(clientIp);

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  rateLimitMap.set(clientIp, existing);

  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

export function isValidAdminAuth(request: Request, env: Env): boolean {
  const adminToken = env.R4REALTY_ADMIN_TOKEN || DEFAULT_ADMIN_TOKEN;
  const adminUser = env.R4REALTY_ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME;
  const adminPass = env.R4REALTY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

  const tokenHeader = request.headers.get('x-admin-token');
  if (tokenHeader && tokenHeader === adminToken) {
    return true;
  }

  const url = new URL(request.url);
  const queryToken = url.searchParams.get('token') || url.searchParams.get('auth');
  if (queryToken && queryToken === adminToken) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.slice('Bearer '.length).trim() === adminToken;
    }
    if (authHeader.startsWith('Basic ')) {
      try {
        const encoded = authHeader.slice('Basic '.length).trim();
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(':');
        return user === adminUser && pass === adminPass;
      } catch {
        return false;
      }
    }
  }

  return false;
}

export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaInitialized) return;

  try {
    await db.exec(`
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

    // Check if table has seed data
    const countCheck = await db.prepare('SELECT COUNT(*) as count FROM scam_reports').first<{ count: number }>();
    if (!countCheck || countCheck.count === 0) {
      await db.exec(`
        INSERT OR IGNORE INTO scam_reports (reference_id, city, builder_name, project_name, scam_category, description, approx_loss_or_exposure, contact_info, status)
        VALUES
          (
            'SR-2026-N901',
            'Noida / Greater Noida',
            'Apex Earth Infra (Demo Alert)',
            'Green Meadows Sector 143',
            'excessive_advance',
            'Demanding 35% advance via cash before executing registered Agreement for Sale. Direct violation of RERA §13.',
            '₹28,00,000 cash demand',
            'anonymous_citizen@whistleblower.ngo',
            'verified'
          ),
          (
            'SR-2026-B412',
            'Bengaluru',
            'Silicon Horizon Developers (Demo Alert)',
            'Tech Vista Phase 2',
            'unregistered_rera',
            'Marketing and pre-launch booking of flats on banner ads without obtaining Karnataka RERA registration number.',
            '₹2,00,000 token booking',
            'homebuyer.blr@gmail.com',
            'verified'
          ),
          (
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
      `);
    }

    schemaInitialized = true;
  } catch (err) {
    console.error('Error during D1 ensureSchema:', err);
  }
}
