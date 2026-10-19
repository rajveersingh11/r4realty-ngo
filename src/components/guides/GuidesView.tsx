import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckSquare, 
  HelpCircle, 
  FileText, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Search,
  CheckCircle2,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { 
  COMPREHENSIVE_GUIDES, 
  INTERACTIVE_CHECKLISTS, 
  FREQUENT_QUESTIONS, 
  REAL_ESTATE_GLOSSARY 
} from '../../data/educationalContent';

export const GuidesView: React.FC = () => {
  const [subTab, setSubTab] = useState<'checklists' | 'guides' | 'glossary' | 'faqs'>('checklists');

  // Checklists State in LocalStorage
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem('r4_checklists_state');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeChecklistId, setActiveChecklistId] = useState('pre-booking');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('r4_checklists_state', JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }, [checkedItems]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const resetCurrentChecklist = (catId: string) => {
    const cat = INTERACTIVE_CHECKLISTS.find(c => c.id === catId);
    if (!cat) return;
    const next = { ...checkedItems };
    cat.items.forEach(item => {
      delete next[item.id];
    });
    setCheckedItems(next);
  };

  const currentChecklist = INTERACTIVE_CHECKLISTS.find(c => c.id === activeChecklistId) || INTERACTIVE_CHECKLISTS[0];
  const completedCount = currentChecklist.items.filter(item => checkedItems[item.id]).length;
  const progressPercent = Math.round((completedCount / currentChecklist.items.length) * 100);

  const filteredGlossary = REAL_ESTATE_GLOSSARY.filter(t => 
    t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    t.definition.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    (t.vernacularSynonym && t.vernacularSynonym.toLowerCase().includes(glossarySearch.toLowerCase()))
  );

  const filteredFaqs = faqCategory === 'All' 
    ? FREQUENT_QUESTIONS 
    : FREQUENT_QUESTIONS.filter(f => f.category === faqCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foundation-primary/10 text-foundation-primary text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-foundation-accent" />
          <span>Knowledge & Verification Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-foundation-text tracking-tight">
          Buyer Guides, Checklists & Legal Glossary
        </h1>
        <p className="text-sm sm:text-base text-foundation-muted max-w-3xl leading-relaxed">
          Arm yourself with practical, step-by-step checklists and clear legal definitions. 
          All checklist progress is securely saved on your personal device so you can inspect properties on-site.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-foundation-border">
        {[
          { id: 'checklists', label: 'Interactive Checklists', icon: CheckSquare, badge: 'On-Site Tool' },
          { id: 'guides', label: 'In-Depth Guides', icon: BookOpen },
          { id: 'glossary', label: 'Real Estate Glossary', icon: FileText },
          { id: 'faqs', label: 'Frequently Asked Questions', icon: HelpCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
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

      {/* Checklists View */}
      {subTab === 'checklists' && (
        <div className="space-y-6">
          {/* Checklist Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {INTERACTIVE_CHECKLISTS.map((cat) => {
              const isSelected = activeChecklistId === cat.id;
              const catCompleted = cat.items.filter(i => checkedItems[i.id]).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveChecklistId(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-foundation-primary text-foundation-onPrimary'
                      : 'bg-foundation-surface border border-foundation-border text-foundation-text hover:bg-foundation-bg'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-foundation-accent text-slate-900' : 'bg-foundation-border/60 text-foundation-muted'
                  }`}>
                    {catCompleted}/{cat.items.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Checklist Card */}
          <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-foundation-border">
              <div>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
                  {currentChecklist.name}
                </h3>
                <p className="text-xs sm:text-sm text-foundation-muted mt-0.5">
                  {currentChecklist.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => resetCurrentChecklist(currentChecklist.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-foundation-border hover:bg-foundation-bg text-foundation-muted transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-foundation-primary text-foundation-onPrimary hover:opacity-90 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {/* Progress Meter */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-foundation-muted">Verification Progress</span>
                <span className="text-foundation-primary">{progressPercent}% Completed ({completedCount}/{currentChecklist.items.length})</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-foundation-bg overflow-hidden border border-foundation-border/60">
                <div 
                  className="h-full bg-foundation-primary transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {currentChecklist.items.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked 
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' 
                        : 'bg-foundation-bg border-foundation-border hover:border-foundation-primary/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent onClick
                      className="w-5 h-5 rounded text-foundation-primary focus:ring-foundation-primary shrink-0 mt-0.5 cursor-pointer accent-foundation-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs sm:text-sm font-bold ${isChecked ? 'line-through text-foundation-muted' : 'text-foundation-text'}`}>
                          {item.title}
                        </span>
                        {item.mandatory && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 shrink-0">
                            Mandatory
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foundation-muted mt-1 leading-relaxed">
                        Tip: {item.tip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* In-Depth Guides View */}
      {subTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMPREHENSIVE_GUIDES.map((guide) => (
            <div key={guide.id} className="bg-foundation-surface p-6 rounded-3xl border border-foundation-border shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-foundation-muted mb-2">
                  <span className="font-bold uppercase tracking-wider text-foundation-primary">{guide.category}</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-xl text-foundation-text mb-2">
                  {guide.title}
                </h3>
                <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              {/* Steps Accordion */}
              <div className="pt-2 border-t border-foundation-border space-y-3">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-foundation-bg border border-foundation-border/60 text-xs">
                    <span className="font-bold text-foundation-text block mb-1">{step.title}</span>
                    <p className="text-foundation-muted leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Real Estate Glossary View */}
      {subTab === 'glossary' && (
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
                Real Estate & Revenue Law Glossary
              </h3>
              <p className="text-xs sm:text-sm text-foundation-muted mt-0.5">
                Understand the complex legal terms used in sale deeds, revenue land records, and RERA court orders.
              </p>
            </div>
            <div className="w-full sm:w-72">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-foundation-muted" />
                <input
                  type="text"
                  placeholder="Search terms (e.g. 7/12, OC, FSI)..."
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-foundation-border bg-foundation-bg text-foundation-text focus:outline-none focus:ring-1 focus:ring-foundation-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((g, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-foundation-bg border border-foundation-border space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-foundation-text">{g.term}</h4>
                  {g.vernacularSynonym && (
                    <span className="text-[11px] font-semibold text-foundation-primary px-2 py-0.5 rounded bg-foundation-primary/10">
                      {g.vernacularSynonym}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-foundation-muted leading-relaxed">
                  {g.definition}
                </p>
                <div className="pt-2 border-t border-foundation-border/60 text-xs text-foundation-text flex items-start gap-1.5">
                  <span className="font-bold text-foundation-accent shrink-0">💡 Practical Tip:</span>
                  <span className="text-foundation-muted">{g.practicalTip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      {subTab === 'faqs' && (
        <div className="bg-foundation-surface p-6 sm:p-8 rounded-3xl border border-foundation-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-foundation-text">
                Frequently Asked Homebuyer Questions
              </h3>
              <p className="text-xs sm:text-sm text-foundation-muted mt-0.5">
                Neutral, commission-free answers to common legal and financial dilemmas.
              </p>
            </div>
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['All', 'General', 'Financial & Loans', 'Legal & RERA', 'Fraud & Safety'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    faqCategory === cat 
                      ? 'bg-foundation-primary text-foundation-onPrimary' 
                      : 'bg-foundation-bg border border-foundation-border text-foundation-text hover:bg-foundation-border/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-foundation-border/60">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm sm:text-base text-foundation-text hover:text-foundation-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0 text-foundation-muted" />}
                  </button>
                  {isExpanded && (
                    <div className="pt-3 text-xs sm:text-sm text-foundation-muted leading-relaxed pl-2 border-l-2 border-foundation-primary mt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
