import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  HeartHandshake, 
  Landmark, 
  Sparkles,
  BarChart3
} from 'lucide-react';
import { PropertyDealAnalyzer } from './PropertyDealAnalyzer';
import { CityTrendsView } from './CityTrendsView';
import { PmayEstimator } from './PmayEstimator';
import { PolicyPulseView } from './PolicyPulseView';

export const MarketAnalyticsHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'deal' | 'cities' | 'pmay' | 'policy'>('deal');

  const subTabs = [
    { id: 'deal', label: 'Property Deal Analyzer', icon: ShieldCheck, badge: 'Flagship' },
    { id: 'cities', label: 'City Indices & Trends', icon: TrendingUp },
    { id: 'pmay', label: 'Affordable Housing & PMAY', icon: HeartHandshake },
    { id: 'policy', label: 'Bank Rates & Policy Pulse', icon: Landmark }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Section */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-foundation-accent" />
          <span>Real Estate Internet Market Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          Unbiased Real Estate Data & Deal Analytics
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted max-w-3xl leading-relaxed">
          Commercial portals prioritize advertisers and builder listings. As a non-profit foundation, our mission is to analyze public internet registry records, state RERA filings, and economic indicators to protect buyers from inflated valuations, deceptive yields, and structural traps.
        </p>
      </div>

      {/* Sub-Navigation Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-foundation-border">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-foundation-primary text-foundation-onPrimary shadow-sm'
                  : 'text-foundation-text hover:bg-foundation-bg hover:text-foundation-primary'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-foundation-accent text-slate-900 ml-1">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-Tab Content Rendering */}
      <div>
        {activeSubTab === 'deal' && <PropertyDealAnalyzer />}
        {activeSubTab === 'cities' && <CityTrendsView />}
        {activeSubTab === 'pmay' && <PmayEstimator />}
        {activeSubTab === 'policy' && <PolicyPulseView />}
      </div>
    </div>
  );
};
