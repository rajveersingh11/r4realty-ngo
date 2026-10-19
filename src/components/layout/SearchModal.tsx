import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, BookOpen, Calculator, ShieldCheck, TrendingUp, HelpCircle } from 'lucide-react';
import { CITIES_DATA } from '../../data/marketAnalytics';
import { COMPREHENSIVE_GUIDES, FREQUENT_QUESTIONS, REAL_ESTATE_GLOSSARY, RED_FLAG_SCAM_TYPES } from '../../data/educationalContent';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  description: string;
  tab: string;
  category: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Index all content
  const searchableIndex = useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [];

    // Cities
    CITIES_DATA.forEach(city => {
      items.push({
        id: `city-${city.id}`,
        title: `${city.name} Real Estate Trends`,
        description: `Avg ₹${city.avgPriceSqFt.toLocaleString('en-IN')}/sq.ft · Yield ${city.avgRentalYield}% · ${city.keyInsights.slice(0, 100)}...`,
        tab: 'analytics',
        category: 'Market Trends'
      });
      city.microMarkets.forEach(m => {
        items.push({
          id: `micro-${m.name}`,
          title: `${m.name} (${city.name})`,
          description: `Price: ${m.priceRange} · Yield: ${m.rentalYield}% · ${m.topAdvantage}`,
          tab: 'analytics',
          category: 'Micro-Market'
        });
      });
    });

    // Guides
    COMPREHENSIVE_GUIDES.forEach(g => {
      items.push({
        id: `guide-${g.id}`,
        title: g.title,
        description: g.summary,
        tab: 'guides',
        category: 'Guide'
      });
    });

    // FAQs
    FREQUENT_QUESTIONS.forEach((faq, idx) => {
      items.push({
        id: `faq-${idx}`,
        title: faq.q,
        description: faq.a.slice(0, 140) + '...',
        tab: 'guides',
        category: 'FAQ'
      });
    });

    // Glossary
    REAL_ESTATE_GLOSSARY.forEach(term => {
      items.push({
        id: `term-${term.term}`,
        title: `${term.term} ${term.vernacularSynonym ? `(${term.vernacularSynonym})` : ''}`,
        description: term.definition.slice(0, 130) + '...',
        tab: 'guides',
        category: 'Glossary'
      });
    });

    // Scams
    RED_FLAG_SCAM_TYPES.forEach(scam => {
      items.push({
        id: `scam-${scam.title}`,
        title: `Scam Alert: ${scam.title}`,
        description: scam.description,
        tab: 'protect',
        category: 'Scam Protection'
      });
    });

    // Calculators
    const calculators = [
      { id: 'c-emi', title: 'EMI & Amortization Calculator', desc: 'Calculate monthly home loan EMIs and interest amortization.', tab: 'calculators' },
      { id: 'c-afford', title: 'True Affordability Estimator', desc: 'Calculate how much home you can truly afford with cash reserves.', tab: 'calculators' },
      { id: 'c-stamp', title: 'State Stamp Duty & Registration Estimator', desc: 'Estimate state registration fees and female concession discounts.', tab: 'calculators' },
      { id: 'c-rvb', title: 'Rent vs Buy Detailed Simulator', desc: 'Compare long term wealth generation of buying vs renting.', tab: 'calculators' },
      { id: 'c-deal', title: 'Property Deal & Risk Scorer', desc: 'Analyze fair price corridor and scam risks on any property.', tab: 'analytics' }
    ];
    calculators.forEach(c => {
      items.push({
        id: c.id,
        title: c.title,
        description: c.desc,
        tab: c.tab,
        category: 'Calculator'
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchableIndex.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, searchableIndex]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Market Trends':
      case 'Micro-Market':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'Calculator':
        return <Calculator className="w-4 h-4 text-amber-500" />;
      case 'Scam Protection':
        return <ShieldCheck className="w-4 h-4 text-rose-500" />;
      case 'Guide':
      case 'Glossary':
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-foundation-muted" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-foundation-surface border border-foundation-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-foundation-border gap-3">
          <Search className="w-5 h-5 text-foundation-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, RERA rules, city trends, glossary, calculators..."
            className="w-full bg-transparent border-none text-foundation-text placeholder-foundation-muted text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-foundation-muted hover:text-foundation-text rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs px-2 py-1 text-foundation-muted bg-foundation-bg border border-foundation-border rounded hover:bg-foundation-border/40"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto divide-y divide-foundation-border/40 flex-1">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-foundation-muted">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Type any term, city, or question</p>
              <p className="text-xs mt-1">Try "RERA", "Mumbai", "Carpet Area", "EMI", or "Stamp Duty"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center text-foundation-muted">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-1">You can ask our non-profit experts directly via WhatsApp helpline.</p>
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.tab);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-foundation-bg transition-colors flex items-start gap-3 group"
              >
                <div className="p-2 rounded-lg bg-foundation-bg border border-foundation-border group-hover:border-foundation-primary shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-foundation-text truncate group-hover:text-foundation-primary">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-foundation-border/50 text-foundation-muted shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-foundation-muted line-clamp-2 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-foundation-bg border-t border-foundation-border text-[11px] text-foundation-muted flex items-center justify-between">
          <span>R4Realty Ghar Margdarshan Knowledge Base</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
