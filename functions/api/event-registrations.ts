import type { PagesFunction, Env } from '../types.ts';
import { jsonResponse, sanitizeText, generateId } from './_db.ts';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  try {
    const body: any = await request.json();

    if (!body.eventId || !body.name || !body.email) {
      return jsonResponse(
        { success: false, error: 'Event, Name, and Email are required.' },
        400
      );
    }

    const regId = generateId('REG');
    const eventId = sanitizeText(body.eventId);
    const eventTitle = sanitizeText(body.eventTitle || 'Community Real Estate Masterclass');
    const name = sanitizeText(body.name);
    const email = sanitizeText(body.email);
    const phone = sanitizeText(body.phone || '');
    const city = sanitizeText(body.city || 'Pan-India');

    if (!eventId || !name || !email) {
      return jsonResponse({ success: false, error: 'Invalid registration details were provided.' }, 400);
    }

    await env.DB.prepare(`
      INSERT INTO event_registrations (registration_id, event_id, event_title, attendee_name, attendee_email, attendee_phone, city)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(regId, eventId, eventTitle, name, email, phone, city)
      .run();

    return jsonResponse(
      {
        success: true,
        message: 'Registration confirmed for free masterclass.',
        registrationId: regId
      },
      201
    );
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to register for event' }, 500);
  }
};
