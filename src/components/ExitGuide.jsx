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
  Calendar,
  DollarSign,
  Info,
  Clock,
  ShieldCheck,
  Scale,
  ShoppingBag
} from 'lucide-react';
import { formatCurrency } from '../utils/financialMath';

export default function ExitGuide({ salary, currency, onAskFinBuddy }) {
  const [selectedScenario, setSelectedScenario] = useState('crash');
  const [simulatedEvent, setSimulatedEvent] = useState(null);

  const scenarios = {
    crash: {
      title: "Market Downturn (-15% to -30%) with Negative Sentiment",
      icon: TrendingDown,
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      action: "Maintain Position (Hold)",
      actionColor: "bg-slate-900 text-white",
      verdictTitle: "Avoid Crystallizing Unrealized Paper Drawdowns",
      explanation: "Equity index funds represent collective ownership in high-earning commercial enterprises. Broad market pullbacks are standard cyclical corrections; historical data demonstrates full recovery to new highs over long horizons.",
      bestAction: "Maintain automated monthly investments. Downturns lower your dollar-cost average by acquiring units at lower valuations.",
    },
    goalNear: {
      title: "Target Financial Milestone Approaching (Within 12 Months)",
      icon: Calendar,
      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
      action: "Systematic De-Risking (Shift to Liquid)",
      actionColor: "bg-blue-700 text-white",
      verdictTitle: "Protect Target Capital for Near-Term Outflows",
      explanation: "When you are within 1 to 2 years of requiring capital for a defined expenditure (e.g., home down payment or tuition), equity volatility introduces unacceptable timing risk.",
      bestAction: "Gradually shift capital via a Systematic Transfer Plan (STP) into a liquid mutual fund or short-term fixed deposit.",
    },
    bigGain: {
      title: "Substantial Portfolio Gain (+25% to +35% in Current Year)",
      icon: TrendingUp,
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      action: "Portfolio Rebalancing",
      actionColor: "bg-emerald-700 text-white",
      verdictTitle: "Rebalance Target Weights; Preserve Compounding Base",
      explanation: "Full liquidation halts long-term compounding and triggers tax liabilities. However, letting equity drift far beyond target allocation exposes you to outsized risk.",
      bestAction: "Trim excess equity weight back to your target allocation and reallocate the profit into fixed income or liquid debt reserves.",
    },
    emergency: {
      title: "Unforeseen Emergency with Exhausted Cash Reserves",
      icon: ShieldAlert,
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      action: "Targeted Liquidity Only",
      actionColor: "bg-amber-700 text-white",
      verdictTitle: "Utilize Capital for Solvency & Essential Needs",
      explanation: "Financial reserves exist to support real-world living stability. If emergency cash buffers are exhausted, liquidating investments for critical obligations is warranted.",
      bestAction: "Redeem strictly the required amount, beginning with low-volatility debt or liquid funds before equities. Resume regular contributions once stability returns.",
    },
    impulse: {
      title: "Discretionary Luxury or Consumer Electronics Purchase",
      icon: ShoppingBag,
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      action: "Avoid Premature Liquidation",
      actionColor: "bg-slate-800 text-white",
      verdictTitle: "Preserve Long-Term Compound Growth",
      explanation: "Liquidating long-term equity to fund consumer depreciating assets interrupts compound interest and imposes an opportunity cost on future net worth.",
      bestAction: "Establish a dedicated short-term savings bucket within your monthly budget rather than drawing down retirement equity.",
    }
  };

  const activeScenario = scenarios[selectedScenario];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <span>Market Discipline & Exit Rules</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            When to Allocate, Rebalance, or Liquidate
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Long-term returns depend equally on entry discipline and exit strategy: understanding when to hold through drawdowns, when to rebalance gains, and how to systematically de-risk near financial goals.
          </p>
        </div>
      </div>

      {/* SECTION 1: Market Event Scenario Simulator */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 block">
            Scenario Modeling
          </span>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
            Market Volatility Response Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a market condition below to examine recommended behavioral and portfolio responses:
          </p>
        </div>

        {/* Trigger Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setSimulatedEvent('crash')}
            className={`p-3.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
              simulatedEvent === 'crash'
                ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900/10'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Market Drawdown (-20%)</span>
                <span className="text-[11px] text-slate-500">Benchmark index correction</span>
              </div>
            </div>
            <span className="text-xs font-medium text-slate-500">Analyze →</span>
          </button>

          <button
            onClick={() => setSimulatedEvent('surge')}
            className={`p-3.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
              simulatedEvent === 'surge'
                ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900/10'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Bull Market Rally (+25%)</span>
                <span className="text-[11px] text-slate-500">Portfolio outperformance</span>
              </div>
            </div>
            <span className="text-xs font-medium text-slate-500">Analyze →</span>
          </button>

          <button
            onClick={() => setSimulatedEvent('goal')}
            className={`p-3.5 rounded-lg border text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
              simulatedEvent === 'goal'
                ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900/10'
                : 'bg-white hover:bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">Goal Maturity Approaching</span>
                <span className="text-[11px] text-slate-500">12 months to expenditure</span>
              </div>
            </div>
            <span className="text-xs font-medium text-slate-500">Analyze →</span>
          </button>
        </div>

        {/* Dynamic Simulated Alert Banner */}
        {simulatedEvent === 'crash' && (
          <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-700 block">
                    Correction Advisory
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">
                    20% Market Index Drawdown Response
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSimulatedEvent(null)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-md border border-slate-200 space-y-1">
                <span className="font-semibold text-rose-700 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  Sub-Optimal Response: Panic Liquidation
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Liquidating during a downturn transforms temporary paper volatility into permanent realized loss, locking in sub-optimal valuations before market recovery.
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-md border border-slate-200 space-y-1">
                <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Recommended Strategy: Disciplined Dollar-Cost Averaging
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Maintain scheduled monthly contributions. Lower asset valuations allow each contribution to acquire more fund units, accelerating future compounding.
                </p>
              </div>
            </div>
          </div>
        )}

        {simulatedEvent === 'surge' && (
          <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 block">
                    Rally Advisory
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Portfolio Up 25%: Managing Outperformance
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSimulatedEvent(null)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-md border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-slate-500" />
                  Sub-Optimal Response: Complete Cash Out
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Liquidating 100% of holdings creates tax drag and cash drag, forfeiting multi-year compounding while attempting market re-entry timing.
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-md border border-slate-200 space-y-1">
                <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Recommended Strategy: Target Rebalancing
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Trim 10% to 15% of outperforming equity weight and transfer profits to low-volatility debt reserves to lock in baseline gains.
                </p>
              </div>
            </div>
          </div>
        )}

        {simulatedEvent === 'goal' && (
          <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-700 block">
                    Goal Horizon Notice
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">
                    12 Months to Target Goal: Systematic De-risking
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSimulatedEvent(null)}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-md border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-slate-500" />
                  Sub-Optimal Response: Prolonged Equity Exposure
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Leaving money in volatile equities until days before a scheduled large capital expenditure exposes plans to random short-term drawdowns.
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-md border border-slate-200 space-y-1">
                <span className="font-semibold text-blue-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  Recommended Strategy: Phased De-Risking (STP)
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Gradually transfer capital in monthly tranches into a liquid fund or short-term deposit so capital is 100% secured by maturity date.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Decision Matrix */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 block">
            Decision Framework
          </span>
          <h2 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
            Liquidity & Withdrawal Guidance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your current scenario to review recommended action protocols:
          </p>
        </div>

        {/* Situation Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {Object.keys(scenarios).map((key) => {
            const sc = scenarios[key];
            const isSelected = selectedScenario === key;
            const IconComp = sc.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  <IconComp className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span className="text-xs font-semibold line-clamp-2">{sc.title}</span>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded w-fit ${
                  isSelected ? 'bg-white/20 text-white' : sc.badgeColor
                }`}>
                  {sc.action}
                </span>
              </button>
            );
          })}
        </div>

        {/* Verdict Details Box */}
        <div className="p-4 sm:p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                Analysis & Protocol
              </span>
              <h3 className="text-sm font-semibold text-slate-900 mt-0.5">
                {activeScenario.verdictTitle}
              </h3>
            </div>
            <span className={`px-3 py-1 rounded text-xs font-semibold tracking-wide ${activeScenario.actionColor}`}>
              {activeScenario.action}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block">
                Rationale
              </span>
              <p className="text-slate-600 leading-relaxed">
                {activeScenario.explanation}
              </p>
            </div>

            <div className="space-y-1 bg-white p-3 rounded border border-slate-200">
              <span className="font-semibold text-emerald-800 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Actionable Next Step:
              </span>
              <p className="text-slate-700 leading-relaxed font-normal">
                {activeScenario.bestAction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Card 1: Entry Principles */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-xs">
              01
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Capital Deployment Principles</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="font-semibold text-slate-900 block">1. Automated Monthly Execution</span>
              <p className="text-slate-600 leading-relaxed">
                Deploy capital immediately following salary disbursement to eliminate emotional timing delay.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="font-semibold text-slate-900 block">2. Opportunistic Downturn Allocation</span>
              <p className="text-slate-600 leading-relaxed">
                Allocate surplus discretionary capital during broad market drawdowns to enhance long-term internal rate of return.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Exit Principles */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-slate-100 text-slate-700 flex items-center justify-center font-semibold text-xs">
              02
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Capital Preservation & Exit Principles</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="font-semibold text-slate-900 block">1. Milestone-Based De-Risking</span>
              <p className="text-slate-600 leading-relaxed">
                Begin transitioning equity holdings into liquid debt 12 to 24 months prior to planned capital outflows.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="font-semibold text-slate-900 block">2. Periodic Portfolio Rebalancing</span>
              <p className="text-slate-600 leading-relaxed">
                Rebalance annually when asset class weights deviate by more than 5% from target allocation.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
