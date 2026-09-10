import React from 'react';
import { 
  CheckCircle, 
  Smartphone, 
  FileCheck, 
  Search, 
  CalendarClock, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function FirstStepGuide() {
  const steps = [
    {
      num: '01',
      title: 'Choose a Verified Direct Broker App',
      description: 'You need an SEBI-registered broker to invest directly in mutual funds with ZERO middlemen commissions.',
      options: [
        { name: 'Groww', note: 'Most intuitive for absolute beginners, instant paperless onboarding.' },
        { name: 'Zerodha Coin', note: 'India\'s largest discount broker, robust and trusted by millions.' },
        { name: 'Kuvera', note: 'Dedicated direct mutual fund platform with great goal tracking.' }
      ]
    },
    {
      num: '02',
      title: '10-Minute Paperless KYC Check',
      description: 'By Indian government law, you only have to do KYC once in your entire life.',
      items: [
        'PAN Card (Number & photo)',
        'Aadhaar Card (Must have your active mobile number linked for OTP)',
        'Bank Account Details (Account number + IFSC code for SIP auto-debit)',
        'Quick 5-second selfie verification'
      ]
    },
    {
      num: '03',
      title: 'Search the Exact Fund Name',
      description: 'Do not accidentally pick "Regular" funds that pay fat commissions to bank agents!',
      highlight: 'Always search: "UTI Nifty 50 Index Fund Direct - Growth" or "Navi Nifty 50 Index Fund Direct - Growth"',
      rules: [
        'Word "Direct": Means 0% broker commission.',
        'Word "Growth": Means profits are reinvested to trigger compound growth (never pick IDCW/Dividend).'
      ]
    },
    {
      num: '04',
      title: 'Set Your Auto-Debit SIP Date',
      description: 'Automate your investing before you can spend it on weekend food deliveries.',
      advice: 'Pick a date 2-4 days after your monthly salary credits (e.g. 3rd, 5th, or 7th of every month).'
    }
  ];

  const faqs = [
    {
      q: 'What happens if I don’t have enough balance on my SIP date?',
      a: 'The mutual fund does NOT fine you! Your SIP for that single month is simply skipped. However, make sure your bank does not charge an auto-debit bounce fee (usually ₹100-₹250). You can pause or stop your SIP anytime with 1 click in the app.'
    },
    {
      q: 'How do I withdraw my money if I urgently need it?',
      a: 'In liquid funds, you can withdraw within minutes. In equity index funds, click "Redeem" in the app, and the money lands safely in your verified bank account within 1 to 2 business days (T+2 settlement).'
    },
    {
      q: 'Can a bank employee sell me a better mutual fund?',
      a: 'BEWARE! Bank branch managers often push "Regular" mutual funds or expensive ULIP insurance plans because they earn fat upfront commissions. Always insist on investing in "Direct" plans yourself online.'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-700/10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>🚀</span> From Zero to Investor
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            The Day 1 Action Roadmap
          </h2>
          <p className="mt-2 text-blue-100 text-sm sm:text-base leading-relaxed">
            Follow these 4 simple steps to set up your very first ₹500 SIP this weekend.
            No bank visits, no paperwork, 100% digital from your smartphone.
          </p>
        </div>
      </div>

      {/* 4 Steps Timeline Cards */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div 
            key={step.num}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black text-2xl shrink-0">
              {step.num}
            </div>

            <div className="flex-1 space-y-3">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>

              {/* Option cards if present */}
              {step.options && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {step.options.map((opt) => (
                    <div key={opt.name} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-extrabold text-slate-900 text-sm block mb-1">
                        {opt.name}
                      </span>
                      <span className="text-xs text-slate-500 leading-normal block">
                        {opt.note}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Items checklist if present */}
              {step.items && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-800 font-medium p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight rule if present */}
              {step.highlight && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
                  <div className="text-xs font-black text-blue-900">
                    💡 What to type in search bar:
                  </div>
                  <div className="text-xs sm:text-sm font-black text-blue-700 bg-white p-2.5 rounded-lg border border-blue-200">
                    {step.highlight}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-blue-800 font-medium pt-1">
                    {step.rules.map((r, i) => (
                      <span key={i}>• {r}</span>
                    ))}
                  </div>
                </div>
              )}

              {step.advice && (
                <div className="p-3 rounded-xl bg-slate-100 text-xs text-slate-700 font-medium">
                  <strong>💡 Pro-tip:</strong> {step.advice}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Beginner FAQ Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          Common First-Time Doubts
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
