import React, { useState } from 'react';
import { Landmark, Info, CheckCircle2 } from 'lucide-react';

export const LoanEligibilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000); // 1 Lakh
  const [existingEmis, setExistingEmis] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(8.75);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [foirCap, setFoirCap] = useState<number>(45); // 45% standard bank FOIR

  const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  const maxTotalEmiAllowed = (monthlyIncome * foirCap) / 100;
  const maxNewEmi = Math.max(0, maxTotalEmiAllowed - existingEmis);

  const r = interestRate / 1200;
  const n = tenureYears * 12;
  const estimatedMaxLoan = r > 0 ? (maxNewEmi * (1 - Math.pow(1 + r, -n))) / r : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form */}
      <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
        <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border">
          Bank Eligibility Parameters
        </h4>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Net Monthly Salary / Income
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(monthlyIncome)}</span>
          </div>
          <input
            type="range"
            min="25000"
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
              Existing Obligations (Personal / Car EMIs)
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
              Bank FOIR Norm (%)
            </label>
            <span className="text-sm font-bold text-foundation-primary">{foirCap}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="60"
            step="5"
            value={foirCap}
            onChange={(e) => setFoirCap(Number(e.target.value))}
            className="w-full accent-foundation-primary"
          />
          <div className="flex justify-between text-[10px] text-foundation-muted mt-1">
            <span>40% (Conservative)</span>
            <span>45% (Standard Bank)</span>
            <span>60% (High Income Slabs)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.05"
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
            Bank Sanction Capacity Estimator
          </span>

          <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
            <span className="text-xs text-foundation-muted block">Maximum Estimated Loan Sanction:</span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-foundation-primary">
              {inr(estimatedMaxLoan)}
            </span>
            <span className="text-xs text-foundation-muted block mt-1">
              Permissible Monthly New EMI: {inr(maxNewEmi)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border text-xs text-foundation-muted space-y-2">
            <h5 className="font-bold text-foundation-text">Underwriting Factors Evaluated by Lenders:</h5>
            <div className="space-y-1.5">
              <p>• <b>CIBIL Score:</b> 750+ qualifies for the lowest risk spread; &lt;700 incurs a 0.25–0.50% interest surcharge.</p>
              <p>• <b>Age at Maturity:</b> Maximum borrower age at loan end is typically 65 for salaried and 70 for self-employed.</p>
              <p>• <b>Co-Applicant:</b> Adding an earning spouse or parent increases combined loan eligibility significantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
