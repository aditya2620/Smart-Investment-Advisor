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
  
  const emergencyTarget = monthlyExpenses * monthsTarget;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Risk Management & Liquidity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Foundational Safety Checklist
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Establishing a dedicated liquidity reserve and independent insurance coverage ensures unexpected life events never force you to liquidate long-term equity positions during a market downturn.
          </p>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* Pillar 1: Emergency Fund */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center font-semibold text-xs">
            01
          </div>
          <div>
            <span className="text-[11px] font-medium text-emerald-800">Reserve Pillar 1</span>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">Emergency Cash Buffer</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Maintain 3 to 6 months of mandatory living expenses segregated in a liquid mutual fund or dedicated high-yield savings account.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-800 block">Strategic Purpose:</span>
            <p className="text-xs text-slate-600 leading-normal">
              Absorbs sudden medical bills, repairs, or income pauses without selling long-term compounding investments.
            </p>
          </div>
        </div>

        {/* Pillar 2: Health Insurance */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-semibold text-xs">
            02
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-600">Reserve Pillar 2</span>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">Base Health Insurance</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Secure an individual health policy (₹5 Lakh to ₹10 Lakh sum insured) independent of employer-provided group coverage.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-800 block">Strategic Purpose:</span>
            <p className="text-xs text-slate-600 leading-normal">
              Protects multi-year accumulated capital from being depleted by a single unexpected hospitalization.
            </p>
          </div>
        </div>

        {/* Pillar 3: High-Interest Debt */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-semibold text-xs">
            03
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-600">Reserve Pillar 3</span>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-0.5">Eliminate Revolving Debt</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Systematically pay off credit card balances, buy-now-pay-later dues, and unsecured personal loans charging 24% to 42% interest.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[11px] font-semibold text-slate-800 block">Strategic Purpose:</span>
            <p className="text-xs text-slate-600 leading-normal">
              Retiring a 36% interest liability delivers an immediate guaranteed risk-free equivalent return on capital.
            </p>
          </div>
        </div>

      </div>

      {/* Emergency Fund Target Calculator */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 block">
            Liquidity Modeling
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mt-0.5">
            Emergency Buffer Target Calculator
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Calculate your recommended liquid cash cushion before committing surplus to equities:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5 rounded-lg bg-slate-50/80 border border-slate-200">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Monthly Mandatory Living Outflow (Rent + Utilities + Essentials)
            </label>
            <input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-emerald-600 tabular-nums"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Reserve Coverage Duration
            </label>
            <div className="flex gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setMonthsTarget(m)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer tabular-nums ${
                    monthsTarget === m
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m} Months
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Target Summary */}
        <div className="p-4 sm:p-5 rounded-lg bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div>
            <span className="text-xs font-medium text-emerald-400 block">
              Calculated Target Reserve:
            </span>
            <div className="text-2xl font-semibold text-white mt-0.5 tabular-nums">
              {formatCurrency(emergencyTarget, currency)}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Recommended allocation vehicle: <strong>Direct Liquid Mutual Fund</strong> or dedicated separate savings account.
            </p>
          </div>

          <button
            onClick={onProceed}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0"
          >
            <span>Proceed to Salary Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
