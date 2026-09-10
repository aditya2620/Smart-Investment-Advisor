import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Trash2, 
  HelpCircle, 
  ThumbsUp, 
  AlertCircle 
} from 'lucide-react';
import { FIN_BUDDY_KNOWLEDGE, QUICK_PROMPTS } from '../data/faqKnowledge';

export default function FinBuddyChat({ salary, currency }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hey there! 👋 I am **FinBuddy**, your personal zero-jargon investment mentor.

I was built specifically for first-time earners who feel confused by stock market terms, SIPs, and where to start. 

Ask me anything in plain words, or pick one of the quick questions below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [kidMode, setKidMode] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestAnswer = (query) => {
    const qLower = query.toLowerCase().trim();

    // 1. Direct or keyword match
    for (const item of FIN_BUDDY_KNOWLEDGE) {
      if (item.keywords.some(kw => qLower.includes(kw))) {
        if (kidMode) {
          return `🧒 **[Kid Mode: Story & Metaphor]**\n\n` + (item.kidExplanation || item.response);
        } else {
          return `💼 **[Pro Mode: Facts & Regulatory Rules]**\n\n` + (item.adultExplanation || item.response);
        }
      }
    }

    // 2. Dynamic fallback
    if (qLower.includes('how much') || qLower.includes('amount') || qLower.includes('percentage')) {
      if (kidMode) {
        return `🧒 **[Kid Mode]**\n\nA great rule of thumb is the **20% piggy bank rule**! 🐷
If you get 100 chocolates, set aside **20 chocolates** for future wealth. 
For your salary of **${currency === 'INR' ? '₹' + salary : '$' + salary}**, aim to put **${currency === 'INR' ? '₹' + Math.round(salary * 0.2) : '$' + Math.round(salary * 0.2)}/month** into your magic Nifty 50 tree!`;
      } else {
        return `💼 **[Pro Mode]**\n\n**Recommended Capital Allocation Rate:**
Aim for a minimum savings rate of **20% to 30% of Net Post-Tax Cash Flow**.
- Base Salary: **${currency === 'INR' ? '₹' + salary : '$' + salary}**
- Target Monthly Inflow to Index Equity: **${currency === 'INR' ? '₹' + Math.round(salary * 0.2) : '$' + Math.round(salary * 0.2)}**
- Step-Up Strategy: Increase allocation by 10% annually with every promotion/increment.`;
      }
    }

    if (qLower.includes('gold') || qLower.includes('silver')) {
      if (kidMode) {
        return `🧒 **[Kid Mode]**\n\nGold is like an **iron shield** for your money! 🛡️
When stock markets get nervous or storms blow, gold keeps you steady. 
Just remember: gold doesn't grow more baby gold, so only keep **10% to 15%** of your money in digital gold or Sovereign Gold Bonds!`;
      } else {
        return `💼 **[Pro Mode]**\n\n**Gold Asset Class Dynamics:**
- Role: Non-correlated sovereign hedge against currency depreciation and macro drawdown.
- Recommended Allocation: **10% - 15%** of total portfolio NAV.
- Preferred Vehicles: **Sovereign Gold Bonds (SGB)** (yielding capital appreciation + 2.5% p.a. sovereign interest) or **Gold ETFs (e.g. Gold BeES)**. Avoid physical jewelry due to making charges and GST drag.`;
      }
    }

    if (qLower.includes('safe') || qLower.includes('risk') || qLower.includes('lose')) {
      if (kidMode) {
        return `🧒 **[Kid Mode]**\n\nCan you lose all your money?
- In an individual coin or risky bet? **Yes!**
- In a **Nifty 50 Fruit Basket**? **Almost impossible**, because all 50 biggest companies in India (Tata, Reliance, Infosys, SBI) would have to disappear at the exact same moment!`;
      } else {
        return `💼 **[Pro Mode]**\n\n**Systemic vs. Unsystematic Risk Assessment:**
- Broad market index funds eliminate unsystematic company-specific bankruptcy risk through 50-stock diversification.
- Market risk (volatility drawdowns of 10-20%) is standard and temporary.
- Capital preservation is historically 100% over any rolling 7+ year horizon in Nifty 50.`;
      }
    }

    // Generic friendly answer
    if (kidMode) {
      return `🧒 **[Kid Mode]**\n\nHere is your golden rule:
1. Don't invest lunch money you need this year!
2. Put ₹500 into a Nifty 50 piggy bank every month.
3. Ignore the daily noise and let the tree grow! 🌳`;
    } else {
      return `💼 **[Pro Mode]**\n\nCore investment guidelines:
1. Maintain strict duration matching (never deploy short-term capital in equity).
2. Automate systematic direct low-expense index accumulation.
3. Compound tax-free under Section 112A annual exemption limits.`;
    }
  };

  const handleSend = (textToSend = inputQuery) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const answer = findBestAnswer(textToSend);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: `Chat cleared! Ask me any question about your salary, SIPs, or where to start investing! 🚀`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-700/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5 text-white" />
              <span>AI Financial Mentor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Ask FinBuddy Anything!
            </h2>
            <p className="mt-1 text-teal-100 text-xs sm:text-sm">
              Zero judgment, zero finance jargon. Ask the questions you were too embarrassed to ask anyone else!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-start sm:items-end">
              <button
                onClick={() => setKidMode(!kidMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  kidMode 
                    ? 'bg-amber-400 text-slate-950 font-extrabold ring-2 ring-amber-300'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/20'
                }`}
              >
                <span>{kidMode ? '🧒' : '💼'}</span>
                <span>{kidMode ? 'Kid Mode: ON' : 'Pro Mode: ON'}</span>
              </button>
              <span className="text-[10px] text-teal-100 mt-1 font-medium">
                {kidMode ? 'Stories, chocolates & simple analogies' : 'Exact figures, CAGR & SEBI tax laws'}
              </span>
            </div>

            <button
              onClick={clearChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition-all border border-white/10"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[78%] ${
                  isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isBot
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                    isBot
                      ? 'bg-slate-50 border border-slate-200 text-slate-800'
                      : 'bg-emerald-600 text-white shadow-xs font-medium'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {m.text}
                  </div>
                  <span
                    className={`block text-[10px] text-right font-medium ${
                      isBot ? 'text-slate-400' : 'text-emerald-200'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <Bot className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>FinBuddy is typing a jargon-free answer...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0">Try asking:</span>
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 text-xs whitespace-nowrap transition-all shadow-2xs cursor-pointer font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask about your salary, SIPs, stock market, safety..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
