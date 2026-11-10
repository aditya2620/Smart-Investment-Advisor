import React, { useState } from 'react';
import { INVESTMENT_TYPES } from '../data/investments';
import { 
  Shield, 
  TrendingUp, 
  Landmark, 
  Coins, 
  Layers, 
  BarChart3, 
  AlertOctagon, 
  Info, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

const ICON_MAP = {
  TrendingUp,
  Shield,
  Landmark,
  Coins,
  Layers,
  BarChart3,
  AlertOctagon
};

export default function InvestmentTypes() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('nifty-50-index');

  const categories = ['All', 'Core Wealth Builder', 'Safe Foundation', 'Hedge & Stability', 'Advanced / Active', 'High Risk / Speculative'];

  const filteredItems = selectedCategory === 'All'
    ? INVESTMENT_TYPES
    : INVESTMENT_TYPES.filter(item => item.category === selectedCategory);

  const getRiskDots = (level) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${
              dot <= level
                ? level >= 5
                  ? 'bg-rose-600'
                  : level >= 4
                  ? 'bg-amber-600'
                  : level >= 3
                  ? 'bg-blue-600'
                  : 'bg-emerald-600'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <Layers className="w-3.5 h-3.5" />
            <span>Asset Class Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Investment Vehicle Reference Guide
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Each financial instrument serves a distinct role in portfolio construction: capital growth (equities), volatility reduction (gold), or liquidity preservation (debt and liquid reserves).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isDanger = item.riskLevel === 5;
          const IconComp = ICON_MAP[item.iconName] || Layers;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl border transition-all overflow-hidden ${
                isDanger
                  ? 'border-rose-200 bg-rose-50/10'
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
                    isDanger ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                        {item.name}
                      </h3>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${item.categoryColor}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal">
                      {item.verdict}
                    </p>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Expected Return
                    </span>
                    <span className={`text-xs font-semibold tabular-nums ${isDanger ? 'text-rose-700' : 'text-slate-900'}`}>
                      {item.expectedReturn}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Risk Level
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {getRiskDots(item.riskLevel)}
                    </div>
                  </div>

                  <div className="text-slate-400 pl-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                  
                  {/* Analysis Box */}
                  <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 mb-1">
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      Executive Summary
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.kidExplanation}
                    </p>
                  </div>

                  {/* Specs pill row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200">
                      <span className="text-[10px] font-medium text-slate-500 block">Minimum Investment</span>
                      <span className="text-xs font-semibold text-slate-900 tabular-nums">{item.minAmount}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200">
                      <span className="text-[10px] font-medium text-slate-500 block">Liquidity Settlement</span>
                      <span className="text-xs font-semibold text-slate-900">{item.liquidity}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-medium text-slate-500 block">Optimal Horizon</span>
                      <span className="text-xs font-semibold text-slate-900">{item.idealHorizon}</span>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-lg bg-emerald-50/40 border border-emerald-100 space-y-2">
                      <span className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Advantages
                      </span>
                      <ul className="space-y-1">
                        {item.pros.map((p, i) => (
                          <li key={i} className="text-xs text-emerald-900 flex items-start gap-1.5">
                            <span className="text-emerald-500">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-lg bg-rose-50/40 border border-rose-100 space-y-2">
                      <span className="text-xs font-semibold text-rose-950 flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5 text-rose-600" /> Risks & Considerations
                      </span>
                      <ul className="space-y-1">
                        {item.cons.map((c, i) => (
                          <li key={i} className="text-xs text-rose-900 flex items-start gap-1.5">
                            <span className="text-rose-500">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Starter Tip */}
                  <div className="p-3.5 rounded-lg bg-slate-900 text-white flex items-start gap-2.5 border border-slate-800">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-emerald-400 block">
                        Actionable Guidance
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
                        {item.starterTip}
                      </p>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
