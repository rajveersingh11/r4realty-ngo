import type { PagesFunction, Env, ScamReportRow } from '../types.ts';
import { jsonResponse, sanitizeText, generateId } from './_db.ts';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: true, count: 0, data: [] });
  }

  const url = new URL(request.url);
  const city = url.searchParams.get('city');

  try {
    let rows: ScamReportRow[] = [];
    if (city) {
      const res = await env.DB.prepare(
        'SELECT reference_id, created_at, city, builder_name, project_name, scam_category, description, status FROM scam_reports WHERE city LIKE ? ORDER BY id DESC LIMIT 50'
      )
        .bind(`%${city}%`)
        .all<ScamReportRow>();
      rows = res.results || [];
    } else {
      const res = await env.DB.prepare(
        'SELECT reference_id, created_at, city, builder_name, project_name, scam_category, description, status FROM scam_reports ORDER BY id DESC LIMIT 50'
      ).all<ScamReportRow>();
      rows = res.results || [];
    }

    return jsonResponse({ success: true, count: rows.length, data: rows });
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Database query error' }, 500);
  }
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  try {
    const body: any = await request.json();

    if (!body.city || !body.builderName || !body.description || !body.category) {
      return jsonResponse(
        { success: false, error: 'City, Builder Name, Category, and Description are required.' },
        400
      );
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
      return jsonResponse({ success: false, error: 'Invalid form values were provided.' }, 400);
    }

    await env.DB.prepare(`
      INSERT INTO scam_reports (reference_id, city, builder_name, project_name, scam_category, description, approx_loss_or_exposure, contact_info, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending_review')
    `)
      .bind(refId, city, builderName, projectName, category, description, approxLoss, contactInfo)
      .run();

    return jsonResponse(
      {
        success: true,
        message: 'Scam alert submitted to watchdog desk for verification.',
        referenceId: refId
      },
      201
    );
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to submit scam report' }, 500);
  }
};
