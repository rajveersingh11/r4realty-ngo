import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const AffordabilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(120000); // 1.2 Lakh
  const [existingEmis, setExistingEmis] = useState<number>(0);
  const [savingsForDownpayment, setSavingsForDownpayment] = useState<number>(2000000); // 20 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.75);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  // Prudent non-profit rule: Max 35% of monthly income for housing EMI
  const comfortableEmi = Math.max(0, monthlyIncome * 0.35 - existingEmis);

  // Present Value of annuity loan: PV = E * (1 - (1+i)^-n) / i
  const r = (interestRate / 1200);
  const n = tenureYears * 12;
  const loanCapacity = r > 0 ? (comfortableEmi * (1 - Math.pow(1 + r, -n))) / r : 0;

  // Real world buffer: Reserve 8% of savings for stamp duty, registration, and initial society charges
  const availableEquityForDownpayment = savingsForDownpayment * 0.92;
  const stampDutyBufferReserved = savingsForDownpayment * 0.08;

  // Total affordable purchase price
  const affordablePrice = loanCapacity + availableEquityForDownpayment;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form */}
      <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
        <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border">
          Financial Capacity Inputs
        </h4>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Net Monthly In-Hand Income
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(monthlyIncome)}</span>
          </div>
          <input
            type="range"
            min="30000"
            max="500000"
            step="5000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            className="w-full accent-foundation-primary"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Existing Monthly EMIs (Car, Personal, Credit Cards)
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(existingEmis)}</span>
          </div>
          <input
            type="number"
            step="1000"
            value={existingEmis}
            onChange={(e) => setExistingEmis(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Total Savings Available in Cash / FD
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(savingsForDownpayment)}</span>
          </div>
          <input
            type="range"
            min="200000"
            max="15000000"
            step="100000"
            value={savingsForDownpayment}
            onChange={(e) => setSavingsForDownpayment(Number(e.target.value))}
            className="w-full accent-foundation-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1">
              Tenure (Years)
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
            />
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
            Non-Profit Prudent Affordability
          </span>

          <div className="p-4 rounded-xl bg-foundation-primary/5 border border-foundation-primary/20">
            <span className="text-xs text-foundation-muted block">Maximum Safe Home Purchase Price:</span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-foundation-primary">
              {inr(affordablePrice)}
            </span>
            <p className="text-xs text-foundation-muted mt-2">
              Based on comfortable 35% debt-to-income ratio (so emergency reserves and family goals are never compromised).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border">
              <span className="text-xs text-foundation-muted block">Safe Monthly EMI (35%)</span>
              <span className="font-bold text-base text-foundation-text mt-0.5 block">{inr(comfortableEmi)}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border">
              <span className="text-xs text-foundation-muted block">Max Home Loan Borrowable</span>
              <span className="font-bold text-base text-foundation-text mt-0.5 block">{inr(loanCapacity)}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-foundation-bg border border-foundation-border">
              <span className="text-xs text-foundation-muted block">Reserved for Stamp Duty (8%)</span>
              <span className="font-bold text-base text-amber-600 dark:text-amber-400 mt-0.5 block">{inr(stampDutyBufferReserved)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Why We Never Recommend Borrowing to the Max</span>
              <p className="mt-0.5 leading-relaxed">
                Banks often approve loans up to 50–55% of your income. However, our non-profit case studies show that buyers who exceed 40% income on EMIs face severe distress during job transitions, health emergencies, or rate hikes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
