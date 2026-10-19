import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Send, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { submitCitizenInquiry, ApiResponse } from '../../services/apiService';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [topic, setTopic] = useState('First-Time Buyer Advice');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<ApiResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitCitizenInquiry({
      name,
      contactMode: 'whatsapp',
      contactValue: phone,
      city: city || 'Pan-India',
      topic,
      message
    });

    setSubmissionResult(result);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Title */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <Phone className="w-3.5 h-3.5 text-foundation-accent" />
          <span>Free Citizen Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          Ask a Free Question. No Sales Pitches.
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted leading-relaxed">
          Need a neutral opinion before signing a builder agreement or paying a token? 
          Reach out to our pro-bono advisors. We answer every inquiry with neutral facts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-foundation-surface p-6 rounded-3xl border border-foundation-border shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-xl text-foundation-text">Direct Helplines</h3>

            <div className="space-y-4">
              <a
                href="https://wa.me/919876543210?text=Hello%20Ghar%20Margdarshan%2C%20I%20have%20a%20property%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3.5 hover:opacity-95 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">Instant WhatsApp Advisory</span>
                  <span className="text-sm font-bold text-foundation-text group-hover:underline">+91 98765 43210</span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-foundation-bg border border-foundation-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-foundation-primary/10 text-foundation-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foundation-muted block">Toll-Free Consumer Helpline</span>
                  <span className="text-sm font-bold text-foundation-text">1800-GHAR-HELP (9 AM - 6 PM IST)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-foundation-bg border border-foundation-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-foundation-primary/10 text-foundation-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foundation-muted block">Official Email</span>
                  <span className="text-sm font-bold text-foundation-text">guidance@gharmargdarshan.org</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-foundation-bg border border-foundation-border flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-foundation-primary/10 text-foundation-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foundation-muted block">Registered Office</span>
                  <span className="text-xs text-foundation-text">R4Realty Foundation, Metro Centre, Bandra-Kurla Complex (BKC), Mumbai - 400051</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Free Inquiry Form */}
        <div className="lg:col-span-7 bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
          <div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
              Submit Your Case or Question
            </h3>
            <p className="text-xs sm:text-sm text-foundation-muted mt-1">
              Your inquiry will be reviewed by a volunteer advisor. No signups required.
            </p>
          </div>

          {submissionResult ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-200">
                    {submissionResult.offline ? 'Query Saved in Local Storage' : 'Inquiry Ticket Logged in SQLite!'}
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    {submissionResult.message}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-bold">Your Support Ticket ID</span>
                  <span className="font-mono text-lg font-bold text-teal-700 dark:text-teal-400">
                    {submissionResult.ticketId}
                  </span>
                </div>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Ghar Margdarshan Team, I submitted inquiry ticket [${submissionResult.ticketId}] regarding: ${topic}. My name is ${name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Advisor on WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmissionResult(null);
                  setMessage('');
                }}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                + Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Pune, Noida, Bengaluru"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  >
                    <option value="First-Time Buyer Advice">First-Time Buyer Guidance</option>
                    <option value="Agreement Review">Builder Agreement / Legal Review</option>
                    <option value="RERA Dispute / Delay">RERA Delay & Refund Dispute</option>
                    <option value="Scam / Fraud Verification">Scam / Fraud Verification</option>
                    <option value="Home Loan & CIBIL">Home Loan & CIBIL Queries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">Describe Your Situation</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Include project name, city, builder claim, or your specific doubt..."
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-xs text-foundation-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>We respect your privacy under the DPDP Act 2023. We never sell or share your contact number with brokers or commercial portals.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-xl bg-foundation-primary text-foundation-onPrimary font-bold text-sm hover:opacity-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Logging to SQLite...' : 'Submit Inquiry to Foundation Helpdesk'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
