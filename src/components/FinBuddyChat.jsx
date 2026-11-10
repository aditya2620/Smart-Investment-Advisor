import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Trash2, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Check,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Layers
} from 'lucide-react';
import { FIN_BUDDY_KNOWLEDGE, QUICK_PROMPTS } from '../data/faqKnowledge';

export default function FinBuddyChat({ salary, currency }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Welcome to FinBuddy. I provide clear, evidence-based financial answers tailored for first-time earners.

Ask any question regarding starting small, systematic investment plans (SIPs), broker selection (Groww vs Zerodha), tax treatment, or portfolio safety.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      followUps: ['Can I start with just ₹500?', 'How do I start investing my salary?', 'Which app is best: Groww vs Zerodha?']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [viewMode, setViewMode] = useState('simple'); // 'simple' | 'detailed'
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [likedMap, setLikedMap] = useState({});
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestAnswer = (query) => {
    const qLower = query.toLowerCase().trim();

    // 1. Dynamic Amount Extraction
    const numberMatches = qLower.match(/\b(\d{3,6})\b/g);
    let amountExtracted = null;
    if (numberMatches) {
      const parsedNums = numberMatches.map(n => parseInt(n, 10)).filter(n => n >= 50 && n <= 100000);
      if (parsedNums.length > 0) {
        amountExtracted = parsedNums[0];
      }
    }

    // 2. Score knowledge base items using weighted multi-token match
    let bestItem = null;
    let maxScore = 0;

    for (const item of FIN_BUDDY_KNOWLEDGE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (qLower === kw) {
          score += 35; // Exact full phrase match
        } else if (qLower.includes(kw)) {
          if (/\d+/.test(kw) || kw.includes('below') || kw.includes('small') || kw.includes('less')) {
            score += 25;
          } else if (kw.length > 4) {
            score += 15;
          } else {
            score += 4;
          }
        }
      }

      if (score > maxScore) {
        maxScore = score;
        bestItem = item;
      }
    }

    let explanationText = '';
    let followUps = [];

    if (bestItem && maxScore >= 5) {
      explanationText = viewMode === 'simple' ? bestItem.simpleExplanation : bestItem.detailedExplanation;
      followUps = bestItem.followUps || [];
    } else {
      // Intent Fallbacks
      if (qLower.includes('how much') || qLower.includes('amount') || qLower.includes('percentage') || qLower.includes('portion')) {
        const targetInvest = Math.round(salary * 0.2);
        const currSym = currency === 'INR' ? '₹' : '$';
        if (viewMode === 'simple') {
          explanationText = `A sound institutional baseline for early earners is the **50/30/20 framework**:\n\n• **50% Needs:** Rent, groceries, commuting, bills.\n• **30% Discretionary:** Lifestyle, recreation, travel.\n• **20% Long-Term Investing:** For your salary, this equals roughly **${currSym}${targetInvest.toLocaleString()}/month**.\n\nEven if 20% feels tight right now, starting with 5% or 10% establishes the habit.`;
        } else {
          explanationText = `**Monthly Allocation Breakdown (50/30/20 Model):**\n\n1. **Essential Expenditures (50%):** Direct fixed commitments.\n2. **Discretionary Spending (30%):** Flexible lifestyle budget.\n3. **Long-Term Capital Accumulation (20% Target: ${currSym}${targetInvest.toLocaleString()}/month):**\n   - Core Index Mutual Fund SIP (60%)\n   - Debt Instruments / PPF / Emergency (25%)\n   - Flexi Cap / Emerging Opportunities (15%)`;
        }
        followUps = ['How to build an Emergency Fund?', 'Which app is best: Groww vs Zerodha?'];
      } else if (qLower.includes('risk') || qLower.includes('safe') || qLower.includes('lose')) {
        explanationText = viewMode === 'simple'
          ? `All investments carry varying degrees of volatility, but staying disciplined mitigates permanent loss risk:\n\n• **Low Risk:** Liquid Funds, Fixed Deposits, and PPF preserve capital.\n• **Moderate-to-Higher Growth:** Broad market Index Funds (like Nifty 50) fluctuate short-term, but historically recover and compound over 5+ year holding periods.\n• **Avoid:** Unregulated tips, options trading, or borrowing money to invest.`
          : `**Risk Management Framework:**\n\n1. **Capital Preservation Tier:** Maintain 3–6 months in liquid accounts before committing to market volatility.\n2. **Equity Index Tier:** Nifty 50 Index funds hold the 50 largest corporations, eliminating single-stock default risks.\n3. **Speculative Risks to Eliminate:** Derivatives (F&O), unverified Telegram tips, and margin trading.`;
        followUps = ['Can I start with just ₹500?', 'What if the market crashes?'];
      } else {
        explanationText = `I recommend starting with three verified pillars:\n\n1. **Safety Cushion:** Maintain 2-3 months of essential expenses in a liquid savings account.\n2. **Disciplined Automation:** Allocate a consistent sum (e.g. ₹500 to ₹2,000/month) into a low-cost Nifty 50 Index Fund via automatic SIP.\n3. **Patience:** Let compound returns work over multi-year horizons without reacting to short-term headlines.\n\nSelect a topic below or type a specific inquiry to explore further.`;
        followUps = ['Can I start with just ₹500?', 'How do I start investing my salary?', 'Which app is best: Groww vs Zerodha?'];
      }
    }

    // 3. Dynamic Calculation Attachment
    let dynamicCalculation = null;
    if (amountExtracted && amountExtracted >= 100) {
      const p = amountExtracted;
      const r = 0.12 / 12; // 12% annual
      const calcFV = (nMonths) => Math.round(p * ((Math.pow(1 + r, nMonths) - 1) / r) * (1 + r));
      const currSym = currency === 'INR' ? '₹' : '$';

      const fv5 = calcFV(5 * 12);
      const fv10 = calcFV(10 * 12);
      const fv20 = calcFV(20 * 12);

      const formatLakhs = (amt) => {
        if (currency === 'INR') {
          if (amt >= 10000000) return `₹${(amt / 10000000).toFixed(2)} Cr`;
          if (amt >= 100000) return `₹${(amt / 100000).toFixed(2)} Lakh`;
          return `₹${amt.toLocaleString()}`;
        }
        return `$${amt.toLocaleString()}`;
      };

      dynamicCalculation = {
        amount: p,
        currSym,
        fv5: formatLakhs(fv5),
        inv5: formatLakhs(p * 5 * 12),
        fv10: formatLakhs(fv10),
        inv10: formatLakhs(p * 10 * 12),
        fv20: formatLakhs(fv20),
        inv20: formatLakhs(p * 20 * 12)
      };
    }

    return {
      text: explanationText,
      followUps,
      dynamicCalculation
    };
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

    setTimeout(() => {
      const res = findBestAnswer(textToSend);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.text,
        followUps: res.followUps,
        dynamicCalc: res.dynamicCalculation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 280);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: `Chat session cleared. Ask any question regarding starting small, SIPs, broker platforms, or taxes.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        followUps: ['Can I start with just ₹500?', 'How do I start investing my salary?', 'Which app is best: Groww vs Zerodha?']
      }
    ]);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id, type) => {
    setLikedMap(prev => ({
      ...prev,
      [id]: prev[id] === type ? null : type
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <Bot className="w-3.5 h-3.5 text-slate-300" />
              <span>FinBuddy Advisory Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Financial Advisory Assistant
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Practical, verified guidance on early-career investing, broker workflows, and asset allocation.
            </p>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <span className="text-[11px] font-medium text-slate-400">
              Response Depth:
            </span>
            <div className="inline-flex p-1 bg-slate-800 rounded-lg border border-slate-700">
              <button
                onClick={() => setViewMode('simple')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'simple'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Concise Guidance</span>
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'detailed'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Detailed Breakdown</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-xl border border-slate-200 flex flex-col h-[560px] overflow-hidden">
        
        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isBot = m.sender === 'bot';
            const userLiked = likedMap[m.id];

            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[90%] sm:max-w-[82%] ${
                  isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                    isBot
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-slate-900 text-white border-slate-900'
                  }`}
                >
                  {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble Container */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div
                    className={`p-4 rounded-lg text-xs sm:text-sm leading-relaxed space-y-3 relative ${
                      isBot
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-slate-900 text-white font-normal'
                    }`}
                  >
                    {/* Bot Title Tag if Bot */}
                    {isBot && (
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                        <span className="text-[11px] font-medium text-slate-600 flex items-center gap-1.5">
                          <span>FinBuddy Advisory • {viewMode === 'simple' ? 'Concise' : 'Detailed'}</span>
                        </span>
                        
                        {/* Copy button */}
                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
                          title="Copy text"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Text Body */}
                    <div className="whitespace-pre-line text-inherit">
                      {m.text}
                    </div>

                    {/* Dynamic Calculation Card if triggered */}
                    {isBot && m.dynamicCalc && (
                      <div className="mt-3 p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-slate-900 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-950 flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                            Compound Projection for {m.dynamicCalc.currSym}{m.dynamicCalc.amount.toLocaleString()}/month
                          </span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-md border border-emerald-200">
                            12% CAGR
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center pt-1">
                          <div className="bg-white p-2 rounded-md border border-emerald-100">
                            <span className="text-[10px] text-slate-500 font-medium block">5 Years</span>
                            <span className="text-xs font-semibold tabular-nums text-slate-900">{m.dynamicCalc.fv5}</span>
                            <span className="text-[10px] text-slate-400 block tabular-nums">Deposits: {m.dynamicCalc.inv5}</span>
                          </div>
                          <div className="bg-white p-2 rounded-md border border-emerald-100">
                            <span className="text-[10px] text-slate-500 font-medium block">10 Years</span>
                            <span className="text-xs font-semibold tabular-nums text-emerald-700">{m.dynamicCalc.fv10}</span>
                            <span className="text-[10px] text-slate-400 block tabular-nums">Deposits: {m.dynamicCalc.inv10}</span>
                          </div>
                          <div className="bg-white p-2 rounded-md border border-emerald-200">
                            <span className="text-[10px] text-emerald-800 font-medium block">20 Years</span>
                            <span className="text-xs font-semibold tabular-nums text-emerald-800">{m.dynamicCalc.fv20}</span>
                            <span className="text-[10px] text-slate-400 block tabular-nums">Deposits: {m.dynamicCalc.inv20}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer Info & Feedback */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      {isBot && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLike(m.id, 'like')}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              userLiked === 'like' ? 'text-emerald-700 font-medium' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Helpful"
                          >
                            <ThumbsUp className="w-3 h-3 inline mr-1" /> Helpful
                          </button>
                          <button
                            onClick={() => handleLike(m.id, 'dislike')}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              userLiked === 'dislike' ? 'text-rose-700 font-medium' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="w-3 h-3 inline mr-1" />
                          </button>
                        </div>
                      )}
                      
                      <span className={`ml-auto tabular-nums ${isBot ? 'text-slate-400' : 'text-slate-400'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Follow-up Action Chips */}
                  {isBot && m.followUps && m.followUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        Follow up:
                      </span>
                      {m.followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{chip}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <Bot className="w-4 h-4 text-slate-600 animate-pulse" />
              <span>FinBuddy is generating advice...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] font-medium text-slate-500 shrink-0">Common queries:</span>
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs whitespace-nowrap transition-all cursor-pointer font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Bottom Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ask about starting small, SIPs, broker selection, taxation..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-400 focus:bg-white outline-none transition-all"
          />
          <button
            onClick={() => clearChat()}
            className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer shrink-0"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
