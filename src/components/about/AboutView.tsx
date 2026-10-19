import React from 'react';
import { Building2, Shield, HeartHandshake, Award, FileCheck, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Title */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <HeartHandshake className="w-3.5 h-3.5 text-foundation-accent" />
          <span>Non-Profit Transparency & Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          About R4Realty - Ghar Margdarshan Foundation
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted leading-relaxed">
          Founded as an independent, non-commercial public service organization. 
          We believe that buying a home is the largest financial decision a family will ever make, and that guidance should never be corrupted by sales incentives.
        </p>
      </div>

      {/* The 4 Core Guarantees */}
      <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
          Our Non-Profit Independence Charter
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-foundation-bg border border-foundation-border space-y-2">
            <div className="flex items-center gap-2.5 text-foundation-primary font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Zero Builder Commissions, Ever</span>
            </div>
            <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
              We never accept channel partner fees, listing fees, or commission kickbacks from developers or property brokers. Our guidance has zero commercial conflict.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-foundation-bg border border-foundation-border space-y-2">
            <div className="flex items-center gap-2.5 text-foundation-primary font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>No Property Brokering or Selling</span>
            </div>
            <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
              We do not sell properties. When you ask a question or analyze a deal, we will never redirect you to a "partner project" or push you to buy anything.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-foundation-bg border border-foundation-border space-y-2">
            <div className="flex items-center gap-2.5 text-foundation-primary font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Zero Lead Selling & DPDP Privacy</span>
            </div>
            <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
              Your contact numbers and queries are never sold to banks, brokers, or telemarketers. All checklist ticks stay exclusively on your personal device.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-foundation-bg border border-foundation-border space-y-2">
            <div className="flex items-center gap-2.5 text-foundation-primary font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>100% Free Public Software & Calculators</span>
            </div>
            <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
              Every calculator, city trend database, and due diligence diagnostic tool on this platform is completely free to use without any mandatory signups.
            </p>
          </div>
        </div>
      </div>

      {/* Advisory Council & Governance */}
      <div className="space-y-6">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
          Multi-Disciplinary Advisory Panel
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { role: 'Property Law & RERA', desc: 'Senior High Court Advocates reviewing title standards and litigation risks.' },
            { role: 'Chartered Accountancy', desc: 'Financial specialists auditing builder cost sheets and capital gains tax rules.' },
            { role: 'Civil Engineering & Quality', desc: 'Structural engineers advising on construction quality, OC compliance, and snagging.' },
            { role: 'Consumer Rights Activism', desc: 'Advocates fighting predatory developer clauses and unregulated deposit schemes.' }
          ].map((panel, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-foundation-surface border border-foundation-border shadow-sm space-y-2">
              <Award className="w-6 h-6 text-foundation-primary" />
              <h4 className="font-bold text-sm sm:text-base text-foundation-text">{panel.role}</h4>
              <p className="text-xs text-foundation-muted leading-relaxed">{panel.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Registration Details */}
      <div className="bg-foundation-surface p-6 rounded-3xl border border-foundation-border shadow-sm space-y-3 text-xs sm:text-sm text-foundation-muted">
        <h4 className="font-bold text-foundation-text text-base flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-foundation-primary" />
          <span>Statutory Registration & Legal Filings</span>
        </h4>
        <p className="leading-relaxed">
          R4Realty - Ghar Margdarshan Foundation is incorporated as a non-profit company under Section 8 of the Companies Act, 2013 (or registered public charitable trust). Registered for 12A and 80G tax exemptions under the Income Tax Act, 1961. We accept zero donations from real estate developers or property marketing agencies.
        </p>
      </div>
    </div>
  );
};
