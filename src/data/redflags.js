export const SCAM_SCENARIOS = [
  {
    id: 'telegram-vip',
    scenario: 'A Telegram channel promises "Sure Shot 500% intraday stock calls with 99% accuracy" for a VIP membership fee of ₹2,999.',
    isScam: true,
    dangerLevel: 'Extreme 🔴',
    verdict: '🚨 PUMP & DUMP SCAM',
    explanation: 'If they actually had a 99% accurate money-making formula, they would be richer than Warren Buffett and wouldn\'t need your ₹2,999! These operators buy penny stocks in secret, tell thousands of subscribers to buy them (pumping the price), and then sell their own shares at the peak, leaving you with useless losses.'
  },
  {
    id: 'guaranteed-monthly',
    scenario: 'A friendly acquaintance or app offers a "Guaranteed 25% monthly return" on your capital with zero market risk.',
    isScam: true,
    dangerLevel: 'Extreme 🔴',
    verdict: '🚨 CLASSIC PONZI SCHEME',
    explanation: 'A 25% monthly return turns ₹10,000 into ₹1.45 Crore in just 2 years. Mathematically, this is impossible. In Ponzi schemes, early investors are paid with new investors\' deposits until the founder vanishes with everyone\'s life savings.'
  },
  {
    id: 'index-sip-longterm',
    scenario: 'Setting up an automatic ₹2,000 monthly SIP into a low-cost Nifty 50 Index Fund for the next 10 years through a registered broker.',
    isScam: false,
    dangerLevel: 'Safe & Sound 🟢',
    verdict: '🏆 LEGITIMATE WEALTH BUILDER',
    explanation: 'This is the gold standard of long-term investing backed by India\'s top 50 profitable corporations. There are no middlemen promising magic; your returns reflect real corporate profits, regulated by SEBI.'
  },
  {
    id: 'borrow-crypto',
    scenario: 'A college friend tells you about a "secret new meme cryptocurrency" and advises taking a personal loan or credit card cash advance to buy it.',
    isScam: true,
    dangerLevel: 'Catastrophic 🔴',
    verdict: '🚨 FINANCIAL SUICIDE',
    explanation: 'Rule #1 of personal finance: NEVER borrow money at 14%-40% interest to buy speculative tokens that can drop to zero overnight. You will still owe the bank their money plus brutal interest even if your coin becomes worthless.'
  },
  {
    id: 'ppf-government',
    scenario: 'Opening a Public Provident Fund (PPF) account at your bank to deposit ₹50,000 yearly with a 15-year government lock-in and tax exemption.',
    isScam: false,
    dangerLevel: 'Ultra Safe 🟢',
    verdict: '🛡️ 100% SOVEREIGN GUARANTEE',
    explanation: 'PPF is directly guaranteed by the Government of India. The returns are exempt from tax at deposit, interest accrual, and withdrawal (EEE status). Ideal for long-term safe wealth.'
  },
  {
    id: 'whatsapp-sebi-fake',
    scenario: 'You receive a WhatsApp message claiming to be a "SEBI Registered Institutional Fund" offering an exclusive pre-IPO link to invest via UPI.',
    isScam: true,
    dangerLevel: 'Extreme 🔴',
    verdict: '🚨 CYBER FRAUD & IDENTITY THEFT',
    explanation: 'SEBI never runs WhatsApp trading groups or asks for direct UPI payments to individual accounts. Genuine IPOs and stock purchases only happen through ASBA (Application Supported by Blocked Amount) through your official verified bank or SEBI-registered Demat account.'
  }
];
