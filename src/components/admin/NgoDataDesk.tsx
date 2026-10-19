import React, { useState, useEffect } from 'react';
import {
  Database,
  Download,
  FileSpreadsheet,
  RefreshCw,
  X,
  AlertTriangle,
  Mail,
  GraduationCap,
  Users,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Server
} from 'lucide-react';
import {
  fetchAdminData,
  updateRecordStatus,
  getDbDownloadUrl,
  getCsvExportUrl,
  checkServerHealth
} from '../../services/apiService';

interface NgoDataDeskProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NgoDataDesk: React.FC<NgoDataDeskProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'scams' | 'inquiries' | 'events' | 'volunteers'>('scams');
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<{ online: boolean; info?: any }>({ online: false });
  const [data, setData] = useState<{
    scams: any[];
    inquiries: any[];
    events: any[];
    volunteers: any[];
  }>({
    scams: [],
    inquiries: [],
    events: [],
    volunteers: []
  });

  const loadData = async () => {
    setLoading(true);
    const health = await checkServerHealth();
    setServerStatus(health);
    const result = await fetchAdminData();
    setData({
      scams: result.scams,
      inquiries: result.inquiries,
      events: result.events,
      volunteers: result.volunteers
    });
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleStatusChange = async (type: 'scam' | 'inquiry', id: number, newStatus: string) => {
    await updateRecordStatus(type, id, newStatus);
    loadData();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">NGO Data Desk</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  SQLite
                </span>
                {serverStatus.online ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Micro-API Online
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <Server className="w-3 h-3" />
                    Offline (Local Mode)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lightweight data collection & community watchdog submissions · Ghar Margdarshan Foundation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh records"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Status Strip & Export Actions */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
            <span><strong>Database File:</strong> <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">data/r4realty.db</code></span>
            <span><strong>Engine:</strong> Native Node.js <code className="font-mono">node:sqlite</code></span>
          </div>

          <div className="flex items-center gap-2">
            {serverStatus.online && (
              <>
                <a
                  href={getDbDownloadUrl()}
                  download="r4realty-community.db"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .db File
                </a>
                <a
                  href={getCsvExportUrl(
                    activeTab === 'scams'
                      ? 'scam_reports'
                      : activeTab === 'inquiries'
                      ? 'citizen_inquiries'
                      : activeTab === 'events'
                      ? 'event_registrations'
                      : 'volunteer_signups'
                  )}
                  download={`${activeTab}.csv`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium transition"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Export CSV
                </a>
              </>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('scams')}
            className={`flex items-center gap-2 py-3 px-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'scams'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Scam Reports ({data.scams.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 py-3 px-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'inquiries'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            Citizen Inquiries ({data.inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 py-3 px-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'events'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Masterclasses ({data.events.length})
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`flex items-center gap-2 py-3 px-3 text-sm font-semibold border-b-2 transition ${
              activeTab === 'volunteers'
                ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Volunteers ({data.volunteers.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/40">
          
          {/* TAB 1: SCAM REPORTS */}
          {activeTab === 'scams' && (
            <div className="space-y-3">
              {data.scams.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <AlertTriangle className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p>No scam reports recorded yet.</p>
                </div>
              ) : (
                data.scams.map((scam: any, idx: number) => (
                  <div
                    key={scam.id || idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                          {scam.reference_id}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {scam.created_at ? new Date(scam.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                          📍 {scam.city}
                        </span>
                        {scam.is_offline && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-medium">
                            Local Cache
                          </span>
                        )}
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            scam.status === 'verified'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                          }`}
                        >
                          {scam.status === 'verified' ? '✔ Verified Alert' : '⏳ Pending Review'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {scam.builder_name} {scam.project_name ? `· ${scam.project_name}` : ''}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                        {scam.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <span><strong>Violation:</strong> {scam.scam_category}</span>
                        {scam.approx_loss_or_exposure && (
                          <span><strong>Exposure:</strong> {scam.approx_loss_or_exposure}</span>
                        )}
                        <span><strong>Whistleblower:</strong> {scam.contact_info}</span>
                      </div>
                    </div>

                    {scam.id && serverStatus.online && (
                      <div className="flex items-center gap-2 self-start">
                        {scam.status !== 'verified' ? (
                          <button
                            onClick={() => handleStatusChange('scam', scam.id, 'verified')}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Verify Alert
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange('scam', scam.id, 'pending_review')}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 transition"
                          >
                            Set Pending
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: CITIZEN INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-3">
              {data.inquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Mail className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p>No citizen inquiries logged yet.</p>
                </div>
              ) : (
                data.inquiries.map((inq: any, idx: number) => (
                  <div
                    key={inq.id || idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                          {inq.ticket_id}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-medium">
                          {inq.topic}
                        </span>
                        <span className="text-xs text-slate-500">📍 {inq.city}</span>
                        {inq.is_offline && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-medium">
                            Local Cache
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {inq.full_name}
                        </h4>
                        <span className="text-xs text-slate-500">
                          ({inq.contact_mode}: <strong>{inq.contact_value}</strong>)
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {inq.message}
                      </p>
                    </div>

                    {inq.id && serverStatus.online && (
                      <div className="flex items-center gap-2 self-start">
                        {inq.status !== 'resolved' ? (
                          <button
                            onClick={() => handleStatusChange('inquiry', inq.id, 'resolved')}
                            className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Mark Resolved
                          </button>
                        ) : (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                            ✔ Resolved
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: MASTERCLASS EVENT REGISTRATIONS */}
          {activeTab === 'events' && (
            <div className="space-y-3">
              {data.events.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <GraduationCap className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p>No masterclass attendees registered yet.</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
                  <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Attendee Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Masterclass Title</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {data.events.map((evt: any, i: number) => (
                        <tr key={evt.id || i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{evt.registration_id}</td>
                          <td className="p-3 font-medium text-slate-900 dark:text-white">{evt.attendee_name}</td>
                          <td className="p-3">{evt.attendee_email}</td>
                          <td className="p-3">{evt.attendee_phone || '—'}</td>
                          <td className="p-3 text-teal-700 dark:text-teal-400 font-medium">{evt.event_title}</td>
                          <td className="p-3">{evt.city}</td>
                          <td className="p-3 text-slate-400">{evt.created_at ? new Date(evt.created_at).toLocaleDateString() : 'Recent'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: VOLUNTEERS */}
          {activeTab === 'volunteers' && (
            <div className="space-y-3">
              {data.volunteers.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p>No volunteer signups recorded yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.volunteers.map((vol: any, i: number) => (
                    <div
                      key={vol.id || i}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-bold">
                          {vol.volunteer_id}
                        </span>
                        <span className="text-xs text-slate-500">{vol.state}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{vol.name}</h4>
                      <p className="text-xs font-semibold text-purple-700 dark:text-purple-400">{vol.profession}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300"><strong>Skills:</strong> {vol.skills}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <span>{vol.email} · {vol.phone || 'No phone'}</span>
                        <span>{vol.availability_hours_per_week || 2} hrs/wk</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>DPDP Act 2023 Compliant · Data securely retained in internal Foundation SQLite database.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition"
          >
            Close Desk
          </button>
        </div>

      </div>
    </div>
  );
};
