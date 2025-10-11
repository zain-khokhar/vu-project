"use client";

import { useState } from "react";
import { User, Clock, Hash, Play, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/quiz")}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Quizzes</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Setup Card - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {quizData.displayName} Quiz
                </h1>
                <p className="text-indigo-100">
                  {quizData.totalQuestions} questions available
                </p>
              </div>

              {/* Setup Form */}
              <form onSubmit={handleStartQuiz} className="p-8 space-y-6">
                {/* Username Input */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-5 w-5 mr-2 text-indigo-600" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={settings.username}
                    onChange={(e) =>
                      setSettings({ ...settings, username: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Number of Questions */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
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
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          settings.questionCount === count
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Per Question */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
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
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          settings.timePerQuestion === option.value
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quiz Info */}
                <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-indigo-900 mb-2">
                    Quiz Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Questions:</span>
                      <span className="ml-2">{settings.questionCount}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Per Question:</span>
                      <span className="ml-2">{settings.timePerQuestion}s</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Total Time:</span>
                      <span className="ml-2">
                        {Math.floor(
                          (settings.questionCount * settings.timePerQuestion) / 60
                        )}
                        m {(settings.questionCount * settings.timePerQuestion) % 60}
                        s
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium">Format:</span>
                      <span className="ml-2">MCQs</span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <button
                  type="submit"
                  disabled={!settings.username.trim()}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Play className="h-6 w-6" />
                  <span>Start Quiz</span>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Takes 1 column on large screens */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quiz Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Quiz Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Questions</span>
                  <span className="font-semibold text-indigo-600">{quizData.totalQuestions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Selected</span>
                  <span className="font-semibold text-indigo-600">{settings.questionCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Time per Q</span>
                  <span className="font-semibold text-indigo-600">{settings.timePerQuestion}s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Time</span>
                  <span className="font-semibold text-indigo-600">
                    {Math.floor((settings.questionCount * settings.timePerQuestion) / 60)}m {((settings.questionCount * settings.timePerQuestion) % 60)}s
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg
                  className="h-5 w-5 mr-2 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Quiz Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>
                    Read each question carefully before selecting an answer
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Keep an eye on the timer for each question</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>Questions are randomized for a unique experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span>
                    You'll see detailed explanations after completing the quiz
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/quiz")}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  ← Back to Quiz List
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  🔄 Reset Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
