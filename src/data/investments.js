export const INVESTMENT_TYPES = [
  {
    id: 'nifty-50-index',
    name: 'Nifty 50 Index Mutual Fund',
    category: 'Core Wealth Builder',
    categoryColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconName: 'TrendingUp',
    riskLevel: 3,
    riskLabel: 'Moderate (Long Term)',
    expectedReturn: '12% - 14% p.a.',
    minAmount: '₹500',
    liquidity: '1-2 Days (T+2)',
    idealHorizon: '5+ Years',
    verdict: 'Core Foundation for Long-Term Growth',
    kidExplanation: 'Provides proportional ownership across India\'s top 50 large-cap corporations (including Reliance, TCS, HDFC Bank, Infosys, and Tata). As the broader economy expands, fund valuation scales accordingly.',
    pros: [
      'Low expense ratio (typically 0.1% to 0.2%)',
      'Rules-based index weighting removes fund manager bias',
      'Historically outperforms ~85% of active large-cap funds over a 10-year horizon',
      'Low initial entry hurdle (from ₹500/month via SIP)'
    ],
    cons: [
      'Susceptible to cyclical broader market drawdowns (10% to 20%)',
      'Not designed for capital needed within 1 to 2 years'
    ],
    starterTip: 'Select a low-cost direct index fund (e.g. UTI Nifty 50 Index Fund Direct-Growth or Navi Nifty 50) with automated salary-day execution.'
  },
  {
    id: 'emergency-liquid-fund',
    name: 'Liquid / Overnight Mutual Fund',
    category: 'Safe Foundation',
    categoryColor: 'bg-slate-100 text-slate-800 border-slate-200',
    iconName: 'Shield',
    riskLevel: 1,
    riskLabel: 'Low',
    expectedReturn: '6.5% - 7.0% p.a.',
    minAmount: '₹500',
    liquidity: 'Instant / T+1 Day',
    idealHorizon: 'Immediate Reserve',
    verdict: 'Primary Liquidity & Emergency Buffer',
    kidExplanation: 'Invests exclusively in short-dated, high-quality debt instruments maturing within 1 to 91 days. Yields higher interest than traditional savings deposits with negligible volatility.',
    pros: [
      'Negligible volatility risk',
      'Instant redemption facility available (up to ₹50,000 within minutes)',
      'Consistently out-yields standard checking/savings deposit rates'
    ],
    cons: [
      'Returns track prevailing central bank repo rates',
      'Does not provide long-term inflation-beating capital growth'
    ],
    starterTip: 'Maintain 3 to 6 months of mandatory living expenses here to avoid liquidating equities during unforeseen events.'
  },
  {
    id: 'fixed-deposit-ppf',
    name: 'Fixed Deposit (FD) & PPF',
    category: 'Safe Foundation',
    categoryColor: 'bg-slate-100 text-slate-800 border-slate-200',
    iconName: 'Landmark',
    riskLevel: 1,
    riskLabel: 'Guaranteed',
    expectedReturn: '6.8% - 7.5% p.a.',
    minAmount: '₹1,000',
    liquidity: 'Premature penalty (FD) / 15-Yr lock (PPF)',
    idealHorizon: '1 to 15 Years',
    verdict: 'Guaranteed Principal Preservation',
    kidExplanation: 'Contracts with regulated banks or sovereign government programs (PPF) guaranteeing fixed yield and total principal protection at term.',
    pros: [
      'Contractually guaranteed principal and interest',
      'PPF maintains complete tax-free interest accrual (Exempt-Exempt-Exempt status)',
      'Suited for defined capital expenditure required within 1 to 2 years'
    ],
    cons: [
      'Net real returns barely beat inflation after income tax deductions on FD interest',
      'PPF enforces a 15-year statutory lock-in period'
    ],
    starterTip: 'Allocate to FDs only for near-term known expenses. Avoid parking long-term retirement allocations entirely in fixed deposits.'
  },
  {
    id: 'sovereign-gold-bonds',
    name: 'Gold (SGB & Gold ETFs)',
    category: 'Hedge & Stability',
    categoryColor: 'bg-amber-50 text-amber-800 border-amber-200',
    iconName: 'Coins',
    riskLevel: 2,
    riskLabel: 'Low to Moderate',
    expectedReturn: '9% - 11% p.a.',
    minAmount: '₹100 (ETF) / 1 Gram (SGB)',
    liquidity: 'Market Hours (Exchange)',
    idealHorizon: '5 to 8 Years',
    verdict: 'Portfolio Volatility Hedge',
    kidExplanation: 'Securitized or sovereign-backed digital exposure tracking spot gold prices, removing manufacturing wastage, locker charges, and physical security risk.',
    pros: [
      'Historical negative correlation to sharp global equity drawdowns and geopolitical tension',
      'Sovereign Gold Bonds (SGB) offer an additional 2.5% annual coupon yield',
      'Zero storage fees or physical purity concerns'
    ],
    cons: [
      'Gold generates no productive cash flows or corporate dividends',
      'Can experience extended multi-year periods of flat price action'
    ],
    starterTip: 'Cap gold holdings between 10% and 15% of your total liquid portfolio as an insurance buffer.'
  },
  {
    id: 'flexi-cap-funds',
    name: 'Flexi Cap Mutual Funds',
    category: 'Core Wealth Builder',
    categoryColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconName: 'Layers',
    riskLevel: 3,
    riskLabel: 'Moderate to High',
    expectedReturn: '13% - 16% p.a.',
    minAmount: '₹500',
    liquidity: '1-3 Days',
    idealHorizon: '7+ Years',
    verdict: 'Diversified Multi-Cap Exposure',
    kidExplanation: 'An actively managed fund strategy with the regulatory mandate to allocate dynamically across large-cap, mid-cap, and emerging small-cap equities.',
    pros: [
      'Higher alpha potential than pure large-cap index funds over bull market cycles',
      'Freedom to allocate selectively to international leaders (e.g. Parag Parikh Flexi Cap)',
      'Professional stock selection and risk-weighted rebalancing'
    ],
    cons: [
      'Higher expense ratios compared to passive index funds (~0.7% to 1.0%)',
      'Performance relies on fund management tenure and execution consistency'
    ],
    starterTip: 'Combine 1 Large-Cap Index Fund with 1 Flexi Cap Fund for comprehensive equity diversification.'
  },
  {
    id: 'direct-stocks',
    name: 'Direct Equity Stock Selection',
    category: 'Advanced / Active',
    categoryColor: 'bg-slate-100 text-slate-800 border-slate-200',
    iconName: 'BarChart3',
    riskLevel: 4,
    riskLabel: 'High',
    expectedReturn: 'Variable (-40% to +35%)',
    minAmount: 'Share price',
    liquidity: 'T+1 Day',
    idealHorizon: '5+ Years',
    verdict: 'Requires Research; Allocate Max 5–10%',
    kidExplanation: 'Direct ownership of individual publicly listed companies. Performance is directly tied to that specific enterprise\'s operational earnings, balance sheet strength, and leadership.',
    pros: [
      'Uncapped upside potential if selecting market-leading compounders',
      'Zero annual management expense ratios'
    ],
    cons: [
      'Demands continuous fundamental analysis of quarterly earnings and balance sheets',
      'Single-stock concentration risk can lead to sudden, severe capital drawdown'
    ],
    starterTip: 'Avoid unverified social media tips. If balance sheet mechanics are unfamiliar, index funds remain superior for primary wealth compounding.'
  },
  {
    id: 'fo-and-day-trading',
    name: 'Futures & Options (F&O) & Intraday Trading',
    category: 'High Risk / Speculative',
    categoryColor: 'bg-rose-50 text-rose-800 border-rose-200',
    iconName: 'AlertOctagon',
    riskLevel: 5,
    riskLabel: 'Extreme / Speculative',
    expectedReturn: 'Negative for 93% of participants (SEBI Study)',
    minAmount: 'Margin requirement',
    liquidity: 'Intraday',
    idealHorizon: 'Not Recommended for Beginners',
    verdict: 'High-Risk Speculative Instrument; Not Recommended',
    kidExplanation: 'Short-term leveraged derivative betting on rapid price direction. High transaction frictions, decay, and leverage turn odds overwhelmingly negative for retail participants.',
    pros: [
      'High institutional utility for professional corporate hedging'
    ],
    cons: [
      'Official SEBI data confirms 93% of retail traders incur net losses averaging ₹1.25 Lakh',
      'Transaction costs, exchange levies, and STT rapidly erode trading balances',
      'Significant cognitive stress and psychological depletion'
    ],
    starterTip: 'Protect early career savings. Avoid derivative trading, leverage, and paid tip advisory groups.'
  }
];
