import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SalarySplitter from './components/SalarySplitter';
import PortfolioBuilder from './components/PortfolioBuilder';
import CompoundSimulator from './components/CompoundSimulator';
import JargonBuster from './components/JargonBuster';
import InvestmentTypes from './components/InvestmentTypes';
import SafetyNetGuide from './components/SafetyNetGuide';
import FinBuddyChat from './components/FinBuddyChat';
import ScamRadar from './components/ScamRadar';
import FirstStepGuide from './components/FirstStepGuide';
import ExitGuide from './components/ExitGuide';
import { 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck, 
  Compass,
  Layers
} from 'lucide-react';
import { formatCurrency } from './utils/financialMath';
import { TABS_ORDER } from './data/navigation';

export default function App() {
  const [activeTab, setActiveTab] = useState('salary-plan');
  const [salary, setSalary] = useState(35000);
  const [currency, setCurrency] = useState('INR');
  const [investAmount, setInvestAmount] = useState(7000); // 20% of 35000

  // Keyboard navigation shortcuts: Left & Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveTab((prevTab) => {
          const currIdx = TABS_ORDER.indexOf(prevTab);
          const validIdx = currIdx === -1 ? TABS_ORDER.length - 1 : currIdx;
          const nextIdx = (validIdx + 1) % TABS_ORDER.length;
          return TABS_ORDER[nextIdx];
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveTab((prevTab) => {
          const currIdx = TABS_ORDER.indexOf(prevTab);
          const validIdx = currIdx === -1 ? 0 : currIdx;
          const prevIdx = (validIdx - 1 + TABS_ORDER.length) % TABS_ORDER.length;
          return TABS_ORDER[prevIdx];
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      
      {/* Top Unified Navbar & Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currency={currency} 
        setCurrency={setCurrency} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">

        {/* Quick Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="p-2.5 sm:p-3 rounded-lg bg-slate-50/80 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-500 block">Monthly in-hand</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900 tabular-nums">{formatCurrency(salary, currency)}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-emerald-50/60 border border-emerald-100/80">
            <span className="text-[11px] font-medium text-emerald-800 block">Investment target (20%)</span>
            <span className="text-sm sm:text-base font-semibold text-emerald-900 tabular-nums">{formatCurrency(investAmount, currency)}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-slate-50/80 border border-slate-100">
            <span className="text-[11px] font-medium text-slate-500 block">Emergency reserve (6mo)</span>
            <span className="text-sm sm:text-base font-semibold text-slate-900 tabular-nums">{formatCurrency(Math.round(salary * 0.5 * 6), currency)}</span>
          </div>
          <div 
            onClick={() => setActiveTab('first-steps')}
            className="p-2.5 sm:p-3 rounded-lg bg-slate-50 hover:bg-slate-100/80 border border-slate-200 cursor-pointer transition-colors flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] font-medium text-slate-500 block">Execution roadmap</span>
              <span className="text-xs font-semibold text-slate-800">Account setup guide →</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </div>
        </div>

        {/* Tab Router Content */}
        {activeTab === 'salary-plan' && (
          <div className="space-y-6">
            <SalarySplitter 
              salary={salary} 
              setSalary={setSalary} 
              investAmount={investAmount} 
              setInvestAmount={setInvestAmount} 
              currency={currency}
              onProceedToPortfolio={() => {
                const el = document.getElementById('portfolio-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <div id="portfolio-section">
              <PortfolioBuilder 
                investAmount={investAmount} 
                currency={currency}
                onSimulate={() => setActiveTab('simulator')}
              />
            </div>
          </div>
        )}

        {activeTab === 'jargon-buster' && (
          <JargonBuster 
            onSelectConcept={() => {}}
          />
        )}

        {activeTab === 'exit-guide' && (
          <ExitGuide 
            salary={salary}
            currency={currency}
            onAskFinBuddy={() => setActiveTab('fin-buddy')}
          />
        )}

        {activeTab === 'simulator' && (
          <CompoundSimulator 
            initialMonthlyAmount={investAmount} 
            currency={currency} 
          />
        )}

        {activeTab === 'investment-types' && (
          <InvestmentTypes />
        )}

        {activeTab === 'safety-net' && (
          <SafetyNetGuide 
            salary={salary} 
            currency={currency} 
            onProceed={() => setActiveTab('salary-plan')}
          />
        )}

        {activeTab === 'scam-radar' && (
          <ScamRadar />
        )}

        {activeTab === 'fin-buddy' && (
          <FinBuddyChat 
            salary={salary} 
            currency={currency} 
          />
        )}

        {activeTab === 'first-steps' && (
          <FirstStepGuide />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/90 mt-12 py-6 text-xs text-slate-500">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-800">Smart Investment Advisor</span>
            <span className="text-slate-400">•</span>
            <span>Structured wealth generation and financial literacy for first-time earners.</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            For educational and simulation purposes only. Not registered SEBI investment advice.
          </div>
        </div>
      </footer>

    </div>
  );
}
