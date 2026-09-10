import React, { useState } from 'react';
import { SCAM_SCENARIOS } from '../data/redflags';
import { 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScamRadar() {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleVote = (scenarioId, votedScam) => {
    if (userAnswers[scenarioId] !== undefined) return; // already answered

    const target = SCAM_SCENARIOS.find(s => s.id === scenarioId);
    const isCorrect = (votedScam && target.isScam) || (!votedScam && !target.isScam);

    setUserAnswers(prev => ({
      ...prev,
      [scenarioId]: {
        votedScam,
        isCorrect
      }
    }));

    if (isCorrect) {
      setScore(prev => prev + 1);
      if (score + 1 === SCAM_SCENARIOS.length) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setScore(0);
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-600/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Financial Scam Radar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Spot the Trap: Can You Detect Financial Scams?
            </h2>
            <p className="mt-1 text-rose-100 text-xs sm:text-sm">
              Scammers love targeting first-time salary earners. Test your fraud radar on real scenarios!
            </p>
          </div>

          {/* Score Counter */}
          <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-rose-200 block font-bold">
              Your Radar Score
            </span>
            <span className="text-2xl font-black text-white">
              {score} / {SCAM_SCENARIOS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress & Reset */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">
          Completed {answeredCount} of {SCAM_SCENARIOS.length} scenarios
        </span>
        {answeredCount > 0 && (
          <button
            onClick={resetQuiz}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold underline"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
          </button>
        )}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SCAM_SCENARIOS.map((item, idx) => {
          const answer = userAnswers[item.id];
          const hasAnswered = answer !== undefined;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between space-y-4 ${
                hasAnswered
                  ? answer.isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-400">
                    Scenario #{idx + 1}
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.dangerLevel}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  "{item.scenario}"
                </p>
              </div>

              {/* Voting buttons */}
              {!hasAnswered ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleVote(item.id, true)}
                    className="py-3 px-4 rounded-xl border-2 border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>🚨 Scam / Trap!</span>
                  </button>

                  <button
                    onClick={() => handleVote(item.id, false)}
                    className="py-3 px-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>🟢 Safe & Sound</span>
                  </button>
                </div>
              ) : (
                /* Revealed explanation */
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                      {answer.isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> You got it right!
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-rose-600" /> Watch out!
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {item.verdict}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-slate-200">
                    {item.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
