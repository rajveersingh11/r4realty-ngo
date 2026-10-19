import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { HomeView } from './components/home/HomeView';
import { MarketAnalyticsHub } from './components/analytics/MarketAnalyticsHub';
import { CalculatorHub } from './components/calculators/CalculatorHub';
import { GuidesView } from './components/guides/GuidesView';
import { ScamWatchdog } from './components/protect/ScamWatchdog';
import { CommunityView } from './components/community/CommunityView';
import { AboutView } from './components/about/AboutView';
import { ContactView } from './components/contact/ContactView';
import { LegalView } from './components/legal/LegalView';
import { NgoDataDesk } from './components/admin/NgoDataDesk';
import { MessageSquare, AlertCircle, X } from 'lucide-react';

export const App: React.FC = () => {
  const [isNgoDeskOpen, setIsNgoDeskOpen] = useState(false);
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('r4_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Active tab state with hash sync
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('r4_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('r4_theme', 'light');
    }
  }, [isDark]);

  // Sync hash on popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentTab(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when tab changes
  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    window.location.hash = tabId;
  };

  // Keyboard shortcut for Ctrl+K (Search) and Ctrl+Shift+D (NGO Data Desk)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsNgoDeskOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-foundation-bg text-foundation-text transition-colors duration-200">
      {/* Top Under Development / Public Beta Banner */}
      {showTopBanner && (
        <div className="bg-amber-600 text-white px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md border-b border-amber-700/60 z-50">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/25 text-amber-100 font-bold text-[11px] uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Under Active Development</span>
            </span>
            <span>
              <b>Public Beta Preview:</b> This platform is currently being built and refined for official launch. Features, algorithms & state data are updated daily.
            </span>
            <a 
              href="https://wa.me/919876543210?text=Hi%20Ghar%20Margdarshan%2C%20I%20have%20feedback%20on%20the%20beta%20platform."
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold hover:text-amber-100 text-[11px] sm:text-xs ml-1"
            >
              Share Feedback →
            </a>
          </div>
          <button 
            onClick={() => setShowTopBanner(false)}
            className="p-1 hover:bg-amber-700 rounded transition-colors ml-2 shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && <HomeView onSelectTab={handleSelectTab} onOpenSearch={() => setIsSearchOpen(true)} />}
        {currentTab === 'analytics' && <MarketAnalyticsHub />}
        {currentTab === 'calculators' && <CalculatorHub />}
        {currentTab === 'guides' && <GuidesView />}
        {currentTab === 'protect' && <ScamWatchdog />}
        {currentTab === 'community' && <CommunityView />}
        {currentTab === 'about' && <AboutView />}
        {currentTab === 'contact' && <ContactView />}
        {currentTab === 'legal' && <LegalView />}
      </main>

      {/* Floating Citizen WhatsApp Button (with mobile safe offset) */}
      <a
        id="floating-whatsapp"
        href="https://wa.me/919876543210?text=Hello%20Ghar%20Margdarshan%2C%20I%20have%20a%20property%20question."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Free WhatsApp Property Advisory"
        className="fixed right-4 bottom-20 md:bottom-6 z-30 p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs sm:text-sm transition-transform hover:scale-105 active:scale-95 group"
      >
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden sm:inline pr-1">Free WhatsApp Advice</span>
      </a>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSelectTab}
      />

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenNgoDesk={() => setIsNgoDeskOpen(true)}
      />

      {/* NGO SQLite Data Desk Modal */}
      <NgoDataDesk
        isOpen={isNgoDeskOpen}
        onClose={() => setIsNgoDeskOpen(false)}
      />
    </div>
  );
};
