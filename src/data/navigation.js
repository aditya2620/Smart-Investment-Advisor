export const NAVIGATION_CATEGORIES = {
  planning: {
    id: 'planning',
    label: 'Planning & Execution',
    shortLabel: 'Planning',
    icon: 'Compass',
    badge: 'Core Tools',
    color: 'emerald',
    description: 'Budgeting, wealth simulation & step-by-step account setup'
  },
  strategy: {
    id: 'strategy',
    label: 'Knowledge & Strategy',
    shortLabel: 'Strategy',
    icon: 'Layers',
    badge: 'Education',
    color: 'blue',
    description: 'Asset types, timing rules, crash alerts & jargon translations'
  },
  safety: {
    id: 'safety',
    label: 'Protection & Guidance',
    shortLabel: 'Protection',
    icon: 'ShieldAlert',
    badge: 'Safety First',
    color: 'amber',
    description: 'Emergency funds, scam protection & AI mentorship'
  }
};

export const NAV_ITEMS = [
  { 
    id: 'salary-plan', 
    label: 'My Salary & Plan', 
    shortLabel: 'Salary Splitter',
    iconName: 'PieChart', 
    badge: 'Start Here',
    badgeColor: 'emerald',
    categoryId: 'planning',
    description: '50/30/20 budget splitter & custom monthly asset allocation plan'
  },
  { 
    id: 'exit-guide', 
    label: 'When to Invest & Withdraw', 
    shortLabel: 'Invest & Exit',
    iconName: 'Bell', 
    badge: 'Crash Alerts',
    badgeColor: 'rose',
    categoryId: 'strategy',
    description: 'Market crash reactions, exit rules & "Should I Withdraw?" helper'
  },
  { 
    id: 'jargon-buster', 
    label: 'Kid-Simple Concepts', 
    shortLabel: 'Jargon Buster',
    iconName: 'BookOpen',
    badge: 'Simple Terms',
    badgeColor: 'slate',
    categoryId: 'strategy',
    description: 'Financial dictionary explained in plain language like you are 10'
  },
  { 
    id: 'simulator', 
    label: 'Wealth Simulator', 
    shortLabel: 'Simulator',
    iconName: 'TrendingUp',
    badge: 'Compound Sim',
    badgeColor: 'emerald',
    categoryId: 'planning',
    description: 'See how ₹500 to ₹10,000 monthly compounds over 5, 10, and 20 years'
  },
  { 
    id: 'investment-types', 
    label: 'Investment Types', 
    shortLabel: 'Asset Types',
    iconName: 'Layers',
    badge: 'Asset Class',
    badgeColor: 'blue',
    categoryId: 'strategy',
    description: 'Comparison of Index Funds, FD, Gold, Flexi Cap & Trading Traps'
  },
  { 
    id: 'safety-net', 
    label: 'Safety Net First', 
    shortLabel: 'Emergency Shield',
    iconName: 'ShieldAlert',
    badge: 'Safety Shield',
    badgeColor: 'amber',
    categoryId: 'safety',
    description: 'Emergency fund calculator, health insurance cover & debt payoff'
  },
  { 
    id: 'scam-radar', 
    label: 'Scam Radar', 
    shortLabel: 'Scam Radar',
    iconName: 'AlertTriangle',
    badge: 'Red Flags',
    badgeColor: 'rose',
    categoryId: 'safety',
    description: 'Detect dangerous WhatsApp tips, Telegram fraud & get-rich-quick traps'
  },
  { 
    id: 'first-steps', 
    label: 'Action Roadmap', 
    shortLabel: '15-Min Setup',
    iconName: 'Compass', 
    badge: '15 Mins',
    badgeColor: 'emerald',
    categoryId: 'planning',
    description: 'Broker selection (Groww/Zerodha), paperless KYC & SIP setup checklist'
  },
  { 
    id: 'fin-buddy', 
    label: 'FinBuddy AI', 
    shortLabel: 'AI Mentor',
    iconName: 'Bot', 
    badge: 'Mentor',
    badgeColor: 'emerald',
    categoryId: 'safety',
    description: 'Interactive AI companion answering your exact personal money questions'
  },
];

export const TABS_ORDER = NAV_ITEMS.map((item) => item.id);

export function getNavItemById(id) {
  return NAV_ITEMS.find((item) => item.id === id) || NAV_ITEMS[0];
}

export function getCategoryById(categoryId) {
  return NAVIGATION_CATEGORIES[categoryId] || NAVIGATION_CATEGORIES.planning;
}

export function getItemsByCategory(categoryId) {
  return NAV_ITEMS.filter((item) => item.categoryId === categoryId);
}
