import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Building, 
  TrendingUp, 
  Coins, 
  AlertCircle, 
  ArrowUpRight, 
  MapPin, 
  Scale,
  Sparkles
} from 'lucide-react';
import { CITIES_DATA } from '../../data/marketAnalytics';

export const CityTrendsView: React.FC = () => {
  const [selectedCityId, setSelectedCityId] = useState('bengaluru');

  const city = CITIES_DATA.find((c) => c.id === selectedCityId) || CITIES_DATA[0];

  return (
    <div className="space-y-8">
      {/* City Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CITIES_DATA.map((c) => {
          const isSelected = c.id === selectedCityId;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCityId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-foundation-primary text-foundation-onPrimary shadow-sm scale-102'
                  : 'bg-foundation-surface border border-foundation-border text-foundation-text hover:bg-foundation-bg'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* City Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-foundation-surface p-4 sm:p-5 rounded-2xl border border-foundation-border">
          <div className="flex items-center justify-between text-foundation-muted mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Price / Sq.Ft</span>
            <Building className="w-4 h-4 text-foundation-primary" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-foundation-text">
            ₹{city.avgPriceSqFt.toLocaleString('en-IN')}
          </p>
          <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +{city.fiveYearCagr}% 5-Yr CAGR
          </span>
        </div>

        <div className="bg-foundation-surface p-4 sm:p-5 rounded-2xl border border-foundation-border">
          <div className="flex items-center justify-between text-foundation-muted mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Avg Rental Yield</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-foundation-text">
            {city.avgRentalYield}%
          </p>
          <span className="text-[11px] text-foundation-muted block mt-1">
            Commercial: ~{city.commercialYield}%
          </span>
        </div>

        <div className="bg-foundation-surface p-4 sm:p-5 rounded-2xl border border-foundation-border">
          <div className="flex items-center justify-between text-foundation-muted mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Market Climate</span>
            <Scale className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-base sm:text-lg font-bold text-foundation-text">
            {city.marketSentiment}
          </p>
          <span className="text-[11px] text-foundation-muted block mt-1">
            Overhang: {city.inventoryMonths} mos
          </span>
        </div>

        <div className="bg-foundation-surface p-4 sm:p-5 rounded-2xl border border-foundation-border">
          <div className="flex items-center justify-between text-foundation-muted mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Price / Rent Ratio</span>
            <TrendingUp className="w-4 h-4 text-foundation-primary" />
          </div>
          <p className="text-xl sm:text-2xl font-bold font-serif text-foundation-text">
            {city.priceToRentRatio}x
          </p>
          <span className="text-[11px] text-foundation-muted block mt-1">
            {city.priceToRentRatio > 30 ? 'Favors Renting' : 'Balanced Buying'}
          </span>
        </div>
      </div>

      {/* Price Growth Chart & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-8 bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h4 className="font-bold font-serif text-lg text-foundation-text">
                5-Year Capital Appreciation Trend
              </h4>
              <p className="text-xs text-foundation-muted">
                Historical average price per sq.ft in {city.name} (2021 – 2026)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-foundation-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-foundation-primary inline-block" /> Price (₹/sqft)
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={city.historicalTrend} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip 
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}/sq.ft`, 'Avg Price']}
                  contentStyle={{ backgroundColor: '#18221F', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--color-accent)' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Insights & Circle Rate Notice */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-foundation-primary font-bold text-sm">
              <Sparkles className="w-4 h-4 text-foundation-accent" />
              <span>Ground Reality & Insights</span>
            </div>
            <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
              {city.keyInsights}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Circle Rate & Valuation Gap</span>
            </div>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              {city.circleRateVariance}. Always ensure that cash demands are rejected. Under-reporting registration values leads to legal vulnerability under Section 56(2)(x) of the Income Tax Act.
            </p>
          </div>
        </div>
      </div>

      {/* Micro-Markets Breakdown Table */}
      <div className="bg-foundation-surface p-5 sm:p-6 rounded-2xl border border-foundation-border shadow-sm">
        <h4 className="font-bold font-serif text-lg text-foundation-text mb-4">
          Key Micro-Markets in {city.name}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-foundation-border text-foundation-muted">
                <th className="pb-3 font-semibold">Micro-Market</th>
                <th className="pb-3 font-semibold">Avg Rate / Sq.Ft</th>
                <th className="pb-3 font-semibold">Typical Budget Band</th>
                <th className="pb-3 font-semibold">Rental Yield</th>
                <th className="pb-3 font-semibold">Primary Catalyst</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foundation-border/60">
              {city.microMarkets.map((m, idx) => (
                <tr key={idx} className="hover:bg-foundation-bg/50 transition-colors">
                  <td className="py-3.5 font-bold text-foundation-text">{m.name}</td>
                  <td className="py-3.5 text-foundation-primary font-semibold">
                    ₹{m.avgPriceSqFt.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 text-foundation-muted">{m.priceRange}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                      {m.rentalYield}%
                    </span>
                  </td>
                  <td className="py-3.5 text-foundation-muted">{m.topAdvantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
