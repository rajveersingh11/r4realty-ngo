import React, { useState } from 'react';
import { STATE_STAMP_DUTIES } from '../../data/marketAnalytics';
import { Heart, Info, CheckCircle2 } from 'lucide-react';

export const StampDutyCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(7500000); // 75 Lakhs
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [buyerGender, setBuyerGender] = useState<'Male' | 'Female' | 'Joint'>('Male');

  const stateData = STATE_STAMP_DUTIES.find((s) => s.state === selectedState) || STATE_STAMP_DUTIES[0];

  const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  // Exact statutory rate calculation based on real state rules
  let stampRate = stateData.maleRate;
  let regFee = propertyValue * 0.01;
  let femaleSavings = 0;
  let stateRuleNote = '';

  if (selectedState === 'Maharashtra') {
    // 1% concession strictly requires female sole ownership; joint male-female reverts to 6%
    if (buyerGender === 'Female') {
      stampRate = 5.0;
      femaleSavings = (propertyValue * 0.01);
      stateRuleNote = 'Sole female ownership qualifies for the 1% concession (5% effective). Resale lock-in was repealed in May 2023.';
    } else {
      stampRate = 6.0;
      if (buyerGender === 'Joint') {
        stateRuleNote = 'Under Maharashtra rules, joint ownership involving a male does not qualify for the 1% women concession.';
      }
    }
    // Registration fee capped at ₹30,000 for residential
    regFee = Math.min(30000, propertyValue * 0.01);
  } else if (selectedState === 'Delhi') {
    const isUnder25L = propertyValue <= 2500000;
    if (isUnder25L) {
      stampRate = buyerGender === 'Female' ? 4.0 : buyerGender === 'Joint' ? 5.0 : 6.0;
    } else {
      stampRate = buyerGender === 'Female' ? 5.0 : buyerGender === 'Joint' ? 6.0 : 7.0;
    }
    regFee = propertyValue * 0.01 + 100; // 1% + ₹100 pasting
    if (buyerGender === 'Female') {
      femaleSavings = propertyValue * 0.02; // 2% lower than male
    } else if (buyerGender === 'Joint') {
      femaleSavings = propertyValue * 0.01; // 1% lower than male
    }
    stateRuleNote = isUnder25L ? 'Delhi slab ≤ ₹25 Lakh applied.' : 'Delhi slab > ₹25 Lakh applied (includes 1% MCD transfer duty).';
  } else if (selectedState === 'Uttar Pradesh') {
    // 1% rebate on properties up to ₹1 Crore value (max ₹1 Lakh savings)
    if (buyerGender === 'Female' && propertyValue <= 10000000) {
      stampRate = 6.0;
      femaleSavings = Math.min(100000, propertyValue * 0.01);
      stateRuleNote = 'UP policy allows 1% rebate on properties up to ₹1 Crore value (saving up to ₹1 Lakh).';
    } else {
      stampRate = 7.0;
      if (buyerGender === 'Female' && propertyValue > 10000000) {
        stateRuleNote = 'Property exceeds the ₹1 Crore ceiling for UP female concession; standard 7% applies.';
      }
    }
    regFee = propertyValue * 0.01;
  } else if (selectedState === 'Karnataka') {
    // 5% duty + 10% cess (0.5%) + 2% BBMP urban surcharge (0.1%) + 2% reg = 7.6%
    stampRate = 5.6; // 5% + 0.5% + 0.1%
    regFee = propertyValue * 0.02; // 2% registration fee
    stateRuleNote = 'Bengaluru BBMP composite rate: 5% base + 10% cess + 2% surcharge + 2% registration = 7.6% total.';
  } else if (selectedState === 'Tamil Nadu') {
    stampRate = 7.0;
    regFee = propertyValue * 0.02; // reduced from 4% in 2023 budget
    stateRuleNote = 'Tamil Nadu uniform rate: 7% stamp duty + 2% registration fee = 9% total.';
  } else if (selectedState === 'Gujarat') {
    stampRate = 4.9; // 3.5% basic + 1.4% surcharge
    if (buyerGender === 'Female') {
      regFee = 0; // completely exempt in Gujarat for women
      femaleSavings = propertyValue * 0.01;
      stateRuleNote = 'Women in Gujarat are 100% exempt from the 1% registration fee.';
    } else {
      regFee = propertyValue * 0.01;
    }
  } else if (selectedState === 'Haryana') {
    stampRate = buyerGender === 'Female' ? 5.0 : buyerGender === 'Joint' ? 6.0 : 7.0;
    regFee = Math.min(50000, 25000);
    if (buyerGender === 'Female') femaleSavings = propertyValue * 0.02;
    stateRuleNote = 'Urban municipal slab rates (Gurugram / Faridabad).';
  } else {
    stampRate = buyerGender === 'Female' ? stateData.femaleRate : buyerGender === 'Joint' ? stateData.jointRate : stateData.maleRate;
    regFee = propertyValue * 0.01;
  }

  const stampDutyAmount = (propertyValue * stampRate) / 100;
  const totalGovernmentPayout = stampDutyAmount + regFee;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
        <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border flex items-center justify-between">
          <span>Property Registration Inputs</span>
          <span className="text-[11px] font-semibold text-foundation-primary bg-foundation-primary/10 px-2 py-0.5 rounded">
            Statutory Verified
          </span>
        </h4>

        <div>
          <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1.5">
            Select State / Jurisdiction
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text text-sm focus:ring-2 focus:ring-foundation-primary focus:outline-none"
          >
            {STATE_STAMP_DUTIES.map((s) => (
              <option key={s.state} value={s.state}>
                {s.state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Total Agreement / Consideration Value
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(propertyValue)}</span>
          </div>
          <input
            type="range"
            min="1000000"
            max="30000000"
            step="100000"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            className="w-full accent-foundation-primary"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1.5">
            Sole or Joint Ownership
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Male', 'Female', 'Joint'] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setBuyerGender(g)}
                className={`py-2 px-3 text-xs font-bold rounded-lg border text-center transition-all ${
                  buyerGender === g
                    ? 'bg-foundation-primary text-foundation-onPrimary border-foundation-primary'
                    : 'bg-foundation-bg text-foundation-text border-foundation-border hover:bg-foundation-border/30'
                }`}
              >
                {g} {g === 'Female' && '👩'}
              </button>
            ))}
          </div>
        </div>

        {stateRuleNote && (
          <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border text-xs text-foundation-muted leading-relaxed">
            <p className="font-semibold text-foundation-text mb-0.5">Applied Statutory Rule:</p>
            <p>{stateRuleNote}</p>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
            Registration & Stamp Outlay
          </span>

          <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
            <span className="text-xs text-foundation-muted block">Total Statutory Payment to Government:</span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-foundation-primary">
              {inr(totalGovernmentPayout)}
            </span>
            <span className="text-xs text-foundation-muted block mt-1">
              Effective Total Rate: {((totalGovernmentPayout / propertyValue) * 100).toFixed(2)}% of property price
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
              <span className="text-xs text-foundation-muted block">Effective Stamp Duty ({stampRate}%)</span>
              <span className="text-xl font-bold text-foundation-text mt-1 block">
                {inr(stampDutyAmount)}
              </span>
              <span className="text-[11px] text-foundation-muted">Including municipal cess & local surcharges</span>
            </div>

            <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
              <span className="text-xs text-foundation-muted block">Registration Fee</span>
              <span className="text-xl font-bold text-foundation-text mt-1 block">
                {inr(regFee)}
              </span>
              <span className="text-[11px] text-foundation-muted block mt-0.5">{stateData.registrationFee}</span>
            </div>
          </div>

          {femaleSavings > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0" />
                <div>
                  <span className="font-bold text-sm block">Female Homeownership Concession Benefit!</span>
                  <span>Direct statutory tax savings under state women empowerment policies</span>
                </div>
              </div>
              <span className="text-lg font-bold font-serif shrink-0">
                +{inr(femaleSavings)} Saved
              </span>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              [Indian Stamp Act & IT Act §56(2)(x)] Stamp duty is payable strictly on the higher of the Actual Agreement Value or the State Ready Reckoner / Circle Rate. Under-valuing agreement value by more than the 10% statutory safe harbor limit triggers income tax penalties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
