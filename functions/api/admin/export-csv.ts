import type { PagesFunction, Env } from '../../types.ts';
import { CORS_HEADERS, jsonResponse } from '../_db.ts';

const ALLOWED_TABLES = ['scam_reports', 'citizen_inquiries', 'event_registrations', 'volunteer_signups'] as const;

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  const url = new URL(request.url);
  const table = (url.searchParams.get('table') || 'scam_reports') as typeof ALLOWED_TABLES[number];

  if (!ALLOWED_TABLES.includes(table)) {
    return jsonResponse({ success: false, error: 'Invalid table name' }, 400);
  }

  try {
    const res = await env.DB.prepare(`SELECT * FROM ${table} ORDER BY id DESC`).all<Record<string, unknown>>();
    const rows = res.results || [];

    if (rows.length === 0) {
      return new Response('No records found\n', {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${table}.csv"`,
          ...CORS_HEADERS
        }
      });
    }

    const headers = Object.keys(rows[0]);
    const csvLines = [headers.join(',')];

    for (const row of rows) {
      const line = headers
        .map((h) => {
          let val = row[h] == null ? '' : String(row[h]);
          val = val.replace(/"/g, '""');
          if (val.includes(',') || val.includes('\n') || val.includes('"')) {
            val = `"${val}"`;
          }
          return val;
        })
        .join(',');
      csvLines.push(line);
    }

    const csvContent = csvLines.join('\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${table}.csv"`,
        ...CORS_HEADERS
      }
    });
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to export CSV' }, 500);
  }
};
