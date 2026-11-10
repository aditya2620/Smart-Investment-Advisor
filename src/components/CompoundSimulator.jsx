import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Layers
} from 'lucide-react';
import { formatCurrency, calculateSIP } from '../utils/financialMath';

export default function CompoundSimulator({ initialMonthlyAmount = 5000, currency }) {
  const [monthlySIP, setMonthlySIP] = useState(initialMonthlyAmount || 5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(15);

  const result = calculateSIP(monthlySIP, annualReturn, years);

  // Calculate cost of waiting 5 years
  const waitingResult = calculateSIP(monthlySIP, annualReturn, Math.max(1, years - 5));
  const lostWealth = Math.max(0, result.futureValue - waitingResult.futureValue);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-white">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-300" />
            <span>Wealth Accumulation Modeling</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Compound Growth Simulator
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Project portfolio expansion over time through systematic monthly contributions and reinvested compounding returns.
          </p>
        </div>
      </div>

      {/* Main Simulator Card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 space-y-6">
        
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-lg bg-slate-50 border border-slate-200">
          
          {/* Monthly SIP Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Monthly Contribution
              </label>
              <span className="text-sm font-semibold tabular-nums text-emerald-700">
                {formatCurrency(monthlySIP, currency)}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="50000"
              step="500"
              value={monthlySIP}
              onChange={(e) => setMonthlySIP(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
              <span>{formatCurrency(500, currency)}</span>
              <span>{formatCurrency(25000, currency)}</span>
              <span>{formatCurrency(50000, currency)}</span>
            </div>
          </div>

          {/* Expected Return % Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Expected Annual Return
              </label>
              <span className="text-sm font-semibold tabular-nums text-blue-700">
                {annualReturn}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="18"
              step="0.5"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>6% (Fixed Income)</span>
              <span>12% (Index)</span>
              <span>18% (Aggressive)</span>
            </div>
          </div>

          {/* Duration Years Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Time Horizon
              </label>
              <span className="text-sm font-semibold tabular-nums text-slate-800">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* 3 Stats Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-medium text-slate-500">
              Total Principal Invested
            </span>
            <div className="text-2xl sm:text-3xl font-semibold tabular-nums text-slate-900">
              {formatCurrency(result.totalInvested, currency)}
            </div>
            <p className="text-xs text-slate-500">
              Cumulative deposits across {years} years
            </p>
          </div>

          <div className="p-5 rounded-lg bg-emerald-50/60 border border-emerald-200 space-y-1">
            <span className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              Compounded Wealth Gained
            </span>
            <div className="text-2xl sm:text-3xl font-semibold tabular-nums text-emerald-700">
              +{formatCurrency(result.wealthGained, currency)}
            </div>
            <p className="text-xs text-emerald-700">
              Capital appreciation from market returns
            </p>
          </div>

          <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 text-white space-y-1">
            <span className="text-xs font-medium text-slate-300">
              Projected Maturity Corpus
            </span>
            <div className="text-2xl sm:text-3xl font-semibold tabular-nums text-emerald-400">
              {formatCurrency(result.futureValue, currency)}
            </div>
            <p className="text-xs text-slate-400">
              Terminal portfolio value
            </p>
          </div>

        </div>

        {/* Recharts Area Chart */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-sm font-semibold text-slate-900">
              Comparative Wealth Trajectory
            </h4>
            <span className="text-xs text-slate-500">
              Benchmark: Equity SIP ({annualReturn}%) vs Fixed Deposit (6.5%) vs Cash (0%)
            </span>
          </div>

          <div className="h-72 sm:h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis 
                  tick={{ fontSize: 11, fill: '#64748b' }} 
                  tickFormatter={(v) => formatCurrency(v, currency)}
                  width={80}
                />
                <Tooltip 
                  formatter={(value, name) => [formatCurrency(value, currency), name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area 
                  type="monotone" 
                  dataKey="indexSIP" 
                  name={`Equity Index (${annualReturn}%)`} 
                  stroke="#10b981" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorIndex)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="fixedDeposit" 
                  name="Fixed Deposit (6.5%)" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  fillOpacity={0} 
                />
                <Area 
                  type="monotone" 
                  dataKey="invested" 
                  name="Cumulative Principal (0%)" 
                  stroke="#94a3b8" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5} 
                  fillOpacity={1} 
                  fill="url(#colorInvested)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight: The Cost of Delay */}
        <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-700" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-xs font-semibold text-amber-950">
              Opportunity Cost of Inaction (5-Year Delay): {formatCurrency(lostWealth, currency)}
            </h5>
            <p className="text-xs text-amber-800 leading-relaxed">
              Delaying inception by 5 years under this {formatCurrency(monthlySIP, currency)} monthly schedule yields {formatCurrency(waitingResult.futureValue, currency)} instead of {formatCurrency(result.futureValue, currency)} due to truncated compounding cycles.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
