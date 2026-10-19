import React from 'react';
import { Building2, Shield, HeartHandshake, Phone, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tabId: string) => void;
  onOpenNgoDesk?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenNgoDesk }) => {
  return (
    <footer className="bg-foundation-surface border-t border-foundation-border mt-16 pt-12 pb-24 md:pb-12 text-sm text-foundation-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foundation-primary flex items-center justify-center text-foundation-accent">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg text-foundation-text">
                R4Realty - Ghar Margdarshan Foundation
              </span>
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed">
              India’s first dedicated non-profit, independent real estate advocacy platform. 
              We provide 100% free, unbiased property guidance, real estate market internet data analytics, 
              and scam prevention to ensure first-time buyers never get misled.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Shield className="w-3.5 h-3.5" /> 100% Commission Free
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <HeartHandshake className="w-3.5 h-3.5" /> Non-Profit Organization
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-foundation-text text-sm uppercase tracking-wider">Platform Hub</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li><button onClick={() => onSelectTab('analytics')} className="hover:text-foundation-primary">Real Estate Market Analytics</button></li>
              <li><button onClick={() => onSelectTab('calculators')} className="hover:text-foundation-primary">Interactive Calculators</button></li>
              <li><button onClick={() => onSelectTab('guides')} className="hover:text-foundation-primary">Buyer Roadmaps & Checklists</button></li>
              <li><button onClick={() => onSelectTab('protect')} className="hover:text-foundation-primary">RERA Watchdog & Scam Alerts</button></li>
              <li><button onClick={() => onSelectTab('community')} className="hover:text-foundation-primary">Pro-Bono Legal & Workshops</button></li>
              <li><button onClick={() => onSelectTab('about')} className="hover:text-foundation-primary">Transparency Charter & 80G</button></li>
            </ul>
          </div>

          {/* Col 3: Free Support & Contact */}
          <div className="space-y-2">
            <h4 className="font-bold text-foundation-text text-sm uppercase tracking-wider">Free Citizen Helpline</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <a 
                href="https://wa.me/919876543210?text=Hello%20Ghar%20Margdarshan%2C%20I%20have%20a%20property%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Advisory
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-foundation-primary" />
                <span>+91 1800-GHAR-HELP (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-foundation-primary" />
                <span>guidance@gharmargdarshan.org</span>
              </div>
            </div>
            <p className="text-[11px] text-foundation-muted pt-2">
              Registered Section 8 Non-Profit Entity · 12A & 80G Income Tax Exemption Compliant
            </p>
          </div>
        </div>

        {/* Legal & Disclaimers Bar */}
        <div className="pt-6 border-t border-foundation-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs">
          <div>
            <p>© {new Date().getFullYear()} R4Realty - Ghar Margdarshan Foundation. Educational guidance only.</p>
            <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
              🚧 Public Beta Preview (v0.9.5) · Under Active Development by Non-Profit Volunteers
            </p>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <button onClick={() => onSelectTab('legal')} className="hover:underline">
              DPDP Privacy & Terms
            </button>
            <span>·</span>
            <button onClick={() => onSelectTab('legal')} className="hover:underline">
              Statutory Disclaimers
            </button>
            <span>·</span>
            {onOpenNgoDesk && (
              <button
                onClick={onOpenNgoDesk}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 font-bold hover:opacity-90 transition text-[11px]"
                title="Open SQLite Data Desk (Ctrl+Shift+D)"
              >
                <span>🗄️ SQLite Data Desk</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
