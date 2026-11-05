import React, { useState } from 'react';
import { Calculator, ShieldCheck, Scale, Coins, FileSpreadsheet, Landmark } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { EmiCalculator } from './EmiCalculator';
import { AffordabilityCalculator } from './AffordabilityCalculator';
import { StampDutyCalculator } from './StampDutyCalculator';
import { RentVsBuyCalculator } from './RentVsBuyCalculator';
import { RentalYieldCalculator } from './RentalYieldCalculator';
import { LoanEligibilityCalculator } from './LoanEligibilityCalculator';

export const CalculatorHub: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<string>('emi');
  const { t } = useLanguage();

  const calculators = [
    { id: 'emi', label: t('calc.tab.emi', 'EMI & Amortization'), icon: Calculator },
    { id: 'afford', label: t('calc.tab.afford', 'True Affordability'), icon: ShieldCheck },
    { id: 'elig', label: t('calc.tab.elig', 'Bank Eligibility'), icon: Landmark },
    { id: 'stamp', label: t('calc.tab.stamp', 'Stamp Duty & Registration'), icon: FileSpreadsheet },
    { id: 'rvb', label: t('calc.tab.rvb', 'Rent vs. Buy'), icon: Scale },
    { id: 'yield', label: t('calc.tab.yield', 'Rental Yield'), icon: Coins }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-foundation-accent" />
          <span>{t('calc.hub_badge', 'Independent Decision Tools')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          {t('calc.hub_title', 'Commission-Free Real Estate Calculators')}
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted max-w-3xl leading-relaxed">
          {t('calc.hub_desc', 'Standard commercial calculators hide closing costs, stamp duties, and prepayment nuances. Our non-profit tools provide complete mathematical transparency with zero sales pitches.')}
        </p>
      </div>

      {/* Tab Switcher with Mobile Scroll Fade Cues */}
      <div className="relative">
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
        {/* Soft edge fade for mobile indicating more tabs offscreen */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-foundation-bg to-transparent sm:hidden" />
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
