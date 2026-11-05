import type { PagesFunction, Env } from '../../types.ts';
import { jsonResponse } from '../_db.ts';

export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  try {
    const body: any = await request.json();
    const { type, id, status } = body;

    if (!type || !id || !status) {
      return jsonResponse({ success: false, error: 'type, id, and status are required.' }, 400);
    }

    if (type === 'scam') {
      await env.DB.prepare('UPDATE scam_reports SET status = ? WHERE id = ?').bind(status, id).run();
    } else if (type === 'inquiry') {
      await env.DB.prepare('UPDATE citizen_inquiries SET status = ? WHERE id = ?').bind(status, id).run();
    } else {
      return jsonResponse({ success: false, error: 'Invalid entity type' }, 400);
    }

    return jsonResponse({ success: true, message: 'Status updated successfully' });
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to update record status' }, 500);
  }
};
