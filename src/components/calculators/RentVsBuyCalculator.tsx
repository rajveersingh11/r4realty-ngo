import React, { useState, useMemo } from 'react';
import { Scale, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export const RentVsBuyCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number>(7500000); // 75 Lakhs
  const [monthlyRent, setMonthlyRent] = useState<number>(25000); // 25k/mo
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [loanInterest, setLoanInterest] = useState<number>(8.75);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(5.5); // 5.5% CAGR
  const [rentInflation, setRentInflation] = useState<number>(5.0); // 5.0%

  const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  const simulation = useMemo(() => {
    const downPayment = (homePrice * downPaymentPercent) / 100;
    const loanAmount = homePrice - downPayment;
    const n = tenureYears * 12;
    const r = loanInterest / 1200;

    const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;

    // Buying Side:
    // Future value of property after tenureYears
    const futurePropertyValue = homePrice * Math.pow(1 + propertyAppreciation / 100, tenureYears);
    const totalLoanPayments = emi * n;
    // Net wealth from buying = Future Property Value - (Total Payments + Down Payment)
    const netWealthBuying = futurePropertyValue - (totalLoanPayments + downPayment);

    // Renting Side:
    // Cumulative rent paid with 5% annual escalation
    let totalRentPaid = 0;
    let currentRent = monthlyRent;
    for (let y = 0; y < tenureYears; y++) {
      totalRentPaid += currentRent * 12;
      currentRent *= (1 + rentInflation / 100);
    }

    // Opportunity Cost: If downpayment + monthly difference (EMI - Rent) had been invested at conservative 9% equity mutual fund
    const equityReturnRate = 0.09;
    let rentInvestmentPortfolio = downPayment * Math.pow(1 + equityReturnRate, tenureYears);
    
    // Add monthly surplus invested
    let runningRent = monthlyRent;
    for (let m = 0; m < n; m++) {
      if (m > 0 && m % 12 === 0) runningRent *= (1 + rentInflation / 100);
      const monthlySurplus = emi - runningRent;
      if (monthlySurplus > 0) {
        const remainingMonths = n - m;
        rentInvestmentPortfolio += monthlySurplus * Math.pow(1 + equityReturnRate / 12, remainingMonths);
      }
    }

    const netWealthRenting = rentInvestmentPortfolio - totalRentPaid;

    const verdict = futurePropertyValue > rentInvestmentPortfolio ? 'Buying' : 'Renting';

    return {
      emi: Math.round(emi),
      futurePropertyValue: Math.round(futurePropertyValue),
      totalLoanPayments: Math.round(totalLoanPayments),
      totalRentPaid: Math.round(totalRentPaid),
      netWealthBuying: Math.round(netWealthBuying),
      rentInvestmentPortfolio: Math.round(rentInvestmentPortfolio),
      netWealthRenting: Math.round(netWealthRenting),
      verdict
    };
  }, [homePrice, monthlyRent, downPaymentPercent, loanInterest, tenureYears, propertyAppreciation, rentInflation]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
          <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border flex items-center justify-between">
            <span>Simulation Parameters</span>
            <Scale className="w-4 h-4 text-foundation-primary" />
          </h4>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Target Property Price
              </label>
              <span className="text-sm font-bold text-foundation-primary">{inr(homePrice)}</span>
            </div>
            <input
              type="range"
              min="2000000"
              max="25000000"
              step="250000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Current Monthly Rent for Similar House
              </label>
              <span className="text-sm font-bold text-foundation-primary">{inr(monthlyRent)}/mo</span>
            </div>
            <input
              type="range"
              min="8000"
              max="100000"
              step="1000"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1">
                Down Payment (%)
              </label>
              <input
                type="number"
                min="10"
                max="50"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1">
                Loan Interest (% p.a.)
              </label>
              <input
                type="number"
                step="0.05"
                value={loanInterest}
                onChange={(e) => setLoanInterest(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider block mb-1">
                Home Price Growth (% p.a.)
              </label>
              <input
                type="number"
                step="0.5"
                value={propertyAppreciation}
                onChange={(e) => setPropertyAppreciation(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-bg text-foundation-text"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Annual Rent Escalation (%)
              </label>
              <span className="text-xs font-bold text-foundation-primary">{rentInflation}%</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              step="0.5"
              value={rentInflation}
              onChange={(e) => setRentInflation(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-foundation-surface p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foundation-muted">
                {tenureYears}-Year Wealth Comparison Verdict
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-foundation-primary text-foundation-onPrimary">
                Financial Verdict: Favors {simulation.verdict}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Buy */}
              <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border space-y-2">
                <span className="text-xs font-bold text-foundation-primary uppercase block">Option A: Buy Property</span>
                <div>
                  <span className="text-[11px] text-foundation-muted block">Future Property Value ({tenureYears} yrs):</span>
                  <span className="text-xl font-bold font-serif text-foundation-text">
                    {inr(simulation.futurePropertyValue)}
                  </span>
                </div>
                <div className="text-xs text-foundation-muted space-y-1 pt-1 border-t border-foundation-border">
                  <p>• Monthly EMI: <b>{inr(simulation.emi)}</b></p>
                  <p>• Total Repaid to Bank: {inr(simulation.totalLoanPayments)}</p>
                </div>
              </div>

              {/* Option B: Rent */}
              <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border space-y-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase block">Option B: Rent & Invest</span>
                <div>
                  <span className="text-[11px] text-foundation-muted block">Investment Portfolio ({tenureYears} yrs at 9%):</span>
                  <span className="text-xl font-bold font-serif text-foundation-text">
                    {inr(simulation.rentInvestmentPortfolio)}
                  </span>
                </div>
                <div className="text-xs text-foundation-muted space-y-1 pt-1 border-t border-foundation-border">
                  <p>• Initial Monthly Rent: <b>{inr(monthlyRent)}</b></p>
                  <p>• Total Rent Paid ({tenureYears} yrs): {inr(simulation.totalRentPaid)}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              <p className="font-bold text-sm mb-1">Non-Profit Perspective: Beyond the Spreadsheets</p>
              <p>
                A home is both a financial asset and emotional security for your family. If you plan to stay in the city for over 8-10 years, buying provides stability against sudden landlord eviction, rental hikes, and social roots. However, if your job requires mobility every 3 years, renting and investing the surplus in index funds preserves flexibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
