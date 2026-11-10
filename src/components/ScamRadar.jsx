import React, { useState } from 'react';
import { SCAM_SCENARIOS } from '../data/redflags';
import { 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  RotateCcw
} from 'lucide-react';

export default function ScamRadar() {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleVote = (scenarioId, votedScam) => {
    if (userAnswers[scenarioId] !== undefined) return;

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
    }
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setScore(0);
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 rounded-xl p-6 sm:p-7 text-white border border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Fraud Detection & Risk Radar</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Financial Scheme Analysis
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Analyze realistic solicitations, Telegram trading channels, and guaranteed-return claims against regulatory red flags.
            </p>
          </div>

          {/* Score Counter */}
          <div className="bg-slate-800/80 px-4 py-3 rounded-lg border border-slate-700/80 text-center shrink-0">
            <span className="text-[10px] text-slate-400 block font-medium">
              Detection Accuracy
            </span>
            <span className="text-xl font-semibold text-white tabular-nums">
              {score} / {SCAM_SCENARIOS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress & Reset */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          Evaluated {answeredCount} of {SCAM_SCENARIOS.length} scenarios
        </span>
        {answeredCount > 0 && (
          <button
            onClick={resetQuiz}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Analysis
          </button>
        )}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SCAM_SCENARIOS.map((item, idx) => {
          const answer = userAnswers[item.id];
          const hasAnswered = answer !== undefined;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-4 sm:p-5 border transition-all flex flex-col justify-between space-y-3.5 ${
                hasAnswered
                  ? answer.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                  : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-medium text-slate-400">
                    Scenario #{idx + 1}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.dangerLevel}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  "{item.scenario}"
                </p>
              </div>

              {/* Voting buttons */}
              {!hasAnswered ? (
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => handleVote(item.id, true)}
                    className="py-2.5 px-3 rounded-lg border border-rose-200 bg-rose-50/80 hover:bg-rose-100 text-rose-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Potential Fraud / Scam</span>
                  </button>

                  <button
                    onClick={() => handleVote(item.id, false)}
                    className="py-2.5 px-3 rounded-lg border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Legitimate Structure</span>
                  </button>
                </div>
              ) : (
                /* Revealed explanation */
                <div className="pt-2.5 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold flex items-center gap-1.5">
                      {answer.isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct Assessment
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Incorrect Assessment
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {item.verdict}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
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
