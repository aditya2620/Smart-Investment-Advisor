export const NAVIGATION_CATEGORIES = {
  planning: {
    id: 'planning',
    label: 'Planning & Execution',
    shortLabel: 'Planning',
    icon: 'Compass',
    badge: 'Core Tools',
    color: 'emerald',
    description: 'Budget allocation, compounding projections, and setup roadmap'
  },
  strategy: {
    id: 'strategy',
    label: 'Knowledge & Strategy',
    shortLabel: 'Strategy',
    icon: 'Layers',
    badge: 'Education',
    color: 'blue',
    description: 'Asset classes, drawdown responses, and core terminology'
  },
  safety: {
    id: 'safety',
    label: 'Protection & Guidance',
    shortLabel: 'Protection',
    icon: 'ShieldAlert',
    badge: 'Risk Controls',
    color: 'amber',
    description: 'Emergency provisions, scam analysis, and advisory assistant'
  }
};

export const NAV_ITEMS = [
  { 
    id: 'salary-plan', 
    label: 'Salary Allocation & Portfolio', 
    shortLabel: 'Salary Splitter',
    iconName: 'PieChart', 
    badge: 'Start Here',
    badgeColor: 'emerald',
    categoryId: 'planning',
    description: '50/30/20 monthly budgeting and target asset allocation models'
  },
  { 
    id: 'exit-guide', 
    label: 'Market Cycle & Exit Protocol', 
    shortLabel: 'Exit Strategy',
    iconName: 'Bell', 
    badge: 'Market Timing',
    badgeColor: 'slate',
    categoryId: 'strategy',
    description: 'Protocol for managing market downturns, systematic rebalancing, and liquidations'
  },
  { 
    id: 'jargon-buster', 
    label: 'Core Investment Concepts', 
    shortLabel: 'Concepts',
    iconName: 'BookOpen',
    badge: 'Definitions',
    badgeColor: 'slate',
    categoryId: 'strategy',
    description: 'Essential market mechanisms and financial terminology in clear language'
  },
  { 
    id: 'simulator', 
    label: 'Compound Growth Simulator', 
    shortLabel: 'Compound Sim',
    iconName: 'TrendingUp',
    badge: 'Modeler',
    badgeColor: 'emerald',
    categoryId: 'planning',
    description: 'Projected corpus expansion across monthly SIP contributions and time horizons'
  },
  { 
    id: 'investment-types', 
    label: 'Asset Classes & Instruments', 
    shortLabel: 'Asset Classes',
    iconName: 'Layers',
    badge: 'Instruments',
    badgeColor: 'blue',
    categoryId: 'strategy',
    description: 'Comparative overview of index funds, sovereign bonds, gold, and derivative risks'
  },
  { 
    id: 'safety-net', 
    label: 'Safety Net & Liquidity', 
    shortLabel: 'Safety Net',
    iconName: 'ShieldAlert',
    badge: 'Prerequisites',
    badgeColor: 'amber',
    categoryId: 'safety',
    description: 'Emergency fund sizing, healthcare coverage, and revolving debt elimination'
  },
  { 
    id: 'scam-radar', 
    label: 'Fraud & Scheme Detection', 
    shortLabel: 'Fraud Radar',
    iconName: 'AlertTriangle',
    badge: 'Risk Screen',
    badgeColor: 'rose',
    categoryId: 'safety',
    description: 'Screening criteria for fraudulent advisory channels, ponzi structures, and tips'
  },
  { 
    id: 'first-steps', 
    label: 'Broker & Account Setup', 
    shortLabel: 'Action Guide',
    iconName: 'Compass', 
    badge: 'Execution',
    badgeColor: 'emerald',
    categoryId: 'planning',
    description: 'Regulated broker selection, depository KYC verification, and SIP mandates'
  },
  { 
    id: 'fin-buddy', 
    label: 'FinBuddy Advisory Assistant', 
    shortLabel: 'Assistant',
    iconName: 'Bot', 
    badge: 'Advisory',
    badgeColor: 'emerald',
    categoryId: 'safety',
    description: 'Interactive financial knowledge engine for early-career questions'
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
