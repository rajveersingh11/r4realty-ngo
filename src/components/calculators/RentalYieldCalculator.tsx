import React, { useState } from 'react';
import { Coins, AlertTriangle, ShieldCheck } from 'lucide-react';

export const RentalYieldCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState<number>(6500000); // 65 Lakhs
  const [monthlyRent, setMonthlyRent] = useState<number>(24000); // 24k/mo
  const [annualMaintenanceTax, setAnnualMaintenanceTax] = useState<number>(36000); // 36k/yr
  const [expectedVacancyWeeks, setExpectedVacancyWeeks] = useState<number>(3); // 3 weeks vacant

  const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  const grossAnnualRent = monthlyRent * 12;
  const grossYield = (grossAnnualRent / (purchasePrice || 1)) * 100;

  // Net yield factoring vacancy loss and annual outgoings
  const vacancyLoss = (monthlyRent / 4) * expectedVacancyWeeks;
  const netAnnualIncome = Math.max(0, grossAnnualRent - annualMaintenanceTax - vacancyLoss);
  const netYield = (netAnnualIncome / (purchasePrice || 1)) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs */}
      <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
        <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border">
          Yield Calculation Inputs
        </h4>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Total Property All-In Cost
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(purchasePrice)}</span>
          </div>
          <input
            type="range"
            min="1500000"
            max="30000000"
            step="100000"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="w-full accent-foundation-primary"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Expected Monthly Rent
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(monthlyRent)}/mo</span>
          </div>
          <input
            type="number"
            step="1000"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Annual Outgoings (Property Tax, Society, Repair)
            </label>
            <span className="text-sm font-bold text-foundation-primary">{inr(annualMaintenanceTax)}/yr</span>
          </div>
          <input
            type="number"
            step="2000"
            value={annualMaintenanceTax}
            onChange={(e) => setAnnualMaintenanceTax(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
              Expected Vacancy Buffer (Weeks per year)
            </label>
            <span className="text-sm font-bold text-foundation-primary">{expectedVacancyWeeks} Weeks</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={expectedVacancyWeeks}
            onChange={(e) => setExpectedVacancyWeeks(Number(e.target.value))}
            className="w-full accent-foundation-primary"
          />
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
            Investment Yield Analysis
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border">
              <span className="text-xs text-foundation-muted block">Gross Rental Yield</span>
              <span className="font-serif text-3xl font-bold text-foundation-text mt-1 block">
                {grossYield.toFixed(2)}%
              </span>
              <span className="text-[11px] text-foundation-muted block mt-1">
                Annual Gross: {inr(grossAnnualRent)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-foundation-primary/5 border border-foundation-primary/20">
              <span className="text-xs text-foundation-muted block">True Net Rental Yield</span>
              <span className="font-serif text-3xl font-bold text-foundation-primary mt-1 block">
                {netYield.toFixed(2)}%
              </span>
              <span className="text-[11px] text-foundation-muted block mt-1">
                Net in hand: {inr(netAnnualIncome)}/yr
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">Residential Yield Benchmark Notice</span>
              <p className="mt-0.5 leading-relaxed">
                In India, average residential rental yields hover between <b>2.5% to 4.2%</b>. If any broker or builder advertises 8% to 14% residential rental yields, it is almost certainly a marketing gimmick or high-risk assured-return trap!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
