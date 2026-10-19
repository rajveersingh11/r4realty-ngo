import React from 'react';
import { Building2, TrendingUp, Calculator, ShieldCheck, BookOpen } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const items = [
    { id: 'home', label: 'Home', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'protect', label: 'Watchdog', icon: ShieldCheck },
    { id: 'guides', label: 'Guides', icon: BookOpen },
  ];

  return (
    <div 
      id="bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-foundation-surface/95 backdrop-blur-lg border-t border-foundation-border px-2 py-1 flex items-center justify-around pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))] shadow-lg"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              onSelectTab(item.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all ${
              isActive 
                ? 'text-foundation-primary font-bold scale-105' 
                : 'text-foundation-muted hover:text-foundation-text'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-foundation-primary/10' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
