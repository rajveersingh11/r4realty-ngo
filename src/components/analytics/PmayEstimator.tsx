import React, { useState } from 'react';
import { AlertTriangle, ExternalLink, HeartHandshake, CheckCircle2, ShieldAlert } from 'lucide-react';

export const PmayEstimator: React.FC = () => {
  const [incomeLakhs, setIncomeLakhs] = useState<number>(4.5);
  const [propertyPriceLakhs, setPropertyPriceLakhs] = useState<number>(30);
  const [loanLakhs, setLoanLakhs] = useState<number>(20);
  const [carpetAreaSqM, setCarpetAreaSqM] = useState<number>(75);
  const [isFirstHome, setIsFirstHome] = useState<boolean>(true);
  const [femaleOwnership, setFemaleOwnership] = useState<boolean>(true);

  // PMAY-Urban 2.0 (Interest Subsidy Scheme - ISS) Guidelines (MoHUA Sept 2024)
  // Max house value: ₹35 Lakh
  // Max loan: ₹25 Lakh
  // Max carpet area: 120 sq.m
  // Income brackets: EWS (<= 3L), LIG (3L - 6L), MIG (6L - 9L). Above 9L: Ineligible.
  // Subsidy: 4.0% interest subsidy on first ₹8 Lakh of loan, maximum subsidy ₹1.80 Lakh (NPV ₹1.50 Lakh).
  
  let category = 'EWS';
  let isIncomeEligible = false;

  if (incomeLakhs <= 3) {
    category = 'Economically Weaker Section (EWS)';
    isIncomeEligible = true;
  } else if (incomeLakhs <= 6) {
    category = 'Low Income Group (LIG)';
    isIncomeEligible = true;
  } else if (incomeLakhs <= 9) {
    category = 'Middle Income Group (MIG)';
    isIncomeEligible = true;
  } else {
    category = 'Income Exceeds PMAY-U 2.0 Cap (> ₹9 Lakhs/year)';
    isIncomeEligible = false;
  }

  const isPriceEligible = propertyPriceLakhs <= 35;
  const isLoanEligible = loanLakhs <= 25;
  const isAreaEligible = carpetAreaSqM <= 120;
  
  const eligibleForSubsidy = isFirstHome && isIncomeEligible && isPriceEligible && isLoanEligible && isAreaEligible;

  // Calculation under PMAY-U 2.0:
  // 4% interest subvention on first 8 Lakhs
  const eligibleLoanTranche = Math.min(800000, loanLakhs * 100000);
  const maxSubsidyBenefit = 180000; // ₹1.80 Lakh nominal subsidy
  const npvBenefit = 150000; // ₹1.50 Lakh net present value

  const stateHousingBoards = [
    { state: 'Maharashtra', board: 'MHADA Lottery & CIDCO Lottery', url: 'https://lottery.mhada.gov.in', note: 'Computerized lottery for affordable homes in Mumbai MMR, Pune, Konkan & Nashik.' },
    { state: 'Delhi NCR', board: 'DDA Housing Scheme', url: 'https://dda.gov.in', note: 'Allotment of affordable flats across Dwarka, Narela, and Jasola with clear DDA title.' },
    { state: 'Karnataka', board: 'BDA & KHB (Karnataka Housing Board)', url: 'https://khb.karnataka.gov.in', note: 'Subsidized residential sites and housing units across Bengaluru and tier-2 Karnataka.' },
    { state: 'Rajasthan', board: 'RHB (Rajasthan Housing Board)', url: 'https://urban.rajasthan.gov.in', note: 'Mukhya Mantri Jan Awas Yojana subsidized housing schemes.' },
    { state: 'Uttar Pradesh', board: 'UPAVP (Awas Vikas Parishad)', url: 'https://upavp.in', note: 'Affordable plots and G+3 multi-storey flats in Lucknow, Ghaziabad, and Kanpur.' }
  ];

  return (
    <div className="space-y-8">
      {/* Intro Banner */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-foundation-primary font-bold text-sm mb-1">
            <HeartHandshake className="w-5 h-5 text-foundation-accent" />
            <span>PMAY-Urban 2.0 (Active Scheme — Ministry of Housing & Urban Affairs)</span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
            PMAY-U 2.0 Interest Subsidy Scheme (ISS) Calculator
          </h3>
          <p className="text-xs sm:text-sm text-foundation-muted max-w-3xl mt-1 leading-relaxed">
            Approved by the Union Cabinet and launched in September 2024, <b>PMAY-U 2.0</b> provides a <b>4.0% interest subvention</b> on home loans up to ₹25 Lakh for urban EWS, LIG, and Middle-Income families purchasing homes valued up to ₹35 Lakh.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Estimator Input Form */}
        <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
          <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border flex items-center justify-between">
            <span>PMAY-U 2.0 Parameters</span>
            <span className="text-[11px] font-semibold text-foundation-primary bg-foundation-primary/10 px-2 py-0.5 rounded">
              Sept 2024 Norms
            </span>
          </h4>

          {/* Household Annual Income */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Annual Household Income
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                ₹{incomeLakhs.toFixed(1)} Lakhs / year
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={incomeLakhs}
              onChange={(e) => setIncomeLakhs(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
            <div className="flex justify-between text-[10px] text-foundation-muted mt-1">
              <span>₹1 Lakh (EWS)</span>
              <span>₹3L–₹6L (LIG)</span>
              <span>₹6L–₹9L (MIG)</span>
              <span>&gt;₹9L (Cap)</span>
            </div>
          </div>

          {/* Property Total Price */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Property / Flat Agreement Value
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                ₹{propertyPriceLakhs} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="1"
              value={propertyPriceLakhs}
              onChange={(e) => setPropertyPriceLakhs(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
            <div className="flex justify-between text-[10px] text-foundation-muted mt-1">
              <span>₹10 Lakhs</span>
              <span className="text-amber-600 font-bold">₹35 Lakhs (Statutory Ceiling)</span>
              <span>₹50 Lakhs</span>
            </div>
            {propertyPriceLakhs > 35 && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">
                ⚠️ PMAY-U 2.0 strictly caps eligible property value at ₹35 Lakhs maximum.
              </p>
            )}
          </div>

          {/* Home Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Home Loan Amount Required
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                ₹{loanLakhs} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={loanLakhs}
              onChange={(e) => setLoanLakhs(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
            <div className="flex justify-between text-[10px] text-foundation-muted mt-1">
              <span>₹5 Lakhs</span>
              <span className="text-amber-600 font-bold">₹25 Lakhs (Max Eligible Loan)</span>
              <span>₹35 Lakhs</span>
            </div>
          </div>

          {/* Carpet Area */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Carpet Area (sq. meters)
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                {carpetAreaSqM} sq.m (~{Math.round(carpetAreaSqM * 10.764)} sq.ft)
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={carpetAreaSqM}
              onChange={(e) => setCarpetAreaSqM(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
            <span className="text-[10px] text-foundation-muted block mt-1">
              Statutory ceiling under PMAY-U 2.0: Up to 120 sq. meters.
            </span>
          </div>

          {/* First Home & Female Ownership Checkboxes */}
          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFirstHome}
                  onChange={(e) => setIsFirstHome(e.target.checked)}
                  className="w-4 h-4 rounded text-foundation-primary focus:ring-foundation-primary accent-foundation-primary"
                />
                <span className="text-xs font-semibold text-foundation-text">
                  First Home: Family owns no pucca house anywhere in India
                </span>
              </label>
            </div>

            <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={femaleOwnership}
                  onChange={(e) => setFemaleOwnership(e.target.checked)}
                  className="w-4 h-4 rounded text-foundation-primary focus:ring-foundation-primary accent-foundation-primary"
                />
                <span className="text-xs font-semibold text-foundation-text">
                  Female family member is sole or joint owner
                </span>
              </label>
              <p className="text-[11px] text-foundation-muted mt-1 pl-6.5">
                Mandatory for EWS/LIG categories to claim complete interest subvention.
              </p>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
                PMAY-Urban 2.0 Official Eligibility
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                eligibleForSubsidy 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
              }`}>
                {eligibleForSubsidy ? 'Eligible for PMAY-U 2.0 Subsidy' : 'Ineligible for PMAY-U 2.0'}
              </span>
            </div>

            <div>
              <p className="text-xs text-foundation-muted">Income Category Assessment:</p>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-foundation-text">
                {category}
              </h3>
            </div>

            {eligibleForSubsidy ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
                    <span className="text-xs text-foundation-muted block">Maximum Total Subsidy Benefit</span>
                    <span className="font-serif text-2xl font-bold text-foundation-primary mt-1 block">
                      ₹{maxSubsidyBenefit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-foundation-muted">Net Present Value: ~₹{npvBenefit.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
                    <span className="text-xs text-foundation-muted block">Interest Subvention Rate</span>
                    <span className="font-serif text-2xl font-bold text-foundation-accent mt-1 block">
                      4.0% p.a.
                    </span>
                    <span className="text-[11px] text-foundation-muted">Applied on first ₹8 Lakh tranche</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1.5 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-emerald-900 dark:text-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>How PMAY-U 2.0 Subsidy is Disbursed</span>
                  </div>
                  <p>• The subsidy amount is credited directly by the lending bank (PLI) to your home loan account in 5 annual installments, effectively reducing your principal outstanding balance.</p>
                  <p>• Applied on loans sanctioned and disbursed on or after <b>September 1, 2024</b> for loan tenures up to 12 years.</p>
                  <p>• Eligible loan tranche: <b>₹{(eligibleLoanTranche/100000).toFixed(1)} Lakhs</b>. Loan amounts above ₹8 Lakh are serviced at the standard bank interest rate.</p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>Reasons for Ineligibility under PMAY-U 2.0 Norms:</span>
                </div>
                {!isFirstHome && <p>• Family already owns a pacca house in India (PMAY is strictly for first-time homeowners).</p>}
                {!isIncomeEligible && <p>• Annual household income exceeds the statutory ₹9 Lakh ceiling for PMAY-U 2.0 Middle-Income Group (MIG).</p>}
                {!isPriceEligible && <p>• Property agreement value (₹{propertyPriceLakhs}L) exceeds the maximum statutory cap of ₹35 Lakhs.</p>}
                {!isLoanEligible && <p>• Loan required (₹{loanLakhs}L) exceeds the maximum permissible loan cap of ₹25 Lakhs.</p>}
                {!isAreaEligible && <p>• Carpet area ({carpetAreaSqM} sq.m) exceeds the 120 sq.m statutory limit.</p>}
              </div>
            )}
          </div>

          {/* Non-Profit Warning: Anti-Fraud on Subsidies */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">Citizen Warning: Zero Middlemen Policy</span>
              <p className="mt-0.5 leading-relaxed">
                PMAY-U 2.0 application is completely free through your lending bank or the official Ministry of Housing & Urban Affairs (MoHUA) Unified Web Portal (`pmay-urban.gov.in`). Never pay any fee or bribe to agents promising "guaranteed approval".
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official State Housing Boards Directory */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm">
        <h4 className="font-bold font-serif text-lg text-foundation-text mb-2">
          Official Government Housing Lotteries (Transparent, Subsidized)
        </h4>
        <p className="text-xs sm:text-sm text-foundation-muted mb-4">
          Government housing boards conduct computerized draws for affordable and low-income flats with clear title and zero builder fraud risk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateHousingBoards.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-foundation-bg border border-foundation-border flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-foundation-primary/10 text-foundation-primary uppercase">
                  {item.state}
                </span>
                <h5 className="font-bold text-sm text-foundation-text mt-2">{item.board}</h5>
                <p className="text-xs text-foundation-muted mt-1 leading-relaxed">{item.note}</p>
              </div>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-foundation-primary hover:underline"
              >
                <span>Visit Official Lottery Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
