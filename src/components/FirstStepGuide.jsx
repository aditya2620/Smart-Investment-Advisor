import React from 'react';
import { 
  CheckCircle, 
  Smartphone, 
  FileCheck, 
  Search, 
  CalendarClock, 
  HelpCircle,
  AlertCircle,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function FirstStepGuide() {
  const steps = [
    {
      num: '01',
      title: 'Select a Regulated Direct Platform',
      description: 'Use a SEBI-registered platform to invest directly into asset management companies without distributor commissions.',
      options: [
        { name: 'Groww', note: 'Streamlined mobile onboarding and paperless account verification.' },
        { name: 'Zerodha Coin', note: 'Integrated with India\'s largest discount brokerage infrastructure.' },
        { name: 'Kuvera', note: 'Direct mutual fund execution with systematic goal-tracking tools.' }
      ]
    },
    {
      num: '02',
      title: 'Digital KYC Verification',
      description: 'Statutory Know-Your-Customer onboarding is completed once digitally across all Indian financial institutions.',
      items: [
        'Permanent Account Number (PAN Card)',
        'Aadhaar Card (Linked with active mobile for OTP validation)',
        'Bank Account verification (Account number + IFSC for automated mandates)',
        'Digital selfie verification'
      ]
    },
    {
      num: '03',
      title: 'Identify Direct-Growth Scheme Variants',
      description: 'Ensure scheme selection uses the "Direct - Growth" share class rather than commission-bearing "Regular" variants.',
      highlight: 'Search query format: "UTI Nifty 50 Index Fund Direct - Growth"',
      rules: [
        '"Direct": Zero intermediary trail commissions deducted from fund NAV.',
        '"Growth": All accrued dividends and capital gains are automatically reinvested for compounding.'
      ]
    },
    {
      num: '04',
      title: 'Establish Scheduled Monthly Auto-Debit',
      description: 'Automate contributions to transfer funds prior to discretionary monthly expenditures.',
      advice: 'Schedule the auto-debit 2 to 4 business days after your standard monthly salary credit date.'
    }
  ];

  const faqs = [
    {
      q: 'Should I prioritize an Index Fund SIP or buy individual company equities?',
      a: 'For early career investors, large-cap index funds provide instant institutional diversification across 50 market leaders without demanding quarterly earnings analysis. A disciplined approach allocates 80% to 90% into diversified index funds, leaving an optional 10% discretionary allocation for individual equity research.'
    },
    {
      q: 'What occurs if my bank balance is insufficient on the SIP scheduled date?',
      a: 'The mutual fund does not assess financial penalties; that specific month\'s installment is skipped. However, verify that your banking institution does not levy an auto-debit bounce charge. SIP mandates can be paused, modified, or terminated online at any time.'
    },
    {
      q: 'What is the standard redemption liquidity cycle?',
      a: 'Liquid mutual funds typically credit bank accounts on the same or next business day (T+1). Domestic equity mutual funds follow statutory T+2 trade settlement cycles.'
    },
    {
      q: 'Why avoid "Regular" mutual fund plans offered by bank branches?',
      a: 'Regular plans deduct ongoing intermediary commissions (typically 0.5% to 1.5% annually) directly from the fund\'s Net Asset Value. Over a 15-year compounding period, this fee difference can consume 15% to 20% of total wealth accumulation compared to Direct plans.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <Compass className="w-3.5 h-3.5" />
            <span>Onboarding Workflow</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Implementation & Execution Roadmap
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Follow this sequential checklist to establish your paperless direct investment pipeline, complete regulatory compliance, and automate monthly contributions.
          </p>
        </div>
      </div>

      {/* 4 Steps Timeline Cards */}
      <div className="space-y-3">
        {steps.map((step) => (
          <div 
            key={step.num}
            className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-start gap-4"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center font-semibold text-xs shrink-0">
              {step.num}
            </div>

            <div className="flex-1 space-y-2.5">
              <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {step.description}
              </p>

              {/* Option cards if present */}
              {step.options && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {step.options.map((opt) => (
                    <div key={opt.name} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-semibold text-slate-900 text-xs block mb-0.5">
                        {opt.name}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-normal block">
                        {opt.note}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Items checklist if present */}
              {step.items && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium p-2 rounded-md bg-slate-50 border border-slate-200">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlight rule if present */}
              {step.highlight && (
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-800">
                    Recommended Search Nomenclature:
                  </div>
                  <div className="text-xs font-mono text-emerald-800 bg-white p-2 rounded border border-slate-200">
                    {step.highlight}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600 pt-0.5">
                    {step.rules.map((r, i) => (
                      <span key={i}>• {r}</span>
                    ))}
                  </div>
                </div>
              )}

              {step.advice && (
                <div className="p-2.5 rounded-lg bg-slate-100 text-xs text-slate-700 font-medium">
                  <strong>Guideline:</strong> {step.advice}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs space-y-3.5">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          Implementation Considerations
        </h3>

        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="text-xs font-semibold text-slate-900">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
