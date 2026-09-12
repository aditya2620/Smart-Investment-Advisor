import React, { useState } from 'react';
import { 
  DollarSign, 
  Home, 
  Coffee, 
  Rocket, 
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

  // Quick preset buttons for common starter salaries
  const presets = currency === 'INR' 
    ? [25000, 40000, 60000, 100000]
    : [2500, 4000, 6000, 10000];

  const budget = calculateBudgetSplit(salary, needsPct, wantsPct, investPct);

  // Synchronize parent investAmount whenever budget changes
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
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-700/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <span>✨</span> Rule #1 of Wealth: You can’t invest what you haven't budgeted!
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            The Golden Salary Splitter: 50 / 30 / 20
          </h1>
          <p className="mt-2 text-emerald-100 text-sm sm:text-base leading-relaxed">
            Most beginners make the mistake of spending all month and investing whatever small crumbs are left.
            The secret is <span className="underline font-semibold decoration-emerald-300">paying yourself first</span>: 
            put your investment money aside on salary day!
          </p>
        </div>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Step 1: Input Salary */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold">1</span>
              What is your monthly in-hand salary?
            </label>
            <span className="text-xs text-slate-500">
              (Amount that hits your bank account after PF & tax deductions)
            </span>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
              {currency === 'INR' ? '₹' : '$'}
            </div>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              className="w-full pl-10 pr-4 py-3.5 text-xl sm:text-2xl font-extrabold text-slate-900 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white transition-all"
              placeholder="e.g. 35000"
            />
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-500 font-medium">Quick pick:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setSalary(preset)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  salary === preset
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {formatCurrency(preset, currency)}
              </button>
            ))}
          </div>
        </div>

        {/* Optional: Debt / EMI Check */}
        <div className="pt-2 border-t border-slate-100">
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
                Do you currently have credit card debt or personal loan EMIs?
              </label>
            </div>
            {hasDebt && (
              <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Warning: High Interest!
              </span>
            )}
          </div>

          {hasDebt && (
            <div className="mt-3 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <p className="text-xs text-amber-900 leading-relaxed">
                Credit cards charge up to <strong>42% annual interest</strong>! No stock market investment can beat 42%. 
                Pay off expensive debt first before investing big.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Monthly EMI / Debt Repayment:</span>
                <input
                  type="number"
                  value={debtEmi}
                  onChange={(e) => setDebtEmi(Math.max(0, Number(e.target.value)))}
                  className="w-32 px-3 py-1 text-sm font-bold border border-amber-300 rounded-lg bg-white"
                  placeholder="₹ Amount"
                />
              </div>
            </div>
          )}
        </div>

        {/* Step 2: The 3 Buckets Breakdown */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-extrabold">2</span>
              Your Personalized 3-Bucket Breakdown
            </h3>
            <button
              onClick={resetTo503020}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold underline"
            >
              Reset to 50/30/20 Standard
            </button>
          </div>

          {/* Visual Percentage Progress Bar */}
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${needsPct}%` }} 
              className="bg-blue-500 transition-all duration-300"
              title={`Needs: ${needsPct}%`}
            />
            <div 
              style={{ width: `${wantsPct}%` }} 
              className="bg-purple-500 transition-all duration-300"
              title={`Wants: ${wantsPct}%`}
            />
            <div 
              style={{ width: `${investPct}%` }} 
              className="bg-emerald-500 transition-all duration-300"
              title={`Invest: ${investPct}%`}
            />
          </div>

          {/* 3 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Needs Card */}
            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Needs (Essentials)</span>
                    <p className="text-xs text-blue-600">Rent, Food, Bills, Commute</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-blue-900">{needsPct}%</span>
              </div>

              <div className="text-2xl font-black text-blue-950">
                {formatCurrency(budget.needs, currency)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>

              <input
                type="range"
                min="30"
                max="70"
                value={needsPct}
                onChange={(e) => handleSliderChange('needs', e.target.value)}
                className="w-full accent-blue-600 h-1.5 bg-blue-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wants Card */}
            <div className="p-5 rounded-2xl border border-purple-100 bg-purple-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-800">Wants (Guilt-Free)</span>
                    <p className="text-xs text-purple-600">Dining, Netflix, Outings</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-purple-900">{wantsPct}%</span>
              </div>

              <div className="text-2xl font-black text-purple-950">
                {formatCurrency(budget.wants, currency)}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>

              <input
                type="range"
                min="10"
                max="40"
                value={wantsPct}
                onChange={(e) => handleSliderChange('wants', e.target.value)}
                className="w-full accent-purple-600 h-1.5 bg-purple-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Future Wealth Card */}
            <div className="p-5 rounded-2xl border-2 border-emerald-400 bg-emerald-50 space-y-3 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-200/50 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-600/30">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">Future Wealth</span>
                    <p className="text-xs text-emerald-700 font-semibold">Your Monthly SIP Target</p>
                  </div>
                </div>
                <span className="text-sm font-extrabold text-emerald-800">{investPct}%</span>
              </div>

              <div className="text-2xl font-black text-emerald-900">
                {formatCurrency(budget.investments, currency)}
                <span className="text-xs font-normal text-emerald-700 ml-1">/ mo</span>
              </div>

              <input
                type="range"
                min="10"
                max="50"
                value={investPct}
                onChange={(e) => handleSliderChange('invest', e.target.value)}
                className="w-full accent-emerald-600 h-1.5 bg-emerald-200 rounded-lg cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Action Callout & Takeaway */}
        <div className="pt-2">
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Target Unlocked
              </span>
              <h4 className="text-lg font-bold">
                You have <span className="text-emerald-400 font-extrabold">{formatCurrency(budget.investments, currency)}/month</span> ready to build wealth!
              </h4>
              <p className="text-xs text-slate-300">
                Next: Let's see the exact step-by-step split (Index Funds, Emergency Fund, Gold) based on your risk comfort.
              </p>
            </div>

            <button
              onClick={onProceedToPortfolio}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-102 cursor-pointer"
              title="Generates your customized asset allocation plan and breakdown"
            >
              <span>Generate My Portfolio Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
