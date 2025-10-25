"use client";

import { useState } from "react";
import { User, Clock, Hash, Play, ArrowLeft, Brain, Sparkles, Target, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import QuizClient from "@/components/QuizClient";

export default function QuizSetup({ quizData }) {
  const router = useRouter();
  const [showQuiz, setShowQuiz] = useState(false);
  const [settings, setSettings] = useState({
    username: "",
    questionCount: 10,
    timePerQuestion: 30,
  });

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (settings.username.trim()) {
      setShowQuiz(true);
    }
  };

  const questionOptions = [10, 20, 50, 100, quizData.totalQuestions].filter(
    (val, idx, arr) =>
      arr.indexOf(val) === idx && val <= quizData.totalQuestions
  );

  const timeOptions = [
    { value: 20, label: "20 seconds" },
    { value: 30, label: "30 seconds" },
    { value: 45, label: "45 seconds" },
    { value: 60, label: "60 seconds" },
  ];

  if (showQuiz) {
    return <QuizClient quizData={quizData} settings={settings} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/quiz")}
          className="mb-8 group flex items-center space-x-2 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4 text-indigo-600 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Back to Quizzes</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Setup Card - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Header */}
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 p-8 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <Brain className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-light mb-1">
                      {quizData.displayName} Quiz
                    </h1>
                    <p className="text-indigo-100 font-light">
                      {quizData.totalQuestions} questions available
                    </p>
                  </div>
                </div>
              </div>

              {/* Setup Form */}
              <form onSubmit={handleStartQuiz} className="relative p-8 space-y-8">
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
                      <span className="ml-2 text-indigo-600 font-semibold">{settings.questionCount}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Per Question:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">{settings.timePerQuestion}s</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Zap className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Total Time:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">
                        {Math.floor(
                          (settings.questionCount * settings.timePerQuestion) / 60
                        )}m {(settings.questionCount * settings.timePerQuestion) % 60}s
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Brain className="h-4 w-4 mr-2 text-indigo-500" />
                      <span className="font-medium">Format:</span>
                      <span className="ml-2 text-indigo-600 font-semibold">MCQs</span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  type="submit"
                  disabled={!settings.username.trim()}
                  className="w-full group relative px-8 py-5 bg-gradient-to-r from-indigo-500/80 via-purple-600/70 to-blue-600/80 text-white font-medium text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover/btn:skew-x-0"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <Play className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Start Quiz</span>
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
                    <span className="text-sm text-gray-600 font-light">Total Questions</span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{quizData.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">Selected</span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{settings.questionCount}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">Time per Q</span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{settings.timePerQuestion}s</span>
                  </div>
                  <div className="flex justify-between items-center p-3 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-100/50 rounded-xl">
                    <span className="text-sm text-gray-600 font-light">Total Time</span>
                    <span className="font-semibold text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {Math.floor((settings.questionCount * settings.timePerQuestion) / 60)}m {((settings.questionCount * settings.timePerQuestion) % 60)}s
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
                    <span className="font-light leading-relaxed">Keep an eye on the timer for each question</span>
                  </li>
                  <li className="flex items-start p-2 backdrop-blur-xl bg-gradient-to-r from-yellow-50/50 via-orange-50/30 to-yellow-50/50 border border-yellow-100/50 rounded-lg">
                    <span className="text-indigo-600 mr-3 mt-0.5">•</span>
                    <span className="font-light leading-relaxed">Questions are randomized for a unique experience</span>
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
    </div>
  );
}
