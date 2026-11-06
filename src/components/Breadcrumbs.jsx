import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft, 
  Grid, 
  Check, 
  Sparkles,
  PieChart, 
  BookOpen, 
  TrendingUp, 
  Layers, 
  ShieldAlert, 
  Bot, 
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

// Map icon string names to actual Lucide components
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

export default function Breadcrumbs({ activeTab, setActiveTab }) {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [allSectionsOpen, setAllSectionsOpen] = useState(false);

  const categoryMenuRef = useRef(null);
  const allSectionsRef = useRef(null);

  const currentItem = getNavItemById(activeTab);
  const currentCategory = getCategoryById(currentItem.categoryId);
  const categoryItems = getItemsByCategory(currentItem.categoryId);

  const currentIndex = TABS_ORDER.indexOf(activeTab);
  const totalTabs = TABS_ORDER.length;

  // Close dropdowns when clicking outside
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

  // Navigation handlers
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
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xs p-2 sm:px-4 sm:py-2.5 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Left Side: Breadcrumb Path */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs">
          
          {/* Level 1: Home Crumb */}
          <button
            onClick={() => setActiveTab('salary-plan')}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold transition-colors cursor-pointer group"
            title="Go to Home / Dashboard"
          >
            <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition-colors" />
            <span className="hidden xs:inline">Home</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          {/* Level 2: Category Crumb with Dropdown */}
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
              title="Click to view sections in this category"
            >
              <CategoryIcon className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">{currentCategory.label}</span>
              <span className="sm:hidden">{currentCategory.shortLabel}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Category Dropdown Menu */}
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
                        className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left transition-all ${
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

          {/* Level 3: Active Tab Crumb */}
          <div className="relative">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 text-emerald-900 border border-emerald-200/70 font-extrabold shadow-2xs">
              <CurrentIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-none">{currentItem.label}</span>
              {currentItem.badge && (
                <span className="hidden md:inline-block text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 bg-emerald-600 text-white rounded-md ml-1">
                  {currentItem.badge}
                </span>
              )}
            </div>
          </div>

        </nav>

        {/* Right Side: Quick Navigation & All Sections Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          
          {/* Step Counter Pill */}
          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
            <span>Section</span>
            <span className="font-extrabold text-slate-900">{currentIndex + 1}</span>
            <span>of {totalTabs}</span>
          </div>

          {/* Previous Tab Button */}
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Previous section (Keyboard: Left Arrow ←)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Next Tab Button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            title="Next section (Keyboard: Right Arrow →)"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Browse All 9 Sections Dropdown Trigger */}
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
              title="Browse all 9 sections without scrolling"
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
                    <p className="text-[11px] text-slate-500">Jump directly to any tool without scrolling</p>
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
                                className={`w-full flex items-center justify-between gap-2 p-2.5 rounded-xl text-left transition-all ${
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
  );
}
