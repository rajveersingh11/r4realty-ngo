// Cloudflare Pages Functions & D1 Database Types

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T = unknown>(): Promise<{ results: T[]; success: boolean; error?: string }>;
  run<T = unknown>(): Promise<{ success: boolean; meta?: unknown; error?: string }>;
  first<T = unknown>(colName?: string): Promise<T | null>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<Array<{ results: T[]; success: boolean }>>;
  exec(query: string): Promise<{ count: number; duration: number }>;
}

export interface Env {
  DB?: D1Database;
  R4REALTY_ADMIN_USERNAME?: string;
  R4REALTY_ADMIN_PASSWORD?: string;
  R4REALTY_ADMIN_TOKEN?: string;
}

export interface EventContext<Env, P = string, Data = Record<string, unknown>> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
}

export type PagesFunction<
  Env = unknown,
  P extends string = string,
  Data extends Record<string, unknown> = Record<string, unknown>
> = (context: EventContext<Env, P, Data>) => Response | Promise<Response>;

export interface ScamReportRow {
  id: number;
  reference_id: string;
  created_at: string;
  city: string;
  builder_name: string;
  project_name: string;
  scam_category: string;
  description: string;
  approx_loss_or_exposure: string;
  contact_info: string;
  status: string;
}

export interface CitizenInquiryRow {
  id: number;
  ticket_id: string;
  created_at: string;
  full_name: string;
  contact_mode: string;
  contact_value: string;
  city: string;
  topic: string;
  message: string;
  status: string;
}

export interface EventRegistrationRow {
  id: number;
  registration_id: string;
  created_at: string;
  event_id: string;
  event_title: string;
  attendee_name: string;
  attendee_email: string;
  attendee_phone?: string;
  city: string;
}

export interface VolunteerSignupRow {
  id: number;
  volunteer_id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  profession: string;
  state: string;
  skills: string;
  availability_hours_per_week: number;
}
