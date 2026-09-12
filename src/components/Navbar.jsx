import React from 'react';
import { 
  Sparkles, 
  PieChart, 
  BookOpen, 
  TrendingUp, 
  Layers, 
  ShieldAlert, 
  Bot, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currency, setCurrency }) {
  const navItems = [
    { id: 'salary-plan', label: 'My Salary & Plan', icon: PieChart, badge: 'Start Here' },
    { id: 'jargon-buster', label: 'Kid-Simple Concepts', icon: BookOpen },
    { id: 'simulator', label: 'Wealth Simulator', icon: TrendingUp },
    { id: 'investment-types', label: 'Investment Types', icon: Layers },
    { id: 'safety-net', label: 'Safety Net First', icon: ShieldAlert },
    { id: 'scam-radar', label: 'Scam Radar', icon: AlertTriangle },
    { id: 'fin-buddy', label: 'FinBuddy AI', icon: Bot, badge: 'Mentor' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('salary-plan')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span className="text-base sm:text-xl">🌱</span>
            </div>
            <div className="truncate">
              <span className="font-extrabold text-sm sm:text-lg text-slate-900 tracking-tight flex items-center gap-1">
                <span className="sm:hidden">Smart</span>
                <span className="hidden sm:inline">Smart Investment</span>
                <span className="text-emerald-600">Advisor</span>
              </span>
              <p className="text-[11px] text-slate-500 hidden md:block">Explain Like I'm 10 • Safe First-Salary Wealth</p>
            </div>
          </div>

          {/* Currency Toggle & Quick Action */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Currency Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
                  currency === 'INR'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ₹ <span className="hidden xs:inline sm:inline">INR</span>
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-bold rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                $ <span className="hidden xs:inline sm:inline">USD</span>
              </button>
            </div>

            {/* FinBuddy Quick Action Button */}
            <button
              onClick={() => setActiveTab('fin-buddy')}
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all shrink-0"
              title="Ask FinBuddy AI Mentor"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Ask </span>
              <span>FinBuddy</span>
            </button>
          </div>

        </div>

        {/* Scrollable Navigation Bar for All Devices */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
