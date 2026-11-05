import type { PagesFunction, Env } from '../types.ts';
import {
  CORS_HEADERS,
  jsonResponse,
  isValidAdminAuth,
  enforceRateLimit,
  ensureSchema
} from './_db.ts';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. CORS Preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS
    });
  }

  // 2. Admin Authentication Guard
  if (pathname.startsWith('/api/admin')) {
    if (!isValidAdminAuth(request, env)) {
      return jsonResponse(
        {
          success: false,
          error: 'Administrative access denied. Provide valid admin credentials.'
        },
        401
      );
    }
  }

  // 3. Edge Rate Limiting on Form Submissions
  if (
    request.method === 'POST' &&
    (pathname === '/api/scam-reports' ||
      pathname === '/api/inquiries' ||
      pathname === '/api/event-registrations' ||
      pathname === '/api/volunteers')
  ) {
    if (enforceRateLimit(request)) {
      return jsonResponse(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait a moment before trying again.'
        },
        429
      );
    }
  }

  // 4. Ensure D1 schema tables exist if DB is bound
  if (env.DB) {
    await ensureSchema(env.DB);
  }

  // 5. Execute downstream handler
  try {
    const response = await context.next();
    const headers = new Headers(response.headers);

    // Ensure standard security headers
    for (const [key, val] of Object.entries(CORS_HEADERS)) {
      if (!headers.has(key)) {
        headers.set(key, val);
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  } catch (err: any) {
    console.error('Unhandled Edge Function error:', err);
    return jsonResponse(
      {
        success: false,
        error: 'Edge API Internal Server Error',
        details: err?.message || String(err)
      },
      500
    );
  }
};
