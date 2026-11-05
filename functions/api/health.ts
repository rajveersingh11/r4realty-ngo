import type { PagesFunction, Env } from '../types.ts';
import { jsonResponse } from './_db.ts';

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.DB) {
    return jsonResponse({
      status: 'online',
      database: 'Cloudflare Pages Edge (D1 unbound / preview)',
      timestamp: new Date().toISOString(),
      counts: {
        scam_reports: 0,
        verified_scams: 0,
        citizen_inquiries: 0,
        event_registrations: 0,
        volunteer_signups: 0
      }
    });
  }

  try {
    const scamCount = (await env.DB.prepare('SELECT COUNT(*) as count FROM scam_reports').first<{ count: number }>())?.count ?? 0;
    const verifiedScams = (await env.DB.prepare("SELECT COUNT(*) as count FROM scam_reports WHERE status = 'verified'").first<{ count: number }>())?.count ?? 0;
    const inquiryCount = (await env.DB.prepare('SELECT COUNT(*) as count FROM citizen_inquiries').first<{ count: number }>())?.count ?? 0;
    const eventCount = (await env.DB.prepare('SELECT COUNT(*) as count FROM event_registrations').first<{ count: number }>())?.count ?? 0;
    const volunteerCount = (await env.DB.prepare('SELECT COUNT(*) as count FROM volunteer_signups').first<{ count: number }>())?.count ?? 0;

    return jsonResponse({
      status: 'online',
      database: 'Cloudflare D1 (Serverless Edge SQLite)',
      path: 'Cloudflare Global Edge D1',
      timestamp: new Date().toISOString(),
      counts: {
        scam_reports: scamCount,
        verified_scams: verifiedScams,
        citizen_inquiries: inquiryCount,
        event_registrations: eventCount,
        volunteer_signups: volunteerCount
      }
    });
  } catch (err: any) {
    return jsonResponse(
      {
        status: 'degraded',
        database: 'Cloudflare D1 Error',
        error: err?.message || String(err)
      },
      500
    );
  }
};
