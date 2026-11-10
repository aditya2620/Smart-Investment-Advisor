import React, { useState } from 'react';
import { CONCEPTS } from '../data/concepts';
import { 
  TrendingUp, 
  Percent, 
  PieChart, 
  Layers, 
  Calendar, 
  Activity, 
  AlertTriangle,
  BookOpen, 
  Search,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

const ICON_MAP = {
  TrendingUp,
  Percent,
  PieChart,
  Layers,
  Calendar,
  Activity,
  AlertTriangle
};

export default function JargonBuster({ onSelectConcept }) {
  const [activeMode, setActiveMode] = useState('kid'); // 'kid' (intuitive) or 'reality' (technical)
  const [searchFilter, setSearchFilter] = useState('');

  const filteredConcepts = CONCEPTS.filter(c => 
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.analogy.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.reality.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-white">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-slate-300" />
            <span>Financial Literacy & Clarification</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Core Investment Concepts
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Essential market mechanisms translated from institutional finance into clear mental models and operational definitions.
          </p>
        </div>
      </div>

      {/* Controls & Mode Toggle */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Toggle between Intuitive Analogy and Technical Reality */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => setActiveMode('kid')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeMode === 'kid'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Intuitive Analogy</span>
          </button>
          <button
            onClick={() => setActiveMode('reality')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
              activeMode === 'reality'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Technical Definition</span>
          </button>
        </div>

        {/* Search Filter */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search concepts (e.g., SIP, equity)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 focus:bg-white outline-none transition-all"
          />
        </div>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredConcepts.map((item) => {
          const IconComponent = ICON_MAP[item.iconName] || BookOpen;
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-700 shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {item.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                    {item.badge}
                  </span>
                </div>

                {/* Dynamic Content based on Active Mode */}
                <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200/70">
                  {activeMode === 'kid' ? (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-medium text-slate-500 block uppercase tracking-wider">
                        Conceptual Model
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        "{item.analogy}"
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-medium text-slate-500 block uppercase tracking-wider">
                        Market Mechanism
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.reality}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Takeaway Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-700 bg-slate-50/60 p-3 rounded-md border border-slate-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{item.keyTakeaway}</span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
