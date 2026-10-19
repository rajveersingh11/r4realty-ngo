import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { Calculator, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years
  const [extraPrepaymentMonthly, setExtraPrepaymentMonthly] = useState<number>(0);

  // Core EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculation = useMemo(() => {
    const P = Number(loanAmount) || 0;
    const annualR = Number(interestRate) || 0;
    const r = annualR / 1200; // monthly rate
    const n = (Number(tenureYears) || 1) * 12; // total months

    let emi = 0;
    if (r > 0 && n > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0) {
      emi = P / n;
    }

    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - P);

    // Amortization Schedule (Year by Year)
    const yearlySchedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let balance = P;

    for (let y = 1; y <= tenureYears; y++) {
      let yearPrincipal = 0;
      let yearInterest = 0;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const interestMonth = balance * r;
        const principalMonth = Math.min(balance, emi - interestMonth);
        yearInterest += interestMonth;
        yearPrincipal += principalMonth;
        balance -= principalMonth;
      }

      yearlySchedule.push({
        year: y,
        principalPaid: Math.round(yearPrincipal),
        interestPaid: Math.round(yearInterest),
        balance: Math.max(0, Math.round(balance))
      });

      if (balance <= 0) break;
    }

    // Prepayment simulation: extra monthly
    let prepayMonths = 0;
    let prepayInterest = 0;
    if (extraPrepaymentMonthly > 0) {
      let b = P;
      const effectiveEmi = emi + extraPrepaymentMonthly;
      while (b > 0 && prepayMonths < n) {
        prepayMonths++;
        const intM = b * r;
        prepayInterest += intM;
        const princM = Math.min(b, effectiveEmi - intM);
        b -= princM;
      }
    }

    const monthsSaved = extraPrepaymentMonthly > 0 ? Math.max(0, n - prepayMonths) : 0;
    const interestSaved = extraPrepaymentMonthly > 0 ? Math.max(0, totalInterest - prepayInterest) : 0;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      yearlySchedule,
      monthsSaved,
      interestSaved: Math.round(interestSaved)
    };
  }, [loanAmount, interestRate, tenureYears, extraPrepaymentMonthly]);

  const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-5">
          <h4 className="font-bold text-foundation-text text-base pb-3 border-b border-foundation-border flex items-center justify-between">
            <span>Loan Variables</span>
            <Calculator className="w-4 h-4 text-foundation-primary" />
          </h4>

          {/* Loan Amount Slider & Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Home Loan Amount
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                {inr(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="30000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
            <div className="flex justify-between text-[10px] text-foundation-muted mt-1">
              <span>₹5 Lakhs</span>
              <span>₹1 Crore</span>
              <span>₹3 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Interest Rate (% p.a.)
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="6.5"
              max="14.0"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
            <div className="flex justify-between text-[10px] text-foundation-muted mt-1">
              <span>6.5% (Subsidized)</span>
              <span>8.75% (Current avg)</span>
              <span>14%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-foundation-text uppercase tracking-wider">
                Loan Tenure
              </label>
              <span className="text-sm font-bold text-foundation-primary">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-foundation-primary"
            />
          </div>

          {/* Prepayment Experimentation */}
          <div className="p-4 rounded-xl bg-foundation-bg border border-foundation-border space-y-2">
            <div className="flex items-center gap-2 text-foundation-primary font-bold text-xs uppercase tracking-wider">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              <span>Smart Prepayment Simulator</span>
            </div>
            <label className="text-xs text-foundation-muted block">
              Extra voluntary monthly payment:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="1000"
                value={extraPrepaymentMonthly}
                onChange={(e) => setExtraPrepaymentMonthly(Math.max(0, Number(e.target.value)))}
                placeholder="e.g. 5000"
                className="w-full px-3 py-2 text-sm rounded-lg border border-foundation-border bg-foundation-surface text-foundation-text"
              />
              <button
                type="button"
                onClick={() => setExtraPrepaymentMonthly(5000)}
                className="px-2.5 py-1.5 text-xs font-semibold rounded bg-foundation-primary/10 text-foundation-primary hover:bg-foundation-primary/20 shrink-0"
              >
                +₹5k
              </button>
            </div>
            {extraPrepaymentMonthly > 0 && calculation.monthsSaved > 0 && (
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                <p className="font-bold">Prepayment Magic:</p>
                <p>• Closes loan <b>{(calculation.monthsSaved / 12).toFixed(1)} years earlier</b>!</p>
                <p>• Saves <b>{inr(calculation.interestSaved)}</b> in total interest!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-foundation-surface p-5 rounded-2xl border border-foundation-border shadow-sm">
              <span className="text-xs text-foundation-muted font-medium block">Monthly EMI</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-foundation-primary mt-1">
                {inr(calculation.emi)}
              </p>
              <span className="text-[11px] text-foundation-muted block mt-1">Per calendar month</span>
            </div>

            <div className="bg-foundation-surface p-5 rounded-2xl border border-foundation-border shadow-sm">
              <span className="text-xs text-foundation-muted font-medium block">Total Interest</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1">
                {inr(calculation.totalInterest)}
              </p>
              <span className="text-[11px] text-foundation-muted block mt-1">
                {((calculation.totalInterest / loanAmount) * 100).toFixed(0)}% of principal!
              </span>
            </div>

            <div className="bg-foundation-surface p-5 rounded-2xl border border-foundation-border shadow-sm">
              <span className="text-xs text-foundation-muted font-medium block">Total Repayment</span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-foundation-text mt-1">
                {inr(calculation.totalPayment)}
              </p>
              <span className="text-[11px] text-foundation-muted block mt-1">Principal + Interest</span>
            </div>
          </div>

          {/* Yearly Amortization Chart */}
          <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold font-serif text-base text-foundation-text">
                  Year-by-Year Amortization Breakdown
                </h4>
                <p className="text-xs text-foundation-muted">
                  Notice how interest dominates early years while principal repayment accelerates later
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={calculation.yearlySchedule} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip 
                    formatter={(val: any, name: any) => [inr(Number(val)), name === 'principalPaid' ? 'Principal Repaid' : 'Interest Paid']}
                    contentStyle={{ backgroundColor: '#18221F', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="interestPaid" name="Interest Paid" fill="#F2C14E" stackId="a" />
                  <Bar dataKey="principalPaid" name="Principal Repaid" fill="#0F4C4A" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
