export const INVESTMENT_TYPES = [
  {
    id: 'nifty-50-index',
    name: 'Nifty 50 Index Mutual Fund',
    category: 'Core Wealth Builder',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    emoji: '🇮🇳',
    riskLevel: 3, // 1 to 5
    riskLabel: 'Moderate (Long Term)',
    expectedReturn: '12% - 14% p.a.',
    minAmount: '₹500',
    liquidity: '1-2 Days (T+2)',
    idealHorizon: '5+ Years',
    verdict: '⭐ The #1 Best Place for Beginners',
    kidExplanation: 'You automatically own a small slice of India\'s top 50 giant corporations (like Reliance, TCS, HDFC Bank, Infosys, Tata). If India grows, your money grows.',
    pros: [
      'Very low expense ratio (charges only ~0.1% to 0.2%)',
      'Zero fund manager bias or human error',
      'Historically beats 85% of active mutual funds over 10 years',
      'Start with as little as ₹500/month via SIP'
    ],
    cons: [
      'Can drop 10-20% temporarily in market recessions',
      'Not suitable if you need the money within 1-2 years'
    ],
    starterTip: 'Pick any low-cost direct index fund (e.g. UTI Nifty 50 Index Fund Direct-Growth or Navi Nifty 50) and set an auto-debit SIP for your salary day.'
  },
  {
    id: 'emergency-liquid-fund',
    name: 'Liquid / Overnight Mutual Fund',
    category: 'Safe Foundation',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    emoji: '💧',
    riskLevel: 1,
    riskLabel: 'Very Low',
    expectedReturn: '6.5% - 7.0% p.a.',
    minAmount: '₹500',
    liquidity: 'Instant / Same Day',
    idealHorizon: 'Anytime (Emergency)',
    verdict: '🛡️ Perfect for Your Emergency Fund',
    kidExplanation: 'Like a smart bank account that lends money to ultra-safe institutions for only 1 to 90 days. Much higher return than a 2.5% savings account, with zero stock market volatility.',
    pros: [
      'Almost zero risk of negative returns',
      'Instant redemption (up to ₹50,000 withdrawn within seconds)',
      'Earns more than standard savings accounts'
    ],
    cons: [
      'Does not create big wealth or beat high inflation',
      'Returns fluctuate with RBI interest rate cycles'
    ],
    starterTip: 'Keep your 3 to 6 months of living expenses here so you never touch your long-term stocks during emergencies.'
  },
  {
    id: 'fixed-deposit-ppf',
    name: 'Fixed Deposit (FD) & PPF',
    category: 'Safe Foundation',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    emoji: '🏛️',
    riskLevel: 1,
    riskLabel: 'Guaranteed',
    expectedReturn: '6.8% - 7.5% p.a.',
    minAmount: '₹1,000',
    liquidity: 'Premature penalty (FD) / 15-Yr lock (PPF)',
    idealHorizon: '1 to 15 Years',
    verdict: '🔒 Safe Haven for Near-Term Goals',
    kidExplanation: 'You loan your money to the bank or Government of India. In return, they give you an iron-clad guarantee that you will get your money back with fixed interest.',
    pros: [
      '100% peace of mind, zero sleepless nights',
      'PPF offers complete tax-free interest (EEE status)',
      'Great for money you need for wedding, bike, or laptop in 1-2 years'
    ],
    cons: [
      'Barely keeps up with real inflation after paying income tax on FD interest',
      'PPF locks your money for 15 years'
    ],
    starterTip: 'Use FDs for planned expenses within 2 years. Do NOT park your 20-year retirement money in FDs alone.'
  },
  {
    id: 'sovereign-gold-bonds',
    name: 'Gold (SGB & Gold ETFs)',
    category: 'Hedge & Stability',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    emoji: '🪙',
    riskLevel: 2,
    riskLabel: 'Low to Moderate',
    expectedReturn: '9% - 11% p.a.',
    minAmount: '₹100 (ETF) / 1 Gram (SGB)',
    liquidity: 'Instant on stock exchange',
    idealHorizon: '5 to 8 Years',
    verdict: '🛡️ Portfolio Protector',
    kidExplanation: 'Instead of buying heavy gold jewelry with 15% making charges and locker fees, you buy paper or digital gold that tracks real gold prices.',
    pros: [
      'Historically rises when wars or market crashes happen',
      'Sovereign Gold Bonds (SGB) even pay an extra 2.5% annual interest on top of gold price appreciation',
      'Zero storage or theft worries'
    ],
    cons: [
      'Gold does not create products or profits like companies do',
      'Can remain flat for multiple years in a row'
    ],
    starterTip: 'Limit gold to 10% to 15% of your total portfolio as an insurance policy.'
  },
  {
    id: 'flexi-cap-funds',
    name: 'Flexi Cap Mutual Funds',
    category: 'Core Wealth Builder',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    emoji: '🚀',
    riskLevel: 3,
    riskLabel: 'Moderate to High',
    expectedReturn: '13% - 16% p.a.',
    minAmount: '₹500',
    liquidity: '1-3 Days',
    idealHorizon: '7+ Years',
    verdict: '🌟 Excellent 2nd Step after Index Fund',
    kidExplanation: 'An experienced fund manager picks the best companies of all sizes—giants, medium rising stars, and small innovators—and moves money where the highest growth is.',
    pros: [
      'Higher return potential than just index funds',
      'Flexibility to invest in global stocks (e.g. Parag Parikh Flexi Cap)',
      'Professional stock picking'
    ],
    cons: [
      'Higher expense ratio than index funds (~0.7% to 1%)',
      'Depends on the skill of the fund manager'
    ],
    starterTip: 'Combine 1 Nifty 50 Index Fund + 1 Flexi Cap Fund for a complete equity portfolio.'
  },
  {
    id: 'direct-stocks',
    name: 'Direct Stock Picking',
    category: 'Advanced / Active',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    emoji: '📈',
    riskLevel: 4,
    riskLabel: 'High Risk',
    expectedReturn: 'Volatile (-50% to +30%)',
    minAmount: 'Price of 1 share',
    liquidity: 'T+1 Day',
    idealHorizon: '5+ Years',
    verdict: '⚠️ Learn First, Only Invest 5% of Salary',
    kidExplanation: 'Buying shares of one specific company you choose yourself (like Zomato, ITC, or Apple). If the company does great, you make money. If they make bad decisions, you can lose half your money.',
    pros: [
      'High satisfaction and potential for outsized multi-bagger returns',
      'Zero fund management fees'
    ],
    cons: [
      'Requires reading financial reports, balance sheets, and quarterly calls',
      'Emotional stress when a stock plunges 30% on bad news'
    ],
    starterTip: 'Don\'t buy stocks based on WhatsApp or Instagram tips. If you don\'t understand how the company makes profit, stick to Index Funds.'
  },
  {
    id: 'fo-and-day-trading',
    name: 'Futures & Options (F&O) & Intraday',
    category: 'Dangerous Trap',
    categoryColor: 'bg-red-100 text-red-800 border-red-200',
    emoji: '💣',
    riskLevel: 5,
    riskLabel: 'Extreme / Gambling',
    expectedReturn: 'Negative for 93% of people',
    minAmount: '₹10,000+',
    liquidity: 'Minutes / Hours',
    idealHorizon: 'Do Not Do It',
    verdict: '🚫 Absolute Red Flag for Beginners',
    kidExplanation: 'Borrowing money to bet whether a stock will go up or down in the next 15 minutes. It is basically a casino disguised as finance.',
    pros: [
      'Flashy screenshots on Instagram that lure beginners'
    ],
    cons: [
      'Official SEBI report confirms 93% of retail traders lose an average of ₹1.25 Lakh',
      'Heavy brokerage and transaction taxes drain your account',
      'Severe psychological stress and anxiety'
    ],
    starterTip: 'Protect your hard-earned first salary. Never touch F&O or paid Telegram trading channels.'
  }
];
