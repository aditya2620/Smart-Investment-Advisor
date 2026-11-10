export const SCAM_SCENARIOS = [
  {
    id: 'telegram-vip',
    scenario: 'A private messaging channel promises "Guaranteed 500% intraday stock calls with 99% win accuracy" for a VIP subscription fee of ₹2,999.',
    isScam: true,
    dangerLevel: 'Critical Risk',
    verdict: 'Pump & Dump Manipulation',
    explanation: 'Unregistered advisory groups typically accumulate micro-cap or illiquid penny shares, encourage subscriber buying to artificially inflate volume and price, and exit their proprietary holdings at the peak, leaving retail participants with illiquid losses.'
  },
  {
    id: 'guaranteed-monthly',
    scenario: 'An acquaintance or unregistered platform promises an assured "25% monthly return" on deposited capital with zero market risk.',
    isScam: true,
    dangerLevel: 'Critical Risk',
    verdict: 'Ponzi Structure Scheme',
    explanation: 'A 25% monthly compounded return turns ₹10,000 into ~₹1.45 Crore within 24 months—a mathematical impossibility in regulated markets. Such schemes service initial redemption claims using capital from newer entrants until inflows taper and operators abscond.'
  },
  {
    id: 'index-sip-longterm',
    scenario: 'Setting up an automatic ₹2,000 monthly SIP into a low-cost broad market index fund (e.g. Nifty 50) for a 10-year horizon through a SEBI-registered broker.',
    isScam: false,
    dangerLevel: 'Regulated / Low Risk',
    verdict: 'Regulated Long-Term Investment',
    explanation: 'This represents standard disciplined asset allocation. Capital is deployed into the top regulated public corporations with low tracking error and institutional custody under SEBI regulatory guidelines.'
  },
  {
    id: 'borrow-crypto',
    scenario: 'Using unsecured personal credit or high-interest credit card cash advances (at 18%-36% APR) to acquire speculative micro-cap crypto tokens.',
    isScam: true,
    dangerLevel: 'High Risk / Unhedged Leverage',
    verdict: 'Severe Capital Insolvency Risk',
    explanation: 'Deploying high-cost unsecured debt into volatile, non-cash-flow-producing assets exposes the borrower to asymmetric downside. Debt obligations remain mandatory regardless of the liquidation value of the underlying assets.'
  },
  {
    id: 'ppf-government',
    scenario: 'Depositing capital annually into a Public Provident Fund (PPF) account at a scheduled commercial bank with a 15-year tenure and statutory tax deductions.',
    isScam: false,
    dangerLevel: 'Sovereign Guarantee',
    verdict: 'Government-Backed Savings Instrument',
    explanation: 'PPF carries direct sovereign backing from the Government of India. Principal and accrued interest are protected by statutory legislation with Exempt-Exempt-Exempt (EEE) tax status.'
  },
  {
    id: 'whatsapp-sebi-fake',
    scenario: 'An unsolicited WhatsApp contact claims to represent an "Institutional Foreign Portfolio Investor" offering pre-IPO access via direct UPI transfer.',
    isScam: true,
    dangerLevel: 'Critical Risk',
    verdict: 'Impersonation & Phishing Fraud',
    explanation: 'Legitimate primary market equity allotments (IPOs) operate strictly via ASBA (Application Supported by Blocked Amount) through registered banking interfaces and SEBI-registered depositories. Unregulated direct UPI requests are fraudulent.'
  }
];
