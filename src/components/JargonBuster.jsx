import React, { useState } from 'react';
import { CONCEPTS } from '../data/concepts';
import { Sparkles, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

export default function JargonBuster({ onSelectConcept }) {
  const [activeMode, setActiveMode] = useState('kid'); // 'kid' or 'reality'
  const [searchFilter, setSearchFilter] = useState('');

  const filteredConcepts = CONCEPTS.filter(c => 
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.analogy.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.reality.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-orange-500/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>🧒</span> Explain Like I'm 10
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            The Financial Jargon Buster
          </h2>
          <p className="mt-2 text-orange-100 text-sm sm:text-base leading-relaxed">
            Finance bros use big words like <em>amortization</em>, <em>volatility</em>, and <em>NAV</em> to sound smart. 
            Here is what everything actually means using simple everyday stories!
          </p>
        </div>
      </div>

      {/* Controls & Mode Toggle */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Toggle between Kid Analogy and Reality */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => setActiveMode('kid')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeMode === 'kid'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🧒</span> Kid Analogy Mode
          </button>
          <button
            onClick={() => setActiveMode('reality')}
            className={`flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeMode === 'reality'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>💼</span> Real World Finance
          </button>
        </div>

        {/* Search Filter */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search concepts (e.g. stock, SIP)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all"
          />
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredConcepts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-100 flex items-center justify-center">
                    {item.emoji}
                  </span>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {item.tagline}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-100 text-slate-700">
                  {item.badge}
                </span>
              </div>

              {/* Dynamic Content based on Active Mode */}
              <div className="mt-4 p-4 rounded-2xl transition-all bg-slate-50 border border-slate-100">
                {activeMode === 'kid' ? (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Kid Analogy
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      "{item.analogy}"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      In Real World Practice
                    </span>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {item.reality}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Takeaway Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-800 font-bold bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
              <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item.keyTakeaway}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
