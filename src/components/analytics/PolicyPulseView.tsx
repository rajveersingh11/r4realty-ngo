import React from 'react';
import { 
  Building2, 
  Check, 
  Landmark, 
  Heart,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BANK_HOME_LOAN_RATES, STATE_STAMP_DUTIES } from '../../data/marketAnalytics';

export const PolicyPulseView: React.FC = () => {
  const officialValuationPortals = [
    { state: 'Maharashtra', name: 'IGR Maharashtra (e-ASR Ready Reckoner)', url: 'https://igrmaharashtra.gov.in', note: 'Search annual statement of rates (ASR) by division and survey number.' },
    { state: 'Karnataka', name: 'Kaveri Online Services (Dept. of Stamps & Registration)', url: 'https://kaveri.karnataka.gov.in', note: 'Official guidance value search and property valuation calculator.' },
    { state: 'Delhi NCR', name: 'DORIS (Delhi Online Registration Information System)', url: 'https://esearch.delhigovt.nic.in', note: 'Verify circle rate classification (Categories A through H) and MCD transfer duty.' },
    { state: 'Uttar Pradesh', name: 'IGRSUP (Stamp & Registration Dept)', url: 'https://igrsup.gov.in', note: 'Official circle rate list by district and sub-registrar office.' }
  ];

  return (
    <div className="space-y-8">
      {/* Repo Rate Policy Explainer */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foundation-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-foundation-primary/10 flex items-center justify-center text-foundation-primary">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
                Statutory Monetary Policy Benchmark
              </span>
              <h3 className="font-serif font-bold text-xl text-foundation-text">
                RBI Repo Rate & External Benchmark (EBLR) Mandate
              </h3>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
            <span className="text-xs text-foundation-muted font-medium">Policy Repo Rate:</span>
            <span className="font-serif text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              6.50%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs sm:text-sm text-foundation-muted leading-relaxed">
          <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border space-y-1">
            <h5 className="font-bold text-foundation-text flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-foundation-primary" />
              <span>RBI Circular (Oct 1, 2019)</span>
            </h5>
            <p>Under RBI Master Direction (DoR.DIR.BC.No.14/13.03.00/2019-20), all floating rate retail loans must link directly to an external benchmark, eliminating opaque internal base rates.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border space-y-1">
            <h5 className="font-bold text-foundation-text flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-foundation-primary" />
              <span>Mandatory 3-Month Reset</span>
            </h5>
            <p>Whenever the RBI Monetary Policy Committee (MPC) revises repo rates, lending banks must pass through the rate change to existing home loan borrowers within a maximum window of 3 months.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border space-y-1">
            <h5 className="font-bold text-foundation-text flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-foundation-primary" />
              <span>Tenure Extension Vigilance</span>
            </h5>
            <p>Banks often silently stretch loan tenure rather than increasing EMI when rates rise. If unchecked, this can add ₹10L–₹25L in total interest over a 20-year loan. Demand an annual loan amortization schedule.</p>
          </div>
        </div>
      </div>

      {/* Top Banks Comparison Table */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-bold font-serif text-lg text-foundation-text">
              Major Banks Home Loan Rate Benchmark
            </h4>
            <p className="text-xs text-foundation-muted">
              Indicative floating rates for salaried applicants with 750+ CIBIL score
            </p>
          </div>
          <span className="text-[11px] font-semibold text-foundation-primary px-2.5 py-1 rounded-full bg-foundation-bg border border-foundation-border">
            Verified Banking Rates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-foundation-border text-foundation-muted">
                <th className="pb-3 font-semibold">Bank / Lender</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Effective Rate Range</th>
                <th className="pb-3 font-semibold">Women Borrower Discount</th>
                <th className="pb-3 font-semibold">Processing Fee Policy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foundation-border/60">
              {BANK_HOME_LOAN_RATES.map((b, idx) => (
                <tr key={idx} className="hover:bg-foundation-bg/50 transition-colors">
                  <td className="py-3.5 font-bold text-foundation-text flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-foundation-primary" />
                    <span>{b.bank}</span>
                  </td>
                  <td className="py-3.5 text-foundation-muted">{b.type}</td>
                  <td className="py-3.5 font-bold text-foundation-primary">
                    {b.minRate.toFixed(2)}% – {b.maxRate.toFixed(2)}%
                  </td>
                  <td className="py-3.5">
                    {b.specialWomenDiscount ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> 0.05% Discount
                      </span>
                    ) : (
                      <span className="text-[11px] text-foundation-muted">Standard rate</span>
                    )}
                  </td>
                  <td className="py-3.5 text-foundation-muted text-xs">{b.processingFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* State Stamp Duty & Concessions Matrix */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold font-serif text-lg text-foundation-text flex items-center gap-2">
              <span>Verified State Stamp Duty & Concession Matrix</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </h4>
            <p className="text-xs text-foundation-muted">
              Check statutory rates and special rebates for women & joint home buyers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STATE_STAMP_DUTIES.map((sd, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-foundation-bg border border-foundation-border space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-sm text-foundation-text">{sd.state}</h5>
                <span className="text-xs font-semibold text-foundation-primary">
                  Reg: {sd.registrationFee}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-1 text-center">
                <div className="p-2 rounded bg-foundation-surface border border-foundation-border">
                  <span className="text-[10px] text-foundation-muted block">Male</span>
                  <span className="font-bold text-xs sm:text-sm text-foundation-text">{sd.maleRate}%</span>
                </div>
                <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-semibold">Female</span>
                  <span className="font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">{sd.femaleRate}%</span>
                </div>
                <div className="p-2 rounded bg-foundation-surface border border-foundation-border">
                  <span className="text-[10px] text-foundation-muted block">Joint</span>
                  <span className="font-bold text-xs sm:text-sm text-foundation-text">{sd.jointRate}%</span>
                </div>
              </div>

              <p className="text-[11px] text-foundation-muted leading-relaxed">
                {sd.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Government Circle Rate Verification Portals */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-3">
        <h4 className="font-bold font-serif text-lg text-foundation-text">
          Direct Government Circle Rate / Ready Reckoner Portals
        </h4>
        <p className="text-xs sm:text-sm text-foundation-muted">
          Never rely on broker claims about official minimum valuation rates. Verify circle rates and guidance values directly from state revenue servers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {officialValuationPortals.map((p, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-foundation-primary/10 text-foundation-primary uppercase">
                  {p.state}
                </span>
                <h5 className="font-bold text-xs sm:text-sm text-foundation-text mt-1.5">{p.name}</h5>
                <p className="text-[11px] text-foundation-muted mt-1">{p.note}</p>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-foundation-primary hover:underline"
              >
                <span>Open Official State Server</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
