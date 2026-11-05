import type { PagesFunction, Env } from '../../types.ts';
import { jsonResponse } from '../_db.ts';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) {
    return jsonResponse({
      success: true,
      data: { scams: [], inquiries: [], events: [], volunteers: [] }
    });
  }

  try {
    const scamsRes = await env.DB.prepare('SELECT * FROM scam_reports ORDER BY id DESC LIMIT 100').all();
    const inquiriesRes = await env.DB.prepare('SELECT * FROM citizen_inquiries ORDER BY id DESC LIMIT 100').all();
    const eventsRes = await env.DB.prepare('SELECT * FROM event_registrations ORDER BY id DESC LIMIT 100').all();
    const volunteersRes = await env.DB.prepare('SELECT * FROM volunteer_signups ORDER BY id DESC LIMIT 100').all();

    return jsonResponse({
      success: true,
      data: {
        scams: scamsRes.results || [],
        inquiries: inquiriesRes.results || [],
        events: eventsRes.results || [],
        volunteers: volunteersRes.results || []
      }
    });
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to retrieve admin data' }, 500);
  }
};
