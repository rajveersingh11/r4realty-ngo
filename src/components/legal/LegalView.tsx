import React from 'react';
import { ShieldCheck, FileText, AlertCircle } from 'lucide-react';

export const LegalView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-foundation-text tracking-tight">
          Privacy Policy, Terms & Legal Disclaimer
        </h1>
        <p className="text-sm text-foundation-muted">
          Compliant with the Digital Personal Data Protection (DPDP) Act, 2023 and the Real Estate (Regulation & Development) Act, 2016.
        </p>
      </div>

      <div className="space-y-8">
        {/* DPDP Privacy Policy */}
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-xl text-foundation-text flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Digital Personal Data Protection Policy</span>
          </h3>
          <div className="text-xs sm:text-sm text-foundation-muted space-y-3 leading-relaxed">
            <p>
              1. <b>Zero Server Storage:</b> R4Realty - Ghar Margdarshan Foundation operates on a privacy-first architecture. Any details you type into calculators, deal analyzers, or forms remain inside your local browser memory.
            </p>
            <p>
              2. <b>WhatsApp Direct Messaging:</b> Submitting any inquiry or suspicious offer report opens your native WhatsApp application. Data is transferred strictly between you and our verified helpline under end-to-end encryption.
            </p>
            <p>
              3. <b>Zero Commercial Brokerage or Lead Sales:</b> Unlike commercial property portals that monetize user contact details by selling them as "leads" to developers and brokers, our foundation strictly forbids the commercial transfer of user data.
            </p>
            <p>
              4. <b>Local Device Persistence:</b> Checklists and saved calculations are preserved solely via your browser’s `localStorage`. You may clear this data at any moment through your browser settings or our Reset buttons.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-xl text-foundation-text flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Statutory Non-Profit Educational Disclaimer</span>
          </h3>
          <div className="text-xs sm:text-sm text-foundation-muted space-y-3 leading-relaxed">
            <p>
              All materials, calculators, market data, and checklists on this platform are published solely for general consumer educational purposes and community empowerment. They do not constitute formal legal, taxation, architectural, or chartered valuation advice.
            </p>
            <p>
              Real estate statutes, circle rates, stamp duty percentages, and municipal building codes are subject to periodic state revisions. Always verify official notifications on your respective state RERA portal or through a certified independent legal advocate before executing registered deeds or transferring token amounts.
            </p>
          </div>
        </div>

        {/* Terms of Use */}
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-xl text-foundation-text flex items-center gap-2">
            <FileText className="w-5 h-5 text-foundation-primary" />
            <span>Terms of Educational Use</span>
          </h3>
          <div className="text-xs sm:text-sm text-foundation-muted space-y-3 leading-relaxed">
            <p>
              You are granted a free, non-exclusive license to use the calculators, print checklists, and access guides for personal, non-commercial use. Commercial redistribution, automated scraping of our proprietary due diligence models, or re-branding of our materials by commercial brokers without attribution is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
