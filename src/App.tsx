import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { HomeView } from './components/home/HomeView';
import { MessageSquare, AlertCircle, X } from 'lucide-react';

// Lazy-loaded route views for optimal bundle splitting and performance
const MarketAnalyticsHub = lazy(() => import('./components/analytics/MarketAnalyticsHub').then(m => ({ default: m.MarketAnalyticsHub })));
const CalculatorHub = lazy(() => import('./components/calculators/CalculatorHub').then(m => ({ default: m.CalculatorHub })));
const GuidesView = lazy(() => import('./components/guides/GuidesView').then(m => ({ default: m.GuidesView })));
const ScamWatchdog = lazy(() => import('./components/protect/ScamWatchdog').then(m => ({ default: m.ScamWatchdog })));
const CommunityView = lazy(() => import('./components/community/CommunityView').then(m => ({ default: m.CommunityView })));
const AboutView = lazy(() => import('./components/about/AboutView').then(m => ({ default: m.AboutView })));
const ContactView = lazy(() => import('./components/contact/ContactView').then(m => ({ default: m.ContactView })));
const LegalView = lazy(() => import('./components/legal/LegalView').then(m => ({ default: m.LegalView })));
const NgoDataDesk = lazy(() => import('./components/admin/NgoDataDesk').then(m => ({ default: m.NgoDataDesk })));

const ROUTE_PATHS: Record<string, string> = {
  home: '/',
  analytics: '/analytics',
  calculators: '/calculators',
  guides: '/guides',
  protect: '/protect',
  community: '/community',
  about: '/about',
  contact: '/contact',
  legal: '/legal'
};

const LEGACY_HASH_MAP: Record<string, string> = {
  home: '/',
  analytics: '/analytics',
  calculators: '/calculators',
  guides: '/guides',
  protect: '/protect',
  community: '/community',
  about: '/about',
  contact: '/contact',
  legal: '/legal'
};

const PAGE_METADATA: Record<string, { title: string; desc: string }> = {
  home: {
    title: 'R4Realty - Ghar Margdarshan Foundation | Independent Real Estate Guidance',
    desc: '100% free, commission-free guidance for Indian homebuyers, families, and new investors.'
  },
  analytics: {
    title: 'Real Estate Deal Analyzer & City Market Trends | Ghar Margdarshan',
    desc: 'Independent property due diligence, fair value benchmark corridors, and micro-market rental yields.'
  },
  calculators: {
    title: 'Commission-Free Real Estate Calculators | EMI, Stamp Duty & Affordability',
    desc: 'Free, transparent financial calculators with zero sales pitches or hidden fees.'
  },
  guides: {
    title: 'First-Time Homebuyer Blueprint & Legal Glossary | Ghar Margdarshan',
    desc: 'Step-by-step checklists, 30-year title diligence, and possession snagging inspection guides.'
  },
  protect: {
    title: 'Real Estate Scam Watchdog & RERA Complaint Directory | Ghar Margdarshan',
    desc: 'Diagnose builder red flags, check state RERA portals, and report fraudulent schemes.'
  },
  community: {
    title: 'Citizen Masterclasses & Pro-Bono Volunteers | Ghar Margdarshan',
    desc: 'Free real estate literacy masterclasses and verified citizen advocacy network.'
  },
  about: {
    title: 'About Our Non-Profit Charter & Ethical Mission | Ghar Margdarshan',
    desc: 'Our charter: 0% commissions, zero broker kickbacks, and 100% DPDP privacy compliance.'
  },
  contact: {
    title: 'Free WhatsApp Helpline & Citizen Consultation | Ghar Margdarshan',
    desc: 'Connect with verified non-profit real estate volunteers for unbiased advisory.'
  },
  legal: {
    title: 'DPDP Privacy Policy, Statutory Disclaimers & Terms | Ghar Margdarshan',
    desc: 'Compliant with the Digital Personal Data Protection Act 2023 and RERA 2016.'
  }
};

function getAppBasePath(): string {
  if (typeof window === 'undefined') return '';
  return window.location.pathname.startsWith('/r4realty-ngo') ? '/r4realty-ngo' : '';
}

function resolveTabFromUrl(pathname = window.location.pathname, hash = window.location.hash) {
  const basePath = getAppBasePath();
  let relativePath = pathname;
  if (basePath && relativePath.startsWith(basePath)) {
    relativePath = relativePath.slice(basePath.length);
  }
  const normalizedPath = relativePath.replace(/^\/+|\/+$/g, '');
  const legacyHash = hash.replace(/^#\/?/, '').trim();

  if (legacyHash && LEGACY_HASH_MAP[legacyHash]) {
    return legacyHash;
  }

  if (!normalizedPath || normalizedPath === 'home') {
    return 'home';
  }

  const tab = Object.entries(ROUTE_PATHS).find(([, routePath]) => routePath === `/${normalizedPath}`)?.[0];
  return tab || 'home';
}

const ViewSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 animate-pulse">
    <div className="h-8 bg-foundation-border/40 rounded-xl w-1/3"></div>
    <div className="h-4 bg-foundation-border/30 rounded-lg w-2/3"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      <div className="h-48 bg-foundation-surface border border-foundation-border/50 rounded-2xl"></div>
      <div className="h-48 bg-foundation-surface border border-foundation-border/50 rounded-2xl"></div>
      <div className="h-48 bg-foundation-surface border border-foundation-border/50 rounded-2xl"></div>
    </div>
  </div>
);

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

  const [currentTab, setCurrentTab] = useState<string>(() => resolveTabFromUrl());

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

  // Dynamically update document title and description for SEO and browser history
  useEffect(() => {
    const meta = PAGE_METADATA[currentTab] || PAGE_METADATA.home;
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.desc);
    }
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute('content', meta.title);
    }
    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) {
      ogDescEl.setAttribute('content', meta.desc);
    }
  }, [currentTab]);

  // Sync navigation state with browser path history
  useEffect(() => {
    const handleLocationChange = () => {
      const nextTab = resolveTabFromUrl();
      setCurrentTab(nextTab);
    };

    const handleHashFallback = () => {
      const legacyHash = window.location.hash.replace(/^#\/?/, '').trim();
      if (legacyHash && LEGACY_HASH_MAP[legacyHash]) {
        const basePath = getAppBasePath();
        const routeSuffix = LEGACY_HASH_MAP[legacyHash];
        const fullPath = routeSuffix === '/' ? (basePath || '/') : `${basePath}${routeSuffix}`;
        window.history.replaceState({}, '', fullPath);
        setCurrentTab(legacyHash);
      }
    };

    handleLocationChange();
    handleHashFallback();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleHashFallback);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleHashFallback);
    };
  }, []);

  const handleSelectTab = (tabId: string) => {
    const nextTab = tabId || 'home';
    const basePath = getAppBasePath();
    const routeSuffix = ROUTE_PATHS[nextTab] || '/';
    const fullPath = routeSuffix === '/' ? (basePath || '/') : `${basePath}${routeSuffix}`;
    setCurrentTab(nextTab);
    if (window.location.pathname !== fullPath) {
      window.history.pushState({}, '', fullPath);
    } else {
      window.history.replaceState({}, '', fullPath);
    }
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
              href="https://wa.me/917014865202?text=Hi%20Ghar%20Margdarshan%2C%20I%20have%20feedback%20on%20the%20beta%20platform."
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
        <Suspense fallback={<ViewSkeleton />}>
          {currentTab === 'analytics' && <MarketAnalyticsHub />}
          {currentTab === 'calculators' && <CalculatorHub />}
          {currentTab === 'guides' && <GuidesView />}
          {currentTab === 'protect' && <ScamWatchdog />}
          {currentTab === 'community' && <CommunityView />}
          {currentTab === 'about' && <AboutView />}
          {currentTab === 'contact' && <ContactView />}
          {currentTab === 'legal' && <LegalView />}
        </Suspense>
      </main>

      {/* Floating Citizen WhatsApp Button (with mobile safe offset) */}
      <a
        id="floating-whatsapp"
        href="https://wa.me/917014865202?text=Hello%20Ghar%20Margdarshan%2C%20I%20have%20a%20property%20question."
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
      {isNgoDeskOpen && (
        <Suspense fallback={null}>
          <NgoDataDesk
            isOpen={isNgoDeskOpen}
            onClose={() => setIsNgoDeskOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};
