import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  BookOpen, 
  ArrowRight, 
  HeartHandshake, 
  CheckCircle2, 
  PhoneCall, 
  MessageSquare,
  Sparkles,
  Users,
  ShieldAlert,
  Search
} from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tabId: string) => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectTab, onOpenSearch }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foundation-accent/20 border border-foundation-accent/30 text-foundation-text text-xs sm:text-sm font-bold">
            <HeartHandshake className="w-4 h-4 text-foundation-primary" />
            <span>Non-Profit · 100% Free · Independent Real Estate Guidance</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif text-foundation-text tracking-tight leading-[1.1]">
            Your first home deserves <span className="text-foundation-primary italic underline decoration-foundation-accent">honest advice</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-foundation-muted max-w-2xl mx-auto leading-relaxed">
            Free, commission-free guidance for first-time buyers, families, and investors. 
            We take no broker commissions or developer kickbacks, so we never have a reason to push a property.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('analytics')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-foundation-primary text-foundation-onPrimary text-sm sm:text-base font-bold shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
            >
              <TrendingUp className="w-4 h-4 text-foundation-accent transition-transform group-hover:scale-110" />
              <span>Analyze a Property Deal</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onSelectTab('calculators')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-foundation-surface border border-foundation-border text-foundation-text text-sm sm:text-base font-bold hover:bg-foundation-bg transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-foundation-primary" />
              <span>Explore Calculators</span>
            </button>

            <button
              onClick={() => onSelectTab('protect')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-sm sm:text-base font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Scam Watchdog</span>
            </button>
          </div>

          {/* Quick Search Bar in Hero */}
          <div className="pt-2 max-w-lg mx-auto">
            <button
              onClick={onOpenSearch}
              className="w-full px-4 py-3 rounded-2xl bg-foundation-surface border border-foundation-border shadow-sm hover:border-foundation-primary transition-all flex items-center justify-between text-xs sm:text-sm text-foundation-muted group"
            >
              <span className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-foundation-primary group-hover:scale-110 transition-transform" />
                <span>Search RERA portals, glossary terms, guides, or city trends...</span>
              </span>
              <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold rounded bg-foundation-bg border border-foundation-border text-foundation-muted">
                Ctrl K
              </kbd>
            </button>
          </div>

          {/* Active Development Notice Card */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-foundation-text flex items-start gap-3 text-left">
              <span className="text-xl shrink-0 mt-0.5">🚧</span>
              <div className="space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 block">
                  Public Beta Release: Platform Under Active Development
                </span>
                <p className="text-foundation-muted leading-relaxed text-xs">
                  This non-profit portal is currently live in public beta preview. Calculators, due diligence risk scorers, and state RERA directories are open for public testing and community evaluation. Additional micro-market data and guides are actively being integrated.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-foundation-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 0% Builder Commissions
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free Public Tools
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> DPDP Privacy Protected
            </span>
          </div>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-foundation-surface border border-foundation-border shadow-sm">
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-bold font-serif text-foundation-primary">14,200+</span>
            <p className="text-xs sm:text-sm font-medium text-foundation-muted">Homebuyers Guided</p>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-bold font-serif text-foundation-primary">₹18.5 Cr+</span>
            <p className="text-xs sm:text-sm font-medium text-foundation-muted">Fraud & Overpricing Averted</p>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-bold font-serif text-foundation-primary">28 States</span>
            <p className="text-xs sm:text-sm font-medium text-foundation-muted">RERA Directory Coverage</p>
          </div>
          <div className="text-center space-y-1">
            <span className="text-3xl sm:text-4xl font-bold font-serif text-foundation-primary">₹0 Fee</span>
            <p className="text-xs sm:text-sm font-medium text-foundation-muted">Zero Charge Forever</p>
          </div>
        </div>
      </section>

      {/* Core Mission Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-foundation-primary">
            How We Protect You
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foundation-text">
            Four Pillars of Consumer Advocacy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => onSelectTab('analytics')}
            className="p-6 rounded-3xl bg-foundation-surface border border-foundation-border hover:border-foundation-primary/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-foundation-primary/10 flex items-center justify-center text-foundation-primary group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foundation-text group-hover:text-foundation-primary transition-colors">
                Market Data & Deal Scorer
              </h3>
              <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                Enter any property price and size. Our algorithm compares it against real registry data across 15+ Indian cities to detect overpricing and developer risks.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-foundation-primary pt-2">
              <span>Run Deal Check</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onSelectTab('protect')}
            className="p-6 rounded-3xl bg-foundation-surface border border-foundation-border hover:border-foundation-primary/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foundation-text group-hover:text-foundation-primary transition-colors">
                RERA Watchdog & Scams
              </h3>
              <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                Take our 60-second scam quiz, learn how assured-return traps fail, and access direct one-click verification for all 28 State RERA portals.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-foundation-primary pt-2">
              <span>Explore Watchdog</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onSelectTab('calculators')}
            className="p-6 rounded-3xl bg-foundation-surface border border-foundation-border hover:border-foundation-primary/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-foundation-primary/10 flex items-center justify-center text-foundation-primary group-hover:scale-105 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foundation-text group-hover:text-foundation-primary transition-colors">
                6 Decision Calculators
              </h3>
              <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                EMI Amortization charts, true affordability factoring stamp duties, rent vs buy wealth simulators, and true net rental yields.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-foundation-primary pt-2">
              <span>Use Free Calculators</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onSelectTab('guides')}
            className="p-6 rounded-3xl bg-foundation-surface border border-foundation-border hover:border-foundation-primary/60 transition-all cursor-pointer group shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-foundation-primary/10 flex items-center justify-center text-foundation-primary group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-foundation-text group-hover:text-foundation-primary transition-colors">
                On-Site Checklists
              </h3>
              <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                Interactive mobile checklists for pre-booking, 30-year title document inspection, and possession snagging inspection (hollow tiles & seepage).
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-foundation-primary pt-2">
              <span>Open Checklists</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </section>

      {/* Free Citizen Helpline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-foundation-primary via-[#0F4C4A] to-[#166967] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-foundation-accent">
              Direct Expert Advisory
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">
              Got a confusing builder agreement or doubtful title?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Message our pro-bono volunteers. We review agreement drafts, RERA registration numbers, and encumbrance records with zero commercial interest.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917014865202?text=Hello%20Ghar%20Margdarshan%2C%20I%20have%20a%20property%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Advisory</span>
            </a>
            <button
              onClick={() => onSelectTab('contact')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              Send Free Question
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
