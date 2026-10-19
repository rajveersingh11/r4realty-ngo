// R4Realty NGO - Featherlight SQLite API & Offline-First Client Service

export interface ScamReportInput {
  city: string;
  builderName: string;
  projectName?: string;
  category: string;
  description: string;
  approxLoss?: string;
  contactInfo?: string;
}

export interface CitizenInquiryInput {
  name: string;
  contactMode: 'whatsapp' | 'email' | 'phone';
  contactValue: string;
  city: string;
  topic: string;
  message: string;
}

export interface EventRegistrationInput {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone?: string;
  city: string;
}

export interface VolunteerSignupInput {
  name: string;
  email: string;
  phone?: string;
  profession: string;
  state: string;
  skills: string;
  hours?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  referenceId?: string;
  ticketId?: string;
  registrationId?: string;
  volunteerId?: string;
  offline?: boolean;
}

const API_BASE = '/api';

// Helper to check if API server is reachable
export async function checkServerHealth(): Promise<{ online: boolean; info?: any }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { online: true, info: data };
    }
    return { online: false };
  } catch {
    return { online: false };
  }
}

// 1. Submit Scam Report (Builder Whistleblower Tip)
export async function submitScamReport(input: ScamReportInput): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/scam-reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json();
    throw new Error(err.error || 'Server error');
  } catch (error: any) {
    // Graceful offline-first fallback
    const localId = `SR-OFFLINE-${Date.now().toString().slice(-4)}`;
    const offlineItem = {
      reference_id: localId,
      created_at: new Date().toISOString(),
      city: input.city,
      builder_name: input.builderName,
      project_name: input.projectName || '',
      scam_category: input.category,
      description: input.description,
      approx_loss_or_exposure: input.approxLoss || '',
      contact_info: input.contactInfo || 'anonymous',
      status: 'pending_review',
      is_offline: true
    };

    const existing = JSON.parse(localStorage.getItem('r4_offline_scams') || '[]');
    existing.unshift(offlineItem);
    localStorage.setItem('r4_offline_scams', JSON.stringify(existing));

    return {
      success: true,
      offline: true,
      referenceId: localId,
      message: 'Notice saved securely to your browser storage. (NGO backend is currently offline; your alert will remain saved).'
    };
  }
}

// 2. Fetch Public Scam Reports
export async function fetchScamReports(city?: string): Promise<{ data: any[]; offline: boolean }> {
  try {
    const url = city ? `${API_BASE}/scam-reports?city=${encodeURIComponent(city)}` : `${API_BASE}/scam-reports`;
    const res = await fetch(url);
    if (res.ok) {
      const result = await res.json();
      const offlineItems = JSON.parse(localStorage.getItem('r4_offline_scams') || '[]');
      return { data: [...offlineItems, ...(result.data || [])], offline: false };
    }
  } catch {}
  
  // Offline fallback
  const offlineItems = JSON.parse(localStorage.getItem('r4_offline_scams') || '[]');
  return { data: offlineItems, offline: true };
}

// 3. Submit Citizen Consultation Inquiry
export async function submitCitizenInquiry(input: CitizenInquiryInput): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json();
    throw new Error(err.error || 'Server error');
  } catch {
    const localId = `TKT-OFFLINE-${Date.now().toString().slice(-4)}`;
    const offlineItem = {
      ticket_id: localId,
      created_at: new Date().toISOString(),
      full_name: input.name,
      contact_mode: input.contactMode,
      contact_value: input.contactValue,
      city: input.city,
      topic: input.topic,
      message: input.message,
      status: 'open',
      is_offline: true
    };

    const existing = JSON.parse(localStorage.getItem('r4_offline_inquiries') || '[]');
    existing.unshift(offlineItem);
    localStorage.setItem('r4_offline_inquiries', JSON.stringify(existing));

    return {
      success: true,
      offline: true,
      ticketId: localId,
      message: 'Consultation query saved locally. You can also connect directly with our volunteer desk on WhatsApp!'
    };
  }
}

// 4. Register for Community Masterclass
export async function registerForMasterclass(input: EventRegistrationInput): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/event-registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json();
    throw new Error(err.error || 'Server error');
  } catch {
    const localId = `REG-OFFLINE-${Date.now().toString().slice(-4)}`;
    const offlineItem = {
      registration_id: localId,
      created_at: new Date().toISOString(),
      ...input,
      is_offline: true
    };
    const existing = JSON.parse(localStorage.getItem('r4_offline_events') || '[]');
    existing.unshift(offlineItem);
    localStorage.setItem('r4_offline_events', JSON.stringify(existing));

    return {
      success: true,
      offline: true,
      registrationId: localId,
      message: 'Registration confirmed locally! Please bookmark the session date.'
    };
  }
}

// 5. Submit Volunteer Application
export async function submitVolunteerSignup(input: VolunteerSignupInput): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE}/volunteers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json();
    throw new Error(err.error || 'Server error');
  } catch {
    const localId = `VOL-OFFLINE-${Date.now().toString().slice(-4)}`;
    const offlineItem = {
      volunteer_id: localId,
      created_at: new Date().toISOString(),
      ...input,
      is_offline: true
    };
    const existing = JSON.parse(localStorage.getItem('r4_offline_volunteers') || '[]');
    existing.unshift(offlineItem);
    localStorage.setItem('r4_offline_volunteers', JSON.stringify(existing));

    return {
      success: true,
      offline: true,
      volunteerId: localId,
      message: 'Volunteer application saved locally! Welcome to the Ghar Margdarshan network.'
    };
  }
}

// 6. Admin Data Retrieval (fetches both SQLite DB and client offline entries)
export async function fetchAdminData(): Promise<{
  scams: any[];
  inquiries: any[];
  events: any[];
  volunteers: any[];
  isServerOnline: boolean;
}> {
  const offlineScams = JSON.parse(localStorage.getItem('r4_offline_scams') || '[]');
  const offlineInquiries = JSON.parse(localStorage.getItem('r4_offline_inquiries') || '[]');
  const offlineEvents = JSON.parse(localStorage.getItem('r4_offline_events') || '[]');
  const offlineVolunteers = JSON.parse(localStorage.getItem('r4_offline_volunteers') || '[]');

  try {
    const res = await fetch(`${API_BASE}/admin/data`);
    if (res.ok) {
      const json = await res.json();
      return {
        scams: [...offlineScams, ...(json.data?.scams || [])],
        inquiries: [...offlineInquiries, ...(json.data?.inquiries || [])],
        events: [...offlineEvents, ...(json.data?.events || [])],
        volunteers: [...offlineVolunteers, ...(json.data?.volunteers || [])],
        isServerOnline: true
      };
    }
  } catch {}

  return {
    scams: offlineScams,
    inquiries: offlineInquiries,
    events: offlineEvents,
    volunteers: offlineVolunteers,
    isServerOnline: false
  };
}

// 7. Update Record Status
export async function updateRecordStatus(type: 'scam' | 'inquiry', id: number, status: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/admin/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, id, status })
    });
    return res.ok;
  } catch {
    return false;
  }
}

// 8. Download URLs
export function getDbDownloadUrl(): string {
  return `${API_BASE}/admin/export-db`;
}

export function getCsvExportUrl(table: string): string {
  return `${API_BASE}/admin/export-csv?table=${encodeURIComponent(table)}`;
}
