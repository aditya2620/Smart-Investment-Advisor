import React, { useRef, useState, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft, 
  Grid, 
  Check, 
  Bot, 
  PieChart, 
  BookOpen, 
  TrendingUp, 
  Layers, 
  ShieldAlert, 
  AlertTriangle, 
  Bell, 
  Compass 
} from 'lucide-react';
import { 
  NAV_ITEMS, 
  NAVIGATION_CATEGORIES, 
  getNavItemById, 
  getCategoryById, 
  getItemsByCategory,
  TABS_ORDER 
} from '../data/navigation';

const ICON_MAP = {
  PieChart,
  BookOpen,
  TrendingUp,
  Layers,
  ShieldAlert,
  Bot,
  AlertTriangle,
  Bell,
  Compass
};

export default function Navbar({ activeTab, setActiveTab, currency, setCurrency }) {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [allSectionsOpen, setAllSectionsOpen] = useState(false);

  const categoryMenuRef = useRef(null);
  const allSectionsRef = useRef(null);

  const currentItem = getNavItemById(activeTab);
  const currentCategory = getCategoryById(currentItem.categoryId);
  const categoryItems = getItemsByCategory(currentItem.categoryId);

  const currentIndex = TABS_ORDER.indexOf(activeTab);
  const totalTabs = TABS_ORDER.length;

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setCategoryMenuOpen(false);
      }
      if (allSectionsRef.current && !allSectionsRef.current.contains(event.target)) {
        setAllSectionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + totalTabs) % totalTabs;
    setActiveTab(TABS_ORDER[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % totalTabs;
    setActiveTab(TABS_ORDER[nextIdx]);
  };

  const CurrentIcon = ICON_MAP[currentItem.iconName] || Compass;
  const CategoryIcon = ICON_MAP[currentCategory.icon] || Layers;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs pt-2 sm:pt-3">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        
        {/* Row 1: Brand & Global Controls */}
        <div className="flex items-center justify-between py-1.5 sm:py-2 gap-2">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('salary-plan')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 shrink"
            title="Go to Home / Salary Plan"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-base sm:text-lg">🌱</span>
            </div>
            <div className="truncate">
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight flex items-center gap-1">
                <span className="sm:hidden">Smart</span>
                <span className="hidden sm:inline">Smart Investment</span>
                <span className="text-emerald-600">Advisor</span>
              </span>
              <p className="text-[10px] text-slate-500 hidden md:block leading-tight">Explain Like I'm 10 • Safe First-Salary Wealth</p>
            </div>
          </div>

          {/* Right Controls: Keyboard shortcut, Currency Switcher & FinBuddy */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Keyboard Shortcut Hint Pill */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100/90 px-2 py-1 rounded-lg border border-slate-200" title="Use Arrow keys ← / → to switch sections">
              <span>Nav:</span>
              <kbd className="px-1 py-0.2 bg-white text-slate-700 font-bold rounded border border-slate-300 font-mono text-[10px]">←</kbd>
              <kbd className="px-1 py-0.2 bg-white text-slate-700 font-bold rounded border border-slate-300 font-mono text-[10px">→</kbd>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all cursor-pointer ${
                  currency === 'INR'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ₹ <span className="hidden xs:inline sm:inline">INR</span>
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                $ <span className="hidden xs:inline sm:inline">USD</span>
              </button>
            </div>

            {/* FinBuddy Quick Action Button */}
            <button
              onClick={() => setActiveTab('fin-buddy')}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 text-xs font-bold rounded-lg border transition-all shrink-0 cursor-pointer ${
                activeTab === 'fin-buddy'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              title="Ask FinBuddy AI Mentor"
            >
              <Bot className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Ask </span>
              <span>FinBuddy</span>
            </button>
          </div>

        </div>

        {/* Row 2: Unified Breadcrumb & Navigation Bar (Replaces the horizontal tab scroll) */}
        <div className="py-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          
          {/* Left Side: Breadcrumb Trail (Home > Category ▾ > Current Tool) */}
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
            
            {/* Level 1: Home Button */}
            <button
              onClick={() => setActiveTab('salary-plan')}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer group ${
                activeTab === 'salary-plan'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
              }`}
              title="Go to Home / Salary Plan"
            >
              <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
              <span>Home</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            {/* Level 2: Category Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => {
                  setCategoryMenuOpen(!categoryMenuOpen);
                  setAllSectionsOpen(false);
                }}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  categoryMenuOpen 
                    ? 'bg-slate-100 text-slate-900 ring-1 ring-slate-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Click to view tools in this category"
              >
                <CategoryIcon className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">{currentCategory.label}</span>
                <span className="sm:hidden">{currentCategory.shortLabel}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Dropdown List */}
              {categoryMenuOpen && (
                <div className="absolute left-0 mt-1.5 w-64 sm:w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Category: {currentCategory.label}
                    </span>
                    <p className="text-[11px] text-slate-500">{currentCategory.description}</p>
                  </div>
                  <div className="space-y-0.5 px-1.5">
                    {categoryItems.map((item) => {
                      const ItemIcon = ICON_MAP[item.iconName] || Compass;
                      const isSelected = item.id === activeTab;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setCategoryMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200/80'
                              : 'hover:bg-slate-50 text-slate-700 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <ItemIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <div className="truncate">
                              <span className="block text-xs truncate">{item.label}</span>
                              <span className="text-[10px] text-slate-400 block truncate">{item.shortLabel}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

            {/* Level 3: Current Section Tag */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/90 text-emerald-900 border border-emerald-200 font-extrabold shadow-2xs">
              <CurrentIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-none">{currentItem.label}</span>
              {currentItem.badge && (
                <span className="hidden md:inline-block text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 bg-emerald-600 text-white rounded-md ml-1">
                  {currentItem.badge}
                </span>
              )}
            </div>

          </nav>

          {/* Right Side: Step Indicator, Prev/Next Buttons & All Sections Popover */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            
            {/* Step Counter Pill */}
            <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
              <span>Section</span>
              <span className="font-extrabold text-slate-900">{currentIndex + 1}</span>
              <span>of {totalTabs}</span>
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="Previous section (Keyboard: Left Arrow ←)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              title="Next section (Keyboard: Right Arrow →)"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* All 9 Sections Dropdown Trigger */}
            <div className="relative" ref={allSectionsRef}>
              <button
                onClick={() => {
                  setAllSectionsOpen(!allSectionsOpen);
                  setCategoryMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  allSectionsOpen
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
                title="Browse all 9 sections without horizontal scrolling"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">All Sections</span>
                <span className="sm:hidden">All (9)</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${allSectionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Complete All Sections Popover Grid */}
              {allSectionsOpen && (
                <div className="absolute right-0 mt-1.5 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">All Sections Directory</h4>
                      <p className="text-[11px] text-slate-500">Jump directly to any tool in 1 click</p>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      9 Tools
                    </span>
                  </div>

                  <div className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
                    {Object.values(NAVIGATION_CATEGORIES).map((cat) => {
                      const items = getItemsByCategory(cat.id);
                      const CatIcon = ICON_MAP[cat.icon] || Layers;
                      return (
                        <div key={cat.id} className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 px-1">
                            <CatIcon className="w-3 h-3 text-slate-500" />
                            <span>{cat.label}</span>
                          </div>
                          <div className="space-y-1">
                            {items.map((item) => {
                              const ItemIcon = ICON_MAP[item.iconName] || Compass;
                              const isSelected = item.id === activeTab;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setActiveTab(item.id);
                                    setAllSectionsOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between gap-2 p-2 rounded-xl text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                                      : 'hover:bg-slate-50 text-slate-800 bg-slate-50/50 border border-slate-100'
                                  }`}
                                >
                                  <div className="flex items-start gap-2.5 min-w-0">
                                    <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                      <ItemIcon className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold truncate">{item.label}</span>
                                        {item.badge && (
                                          <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-extrabold uppercase tracking-wider ${
                                            isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                                          }`}>
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}
