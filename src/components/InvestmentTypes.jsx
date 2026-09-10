import React, { useState } from 'react';
import { INVESTMENT_TYPES } from '../data/investments';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

export default function InvestmentTypes() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('nifty-50-index');

  const categories = ['All', 'Core Wealth Builder', 'Safe Foundation', 'Hedge & Stability', 'Advanced / Active', 'Dangerous Trap'];

  const filteredItems = selectedCategory === 'All'
    ? INVESTMENT_TYPES
    : INVESTMENT_TYPES.filter(item => item.category === selectedCategory);

  const getRiskDots = (level) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={`w-2 h-2 rounded-full ${
              dot <= level
                ? level >= 5
                  ? 'bg-rose-600'
                  : level >= 4
                  ? 'bg-orange-500'
                  : level >= 3
                  ? 'bg-blue-500'
                  : 'bg-emerald-500'
                : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-900/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>📚</span> The Complete Asset Class Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            What Are the Types of Investments?
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Every investment is a tool designed for a specific job: some are built for safety (like a shield), 
            some for growth (like an engine), and some are dangerous traps you must avoid!
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset Cards */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isDanger = item.riskLevel === 5;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                isDanger
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {item.emoji}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                        {item.name}
                      </h3>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.categoryColor}`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.verdict}
                    </p>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Expected Return
                    </span>
                    <span className={`text-sm font-extrabold ${isDanger ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {item.expectedReturn}
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Risk Level
                    </span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {getRiskDots(item.riskLevel)}
                    </div>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5">
                  
                  {/* Kid Analogy Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      In Plain English
                    </span>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {item.kidExplanation}
                    </p>
                  </div>

                  {/* Quick specs pill row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Min Amount</span>
                      <span className="text-xs font-black text-slate-900">{item.minAmount}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Liquidity</span>
                      <span className="text-xs font-black text-slate-900">{item.liquidity}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Ideal Time Horizon</span>
                      <span className="text-xs font-black text-slate-900">{item.idealHorizon}</span>
                    </div>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                      <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" /> The Good Things
                      </span>
                      <ul className="space-y-1.5">
                        {item.pros.map((p, i) => (
                          <li key={i} className="text-xs text-emerald-900 flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                      <span className="text-xs font-extrabold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                        <X className="w-4 h-4 text-rose-600" /> The Drawbacks / Risks
                      </span>
                      <ul className="space-y-1.5">
                        {item.cons.map((c, i) => (
                          <li key={i} className="text-xs text-rose-900 flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Starter Tip */}
                  <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3">
                    <span className="text-lg">💡</span>
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                        Day 1 Starter Advice
                      </span>
                      <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
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
