import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Search, 
  FileWarning, 
  Send, 
  CheckCircle,
  HelpCircle,
  PhoneCall,
  Database,
  RefreshCw,
  Clock
} from 'lucide-react';
import { RERA_STATE_DIRECTORY } from '../../data/reraDirectory';
import { STATUTORY_BUYER_RIGHTS, RED_FLAG_SCAM_TYPES } from '../../data/educationalContent';
import { submitScamReport, fetchScamReports, ApiResponse } from '../../services/apiService';

export const ScamWatchdog: React.FC = () => {
  const [selectedStateSearch, setSelectedStateSearch] = useState('');
  const [reportName, setReportName] = useState('');
  const [reportPhone, setReportPhone] = useState('');
  const [reportCity, setReportCity] = useState('');
  const [reportBuilder, setReportBuilder] = useState('');
  const [reportProject, setReportProject] = useState('');
  const [reportCategory, setReportCategory] = useState('excessive_advance');
  const [reportLoss, setReportLoss] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ApiResponse | null>(null);
  const [communityAlerts, setCommunityAlerts] = useState<any[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(false);

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: boolean }>({});

  const diagnosticQuestions = [
    { id: 'q1', text: 'Is the builder demanding more than 10% cash or cheque without executing a registered agreement?' },
    { id: 'q2', text: 'Is the project advertised as "Pre-Launch", "Soft-Launch", or "Upcoming" without a valid RERA registration number?' },
    { id: 'q3', text: 'Does the developer promise guaranteed / assured monthly returns (e.g. 12% to 18%) until possession?' },
    { id: 'q4', text: 'Is the seller offering to transfer property via Notarized General Power of Attorney (GPA) or Agreement to Sell?' },
    { id: 'q5', text: 'Is the price quoted more than 40% cheaper than surrounding registered market rates?' }
  ];

  const flaggedCount = Object.values(quizAnswers).filter(Boolean).length;

  const filteredReraStates = RERA_STATE_DIRECTORY.filter((s) =>
    s.state.toLowerCase().includes(selectedStateSearch.toLowerCase()) ||
    s.name.toLowerCase().includes(selectedStateSearch.toLowerCase())
  );

  // Load verified community alerts from SQLite backend
  const loadAlerts = async () => {
    setAlertsLoading(true);
    const result = await fetchScamReports();
    setCommunityAlerts(result.data || []);
    setAlertsLoading(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitScamReport({
      city: reportCity,
      builderName: reportBuilder,
      projectName: reportProject,
      category: reportCategory,
      description: reportDetails,
      approxLoss: reportLoss,
      contactInfo: reportPhone || reportName || 'anonymous'
    });

    setSubmissionResult(result);
    setIsSubmitting(false);

    // Refresh alert list
    loadAlerts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
          <span>Non-Profit Consumer Watchdog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          Protect Yourself from Real Estate Fraud & Scam Deals
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted max-w-3xl leading-relaxed">
          Over 65% of buyer disputes stem from misleading brochures, unapproved floor additions, and unregulated deposit schemes. 
          Use our statutory verification toolkit before committing any hard-earned family savings.
        </p>
      </div>

      {/* 60-Second Scam Diagnostic Quiz */}
      <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
              Interactive 60-Second Diagnostic
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-foundation-text">
              Is Your Property Deal Suspicious?
            </h3>
          </div>
          <div className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 ${
            flaggedCount >= 2 
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300' 
              : flaggedCount === 1 
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300' 
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300'
          }`}>
            <span>{flaggedCount} Red Flag(s) Checked</span>
          </div>
        </div>

        <div className="divide-y divide-foundation-border/60">
          {diagnosticQuestions.map((q) => (
            <div key={q.id} className="py-3.5 flex items-center justify-between gap-4">
              <span className="text-xs sm:text-sm font-medium text-foundation-text">
                {q.text}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: true }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    quizAnswers[q.id] === true
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-foundation-bg border border-foundation-border text-foundation-text hover:bg-foundation-border/40'
                  }`}
                >
                  Yes (Flag)
                </button>
                <button
                  type="button"
                  onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: false }))}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    quizAnswers[q.id] === false
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-foundation-bg border border-foundation-border text-foundation-text hover:bg-foundation-border/40'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>

        {flaggedCount >= 2 && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-sm block">HIGH RISK FRAUD PATTERN DETECTED</span>
              <p className="mt-0.5 leading-relaxed">
                Your deal triggers multiple statutory violations under RERA 2016 and the BUDS Act 2019. Do NOT sign blank allotment sheets or pay non-refundable tokens. Contact our non-profit legal volunteers or verify the promoter with your state RERA authority immediately.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Red Flag Scam Types Grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
          Known Fraud Playbooks & How to Foil Them
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RED_FLAG_SCAM_TYPES.map((scam, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-foundation-surface border border-foundation-border shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm sm:text-base text-foundation-text flex items-center gap-2">
                  <FileWarning className="w-4 h-4 text-rose-500" />
                  <span>{scam.title}</span>
                </h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  scam.dangerLevel === 'CRITICAL' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-amber-100 text-amber-800'
                }`}>
                  {scam.dangerLevel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                {scam.description}
              </p>
              <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border text-xs text-foundation-text">
                <span className="font-bold text-foundation-primary block mb-0.5">Protective Remedy:</span>
                <span>{scam.remedy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State RERA Directory with One-Click Search */}
      <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
              Official Verification Directory
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-foundation-text">
              Search State RERA Authorities Directly
            </h3>
            <p className="text-xs sm:text-sm text-foundation-muted mt-1">
              Never accept verbal claims from sales agents. Verify the registered project ID, approved floor plans, and promoter litigation history on the government portal.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-foundation-muted" />
              <input
                type="text"
                placeholder="Filter by state..."
                value={selectedStateSearch}
                onChange={(e) => setSelectedStateSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text focus:outline-none focus:ring-1 focus:ring-foundation-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReraStates.map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-foundation-bg border border-foundation-border flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foundation-text">{s.name} ({s.state})</span>
                  <span className="text-[11px] text-foundation-muted">{s.helpline}</span>
                </div>
                <p className="text-xs text-foundation-muted mt-1">{s.notes}</p>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-foundation-border/60">
                <a
                  href={s.searchProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-foundation-primary hover:underline"
                >
                  <span>Verify Project Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span>·</span>
                <a
                  href={s.complaintUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline"
                >
                  <span>File Complaint</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Fraud Alerts Feed (Loaded from SQLite Database) */}
      <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-foundation-text">
                Live Community Watchdog Alerts
              </h3>
              <p className="text-xs text-foundation-muted">
                Crowdsourced builder violations verified by R4Realty non-profit volunteers (Stored in SQLite)
              </p>
            </div>
          </div>
          <button
            onClick={loadAlerts}
            disabled={alertsLoading}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-foundation-border text-xs font-semibold text-foundation-text hover:bg-foundation-bg transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${alertsLoading ? 'animate-spin' : ''}`} />
            <span>Refresh Feed</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {communityAlerts.slice(0, 3).map((alert: any, i: number) => (
            <div
              key={alert.reference_id || i}
              className="p-4 rounded-2xl bg-foundation-bg border border-foundation-border space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-red-600 dark:text-red-400">
                    {alert.reference_id}
                  </span>
                  <span className="text-[11px] text-foundation-muted">
                    📍 {alert.city}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-foundation-text line-clamp-1">
                  {alert.builder_name}
                </h4>
                {alert.project_name && (
                  <p className="text-xs font-medium text-foundation-muted">
                    Project: {alert.project_name}
                  </p>
                )}
                <p className="text-xs text-foundation-text/80 line-clamp-3">
                  {alert.description}
                </p>
              </div>

              <div className="pt-2 border-t border-foundation-border/60 flex items-center justify-between text-[11px] text-foundation-muted">
                <span className="capitalize">{alert.scam_category?.replace(/_/g, ' ')}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">
                  ✔ Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Suspicious Offer Form */}
      <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Whistleblower Desk · SQLite Data Collection
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-foundation-text mt-1">
            Report a Suspicious Offer or Builder Violation
          </h3>
          <p className="text-xs sm:text-sm text-foundation-muted mt-1">
            Encountered illegal pre-launch bookings, cash demands exceeding 10%, or guaranteed return schemes? Submit a confidential report to our watchdog database.
          </p>
        </div>

        {submissionResult ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-base text-emerald-900 dark:text-emerald-200">
                  {submissionResult.offline ? 'Report Recorded in Local Offline Cache' : 'Alert Logged in SQLite Watchdog Database!'}
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  {submissionResult.message}
                </p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-800/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">Your Case Reference ID</span>
                <span className="font-mono text-base font-bold text-teal-700 dark:text-teal-400">
                  {submissionResult.referenceId}
                </span>
              </div>
              <a
                href={`https://wa.me/917014865202?text=${encodeURIComponent(`Hello Ghar Margdarshan Team, I submitted scam report [${submissionResult.referenceId}] regarding ${reportBuilder} in ${reportCity}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Escalate via WhatsApp</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmissionResult(null);
                setReportDetails('');
                setReportBuilder('');
                setReportProject('');
                setReportLoss('');
              }}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
            >
              + Submit Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  Builder / Developer Name *
                </label>
                <input
                  type="text"
                  required
                  value={reportBuilder}
                  onChange={(e) => setReportBuilder(e.target.value)}
                  placeholder="e.g. Apex Earth Infra"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  Project Name (if known)
                </label>
                <input
                  type="text"
                  value={reportProject}
                  onChange={(e) => setReportProject(e.target.value)}
                  placeholder="e.g. Green Meadows Phase 2"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  value={reportCity}
                  onChange={(e) => setReportCity(e.target.value)}
                  placeholder="e.g. Bengaluru, Pune, Noida"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  Violation Category *
                </label>
                <select
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                >
                  <option value="excessive_advance">Excessive Advance (&gt;10% without agreement)</option>
                  <option value="unregistered_rera">Pre-Launch / No RERA Registration</option>
                  <option value="assured_returns">Guaranteed Returns Scheme (BUDS Act)</option>
                  <option value="delay_no_compensation">Delay with Zero Compensation</option>
                  <option value="illegal_construction">Unapproved Floors / Deviation</option>
                  <option value="other">Other Irregularity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  Approx. Financial Loss or Demand
                </label>
                <input
                  type="text"
                  value={reportLoss}
                  onChange={(e) => setReportLoss(e.target.value)}
                  placeholder="e.g. ₹5,00,000 token"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  Your Phone / WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  value={reportPhone}
                  onChange={(e) => setReportPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">
                  Your Name (or "Anonymous")
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Leave blank for 100% anonymous"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foundation-text mb-1">
                Detailed Incident Description *
              </label>
              <textarea
                required
                rows={4}
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                placeholder="Mention what the broker/builder promised, token receipt conditions, dates, or missing sanctioned plan details..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-foundation-muted">
                🛡️ Compliant with DPDP Act 2023 · Never shared with commercial marketing agencies.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Logging Alert...' : 'Submit to SQLite Watchdog'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Statutory Rights Section */}
      <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-4">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
          Your Non-Negotiable Statutory Rights under RERA 2016
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STATUTORY_BUYER_RIGHTS.map((right, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-foundation-bg border border-foundation-border space-y-1.5">
              <span className="font-bold text-sm text-foundation-primary block">{right.title}</span>
              <p className="text-xs text-foundation-muted leading-relaxed">{right.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
