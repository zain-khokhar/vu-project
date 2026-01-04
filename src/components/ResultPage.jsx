"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  User,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Share2,
  RefreshCcw,
  Home,
  LayoutGrid
} from "lucide-react";
import confetti from "canvas-confetti";
import FeedbackForm from "./FeedbackForm";

export default function ResultPage({
  username,
  category,
  userAnswers,
  totalQuestions,
  remainingTime,
}) {
  const router = useRouter();
  const params = useParams();
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  // const wrongAnswers = userAnswers.filter((answer) => !answer.isCorrect).length; // Unused
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Trigger celebration on mount if score is good
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [percentage]);

  const getGrade = () => {
    if (percentage >= 90) return { grade: "Outstanding", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (percentage >= 80) return { grade: "Excellent", color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200" };
    if (percentage >= 70) return { grade: "Good Job", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" };
    if (percentage >= 60) return { grade: "Passed", color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" };
    return { grade: "Needs Improvement", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-200" };
  };

  const grade = getGrade();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-10 sm:pb-20">

      {/* 1. Immersive Header with Gradient */}
      <div className="relative bg-gradient-to-b from-[#1e1b4b] to-[#312e81] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[50%] bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10 text-center">

          {/* Top Navigation */}
          <div className="absolute top-4 left-4 sm:top-0 sm:left-0 z-50">
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center space-x-2 text-indigo-200 hover:text-white transition-colors py-1.5 px-3 sm:py-2 sm:px-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 shadow-sm"
            >
              <Home className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-medium">Home</span>
            </button>
          </div>

          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4 sm:mb-6 shadow-xl border border-white/10 ring-4 ring-white/5">
            <Trophy className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400 drop-shadow-lg" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-3 sm:mb-4 drop-shadow-sm px-2">
            {percentage >= 60 ? "Congratulations!" : "Keep Practicing!"}
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 font-medium max-w-2xl mx-auto leading-relaxed px-2">
            You've completed <span className="text-white font-bold block sm:inline">{category}</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">

          {/* LEFT: Score & Stats (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(8,_112,_184,_0.05)] sm:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="p-6 sm:p-8 text-center">
                <div className="relative inline-block mb-4 sm:mb-6">
                  <svg className="w-36 h-36 sm:w-48 sm:h-48 transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                    {/* Note: strokeDasharray needs to be dynamic based on the radius.
                                 r=45% means r ~ 0.45 * width. 
                                 Let's trust the browser to scale the percentage stroke correctly if we use 100 based pathLength.
                             */}
                    <circle cx="50%" cy="50%" r="45%" stroke="url(#scoreGradient)" strokeWidth="12" fill="transparent"
                      pathLength="100"
                      strokeDasharray={`${percentage} 100`}
                      strokeLinecap="round" className="drop-shadow-lg transition-all duration-1000 ease-out"
                    />

                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tighter">{percentage}%</span>
                    <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider py-1 px-2 sm:px-3 rounded-full mt-1 sm:mt-2 ${grade.bg} ${grade.color} border ${grade.border}`}>
                      {grade.grade}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 border-t border-slate-100 pt-4 sm:pt-6">
                  <div className="text-center p-2 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Correct</p>
                    <p className="text-lg sm:text-2xl font-bold text-emerald-600">{correctAnswers} <span className="text-slate-400 text-xs sm:text-sm font-medium">/ {totalQuestions}</span></p>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wide mb-1">Time</p>
                    <p className="text-lg sm:text-2xl font-bold text-indigo-600">{formatTime(remainingTime)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border border-indigo-50">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Candidate</p>
                  <h3 className="text-sm sm:text-lg font-bold text-slate-800 truncate max-w-[120px] sm:max-w-none">{username}</h3>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="text-right">
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider">Date</p>
                <p className="text-xs sm:text-sm font-bold text-slate-700">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => router.push(`/quiz/${params.category}`)} className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base">
                <RefreshCcw className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Try Again</span>
              </button>
              <button onClick={() => router.push("/quiz")} className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md active:scale-95 text-sm sm:text-base">
                <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Test More</span>
              </button>
            </div>
          </div>


          {/* RIGHT: Question Analysis & Feedback (8 cols) */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-8">

            {/* Question Review Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800">Performance Analysis</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Review your answers and explanations</p>
                </div>
              </div>

              <div className="divide-y divide-slate-100 max-h-[500px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
                {userAnswers.map((answer, index) => (
                  <div key={index} className={`group transition-colors duration-200 ${expandedQuestion === index ? 'bg-indigo-50/30' : 'hover:bg-slate-50'}`}>
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full text-left p-4 sm:p-6 flex items-start gap-3 sm:gap-4 focus:outline-none"
                    >
                      <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border mt-0.5 ${answer.isCorrect
                          ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
                          : 'bg-rose-100 text-rose-600 border-rose-200'
                        }`}>
                        {answer.isCorrect ? <CheckCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" /> : <XCircle className="h-3.5 w-3.5 sm:h-5 sm:w-5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                            {answer.question.question}
                          </h3>
                          <div className="text-slate-400 group-hover:text-indigo-500 transition-colors">
                            {expandedQuestion === index ? <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" /> : <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />}
                          </div>
                        </div>

                        <div className="mt-2 sm:mt-3 flex flex-wrap gap-2 sm:gap-3">
                          <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold border ${answer.isCorrect
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                              : 'bg-rose-50 text-rose-700 border-rose-100'
                            }`}>
                            Your Answer: {answer.userAnswer || "Skipped"}
                          </div>
                          {!answer.isCorrect && (
                            <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                              Correct Answer: {answer.question.correct}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expandedQuestion === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="px-4 pb-4 pl-[2.75rem] sm:px-6 sm:pb-6 sm:pl-[4.5rem]">
                          <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-sm">
                            <p className="font-bold text-slate-800 mb-1 sm:mb-2 flex items-center gap-2">
                              <span className="w-1 h-3 sm:h-4 bg-indigo-500 rounded-full"></span>
                              Explanation
                            </p>
                            {answer.question.explanation || "No explanation provided for this question."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-6 sm:mt-8">
              <FeedbackForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
