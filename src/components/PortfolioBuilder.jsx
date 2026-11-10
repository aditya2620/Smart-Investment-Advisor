import React, { useState } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  FileText, 
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { formatCurrency, getPortfolioAllocation } from '../utils/financialMath';

export default function PortfolioBuilder({ investAmount, currency, onSimulate }) {
  const [riskProfile, setRiskProfile] = useState('balanced'); // 'conservative' | 'balanced' | 'growth'
  const [quizStep, setQuizStep] = useState(0);

  const questions = [
    {
      question: "If your portfolio declines 15% in a short-term market downturn, what is your reaction?",
      options: [
        { label: "Liquidate immediately to prevent further downside.", profile: "conservative" },
        { label: "Hold positions and continue scheduled monthly contributions.", profile: "balanced" },
        { label: "View lower valuations as an opportunity to allocate additional capital.", profile: "growth" }
      ]
    },
    {
      question: "What is your primary investment time horizon for this capital?",
      options: [
        { label: "1 to 2 years (near-term liquidity needed)", profile: "conservative" },
        { label: "3 to 7 years (medium-term planned goals)", profile: "balanced" },
        { label: "7+ years (long-term wealth accumulation)", profile: "growth" }
      ]
    },
    {
      question: "Which portfolio objective aligns best with your financial goals?",
      options: [
        { label: "Capital preservation with minimal fluctuation", profile: "conservative" },
        { label: "Consistent returns outpacing inflation with moderate stability", profile: "balanced" },
        { label: "Maximum compounding growth over the long run", profile: "growth" }
      ]
    }
  ];

  const handleQuizAnswer = (profile) => {
    setRiskProfile(profile);
    if (quizStep < questions.length - 1) {
      setQuizStep(quizStep + 1);
    }
  };

  const allocations = getPortfolioAllocation(investAmount || 5000, riskProfile);

  const profileMeta = {
    conservative: {
      name: 'Capital Preservation',
      badge: 'Defensive Horizon',
      icon: Shield,
      description: 'Prioritizes capital protection. The majority of funds are held in liquid reserves and fixed income, with a defensive equity slice.'
    },
    balanced: {
      name: 'Balanced Growth',
      badge: 'Standard Starter Benchmark',
      icon: Layers,
      description: 'Disciplined core allocation: 65% in large-cap index equities, reinforced with a 20% liquid reserve and 15% gold hedge.'
    },
    growth: {
      name: 'Long-Term Compounding',
      badge: 'Extended Horizon (7+ Yrs)',
      icon: TrendingUp,
      description: 'Higher equity exposure structured to maximize compound interest and beat inflation across an extended time horizon.'
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Risk Profile Selection Header */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/80">
              Asset Allocation Blueprint
            </span>
            <span className="text-xs text-slate-500">
              Monthly allocation: <strong className="text-slate-900 font-semibold tabular-nums">{formatCurrency(investAmount || 5000, currency)}</strong>
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mt-2">
            Target Allocation Strategy
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
            Select an allocation profile below, or answer the 3 profiling questions to determine your risk profile:
          </p>
        </div>

        {/* 3 Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['conservative', 'balanced', 'growth']).map((key) => {
            const isSelected = riskProfile === key;
            const p = profileMeta[key];
            const IconComp = p.icon;
            return (
              <div
                key={key}
                onClick={() => setRiskProfile(key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-600/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3.5 right-3.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                )}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <IconComp className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">{p.name}</h4>
                <span className="inline-block text-[10px] font-medium text-slate-500 mb-1.5">
                  {p.badge}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* 1-Question Mini Quiz Expander */}
        <div className="p-4 rounded-lg bg-slate-50/80 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              Risk assessment question:
            </span>
            <span className="text-xs text-slate-400">
              {quizStep + 1} of {questions.length}
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-900">
            {questions[quizStep].question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
            {questions[quizStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuizAnswer(opt.profile)}
                className="p-2.5 text-xs font-medium text-left rounded-lg bg-white border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/30 text-slate-800 transition-colors cursor-pointer"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Target Breakdown */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-7 space-y-5 border border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3.5">
          <div>
            <span className="text-xs font-medium text-emerald-400">
              Execution Blueprint
            </span>
            <h3 className="text-base sm:text-lg font-semibold mt-0.5">
              Target Monthly Allocation: <span className="text-white tabular-nums">{formatCurrency(investAmount || 5000, currency)}</span>
            </h3>
          </div>
          <button
            onClick={onSimulate}
            className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Simulate 10-Year Compounding</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {allocations.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/70 rounded-lg p-4 border border-slate-700/80 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-700 text-emerald-300">
                  {item.percentage}% weighting
                </span>
                <span className="text-sm sm:text-base font-semibold text-white tabular-nums">
                  {formatCurrency(item.amount, currency)}
                  <span className="text-xs font-normal text-slate-400 ml-1">/mo</span>
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-white text-xs sm:text-sm">{item.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-700/80">
                <span className="text-[11px] text-slate-400 block mb-0.5">
                  Standard benchmark choice:
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  {item.exampleAsset}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Step Checklist */}
      <div className="bg-white rounded-xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Execution Checklist: Onboarding Workflow
          </h3>
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
            Step-by-Step
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h5 className="font-semibold text-slate-900 text-xs">Direct Platform Account</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open an account on SEBI-registered direct mutual fund platforms (Groww, Zerodha Coin, or Kuvera).
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h5 className="font-semibold text-slate-900 text-xs">Paperless KYC Verification</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete one-time regulatory KYC with PAN, Aadhaar OTP, and bank verification.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h5 className="font-semibold text-slate-900 text-xs">Locate Direct-Growth Fund</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select <strong>"Direct - Growth"</strong> scheme variants to avoid third-party intermediary commissions.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-200 space-y-1.5">
            <div className="w-6 h-6 rounded bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h5 className="font-semibold text-slate-900 text-xs">Automate Monthly Mandate</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Schedule bank auto-debit 2–3 days following monthly salary credit to automate wealth compounding.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
