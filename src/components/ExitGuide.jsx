import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Bell, 
  RotateCcw,
  Sparkles,
  Calendar,
  DollarSign,
  Info,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency } from '../utils/financialMath';

export default function ExitGuide({ salary, currency, onAskFinBuddy }) {
  // Interactive Decision Helper State
  const [selectedScenario, setSelectedScenario] = useState('crash');
  
  // Market Alert Simulator State
  const [simulatedEvent, setSimulatedEvent] = useState(null);

  // Scenarios database for the "Should I Withdraw?" interactive decision tool
  const scenarios = {
    crash: {
      title: "📉 Market is Crashing (-15% to -30%) & News is Scary",
      icon: TrendingDown,
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
      action: "🚫 DO NOT WITHDRAW!",
      actionColor: "bg-rose-600 text-white",
      verdictTitle: "Panic Selling is the #1 Wealth Destroyer!",
      explanation: "When markets crash, you haven't actually lost money until you click 'Sell'. Stocks and Mutual Funds are owning pieces of top profitable companies. In history, 100% of market crashes (2008, 2020) recovered to new all-time highs.",
      bestAction: "Keep your monthly SIP active. In fact, if you have extra cash, market crashes are discount sales!",
    },
    goalNear: {
      title: "🎯 My Financial Goal (e.g. House, Wedding) is 6-12 Months Away",
      icon: Calendar,
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      action: "✅ YES, GRADUALLY WITHDRAW / SHIFT!",
      actionColor: "bg-blue-600 text-white",
      verdictTitle: "Protect Your Target Capital Now",
      explanation: "When you are within 1-2 years of needing money for a real life goal, you should NOT keep it in volatile equity stocks. A sudden dip right before your goal could delay your plans.",
      bestAction: "Use a Systematic Transfer Plan (STP) or withdraw in tranches to a safe Liquid Mutual Fund or Bank FD.",
    },
    bigGain: {
      title: "🚀 My Portfolio Gained +30% This Year! Should I Cash Out?",
      icon: TrendingUp,
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      action: "⚖️ REBALANCE, DON'T FULLY EXIT!",
      actionColor: "bg-emerald-600 text-white",
      verdictTitle: "Don't Kill the Golden Goose",
      explanation: "Taking out all your money stops the power of compounding. If you pull everything out, what will you do with the cash? Let it erode in a savings account?",
      bestAction: "Rebalance: If equity grew from 70% of your portfolio to 85%, sell just enough to bring it back to 70% and park the profit in debt/gold.",
    },
    emergency: {
      title: "🚨 Urgent Medical / Job Emergency & No Cash Left",
      icon: ShieldAlert,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      action: "⚠️ WITHDRAW ONLY WHAT YOU NEED",
      actionColor: "bg-amber-600 text-white",
      verdictTitle: "Real Life Comes First",
      explanation: "Money exists to protect and serve your real life. If you have exhausted your Emergency Safety Net Fund, selling investments for real health/survival needs is completely justified.",
      bestAction: "Withdraw only the exact required amount. Resume your monthly investment as soon as stability returns.",
    },
    impulse: {
      title: "🛍️ I Want to Buy a New iPhone / Go on a Luxury Vacation",
      icon: XCircle,
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      action: "🚫 ABSOLUTELY DO NOT WITHDRAW!",
      actionColor: "bg-purple-700 text-white",
      verdictTitle: "Compounding Sacrificed for Short-Term Splurge",
      explanation: "Pulling ₹1 Lakh out of equity for a gadget deprives you of ~₹10 Lakhs in future 15-year wealth. Long-term investments are not a secondary savings account for shopping.",
      bestAction: "Create a separate 'Wants Bucket' in your monthly salary budget instead of raiding your wealth generator.",
    }
  };

  const activeScenario = scenarios[selectedScenario];

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-indigo-200">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Mastering Market Timing & Smart Exits</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            When to Invest, When to Withdraw & Crash Alerts
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The secret to wealth is not just buying—it is knowing <span className="text-emerald-400 font-bold">WHEN to stay calm</span>, <span className="text-amber-300 font-bold">WHEN to lock in profits</span>, and <span className="text-rose-400 font-bold">WHEN NOT to panic</span> during a crash.
          </p>
        </div>
      </div>

      {/* SECTION 1: Interactive Market Crash & Surge Alert Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-indigo-600 animate-bounce" />
              Live Alert Simulator
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-1">
              Test How You Should React to Market Events
            </h2>
            <p className="text-xs text-slate-500">
              Click a market trigger below to simulate a real-time notification alert and see the recommended action.
            </p>
          </div>
        </div>

        {/* Trigger Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setSimulatedEvent('crash')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
              simulatedEvent === 'crash'
                ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/30'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Market Crash (-20%)</span>
                <span className="text-[11px] text-slate-500">Nifty drops sharply</span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-600">Simulate →</span>
          </button>

          <button
            onClick={() => setSimulatedEvent('surge')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
              simulatedEvent === 'surge'
                ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/30'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Bull Run (+25% Gain)</span>
                <span className="text-[11px] text-slate-500">Markets at all-time high</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600">Simulate →</span>
          </button>

          <button
            onClick={() => setSimulatedEvent('goal')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
              simulatedEvent === 'goal'
                ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-400/30'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Goal Date Approaching</span>
                <span className="text-[11px] text-slate-500">1 year remaining</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600">Simulate →</span>
          </button>
        </div>

        {/* Dynamic Simulated Alert Banner */}
        {simulatedEvent === 'crash' && (
          <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                  🚨
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-200 px-2 py-0.5 rounded-md">
                      CRASH ALERT ADVISOR
                    </span>
                    <span className="text-xs text-rose-600 font-medium">Just now</span>
                  </div>
                  <h3 className="text-base font-extrabold text-rose-950 mt-0.5">
                    Stock Market Dropped 20%! What Should You Do?
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSimulatedEvent(null)}
                className="text-xs text-rose-700 hover:text-rose-900 font-bold underline"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-2">
                <span className="font-extrabold text-rose-700 flex items-center gap-1 text-sm">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  WRONG ACTION (Panic Selling)
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Selling your mutual funds now turns a temporary paper loss into a permanent real loss. You miss out on the eventual recovery!
                </p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 space-y-2">
                <span className="font-extrabold text-emerald-800 flex items-center gap-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  CORRECT ACTION (Discount Buy / Hold)
                </span>
                <p className="text-emerald-950 leading-relaxed">
                  Do nothing or invest a small extra bonus! You get 20% more mutual fund units for the exact same amount of money.
                </p>
              </div>
            </div>
          </div>
        )}

        {simulatedEvent === 'surge' && (
          <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                  📈
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-md">
                      BULL RUN ALERT
                    </span>
                    <span className="text-xs text-emerald-700 font-medium">Just now</span>
                  </div>
                  <h3 className="text-base font-extrabold text-emerald-950 mt-0.5">
                    Portfolio Up +25%! Should You Sell Everything?
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSimulatedEvent(null)}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
                <span className="font-extrabold text-slate-800 flex items-center gap-1 text-sm">
                  <XCircle className="w-4 h-4 text-amber-600" />
                  WRONG ACTION (Total Exit)
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Selling 100% of your equity stops your 10-year compounding engine. You will pay capital gains tax and get stuck wondering when to re-enter.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-300 space-y-2">
                <span className="font-extrabold text-emerald-800 flex items-center gap-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  CORRECT ACTION (Smart Rebalance)
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Trim 10-15% of your high-risk stock gains and transfer to safe debt/liquid funds. Let the rest keep compounding!
                </p>
              </div>
            </div>
          </div>
        )}

        {simulatedEvent === 'goal' && (
          <div className="p-6 rounded-2xl bg-blue-50 border-2 border-blue-300 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                  🎯
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-200 px-2 py-0.5 rounded-md">
                      EXIT STRATEGY ALERT
                    </span>
                    <span className="text-xs text-blue-700 font-medium">Goal Notice</span>
                  </div>
                  <h3 className="text-base font-extrabold text-blue-950 mt-0.5">
                    Your Goal Date is 1 Year Away! Time to Protect Profits.
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSimulatedEvent(null)}
                className="text-xs text-blue-800 hover:text-blue-950 font-bold underline"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-blue-200 space-y-2">
                <span className="font-extrabold text-slate-800 flex items-center gap-1 text-sm">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  WRONG ACTION (Greed & Delay)
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Leaving money in volatile stocks right until the week of your home downpayment. A sudden market drop could ruin your plans.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-300 space-y-2">
                <span className="font-extrabold text-blue-900 flex items-center gap-1 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  CORRECT ACTION (Systematic De-risking)
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Start moving 10% monthly out of stocks into a liquid fund (STP). By goal month, 100% of your target cash is 100% safe.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Interactive "Should I Withdraw Right Now?" Decision Helper */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
            Interactive Decision Helper
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            "Should I Withdraw My Money Right Now?"
          </h2>
          <p className="text-xs text-slate-500">
            Select your current situation below to get an instant, clear verdict on whether to hold, invest, or withdraw.
          </p>
        </div>

        {/* Situation Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.keys(scenarios).map((key) => {
            const sc = scenarios[key];
            const isSelected = selectedScenario === key;
            const IconComp = sc.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconComp className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-extrabold line-clamp-2">{sc.title}</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full w-fit ${
                  isSelected ? 'bg-white/20 text-white' : sc.badgeColor
                }`}>
                  {sc.action}
                </span>
              </button>
            );
          })}
        </div>

        {/* Verdict Details Box */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Official Financial Verdict
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {activeScenario.verdictTitle}
              </h3>
            </div>
            <span className={`px-4 py-2 rounded-xl text-xs font-black tracking-wide ${activeScenario.actionColor}`}>
              {activeScenario.action}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Why this recommendation?
              </span>
              <p className="text-slate-600 leading-relaxed">
                {activeScenario.explanation}
              </p>
            </div>

            <div className="space-y-2 bg-emerald-50/80 p-4 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] block flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Recommended Next Step:
              </span>
              <p className="text-emerald-950 font-medium leading-relaxed">
                {activeScenario.bestAction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: The Golden Rules Grid (When to Invest vs When to Withdraw) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Right Time to Invest */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
              🚀
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">Buying Rules</span>
              <h3 className="text-lg font-black text-slate-900">When is the Right Time to Invest?</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-extrabold text-slate-900 block text-xs">1. Day 1 of Salary (Automated SIP)</span>
              <p className="text-slate-600 leading-relaxed">
                Invest on the 1st or 5th of every month automatically. Do not wait until month-end to see what is left over.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-extrabold text-slate-900 block text-xs">2. During Market Dips (-10% to -20%)</span>
              <p className="text-slate-600 leading-relaxed">
                When headlines say "Market is falling", great companies are on sale. Adding a small extra lump sum boosts long-term returns.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-extrabold text-emerald-900 block text-xs">Golden Rule: Time IN the Market &gt; Timing the Market</span>
              <p className="text-emerald-800 leading-relaxed">
                Waiting 1 year on the sidelines for a market crash costs you more lost gains than a minor dip ever will!
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Right Time to Withdraw */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">Exit Rules</span>
              <h3 className="text-lg font-black text-slate-900">When is the Right Time to Withdraw?</h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-extrabold text-slate-900 block text-xs">1. 12 to 24 Months Before a Target Goal</span>
              <p className="text-slate-600 leading-relaxed">
                Gradually move equity gains to ultra-safe liquid funds so a sudden market drop right before your goal doesn't impact your plans.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-extrabold text-slate-900 block text-xs">2. Portfolio Asset Rebalancing</span>
              <p className="text-slate-600 leading-relaxed">
                When stock gains grow beyond your target percentage (e.g. equity becomes 85% instead of 70%), trim the excess and lock into safety.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <span className="font-extrabold text-blue-950 block text-xs">Golden Rule: Systematic Transfer Plan (STP)</span>
              <p className="text-blue-900 leading-relaxed">
                Never withdraw 100% in one day. Spread withdrawals across 6-12 months to average out market swings smoothly.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* FinBuddy AI Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            Have a Specific Personal Question?
          </span>
          <h3 className="text-lg font-extrabold">
            Ask FinBuddy AI Mentor about your exact situation
          </h3>
          <p className="text-xs text-emerald-100">
            Get personalized advice on market dips, SIP adjustments, or emergency funds.
          </p>
        </div>

        <button
          onClick={onAskFinBuddy}
          className="px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-black flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
        >
          <span>Ask FinBuddy AI Mentor</span>
          <ArrowRight className="w-4 h-4 text-emerald-700" />
        </button>
      </div>

    </div>
  );
}
