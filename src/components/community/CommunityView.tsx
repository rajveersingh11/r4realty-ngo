import React, { useState } from 'react';
import { Users, Calendar, Video, HeartHandshake, CheckCircle2, Send, MessageSquare, Database, X } from 'lucide-react';
import {
  submitVolunteerSignup,
  registerForMasterclass,
  submitCitizenInquiry,
  ApiResponse
} from '../../services/apiService';

export const CommunityView: React.FC = () => {
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volProfession, setVolProfession] = useState('Property Lawyer');
  const [volCity, setVolCity] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volSkills, setVolSkills] = useState('');
  const [volSubmitting, setVolSubmitting] = useState(false);
  const [volResult, setVolResult] = useState<ApiResponse | null>(null);

  const [askName, setAskName] = useState('');
  const [askContact, setAskContact] = useState('');
  const [askQuestion, setAskQuestion] = useState('');
  const [askSubmitting, setAskSubmitting] = useState(false);
  const [askResult, setAskResult] = useState<ApiResponse | null>(null);

  // Workshop Registration Modal state
  const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regResult, setRegResult] = useState<ApiResponse | null>(null);

  const upcomingWorkshops = [
    {
      id: 'ws-rera-101',
      title: 'First-Time Homebuyer Legal Shield: RERA, Title Search & Agreement Traps',
      date: 'Saturday, 11:00 AM IST',
      platform: 'Free Zoom Webinar',
      speaker: 'Adv. Rajesh Sharma (High Court Advocate & RERA Practitioner)',
      seatsRemaining: 42
    },
    {
      id: 'ws-cost-sheets',
      title: 'Deciphering Builder Cost Sheets: Hidden Taxes, PLC & Carpet Area Rules',
      date: 'Sunday, 4:00 PM IST',
      platform: 'Free Zoom Webinar',
      speaker: 'CA Meera Nair (Chartered Accountant & Tax Specialist)',
      seatsRemaining: 68
    }
  ];

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolSubmitting(true);
    const result = await submitVolunteerSignup({
      name: volName,
      email: volEmail || `${volPhone.replace(/\D/g, '')}@volunteer.local`,
      phone: volPhone,
      profession: volProfession,
      state: volCity || 'Pan-India',
      skills: volSkills || `${volProfession} guidance`
    });
    setVolResult(result);
    setVolSubmitting(false);
  };

  const handleAskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAskSubmitting(true);
    const result = await submitCitizenInquiry({
      name: askName,
      contactMode: 'whatsapp',
      contactValue: askContact || 'Not provided',
      city: 'Community Forum',
      topic: 'Pro-Bono Q&A',
      message: askQuestion
    });
    setAskResult(result);
    setAskSubmitting(false);
  };

  const handleRegisterWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop) return;
    setRegSubmitting(true);
    const result = await registerForMasterclass({
      eventId: selectedWorkshop.id,
      eventTitle: selectedWorkshop.title,
      name: regName,
      email: regEmail,
      phone: regPhone,
      city: regCity || 'Pan-India'
    });
    setRegResult(result);
    setRegSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Page Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-foundation-accent" />
          <span>Community & Knowledge Exchange</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          Citizen Workshops & Pro-Bono Advisory
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted max-w-3xl leading-relaxed">
          Learn together with thousands of homebuyers. Join our live weekend masterclasses, consult with pro-bono property lawyers, or volunteer your professional skills to protect families from property fraud.
        </p>
      </div>

      {/* Upcoming Free Workshops */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text flex items-center gap-2">
          <Calendar className="w-5 h-5 text-foundation-primary" />
          <span>Upcoming Live Masterclasses (100% Free)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingWorkshops.map((ws, idx) => (
            <div key={idx} className="bg-foundation-surface p-6 rounded-3xl border border-foundation-border shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-foundation-muted">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <Video className="w-4 h-4" /> {ws.platform}
                  </span>
                  <span>{ws.seatsRemaining} free seats left</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-foundation-text">
                  {ws.title}
                </h4>
                <p className="text-xs text-foundation-muted">
                  Speaker: <b className="text-foundation-text">{ws.speaker}</b>
                </p>
                <div className="text-xs font-bold text-foundation-primary pt-1">
                  📅 {ws.date}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedWorkshop(ws);
                  setRegResult(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-foundation-primary text-foundation-onPrimary text-center font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Free Seat (SQLite Instant RSVP)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-teal-600" />
                <h4 className="font-bold text-base text-foundation-text">Masterclass RSVP</h4>
              </div>
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-foundation-muted">
              {selectedWorkshop.title}
            </p>

            {regResult ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm">Seat Confirmed!</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Registration Passcode</span>
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">{regResult.registrationId}</span>
                </div>
                <button
                  onClick={() => setSelectedWorkshop(null)}
                  className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterWorkshop} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sunita Deshmukh"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Email (for Zoom link) *</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="sunita@example.com"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-foundation-text mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foundation-text mb-1">City</label>
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={regSubmitting}
                  className="w-full py-2.5 rounded-xl bg-foundation-primary text-foundation-onPrimary text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{regSubmitting ? 'Confirming...' : 'Confirm Free Registration (SQLite)'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Two Column Grid: Ask an Expert & Volunteer Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ask an Expert Form */}
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Pro-Bono Q&A Desk
            </span>
            <h3 className="font-serif font-bold text-xl text-foundation-text mt-0.5">
              Ask an Expert (Legal / Technical Doubt)
            </h3>
            <p className="text-xs sm:text-sm text-foundation-muted mt-1 leading-relaxed">
              Have a doubt about title deeds, occupancy certificates, or RERA complaint timelines? Send your question to our volunteer network.
            </p>
          </div>

          {askResult ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                    Question Received!
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    {askResult.message}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Ticket ID</span>
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">{askResult.ticketId}</span>
                </div>
                <button
                  onClick={() => {
                    setAskResult(null);
                    setAskQuestion('');
                  }}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
                >
                  + Ask Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAskSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={askName}
                    onChange={(e) => setAskName(e.target.value)}
                    placeholder="e.g. Anand K."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={askContact}
                    onChange={(e) => setAskContact(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">Your Property Question *</label>
                <textarea
                  required
                  rows={4}
                  value={askQuestion}
                  onChange={(e) => setAskQuestion(e.target.value)}
                  placeholder="Describe your situation in 2-4 sentences..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <button
                type="submit"
                disabled={askSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-foundation-primary text-foundation-onPrimary font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{askSubmitting ? 'Saving Question...' : 'Submit Question Free (SQLite)'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Volunteer Onboarding Form */}
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Non-Profit Network
            </span>
            <h3 className="font-serif font-bold text-xl text-foundation-text mt-0.5">
              Join as a Volunteer Expert
            </h3>
            <p className="text-xs sm:text-sm text-foundation-muted mt-1 leading-relaxed">
              Are you a property lawyer, civil engineer, chartered accountant, or retired housing officer? Donate 1 hour per month to protect middle-class families.
            </p>
          </div>

          {volResult ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                    Welcome to the Movement!
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    {volResult.message}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Volunteer ID</span>
                  <span className="font-mono text-sm font-bold text-purple-700 dark:text-purple-400">{volResult.volunteerId}</span>
                </div>
                <button
                  onClick={() => setVolResult(null)}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={volName}
                    onChange={(e) => setVolName(e.target.value)}
                    placeholder="Advocate / CA..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Profession *</label>
                  <select
                    value={volProfession}
                    onChange={(e) => setVolProfession(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  >
                    <option value="Property Lawyer">Property Lawyer / Advocate</option>
                    <option value="Chartered Accountant">Chartered Accountant (CA)</option>
                    <option value="Civil Engineer / Architect">Civil Engineer / Architect</option>
                    <option value="Retired Housing Officer">Retired Housing Board Officer</option>
                    <option value="Consumer Rights Activist">Consumer Rights Activist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">City / State *</label>
                  <input
                    type="text"
                    required
                    value={volCity}
                    onChange={(e) => setVolCity(e.target.value)}
                    placeholder="e.g. Mumbai"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Phone *</label>
                  <input
                    type="text"
                    required
                    value={volPhone}
                    onChange={(e) => setVolPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foundation-text mb-1">Email</label>
                  <input
                    type="email"
                    value={volEmail}
                    onChange={(e) => setVolEmail(e.target.value)}
                    placeholder="name@law.org"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foundation-text mb-1">Specialization / Skills</label>
                <input
                  type="text"
                  value={volSkills}
                  onChange={(e) => setVolSkills(e.target.value)}
                  placeholder="e.g. RERA litigation, conveyance deeds, structural audit"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text"
                />
              </div>

              <button
                type="submit"
                disabled={volSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-foundation-primary text-foundation-onPrimary font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <HeartHandshake className="w-4 h-4 text-foundation-accent" />
                <span>{volSubmitting ? 'Registering...' : 'Apply as Volunteer Mentor (SQLite)'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
