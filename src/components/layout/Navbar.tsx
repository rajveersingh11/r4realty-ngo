import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Calculator, 
  BookOpen, 
  Users, 
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenSearch: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  isDark,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Building2 },
    { id: 'analytics', label: 'Market Analytics', icon: TrendingUp, badge: 'Intelligence' },
    { id: 'calculators', label: 'Free Calculators', icon: Calculator },
    { id: 'guides', label: 'Guides & Checklists', icon: BookOpen },
    { id: 'protect', label: 'Scam Watchdog', icon: ShieldCheck, alert: true },
    { id: 'community', label: 'Community & Events', icon: Users },
    { id: 'about', label: 'About Us', icon: HelpCircle }
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-foundation-surface/95 backdrop-blur-md border-b border-foundation-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2.5 text-left focus:outline-none group"
              >
                <div className="w-10 h-10 rounded-xl bg-foundation-primary flex items-center justify-center text-foundation-onPrimary shadow-sm transition-transform group-hover:scale-105">
                  <Building2 className="w-5 h-5 text-foundation-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-serif font-bold text-lg sm:text-xl text-foundation-primary tracking-tight">
                      Ghar Margdarshan
                    </span>
                    <span className="hidden sm:inline-block text-[11px] font-bold px-1.5 py-0.5 rounded bg-foundation-accent/20 text-foundation-text uppercase tracking-wider">
                      R4Realty NGO
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 uppercase tracking-wider border border-amber-500/30">
                      Beta · Dev
                    </span>
                  </div>
                  <p className="text-[11px] text-foundation-muted leading-tight font-medium hidden xs:block">
                    Non-Profit · 100% Free · Independent Real Estate Guidance
                  </p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-foundation-primary text-foundation-onPrimary shadow-sm'
                        : 'text-foundation-text hover:bg-foundation-bg hover:text-foundation-primary'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {item.badge}
                      </span>
                    )}
                    {item.alert && (
                      <span className="ml-1 inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Search, Theme Toggle, Contact CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Global Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search guides and analytics"
                className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm text-foundation-muted bg-foundation-bg border border-foundation-border rounded-lg hover:border-foundation-primary transition-all"
              >
                <Search className="w-4 h-4 text-foundation-primary" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-foundation-muted bg-foundation-surface border border-foundation-border rounded">
                  Ctrl K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={onToggleTheme}
                aria-label="Toggle dark mode"
                className="p-2 text-foundation-muted hover:text-foundation-primary hover:bg-foundation-bg rounded-lg border border-foundation-border transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Direct Help Button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-foundation-primary text-foundation-onPrimary hover:opacity-90 shadow-sm transition-transform active:scale-95"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Ask Free</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open mobile menu"
                className="lg:hidden p-2 text-foundation-text hover:bg-foundation-bg rounded-lg border border-foundation-border"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen / Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-foundation-border bg-foundation-surface px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="mb-3 px-2 py-1.5 bg-foundation-bg rounded-lg text-xs text-foundation-muted flex items-center justify-between">
              <span>R4Realty Non-Profit Initiative</span>
              <span className="font-semibold text-foundation-primary">100% Commission Free</span>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-foundation-primary text-foundation-onPrimary'
                      : 'text-foundation-text hover:bg-foundation-bg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-foundation-accent' : 'text-foundation-primary'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-3 border-t border-foundation-border flex gap-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full py-2.5 px-4 rounded-lg bg-foundation-primary text-foundation-onPrimary text-center font-semibold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact Helpline</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
