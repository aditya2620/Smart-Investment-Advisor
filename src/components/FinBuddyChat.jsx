import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Trash2, 
  HelpCircle, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Check,
  TrendingUp,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { FIN_BUDDY_KNOWLEDGE, QUICK_PROMPTS } from '../data/faqKnowledge';

export default function FinBuddyChat({ salary, currency }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hey there! 👋 I'm **FinBuddy**, your personal zero-jargon investment mentor.

I'm built specifically for first-time earners who want clear, friendly answers without confusing financial textbook words.

Ask me anything about starting small, SIPs, Groww vs Zerodha, taxes, or market safety!`,
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

    // 1. Dynamic Amount Extraction (e.g. user mentions 200, 500, 1000, 2000)
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
          // Higher weight for specific phrases or numbers vs generic single words
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
          explanationText = `**The 20% Future Wealth Rule!** 🎯\n\nAim to invest **20% of your monthly in-hand salary** for your future self.\n\n- Monthly Salary: **${currSym}${salary.toLocaleString()}**\n- Target Monthly Investment: **${currSym}${targetInvest.toLocaleString()}**\n\nStart automatically on payday into a simple **Nifty 50 Index Fund**!`;
        } else {
          explanationText = `**Recommended Allocation Strategy:**\n\n1. **Target Inflow:** For a monthly salary of **${currSym}${salary.toLocaleString()}**, allocate **20% (${currSym}${targetInvest.toLocaleString()}/month)** into index funds.\n2. **Core Vehicle:** Put 100% of this into a low-cost **Nifty 50 Index Fund Direct-Growth**.\n3. **Annual Step-Up:** Increase your SIP by 10% each year when you get an increment.`;
        }
        followUps = ['Can I start with ₹500?', 'What is Nifty 50?', 'Which app to use?'];
      } else {
        explanationText = `**Great question!** Here are 3 golden rules for every first-time earner:\n\n1. **Start Small:** Even ₹500 or ₹1,000/month builds serious wealth over time. Starting early is what counts.\n2. **Keep It Simple:** Stick to a **Nifty 50 Index Fund**—it owns tiny pieces of India\'s top 50 strongest companies.\n3. **Automate Payday:** Set your monthly auto-debit 2 days after salary credit so you pay yourself first.\n\nTry asking me about **₹500 investing**, **Groww vs Zerodha**, **market crashes**, **taxes**, or **withdrawing money**!`;
        followUps = ['Can I start with just ₹500?', 'Groww vs Zerodha', 'What if the market crashes tomorrow?'];
      }
    }

    // Generate dynamic calculation card if user queried a specific amount
    let dynamicCalculation = null;
    if (amountExtracted && (qLower.includes('invest') || qLower.includes('put') || qLower.includes('start') || qLower.includes('money') || qLower.includes('below') || qLower.includes('amount') || qLower.includes('rs') || qLower.includes('rupees') || qLower.includes('1000') || qLower.includes('500'))) {
      const p = amountExtracted;
      const currSym = currency === 'INR' ? '₹' : '$';
      
      const calcFV = (monthly, years) => {
        const i = 0.12 / 12;
        const n = years * 12;
        const fv = monthly * (((Math.pow(1 + i, n) - 1) / i)) * (1 + i);
        return Math.round(fv);
      };

      const fv5 = calcFV(p, 5);
      const fv10 = calcFV(p, 10);
      const fv20 = calcFV(p, 20);

      const formatVal = (val) => {
        if (currency === 'INR' && val >= 100000) {
          return `${currSym}${(val / 100000).toFixed(2)} Lakhs`;
        }
        return `${currSym}${val.toLocaleString()}`;
      };

      dynamicCalculation = {
        amount: p,
        currSym,
        fv5: formatVal(fv5),
        inv5: formatVal(p * 12 * 5),
        fv10: formatVal(fv10),
        inv10: formatVal(p * 12 * 10),
        fv20: formatVal(fv20),
        inv20: formatVal(p * 12 * 20),
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
    }, 380);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: `Chat cleared! Ask me any question about starting small, SIPs, apps, or taxes! 🚀`,
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
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-700/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5 text-white" />
              <span>Zero-Jargon Financial Mentor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Ask FinBuddy Anything!
            </h2>
            <p className="mt-1 text-teal-100 text-xs sm:text-sm">
              Warm, clear guidance for first-time earners. No jargon, no elitism, zero judgment.
            </p>
          </div>

          {/* Mode Switcher Segmented Control */}
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
              Answer Depth Mode:
            </span>
            <div className="inline-flex p-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/15">
              <button
                onClick={() => setViewMode('simple')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'simple'
                    ? 'bg-white text-emerald-950 shadow-md font-extrabold'
                    : 'text-teal-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🌱</span>
                <span>Simple & Friendly</span>
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'detailed'
                    ? 'bg-white text-emerald-950 shadow-md font-extrabold'
                    : 'text-teal-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>📊</span>
                <span>Detailed Breakdown</span>
              </button>
            </div>
            <span className="text-[10px] text-teal-100 font-medium">
              {viewMode === 'simple' 
                ? 'Relatable analogies & quick takeaways' 
                : 'Structured step-by-step guidance & exact numbers'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[560px] overflow-hidden">
        
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
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isBot
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble Container */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 relative group ${
                      isBot
                        ? 'bg-slate-50 border border-slate-200 text-slate-800'
                        : 'bg-emerald-600 text-white shadow-xs font-medium'
                    }`}
                  >
                    {/* Bot Title Tag if Bot */}
                    {isBot && (
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 mb-2">
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>FinBuddy Advice • {viewMode === 'simple' ? 'Simple & Friendly' : 'Detailed Breakdown'}</span>
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
                    <div className="whitespace-pre-line text-slate-800">
                      {m.text}
                    </div>

                    {/* Dynamic Calculation Card if triggered */}
                    {isBot && m.dynamicCalc && (
                      <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-900 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-emerald-700" />
                            Live Wealth Projection for {m.dynamicCalc.currSym}{m.dynamicCalc.amount.toLocaleString()}/month
                          </span>
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                            @ 12% CAGR
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center pt-1">
                          <div className="bg-white p-2 rounded-lg border border-emerald-100">
                            <span className="text-[10px] text-slate-500 font-medium block">5 Years</span>
                            <span className="text-xs font-black text-slate-900">{m.dynamicCalc.fv5}</span>
                            <span className="text-[9px] text-slate-400 block">Inv: {m.dynamicCalc.inv5}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-emerald-100">
                            <span className="text-[10px] text-slate-500 font-medium block">10 Years</span>
                            <span className="text-xs font-black text-emerald-700">{m.dynamicCalc.fv10}</span>
                            <span className="text-[9px] text-slate-400 block">Inv: {m.dynamicCalc.inv10}</span>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-emerald-200 bg-emerald-50/50">
                            <span className="text-[10px] text-emerald-800 font-bold block">20 Years</span>
                            <span className="text-xs font-black text-emerald-800">{m.dynamicCalc.fv20}</span>
                            <span className="text-[9px] text-slate-400 block">Inv: {m.dynamicCalc.inv20}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Footer Info & Feedback */}
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      {isBot && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLike(m.id, 'like')}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              userLiked === 'like' ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Helpful"
                          >
                            <ThumbsUp className="w-3 h-3 inline mr-0.5" /> Helpful
                          </button>
                          <button
                            onClick={() => handleLike(m.id, 'dislike')}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              userLiked === 'dislike' ? 'text-rose-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Not helpful"
                          >
                            <ThumbsDown className="w-3 h-3 inline mr-0.5" />
                          </button>
                        </div>
                      )}
                      
                      <span className={`ml-auto ${isBot ? 'text-slate-400' : 'text-emerald-200'}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Follow-up Action Chips */}
                  {isBot && m.followUps && m.followUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <span>Follow up:</span>
                      </span>
                      {m.followUps.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(chip)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <span>{chip}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-600" />
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
              <Bot className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>FinBuddy is typing a warm, jargon-free answer...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Prompt Chips */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] font-bold text-slate-500 shrink-0">Quick questions:</span>
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

        {/* Bottom Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="Ask about investing ₹500, SIPs, Groww vs Zerodha, safety..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all"
          />
          <button
            onClick={() => clearChat()}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer shrink-0"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
