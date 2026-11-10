import React, { useState } from 'react';
import { 
  DollarSign, 
  Home, 
  Coffee, 
  TrendingUp, 
  Info, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { formatCurrency, calculateBudgetSplit } from '../utils/financialMath';

export default function SalarySplitter({ 
  salary, 
  setSalary, 
  investAmount, 
  setInvestAmount, 
  currency, 
  onProceedToPortfolio 
}) {
  const [needsPct, setNeedsPct] = useState(50);
  const [wantsPct, setWantsPct] = useState(30);
  const [investPct, setInvestPct] = useState(20);
  const [hasDebt, setHasDebt] = useState(false);
  const [debtEmi, setDebtEmi] = useState(0);

  const presets = currency === 'INR' 
    ? [25000, 40000, 60000, 100000]
    : [2500, 4000, 6000, 10000];

  const budget = calculateBudgetSplit(salary, needsPct, wantsPct, investPct);

  React.useEffect(() => {
    const netInvest = Math.max(0, budget.investments - (hasDebt ? debtEmi : 0));
    setInvestAmount(netInvest);
  }, [salary, needsPct, wantsPct, investPct, hasDebt, debtEmi]);

  const handleSliderChange = (type, val) => {
    const num = Number(val);
    if (type === 'needs') {
      const remaining = 100 - num;
      const newWants = Math.round(remaining * (wantsPct / (wantsPct + investPct || 1)));
      const newInvest = remaining - newWants;
      setNeedsPct(num);
      setWantsPct(newWants);
      setInvestPct(newInvest);
    } else if (type === 'wants') {
      const remaining = 100 - num;
      const newNeeds = Math.round(remaining * (needsPct / (needsPct + investPct || 1)));
      const newInvest = remaining - newNeeds;
      setWantsPct(num);
      setNeedsPct(newNeeds);
      setInvestPct(newInvest);
    } else if (type === 'invest') {
      const remaining = 100 - num;
      const newNeeds = Math.round(remaining * (needsPct / (needsPct + wantsPct || 1)));
      const newWants = remaining - newNeeds;
      setInvestPct(num);
      setNeedsPct(newNeeds);
      setWantsPct(newWants);
    }
  };

  const resetTo503020 = () => {
    setNeedsPct(50);
    setWantsPct(30);
    setInvestPct(20);
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Hero Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Budgeting Framework</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            The 50 / 30 / 20 Salary Allocation
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A structured method for monthly cash flow: allocate essential living costs, personal discretionary spending, and long-term investment capital on salary day before purchases occur.
          </p>
        </div>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-6">
        
        {/* Step 1: Input Salary */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <label className="text-xs font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-bold">1</span>
              Monthly in-hand compensation
            </label>
            <span className="text-xs text-slate-500">
              Net credited amount after tax and deductions
            </span>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold text-base">
              {currency === 'INR' ? '₹' : '$'}
            </div>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              className="w-full pl-9 pr-4 py-2.5 text-lg sm:text-xl font-semibold text-slate-900 bg-slate-50/70 border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 focus:bg-white transition-colors tabular-nums"
              placeholder="35000"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-500 font-medium">Quick presets:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setSalary(preset)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer tabular-nums ${
                  salary === preset
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {formatCurrency(preset, currency)}
              </button>
            ))}
          </div>
        </div>

        {/* Optional: Debt / EMI Check */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasDebt"
                checked={hasDebt}
                onChange={(e) => setHasDebt(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <label htmlFor="hasDebt" className="text-xs sm:text-sm font-medium text-slate-700 cursor-pointer">
                Do you currently have credit card balances or personal loan EMIs?
              </label>
            </div>
            {hasDebt && (
              <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                High-interest liability
              </span>
            )}
          </div>

          {hasDebt && (
            <div className="mt-3 p-3.5 bg-amber-50/60 border border-amber-200/90 rounded-lg space-y-2">
              <p className="text-xs text-amber-900 leading-relaxed">
                Revolving credit card interest can exceed 36% to 42% annually. Prioritize retiring high-interest debt before allocating significant capital to equities.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-700">Monthly debt service:</span>
                <input
                  type="number"
                  value={debtEmi}
                  onChange={(e) => setDebtEmi(Math.max(0, Number(e.target.value)))}
                  className="w-32 px-2.5 py-1 text-xs font-semibold border border-amber-300 rounded bg-white tabular-nums"
                  placeholder="₹ Amount"
                />
              </div>
            </div>
          )}
        </div>

        {/* Step 2: The 3 Buckets Breakdown */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[11px] font-bold">2</span>
              Three-bucket target breakdown
            </h3>
            <button
              onClick={resetTo503020}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium underline cursor-pointer"
            >
              Reset to 50/30/20 standard
            </button>
          </div>

          {/* Visual Percentage Progress Bar */}
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${needsPct}%` }} 
              className="bg-slate-400 transition-all duration-200"
              title={`Needs: ${needsPct}%`}
            />
            <div 
              style={{ width: `${wantsPct}%` }} 
              className="bg-slate-300 transition-all duration-200"
              title={`Wants: ${wantsPct}%`}
            />
            <div 
              style={{ width: `${investPct}%` }} 
              className="bg-emerald-600 transition-all duration-200"
              title={`Invest: ${investPct}%`}
            />
          </div>

          {/* 3 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            
            {/* Needs Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center">
                    <Home className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">Living Essentials (Needs)</span>
                    <p className="text-[11px] text-slate-500">Rent, groceries, utilities</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-700 tabular-nums">{needsPct}%</span>
              </div>

              <div className="text-lg font-semibold text-slate-900 tabular-nums">
                {formatCurrency(budget.needs, currency)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>

              <input
                type="range"
                min="30"
                max="70"
                value={needsPct}
                onChange={(e) => handleSliderChange('needs', e.target.value)}
                className="w-full accent-slate-700 h-1 bg-slate-200 rounded cursor-pointer"
              />
            </div>

            {/* Wants Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center">
                    <Coffee className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 block">Discretionary (Wants)</span>
                    <p className="text-[11px] text-slate-500">Dining, entertainment, personal</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-700 tabular-nums">{wantsPct}%</span>
              </div>

              <div className="text-lg font-semibold text-slate-900 tabular-nums">
                {formatCurrency(budget.wants, currency)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>

              <input
                type="range"
                min="10"
                max="40"
                value={wantsPct}
                onChange={(e) => handleSliderChange('wants', e.target.value)}
                className="w-full accent-slate-700 h-1 bg-slate-200 rounded cursor-pointer"
              />
            </div>

            {/* Investment Target Card */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-950 block">Investment Capital</span>
                    <p className="text-[11px] text-emerald-700">Equities, emergency buffer</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-800 tabular-nums">{investPct}%</span>
              </div>

              <div className="text-lg font-semibold text-emerald-950 tabular-nums">
                {formatCurrency(budget.investments, currency)}
                <span className="text-xs font-normal text-emerald-700 ml-1">/ mo</span>
              </div>

              <input
                type="range"
                min="10"
                max="50"
                value={investPct}
                onChange={(e) => handleSliderChange('invest', e.target.value)}
                className="w-full accent-emerald-600 h-1 bg-emerald-200 rounded cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Action Callout */}
        <div className="pt-2">
          <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-emerald-400 text-xs font-medium flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Budget Defined
              </span>
              <h4 className="text-sm sm:text-base font-semibold">
                Available monthly investment capital: <span className="text-emerald-400 font-semibold tabular-nums">{formatCurrency(budget.investments, currency)}</span>
              </h4>
              <p className="text-xs text-slate-400">
                Continue below to structure this into index funds, liquid reserves, and asset diversification.
              </p>
            </div>

            <button
              onClick={onProceedToPortfolio}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Proceed to asset allocation"
            >
              <span>Build Asset Allocation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
