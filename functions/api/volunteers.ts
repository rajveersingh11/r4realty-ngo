import type { PagesFunction, Env } from '../types.ts';
import { jsonResponse, sanitizeText, generateId } from './_db.ts';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  try {
    const body: any = await request.json();

    if (!body.name || !body.email || !body.profession || !body.skills) {
      return jsonResponse(
        { success: false, error: 'Name, Email, Profession, and Skills are required.' },
        400
      );
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
      return jsonResponse({ success: false, error: 'Invalid volunteer details were provided.' }, 400);
    }

    await env.DB.prepare(`
      INSERT INTO volunteer_signups (volunteer_id, name, email, phone, profession, state, skills, availability_hours_per_week)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(volId, name, email, phone, profession, state, skills, Number.isFinite(hours) ? hours : 2)
      .run();

    return jsonResponse(
      {
        success: true,
        message: 'Volunteer application submitted. Welcome to the Foundation network!',
        volunteerId: volId
      },
      201
    );
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to submit volunteer application' }, 500);
  }
};
