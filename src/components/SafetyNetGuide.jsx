import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  HeartHandshake, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Info
} from 'lucide-react';
import { formatCurrency } from '../utils/financialMath';

export default function SafetyNetGuide({ salary, currency, onProceed }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState(Math.round(salary * 0.5) || 15000);
  const [monthsTarget, setMonthsTarget] = useState(6);
  
  // Emergency fund target
  const emergencyTarget = monthlyExpenses * monthsTarget;

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-900/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>🛡️</span> Day Zero: The Safety Shield
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            What You MUST Do BEFORE Investing a Single Rupee
          </h2>
          <p className="mt-2 text-teal-100 text-sm sm:text-base leading-relaxed">
            Most people invest ₹10,000 into stocks, face an unexpected medical or family emergency next month, 
            and are forced to sell their stocks at a loss. Here is how you protect yourself first.
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Emergency Fund */}
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-400 shadow-sm space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-lg">
            1
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">Pillar 1</span>
            <h3 className="text-lg font-black text-slate-900">Emergency Fund</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              3 to 6 months of living expenses parked in a safe Liquid Mutual Fund or high-interest savings account.
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
            <span className="text-xs font-bold text-emerald-900 block">Why this matters:</span>
            <p className="text-[11px] text-emerald-800 leading-normal">
              If you lose your job or face an urgent bill, you never have to panic-sell your long-term stocks at a market bottom.
            </p>
          </div>
        </div>

        {/* Pillar 2: Health Insurance */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-lg">
            2
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">Pillar 2</span>
            <h3 className="text-lg font-black text-slate-900">Health Insurance</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              A ₹5 Lakh to ₹10 Lakh basic individual health cover (beyond your office corporate cover).
            </p>
          </div>

          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-2">
            <span className="text-xs font-bold text-blue-900 block">Why this matters:</span>
            <p className="text-[11px] text-blue-800 leading-normal">
              A single 3-day hospital stay in India can cost ₹2 Lakh to ₹4 Lakh and wipe out 3 years of your stock market savings.
            </p>
          </div>
        </div>

        {/* Pillar 3: Kill Toxic Debt */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold text-lg">
            3
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-700">Pillar 3</span>
            <h3 className="text-lg font-black text-slate-900">Kill Toxic Debt</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Credit card outstanding balances and instant loan app EMIs charging 24% to 42% interest.
            </p>
          </div>

          <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 space-y-2">
            <span className="text-xs font-bold text-rose-900 block">Why this matters:</span>
            <p className="text-[11px] text-rose-800 leading-normal">
              Paying off a 36% credit card debt is the exact mathematical equivalent of getting a <strong>guaranteed 36% return</strong> on your money!
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Emergency Fund Target Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Interactive Calculator
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-1">
            Calculate Your Personal Emergency Fund Target
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            How much should you keep locked safely before putting money into the market?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Monthly Essential Expenses (Rent + Food + Bills)
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 text-base font-bold bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Safety Cushion Duration
            </label>
            <div className="flex gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setMonthsTarget(m)}
                  className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl border transition-all ${
                    monthsTarget === m
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Result Target Callout */}
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Your Emergency Fund Target:
            </span>
            <div className="text-3xl font-black text-emerald-950 mt-0.5">
              {formatCurrency(emergencyTarget, currency)}
            </div>
            <p className="text-xs text-emerald-800 mt-1">
              Store this in a <strong>Liquid Mutual Fund</strong> (e.g. ICICI / HDFC Liquid Fund) or High-Interest Savings Account.
            </p>
          </div>

          <button
            onClick={onProceed}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>I've Got This, Let's Invest!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
