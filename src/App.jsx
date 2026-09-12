import React, { useState } from 'react';
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
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingUp, 
  HeartHandshake,
  Compass
} from 'lucide-react';
import { formatCurrency } from './utils/financialMath';

export default function App() {
  const [activeTab, setActiveTab] = useState('salary-plan');
  const [salary, setSalary] = useState(35000);
  const [currency, setCurrency] = useState('INR');
  const [investAmount, setInvestAmount] = useState(7000); // 20% of 35000

  // Keyboard navigation shortcuts: Left & Right arrow keys
  React.useEffect(() => {
    const tabsOrder = [
      'salary-plan',
      'exit-guide',
      'jargon-buster',
      'simulator',
      'investment-types',
      'safety-net',
      'scam-radar',
      'first-steps',
      'fin-buddy'
    ];

    const handleKeyDown = (e) => {
      // Do not trigger tab switch if user is typing in an input field or textarea
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveTab((prevTab) => {
          const currIdx = tabsOrder.indexOf(prevTab);
          const validIdx = currIdx === -1 ? tabsOrder.length - 1 : currIdx;
          const nextIdx = (validIdx + 1) % tabsOrder.length;
          return tabsOrder[nextIdx];
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveTab((prevTab) => {
          const currIdx = tabsOrder.indexOf(prevTab);
          const validIdx = currIdx === -1 ? 0 : currIdx;
          const prevIdx = (validIdx - 1 + tabsOrder.length) % tabsOrder.length;
          return tabsOrder[prevIdx];
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currency={currency} 
        setCurrency={setCurrency} 
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Quick Stats Mini-Bar for Starter Awareness */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="p-2 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Monthly In-Hand</span>
            <span className="text-sm sm:text-base font-black text-slate-900">{formatCurrency(salary, currency)}</span>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Invest Target (20%)</span>
            <span className="text-sm sm:text-base font-black text-emerald-800">{formatCurrency(investAmount, currency)}</span>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-blue-50 border border-blue-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">Emergency Target (6mo)</span>
            <span className="text-sm sm:text-base font-black text-blue-800">{formatCurrency(Math.round(salary * 0.5 * 6), currency)}</span>
          </div>
          <div 
            onClick={() => setActiveTab('first-steps')}
            className="p-2 sm:p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">Action Guide</span>
              <span className="text-xs font-black text-amber-900">Start in 15 Mins →</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-amber-700 shrink-0" />
          </div>
        </div>

        {/* Tab Router Content */}
        {activeTab === 'salary-plan' && (
          <div className="space-y-8">
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
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🌱</span>
            <span className="font-bold text-slate-800">Smart Investment Advisor</span>
            <span>— Making wealth generation simple, safe, and jargon-free for first-time earners.</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            For educational and simulation purposes only. Not registered SEBI investment advice.
          </div>
        </div>
      </footer>

    </div>
  );
}
