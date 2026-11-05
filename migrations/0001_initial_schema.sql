-- Cloudflare D1 Initial Schema for R4Realty - Ghar Margdarshan Foundation

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

-- Pre-seed sample authentic watchdog alerts
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
