import type { PagesFunction, Env } from '../types.ts';
import { jsonResponse, sanitizeText, generateId } from './_db.ts';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ success: false, error: 'Database service not configured' }, 503);
  }

  try {
    const body: any = await request.json();

    if (!body.name || !body.contactValue || !body.topic || !body.message) {
      return jsonResponse(
        { success: false, error: 'Name, Contact, Topic, and Message are required.' },
        400
      );
    }

    const ticketId = generateId('TKT');
    const name = sanitizeText(body.name);
    const contactMode = sanitizeText(body.contactMode || 'whatsapp');
    const contactValue = sanitizeText(body.contactValue);
    const city = sanitizeText(body.city || 'Pan-India');
    const topic = sanitizeText(body.topic);
    const message = sanitizeText(body.message);

    if (!name || !contactValue || !topic || !message) {
      return jsonResponse({ success: false, error: 'Invalid inquiry values were provided.' }, 400);
    }

    await env.DB.prepare(`
      INSERT INTO citizen_inquiries (ticket_id, full_name, contact_mode, contact_value, city, topic, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'open')
    `)
      .bind(ticketId, name, contactMode, contactValue, city, topic, message)
      .run();

    return jsonResponse(
      {
        success: true,
        message: 'Inquiry ticket generated. An R4Realty volunteer advisor will review your query.',
        ticketId: ticketId
      },
      201
    );
  } catch (err: any) {
    return jsonResponse({ success: false, error: err?.message || 'Failed to submit inquiry' }, 500);
  }
};
