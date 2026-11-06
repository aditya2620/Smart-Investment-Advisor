import React, { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, 
  PieChart, 
  BookOpen, 
  TrendingUp, 
  Layers, 
  ShieldAlert, 
  Bot, 
  AlertTriangle, 
  Bell, 
  Compass,
  ChevronLeft,
  ChevronRight,
  Grid,
  Check
} from 'lucide-react';
import { NAV_ITEMS, NAVIGATION_CATEGORIES, getItemsByCategory } from '../data/navigation';

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
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Auto-scroll active tab into view when switched via keyboard or click
  useEffect(() => {
    const el = document.getElementById(`tab-${activeTab}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    // Update scroll arrows state
    setTimeout(updateScrollState, 300);
  }, [activeTab]);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(updateScrollState, 250);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('salary-plan')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-base sm:text-xl">🌱</span>
            </div>
            <div className="truncate">
              <span className="font-extrabold text-sm sm:text-lg text-slate-900 tracking-tight flex items-center gap-1">
                <span className="sm:hidden">Smart</span>
                <span className="hidden sm:inline">Smart Investment</span>
                <span className="text-emerald-600">Advisor</span>
              </span>
              <p className="text-[11px] text-slate-500 hidden md:block">Explain Like I'm 10 • Safe First-Salary Wealth</p>
            </div>
          </div>

          {/* Currency Toggle & Quick Action */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Keyboard Shortcut Hint Pill */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100/90 px-2 py-1 rounded-lg border border-slate-200" title="Use Arrow keys ← / → to switch tabs">
              <span>Nav:</span>
              <kbd className="px-1 py-0.2 bg-white text-slate-700 font-bold rounded border border-slate-300 font-mono text-[10px]">←</kbd>
              <kbd className="px-1 py-0.2 bg-white text-slate-700 font-bold rounded border border-slate-300 font-mono text-[10px">→</kbd>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
                  currency === 'INR'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ₹ <span className="hidden xs:inline sm:inline">INR</span>
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
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
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all shrink-0 cursor-pointer"
              title="Ask FinBuddy AI Mentor"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Ask </span>
              <span>FinBuddy</span>
            </button>
          </div>

        </div>

        {/* Scrollable Navigation Bar with Desktop Scroll Chevrons & Quick Dropdown */}
        <div className="relative border-t border-slate-100 flex items-center py-1.5">
          
          {/* Left Scroll Button (Desktop/Tablet) */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 z-10 p-1 rounded-full bg-white/95 shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer hidden md:flex items-center justify-center -ml-2"
              title="Scroll tabs left"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Tabs Container */}
          <div 
            ref={scrollContainerRef}
            onScroll={updateScrollState}
            className="flex space-x-1 overflow-x-auto py-1 scrollbar-none scroll-smooth w-full pr-10 md:pr-14"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.iconName] || Compass;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Scroll Button (Desktop/Tablet) */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-10 md:right-12 z-10 p-1 rounded-full bg-white/95 shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer hidden md:flex items-center justify-center"
              title="Scroll tabs right"
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Quick "All Sections" Dropdown on Navbar */}
          <div className="absolute right-0 z-20" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1.5 rounded-lg border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                menuOpen
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="View all 9 modules without scrolling"
              aria-label="View all modules"
            >
              <Grid className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-1 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">All 9 Modules</span>
                  <span className="text-[10px] text-slate-400 font-semibold">1-Click Jump</span>
                </div>
                <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                  {NAV_ITEMS.map((item) => {
                    const Icon = ICON_MAP[item.iconName] || Compass;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-2 p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                            : 'hover:bg-slate-50 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
