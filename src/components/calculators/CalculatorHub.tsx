import React, { useState } from 'react';
import { Calculator, ShieldCheck, Scale, Coins, FileSpreadsheet, Landmark } from 'lucide-react';
import { EmiCalculator } from './EmiCalculator';
import { AffordabilityCalculator } from './AffordabilityCalculator';
import { StampDutyCalculator } from './StampDutyCalculator';
import { RentVsBuyCalculator } from './RentVsBuyCalculator';
import { RentalYieldCalculator } from './RentalYieldCalculator';
import { LoanEligibilityCalculator } from './LoanEligibilityCalculator';

export const CalculatorHub: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<string>('emi');

  const calculators = [
    { id: 'emi', label: 'EMI & Amortization', icon: Calculator },
    { id: 'afford', label: 'True Affordability', icon: ShieldCheck },
    { id: 'elig', label: 'Bank Eligibility', icon: Landmark },
    { id: 'stamp', label: 'Stamp Duty & Registration', icon: FileSpreadsheet },
    { id: 'rvb', label: 'Rent vs. Buy', icon: Scale },
    { id: 'yield', label: 'Rental Yield', icon: Coins }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-foundation-accent" />
          <span>Independent Decision Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          Commission-Free Real Estate Calculators
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted max-w-3xl leading-relaxed">
          Standard commercial calculators hide closing costs, stamp duties, and prepayment nuances. 
          Our non-profit tools provide complete mathematical transparency with zero sales pitches.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-foundation-border">
        {calculators.map((c) => {
          const Icon = c.icon;
          const isActive = activeCalc === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCalc(c.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-foundation-primary text-foundation-onPrimary shadow-sm'
                  : 'text-foundation-text hover:bg-foundation-bg hover:text-foundation-primary'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Calculator Body */}
      <div>
        {activeCalc === 'emi' && <EmiCalculator />}
        {activeCalc === 'afford' && <AffordabilityCalculator />}
        {activeCalc === 'elig' && <LoanEligibilityCalculator />}
        {activeCalc === 'stamp' && <StampDutyCalculator />}
        {activeCalc === 'rvb' && <RentVsBuyCalculator />}
        {activeCalc === 'yield' && <RentalYieldCalculator />}
      </div>
    </div>
  );
};
