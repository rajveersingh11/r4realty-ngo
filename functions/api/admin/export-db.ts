import type { PagesFunction, Env } from '../../types.ts';
import { CORS_HEADERS, jsonResponse } from '../_db.ts';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  try {
    const scamsRes = await env.DB.prepare('SELECT * FROM scam_reports ORDER BY id ASC').all();
    const inquiriesRes = await env.DB.prepare('SELECT * FROM citizen_inquiries ORDER BY id ASC').all();
    const eventsRes = await env.DB.prepare('SELECT * FROM event_registrations ORDER BY id ASC').all();
    const volunteersRes = await env.DB.prepare('SELECT * FROM volunteer_signups ORDER BY id ASC').all();

    const backup = {
      format: 'r4realty-d1-export',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      tables: {
        scam_reports: scamsRes.results || [],
        citizen_inquiries: inquiriesRes.results || [],
        event_registrations: eventsRes.results || [],
        volunteer_signups: volunteersRes.results || []
      }
    };

    return new Response(JSON.stringify(backup, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="r4realty-community-backup.json"',
        ...CORS_HEADERS
      }
    });
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to export database backup' }, 500);
  }
};
