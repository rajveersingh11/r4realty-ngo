import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  FileText, 
  Printer, 
  RefreshCcw,
  BadgeAlert
} from 'lucide-react';
import { CITIES_DATA, analyzePropertyDeal, DealAnalysisInput } from '../../data/marketAnalytics';

export const PropertyDealAnalyzer: React.FC = () => {
  const [cityId, setCityId] = useState('mumbai-mmr');
  const [locality, setLocality] = useState('');
  const [carpetArea, setCarpetArea] = useState<number>(750);
  const [quotedPrice, setQuotedPrice] = useState<number>(12000000); // 1.2 Cr default
  const [propertyStatus, setPropertyStatus] = useState<DealAnalysisInput['propertyStatus']>('under_construction');
  const [reraRegistered, setReraRegistered] = useState(true);
  const [hasPromisedYield, setHasPromisedYield] = useState(false);
  const [promisedYield, setPromisedYield] = useState<number>(12);
  const [advancePercent, setAdvancePercent] = useState<number>(10);
  const [hasLegalOpinion, setHasLegalOpinion] = useState(false);

  const selectedCity = CITIES_DATA.find(c => c.id === cityId) || CITIES_DATA[0];

  const analysis = analyzePropertyDeal({
    cityId,
    locality,
    carpetAreaSqFt: Number(carpetArea) || 1,
    quotedPriceTotal: Number(quotedPrice) || 0,
    propertyStatus,
    reraRegistered,
    promisedRentalReturnPercent: hasPromisedYield ? Number(promisedYield) : 0,
    advanceDemandPercent: Number(advancePercent),
    hasLegalOpinion
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-300';
      case 'Moderate':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border-amber-300';
      case 'High':
        return 'text-orange-700 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400 border-orange-300';
      default:
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 border-rose-300';
    }
  };

  const formatLakhsCr = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="space-y-8">
      {/* Introduction banner */}
      <div className="bg-gradient-to-r from-foundation-primary/10 via-foundation-accent/15 to-foundation-primary/10 p-5 rounded-2xl border border-foundation-border">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-foundation-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foundation-text">
              Independent Property Due Diligence & Risk Scorer
            </h3>
            <p className="text-xs sm:text-sm text-foundation-muted mt-1 leading-relaxed">
              Evaluating an apartment or plot? Enter the quoted details below. Our algorithm benchmarks the price against actual internet registry data, calculates the True Cost of ownership, and scans for known developer traps (assured returns, advance caps, and RERA compliance).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 space-y-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-foundation-border">
            <h4 className="font-bold text-foundation-text text-base">Enter Property Offer Details</h4>
            <span className="text-[11px] font-semibold text-foundation-muted">100% Confidential</span>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-semibold text-foundation-text uppercase tracking-wider mb-1.5">
              Select City / Region
            </label>
            <select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text text-sm focus:ring-2 focus:ring-foundation-primary focus:outline-none"
            >
              {CITIES_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          {/* Locality (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-foundation-text uppercase tracking-wider mb-1.5">
              Locality or Project Name (Optional)
            </label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="e.g. Whitefield / Baner / Sec 150"
              className="w-full px-3 py-2.5 rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text text-sm focus:ring-2 focus:ring-foundation-primary focus:outline-none"
            />
          </div>

          {/* Quoted Total Price */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Total Quoted Base Price
              </label>
              <span className="text-xs font-bold text-foundation-primary">
                {formatLakhsCr(quotedPrice)}
              </span>
            </div>
            <input
              type="number"
              step="50000"
              value={quotedPrice}
              onChange={(e) => setQuotedPrice(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text text-sm focus:ring-2 focus:ring-foundation-primary focus:outline-none"
            />
          </div>

          {/* Carpet Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Carpet Area (sq. ft)
              </label>
              <span className="text-xs text-foundation-muted font-medium">Inside walls only</span>
            </div>
            <input
              type="number"
              value={carpetArea}
              onChange={(e) => setCarpetArea(Number(e.target.value))}
              placeholder="e.g. 850"
              className="w-full px-3 py-2.5 rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text text-sm focus:ring-2 focus:ring-foundation-primary focus:outline-none"
            />
            <p className="text-[11px] text-foundation-muted mt-1">
              Quoted rate: <b className="text-foundation-text">₹{analysis.pricePerSqFt.toLocaleString('en-IN')}/sq.ft</b>
            </p>
          </div>

          {/* Construction Status */}
          <div>
            <label className="block text-xs font-semibold text-foundation-text uppercase tracking-wider mb-1.5">
              Property Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPropertyStatus('under_construction')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  propertyStatus === 'under_construction'
                    ? 'bg-foundation-primary text-foundation-onPrimary border-foundation-primary'
                    : 'bg-foundation-bg text-foundation-text border-foundation-border'
                }`}
              >
                Under Construction
              </button>
              <button
                type="button"
                onClick={() => setPropertyStatus('ready_oc')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  propertyStatus === 'ready_oc'
                    ? 'bg-foundation-primary text-foundation-onPrimary border-foundation-primary'
                    : 'bg-foundation-bg text-foundation-text border-foundation-border'
                }`}
              >
                Ready with OC
              </button>
            </div>
          </div>

          {/* RERA Registered Toggle */}
          <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={reraRegistered}
                onChange={(e) => setReraRegistered(e.target.checked)}
                className="w-4 h-4 rounded text-foundation-primary focus:ring-foundation-primary"
              />
              <span className="text-xs font-semibold text-foundation-text">
                Project has valid RERA Registration Number
              </span>
            </label>
            {!reraRegistered && (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 pl-6.5 font-medium">
                Warning: Selling an under-construction project without RERA is an offence under Section 3!
              </p>
            )}
          </div>

          {/* Assured Return Check */}
          <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasPromisedYield}
                onChange={(e) => setHasPromisedYield(e.target.checked)}
                className="w-4 h-4 rounded text-foundation-primary focus:ring-foundation-primary"
              />
              <span className="text-xs font-semibold text-foundation-text">
                Developer promises "Guaranteed / Assured Monthly Return"
              </span>
            </label>
            {hasPromisedYield && (
              <div className="pl-6 pt-1">
                <label className="text-[11px] text-foundation-muted block mb-1">
                  Promised Return Rate (% per year):
                </label>
                <input
                  type="number"
                  value={promisedYield}
                  onChange={(e) => setPromisedYield(Number(e.target.value))}
                  className="w-24 px-2 py-1 text-xs rounded border border-foundation-border bg-foundation-surface text-foundation-text"
                />
              </div>
            )}
          </div>

          {/* Advance Demanded */}
          <div>
            <label className="block text-xs font-semibold text-foundation-text uppercase tracking-wider mb-1.5">
              Advance Demanded before Registered Agreement (%)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={advancePercent}
                onChange={(e) => setAdvancePercent(Number(e.target.value))}
                className="w-full accent-foundation-primary"
              />
              <span className="text-xs font-bold text-foundation-primary shrink-0 w-12 text-right">
                {advancePercent}%
              </span>
            </div>
            {advancePercent > 10 && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1">
                Notice: RERA Section 13 strictly limits advance payment to 10% maximum prior to registration.
              </p>
            )}
          </div>

          {/* Independent Legal Opinion */}
          <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={hasLegalOpinion}
                onChange={(e) => setHasLegalOpinion(e.target.checked)}
                className="w-4 h-4 rounded text-foundation-primary focus:ring-foundation-primary"
              />
              <span className="text-xs font-semibold text-foundation-text">
                Independent lawyer retained for 30-year title search
              </span>
            </label>
          </div>
        </div>

        {/* Right Column: Analysis Output & Due Diligence Report */}
        <div className="lg:col-span-7 space-y-6">
          {/* Risk Score Gauge & Valuation Banner */}
          <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
                  Due Diligence Assessment
                </span>
                <h3 className="text-xl font-bold font-serif text-foundation-text">
                  Risk & Fair Value Report
                </h3>
              </div>

              {/* Risk Level Badge */}
              <div className={`px-4 py-2 rounded-xl border text-sm font-bold flex items-center gap-2 ${getRiskColor(analysis.riskLevel)}`}>
                {analysis.riskLevel === 'Low' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                )}
                <span>Risk Level: {analysis.riskLevel} ({analysis.riskScore}/100)</span>
              </div>
            </div>

            {/* Risk Gauge Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-foundation-muted">
                <span>Safe (0)</span>
                <span>Moderate (25-45)</span>
                <span>High (45-70)</span>
                <span>Critical (70+)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-foundation-border/60 overflow-hidden flex">
                <div 
                  className={`h-full transition-all duration-500 ${
                    analysis.riskScore >= 70 ? 'bg-rose-500' :
                    analysis.riskScore >= 45 ? 'bg-orange-500' :
                    analysis.riskScore >= 25 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${analysis.riskScore}%` }}
                />
              </div>
            </div>

            {/* Market Valuation Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
                <span className="text-[11px] text-foundation-muted block">Quoted Price/Sq.Ft</span>
                <span className="text-base sm:text-lg font-bold text-foundation-primary">
                  ₹{analysis.pricePerSqFt.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
                <span className="text-[11px] text-foundation-muted block">{selectedCity.name} Benchmark</span>
                <span className="text-base sm:text-lg font-bold text-foundation-text">
                  ₹{analysis.cityAvgPriceSqFt.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-foundation-bg border border-foundation-border">
                <span className="text-[11px] text-foundation-muted block">Market Variance</span>
                <span className={`text-base sm:text-lg font-bold ${
                  analysis.priceVariancePercent > 20 ? 'text-rose-600' :
                  analysis.priceVariancePercent < -20 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {analysis.priceVariancePercent > 0 ? `+${analysis.priceVariancePercent}%` : `${analysis.priceVariancePercent}%`}
                </span>
              </div>
            </div>
          </div>

          {/* Red Flags & Critical Traps */}
          {analysis.redFlags.length > 0 && (
            <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
                <BadgeAlert className="w-5 h-5 text-rose-600" />
                <span>CRITICAL RED FLAGS DETECTED ({analysis.redFlags.length})</span>
              </div>
              <ul className="space-y-2">
                {analysis.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 flex items-start gap-2">
                    <span className="text-rose-600 font-bold shrink-0">⚠️</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Yellow Warnings */}
          {analysis.yellowWarnings.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Points of Vigilance ({analysis.yellowWarnings.length})</span>
              </div>
              <ul className="space-y-1.5">
                {analysis.yellowWarnings.map((warn, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">•</span>
                    <span>{warn}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* True Cost Calculation Card */}
          <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-4">
            <h4 className="font-bold text-foundation-text text-base flex items-center justify-between">
              <span>All-Inclusive "True Cost" Breakdown</span>
              <span className="text-xs text-foundation-muted font-normal">Beyond quoted brochure price</span>
            </h4>

            <div className="divide-y divide-foundation-border/50 text-xs sm:text-sm">
              <div className="py-2.5 flex justify-between">
                <span className="text-foundation-muted">Base Agreement Value:</span>
                <span className="font-semibold text-foundation-text">₹{analysis.estimatedTrueCost.basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-foundation-muted">Estimated Stamp Duty & Registration (~6%):</span>
                <span className="font-semibold text-foundation-text">₹{analysis.estimatedTrueCost.stampDutyAndReg.toLocaleString('en-IN')}</span>
              </div>
              {analysis.estimatedTrueCost.gstAmount > 0 && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-foundation-muted">GST on Under-Construction (5%):</span>
                  <span className="font-semibold text-foundation-text">₹{analysis.estimatedTrueCost.gstAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="py-2.5 flex justify-between">
                <span className="text-foundation-muted">Interior, Society Deposits & Legal Buffer (~7%):</span>
                <span className="font-semibold text-foundation-text">₹{analysis.estimatedTrueCost.interiorAndBuffer.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-3 flex justify-between items-center text-sm sm:text-base font-bold">
                <span className="text-foundation-primary">Total Liquid Outlay Required:</span>
                <span className="text-foundation-primary font-serif text-lg sm:text-xl">
                  {formatLakhsCr(analysis.estimatedTrueCost.totalTrueOutlay)}
                </span>
              </div>
            </div>
          </div>

          {/* Actionable Next Steps & Print Button */}
          <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-foundation-text text-base">Recommended Action Checklist</h4>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-foundation-bg border border-foundation-border hover:border-foundation-primary text-foundation-text transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Due Diligence Report</span>
              </button>
            </div>

            <div className="space-y-2">
              {analysis.recommendedActionChecklist.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foundation-muted">
                  <CheckCircle2 className="w-4 h-4 text-foundation-primary shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
