"use client";

import { useEffect, useState } from "react";
import {
  User,
  Clock,
  Hash,
  Play,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Brain,
  Sparkles,
  Target,
  Zap,
  Loader,
  CheckCircle,
  X,
  Eye,
  EyeOff
} from "lucide-react";
import { useRouter } from "next/navigation";
import QuizClient from "@/components/QuizClient";

export default function QuizSetup({ quizData }) {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [fetchedQuestions, setFetchedQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [settings, setSettings] = useState({
    username: "",
    questionCount: Math.min(10, quizData.totalQuestions),
    timePerQuestion: 30,
    quizMode: "instant", // "instant" for one-by-one, "end" for see answers at end
  });
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) {
      main.style.display = showQuiz ? "none" : "";
    }
  }, [showQuiz]);
  const handleStartQuiz = async (e) => {
    e.preventDefault();
    if (!settings.username.trim()) return;

    setShowConfirmModal(true);
  };

  const confirmStartQuiz = async () => {
    setShowConfirmModal(false);
    setLoadingQuestions(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/quiz/questions?slug=${quizData.slug}&count=${settings.questionCount}`
      );

      if (!response.ok) {
        throw new Error("Failed to load quiz questions");
      }

      const data = await response.json();
      setFetchedQuestions(data.questions);
      setShowQuiz(true);
    } catch (err) {
      console.error("Error loading questions:", err);
      setError("Failed to load quiz questions. Please try again.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const questionOptions = [10, 20, 50, 100, quizData.totalQuestions]
    .filter(
      (val, idx, arr) =>
        arr.indexOf(val) === idx && val <= quizData.totalQuestions
    )
    .sort((a, b) => a - b);

  const timeOptions = [
    { value: 20, label: "20 seconds" },
    { value: 30, label: "30 seconds" },
    { value: 45, label: "45 seconds" },
    { value: 60, label: "60 seconds" },
  ];

  if (showQuiz && fetchedQuestions) {
    return (
      <QuizClient
        quizData={{
          ...quizData,
          questions: fetchedQuestions,
        }}
        settings={settings}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Setup Card - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
              {/* Setup Form */}
              <form
                onSubmit={handleStartQuiz}
                className="relative p-8 space-y-8"
              >
                {/* Error Message */}
                {error && (
                  <div className="backdrop-blur-xl bg-red-50/80 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Username Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <User className="h-5 w-5 mr-2 text-indigo-600" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={settings.username}
                    onChange={(e) =>
                      setSettings({ ...settings, username: e.target.value })
                    }
                    placeholder="Enter your name to start"
                    className="w-full px-4 py-4 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all shadow-2xl duration-300 text-gray-900 placeholder-gray-500 "
                    required
                  />
                </div>

                {/* Number of Questions */}
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Hash className="h-5 w-5 mr-2 text-indigo-600" />
                    Number of Questions
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {questionOptions.map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() =>
                          setSettings({ ...settings, questionCount: count })
                        }
                        className={`py-4 px-4 rounded-2xl font-medium transition-all duration-500 hover:scale-105 ${
                          settings.questionCount === count
                            ? "backdrop-blur-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl border border-white/40"
                            : "backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 text-gray-700 hover:text-indigo-600 border border-white/80 shadow-lg hover:shadow-xl hover:border-indigo-300"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Per Question */}
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                    Time Per Question
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            timePerQuestion: option.value,
                          })
                        }
                        className={`py-4 px-4 rounded-2xl font-medium transition-all duration-500 hover:scale-105 ${
                          settings.timePerQuestion === option.value
                            ? "backdrop-blur-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-3xl border border-white/40"
                            : "backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 text-gray-700 hover:text-indigo-600 border border-white/80 shadow-lg hover:shadow-xl hover:border-indigo-300"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiz Mode Selection */}
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Eye className="h-5 w-5 mr-2 text-indigo-600" />
                    Answer Review Mode
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSettings({ ...settings, quizMode: "instant" })
                      }
                      className={`py-4 px-6 rounded-2xl font-medium transition-all duration-500 hover:scale-105 text-left ${
                        settings.quizMode === "instant"
                          ? "backdrop-blur-xl bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl hover:shadow-3xl border border-white/40"
                          : "backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 text-gray-700 hover:text-green-600 border border-white/80 shadow-lg hover:shadow-xl hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm">
                            Instant Feedback
                          </div>
                          <div className={`text-xs mt-1 ${
                            settings.quizMode === "instant" ? "text-green-100" : "text-gray-500"
                          }`}>
                            See if your answer is correct immediately after each question
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() =>
                        setSettings({ ...settings, quizMode: "end" })
                      }
                      className={`py-4 px-6 rounded-2xl font-medium transition-all duration-500 hover:scale-105 text-left ${
                        settings.quizMode === "end"
                          ? "backdrop-blur-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-3xl border border-white/40"
                          : "backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 text-gray-700 hover:text-blue-600 border border-white/80 shadow-lg hover:shadow-xl hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <EyeOff className="h-5 w-5 flex-shrink-0" />
                        <div>
                          <div className="font-semibold text-sm">
                            Review at End
                          </div>
                          <div className={`text-xs mt-1 ${
                            settings.quizMode === "end" ? "text-blue-100" : "text-gray-500"
                          }`}>
                            Complete all questions first, then see results and explanations
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Quiz Info */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-2xl p-6 space-y-4">
                  <h3 className="font-medium text-indigo-900 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                    Quiz Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <Target className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Questions:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">
                        {settings.questionCount}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Per Question:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">
                        {settings.timePerQuestion}s
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Zap className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Total Time:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">
                        {Math.floor(
                          (settings.questionCount * settings.timePerQuestion) /
                            60
                        )}
                        m{" "}
                        {(settings.questionCount * settings.timePerQuestion) %
                          60}
                        s
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Brain className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Mode:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">
                        {settings.quizMode === "instant" ? "Instant" : "End Review"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  type="submit"
                  disabled={!settings.username.trim() || loadingQuestions}
                  className="w-full group relative px-8 py-5 bg-gradient-to-r from-indigo-500/80 via-purple-600/70 to-blue-600/80 text-white font-medium text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover/btn:skew-x-0"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    {loadingQuestions ? (
                      <>
                        <Loader className="h-6 w-6 animate-spin" />
                        <span>Loading Questions...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Start Quiz</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Takes 1 column on large screens */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quiz Stats Card */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <h3 className="font-medium text-gray-900 mb-6 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-indigo-600" />
                  Quiz Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">
                      Total Questions
                    </span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {quizData.totalQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">
                      Selected
                    </span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {settings.questionCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">
                      Time per Q
                    </span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {settings.timePerQuestion}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">
                      Total Time
                    </span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.floor(
                        (settings.questionCount * settings.timePerQuestion) / 60
                      )}
                      m{" "}
                      {(settings.questionCount * settings.timePerQuestion) % 60}
                      s
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Information Card */}
            {/* <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-indigo-600" />
                  Quiz Details
                </h3>
                <div className="space-y-3 text-sm">
                  {quizData.category && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                      <Tag className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">Category</p>
                        <p className="text-gray-900 font-medium">{quizData.category}</p>
                      </div>
                    </div>
                  )}
                  {quizData.description && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                      <Info className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">Description</p>
                        <p className="text-gray-700 font-light leading-relaxed">{quizData.description}</p>
                      </div>
                    </div>
                  )}
                  {quizData.createdAt && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                      <Calendar className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">Created</p>
                        <p className="text-gray-900 font-medium">
                          {new Date(quizData.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  {quizData.updatedAt && quizData.updatedAt !== quizData.createdAt && (
                    <div className="flex items-start gap-3 p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                      <Calendar className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">Last Updated</p>
                        <p className="text-gray-900 font-medium">
                          {new Date(quizData.updatedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div> */}

            {/* Tips Section */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  Quiz Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start p-2 backdrop-blur-xl bg-gradient-to-r from-yellow-50/50 via-orange-50/30 to-yellow-50/50 border border-yellow-100/50 rounded-lg">
                    <span className="text-indigo-600 mr-3 mt-0.5">•</span>
                    <span className="font-light leading-relaxed">
                      Read each question carefully before selecting an answer
                    </span>
                  </li>
                  <li className="flex items-start p-2 backdrop-blur-xl bg-gradient-to-r from-yellow-50/50 via-orange-50/30 to-yellow-50/50 border border-yellow-100/50 rounded-lg">
                    <span className="text-indigo-600 mr-3 mt-0.5">•</span>
                    <span className="font-light leading-relaxed">
                      Keep an eye on the timer for each question
                    </span>
                  </li>
                  <li className="flex items-start p-2 backdrop-blur-xl bg-gradient-to-r from-yellow-50/50 via-orange-50/30 to-yellow-50/50 border border-yellow-100/50 rounded-lg">
                    <span className="text-indigo-600 mr-3 mt-0.5">•</span>
                    <span className="font-light leading-relaxed">
                      Questions are randomized for a unique experience
                    </span>
                  </li>
                  <li className="flex items-start p-2 backdrop-blur-xl bg-gradient-to-r from-yellow-50/50 via-orange-50/30 to-yellow-50/50 border border-yellow-100/50 rounded-lg">
                    <span className="text-indigo-600 mr-3 mt-0.5">•</span>
                    <span className="font-light leading-relaxed">
                      You'll see detailed explanations after completing the quiz
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-green-500" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push("/quiz")}
                    className="w-full text-left px-4 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-xl text-sm text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                  >
                    <div className="flex items-center space-x-2">
                      <ArrowLeft className="h-4 w-4 group-hover/btn:-translate-x-1 transition-transform duration-300" />
                      <span>Back to Quiz List</span>
                    </div>
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full text-left px-4 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-xl text-sm text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-indigo-600">🔄</span>
                      <span>Reset Settings</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/90 via-white/80 to-white/70 border border-white/90 rounded-3xl shadow-2xl max-w-md w-full transform transition-all">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <AlertCircle className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Confirm Quiz Start</h3>
                </div>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Are you ready to start your quiz with the following settings?
                </p>
                
                <div className="backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-2xl p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">{settings.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-semibold text-indigo-600">{settings.questionCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time per Question:</span>
                      <span className="font-semibold text-indigo-600">{settings.timePerQuestion}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Review Mode:</span>
                      <span className="font-semibold text-indigo-600">
                        {settings.quizMode === "instant" ? "Instant Feedback" : "Review at End"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Time:</span>
                      <span className="font-semibold text-indigo-600">
                        {Math.floor((settings.questionCount * settings.timePerQuestion) / 60)}m{" "}
                        {(settings.questionCount * settings.timePerQuestion) % 60}s
                      </span>
                    </div>
                  </div>
                </div>

                {settings.quizMode === "instant" && (
                  <div className="backdrop-blur-xl bg-gradient-to-r from-green-50/50 via-emerald-50/30 to-green-50/50 border border-green-100/50 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium text-sm">Instant Feedback Mode</p>
                        <p className="text-green-700 text-xs mt-1">
                          You'll see if your answer is correct immediately after each question.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50/50 rounded-b-3xl border-t border-white/50 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 text-gray-700 bg-white/70 border-2 border-gray-300 rounded-xl hover:bg-white hover:border-gray-400 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmStartQuiz}
                disabled={loadingQuestions}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loadingQuestions ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Start Quiz</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
