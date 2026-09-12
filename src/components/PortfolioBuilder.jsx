import React, { useState } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  FileText, 
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCurrency, getPortfolioAllocation } from '../utils/financialMath';

export default function PortfolioBuilder({ investAmount, currency, onSimulate }) {
  const [riskProfile, setRiskProfile] = useState('balanced'); // 'conservative' | 'balanced' | 'growth'
  const [quizStep, setQuizStep] = useState(0);
  const [showChecklist, setShowChecklist] = useState(true);

  const questions = [
    {
      question: "If your ₹1,000 investment drops to ₹850 next month due to bad news, how do you react?",
      options: [
        { label: "Panic and withdraw whatever is left! I hate losing money.", profile: "conservative" },
        { label: "Do nothing. I know market drops are normal and it will recover.", profile: "balanced" },
        { label: "Excited! Everything is on discount, I want to invest more!", profile: "growth" }
      ]
    },
    {
      question: "When are you planning to withdraw or use this invested money?",
      options: [
        { label: "Within 1 to 2 years for a vacation, gadget, or bike.", profile: "conservative" },
        { label: "In 3 to 7 years for buying a car or house down-payment.", profile: "balanced" },
        { label: "In 7 to 20+ years for financial freedom and early retirement.", profile: "growth" }
      ]
    },
    {
      question: "What matters more to you right now?",
      options: [
        { label: "100% Capital Safety. I want guaranteed peace of mind.", profile: "conservative" },
        { label: "Beating inflation with steady, proven companies.", profile: "balanced" },
        { label: "Maximum long-term wealth growth, even with bumps along the way.", profile: "growth" }
      ]
    }
  ];

  const handleQuizAnswer = (profile) => {
    setRiskProfile(profile);
    if (quizStep < questions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const allocations = getPortfolioAllocation(investAmount || 5000, riskProfile);

  const profileMeta = {
    conservative: {
      name: 'The Cautious Turtle',
      badge: 'Safety First',
      emoji: '🐢',
      color: 'border-emerald-300 bg-emerald-50/50',
      description: 'You prefer sound sleep over rapid growth. Your money is heavily shielded in safe havens with a modest slice in top 50 companies.'
    },
    balanced: {
      name: 'The Steady Owl',
      badge: 'Recommended for Most Starters',
      emoji: '🦉',
      color: 'border-blue-300 bg-blue-50/50',
      description: 'The golden middle path: 65% of your money grows with India\'s top 50 businesses, backed by a 20% liquid safety cushion and 15% gold hedge.'
    },
    growth: {
      name: 'The Wealth Cheetah',
      badge: 'Long-Term Rocket',
      emoji: '🐆',
      color: 'border-purple-300 bg-purple-50/50',
      description: 'You are young, investing for 7+ years, and market dips don’t scare you. You want maximum compounding power through top index and flexi cap funds.'
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Risk Profile Selection Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Personalized Asset Allocation
            </span>
            <span className="text-xs font-medium text-slate-500">
              Monthly Budget: <strong className="text-slate-900">{formatCurrency(investAmount || 5000, currency)}</strong>
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-2">
            Where Exactly Should You Put Your Money?
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            This generates your personalized investment plan. Choose your risk personality below to calculate your exact monthly asset split:
          </p>
        </div>

        {/* 3 Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['conservative', 'balanced', 'growth']).map((key) => {
            const isSelected = riskProfile === key;
            const p = profileMeta[key];
            return (
              <div
                key={key}
                onClick={() => {
                  setRiskProfile(key);
                  triggerConfetti();
                }}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? `${p.color} border-slate-900 shadow-md scale-102`
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="text-3xl mb-2">{p.emoji}</div>
                <h4 className="font-extrabold text-slate-900 text-base">{p.name}</h4>
                <span className="inline-block text-[11px] font-semibold text-slate-500 mb-2">
                  {p.badge}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick 1-Question Mini Quiz Expander */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Need help deciding? Answer this quick question:
            </span>
            <span className="text-xs text-slate-400">
              Question {quizStep + 1} of {questions.length}
            </span>
          </div>

          <p className="text-sm font-bold text-slate-900">
            {questions[quizStep].question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            {questions[quizStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuizAnswer(opt.profile)}
                className="p-3 text-xs font-medium text-left rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-slate-800 transition-all cursor-pointer shadow-2xs"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Your Exact Rupees Breakdown */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl shadow-slate-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Your Day 1 Action Blueprint
            </span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              Your Monthly Split: {formatCurrency(investAmount || 5000, currency)}
            </h3>
          </div>
          <button
            onClick={onSimulate}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>See How This Grows in 10 Yrs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allocations.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white/10 text-emerald-300">
                  {item.percentage}% of salary
                </span>
                <span className="text-lg font-black text-white">
                  {formatCurrency(item.amount, currency)}
                  <span className="text-xs font-normal text-slate-400 ml-1">/mo</span>
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-700">
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                  Starter Pick for Beginners:
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {item.exampleAsset}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Step Checklist: How to actually start */}
      {showChecklist && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Day 1 Action Checklist: How to Start in 15 Minutes
            </h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Zero Confusion
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">Pick an Official Broker</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download **Groww**, **Zerodha Coin**, or **Kuvera**. They are SEBI-registered direct mutual fund platforms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">10-Min Paperless KYC</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keep your **PAN Card**, **Aadhaar** (with phone OTP), and bank account details ready for paperless verification.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">Search the Direct Fund</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search for <strong>"UTI Nifty 50 Index Fund Direct-Growth"</strong>. Always choose <em>"Direct - Growth"</em> (saves ~1% commission every year).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h5 className="font-extrabold text-slate-900 text-sm">Automate Your SIP</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select your monthly SIP date (e.g. 5th of every month) and authorize bank auto-debit. Now your wealth grows on autopilot!
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
