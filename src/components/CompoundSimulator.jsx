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
  Sparkles, 
  Clock, 
  Flame, 
  Zap,
  HelpCircle
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
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-700/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>⛄</span> The Eighth Wonder of the World
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            The Magic Compounding Snowball Simulator
          </h2>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base leading-relaxed">
            See how a modest monthly amount grows into life-changing wealth over time. 
            Notice how in the later years, the <span className="font-bold underline decoration-amber-400">compound interest</span> makes way more money than your monthly deposits!
          </p>
        </div>
      </div>

      {/* Main Simulator Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          
          {/* Monthly SIP Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Monthly SIP Amount
              </label>
              <span className="text-sm font-black text-emerald-700">
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
              className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>{formatCurrency(500, currency)}</span>
              <span>{formatCurrency(25000, currency)}</span>
              <span>{formatCurrency(50000, currency)}</span>
            </div>
          </div>

          {/* Expected Return % Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Expected Annual Return
              </label>
              <span className="text-sm font-black text-blue-700">
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
              className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>6% (FD)</span>
              <span>12% (Index)</span>
              <span>18% (Aggressive)</span>
            </div>
          </div>

          {/* Duration Years Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Time Horizon
              </label>
              <span className="text-sm font-black text-purple-700">
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
              className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

        </div>

        {/* 3 Big Stats Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total You Invested
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-800">
              {formatCurrency(result.totalInvested, currency)}
            </div>
            <p className="text-xs text-slate-500">
              From your monthly salary over {years} years
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Wealth Gained (Compounding)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              +{formatCurrency(result.wealthGained, currency)}
            </div>
            <p className="text-xs text-emerald-700">
              Free money earned by your money working!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-1">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              Total Future Corpus
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {formatCurrency(result.futureValue, currency)}
            </div>
            <p className="text-xs text-slate-300">
              At age of maturity
            </p>
          </div>

        </div>

        {/* Recharts Area Chart */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-base font-bold text-slate-900">
              Wealth Trajectory: Where does your money go?
            </h4>
            <span className="text-xs text-slate-500">
              Comparing Index SIP ({annualReturn}%) vs Fixed Deposit (6.5%) vs Locker Cash (0%)
            </span>
          </div>

          <div className="h-72 sm:h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.yearlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIndex" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
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
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area 
                  type="monotone" 
                  dataKey="indexSIP" 
                  name={`Index Fund (${annualReturn}%)`} 
                  stroke="#10b981" 
                  strokeWidth={3} 
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
                  name="Your Own Deposits (0%)" 
                  stroke="#94a3b8" 
                  strokeDasharray="4 4" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorInvested)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Eye-Opening Insight: The Cost of Delay */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-black text-amber-900">
              The Brutal Cost of Waiting 5 Years: {formatCurrency(lostWealth, currency)} lost!
            </h5>
            <p className="text-xs text-amber-800 leading-relaxed">
              If you wait 5 years before starting this exact same {formatCurrency(monthlySIP, currency)} SIP, 
              you end up with {formatCurrency(waitingResult.futureValue, currency)} instead of {formatCurrency(result.futureValue, currency)}. 
              <strong> You lose {formatCurrency(lostWealth, currency)} in compounding power just by hesitating!</strong>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
