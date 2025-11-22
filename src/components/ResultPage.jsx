"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  User,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import FeedbackForm from "./FeedbackForm";

export default function ResultPage({
  username,
  category,
  userAnswers,
  totalQuestions,
  remainingTime,
}) {
  const router = useRouter();
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;
  const wrongAnswers = userAnswers.filter((answer) => !answer.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90)
      return { grade: "A+", color: "text-green-600", bg: "bg-green-50" };
    if (percentage >= 80)
      return { grade: "A", color: "text-green-500", bg: "bg-green-50" };
    if (percentage >= 70)
      return { grade: "B", color: "text-blue-600", bg: "bg-blue-50" };
    if (percentage >= 60)
      return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (percentage >= 50)
      return { grade: "D", color: "text-orange-600", bg: "bg-orange-50" };
    return { grade: "F", color: "text-red-600", bg: "bg-red-50" };
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Back Button at Top Right */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => router.push("/quiz")}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Quizzes</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Results Summary (2/3 width on xl screens) */}
          <div className="xl:col-span-2 space-y-8">
            {/* Results Header Card */}

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
                    <Trophy className="h-16 w-16 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Quiz Completed!
                </h1>
                <p className="text-indigo-100 text-lg">
                  Great job, {username}!
                </p>
              </div>

              {/* Score Summary */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Score Circle */}
                  <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                    <div className="relative w-48 h-48">
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                          fill="transparent"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={`${(percentage / 100) * 553} 553`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#9333ea" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-gray-900">
                          {percentage}%
                        </span>
                        <span
                          className={`text-2xl font-bold ${grade.color} mt-1`}
                        >
                          {grade.grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <User className="h-8 w-8 text-indigo-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Student</p>
                        <p className="text-lg font-bold text-gray-900">
                          {username}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <Trophy className="h-8 w-8 text-purple-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="text-lg font-bold text-gray-900">
                          {category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                      <Clock className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <p className="text-sm text-gray-600">Time Remaining</p>
                        <p className="text-lg font-bold text-gray-900">
                          {formatTime(remainingTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-3xl font-bold text-gray-900">
                      {totalQuestions}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Total Questions
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-3xl font-bold text-green-600">
                      {correctAnswers}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <p className="text-3xl font-bold text-red-600">
                      {wrongAnswers}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Wrong</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/quiz")}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Trophy className="h-5 w-5" />
                <span>Take Another Quiz</span>
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-indigo-600 border-2 border-indigo-600 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Retake This Quiz</span>
              </button>
            </div>
          </div>

          {/* Right Column - Question Review (1/3 width on xl screens) */}
          <div className="xl:col-span-1 space-y-8">
            {/* Question Review Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-h-screen flex flex-col">
              {/* Review Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Question Review
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Click on incorrect answers to see explanations
                </p>
              </div>

              {/* Review Content */}
              <div className="flex-1 p-6 overflow-hidden">
                <div className="space-y-4 h-full overflow-y-auto" style={{ maxHeight: '60vh' }}>
                  {userAnswers.map((answer, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-xl overflow-hidden transition-all ${
                        answer.isCorrect
                          ? "border-green-300 bg-green-50"
                          : "border-red-300 bg-red-50"
                      }`}
                    >
                      <button
                        onClick={() =>
                          !answer.isCorrect && toggleQuestion(index)
                        }
                        className="w-full text-left p-4 flex items-start justify-between hover:bg-white/50 transition-colors"
                      >
                        <div className="flex items-start flex-1 min-w-0">
                          <div className="flex-shrink-0 mt-1">
                            {answer.isCorrect ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                              <XCircle className="h-6 w-6 text-red-600" />
                            )}
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">
                              Question {index + 1}
                            </h3>
                            <div className="space-y-1">
                              <p className="text-xs">
                                <span className="font-medium text-gray-700">
                                  Your answer:
                                </span>{" "}
                                <span
                                  className={
                                    answer.isCorrect
                                      ? "text-green-700"
                                      : "text-red-700"
                                  }
                                >
                                  {answer.userAnswer || "No answer"}
                                </span>
                              </p>
                              {!answer.isCorrect && (
                                <p className="text-xs">
                                  <span className="font-medium text-gray-700">
                                    Correct:
                                  </span>{" "}
                                  <span className="text-green-700">
                                    {answer.question.correct}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        {!answer.isCorrect && (
                          <div className="ml-2 flex-shrink-0">
                            {expandedQuestion === index ? (
                              <ChevronUp className="h-5 w-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        )}
                      </button>

                      {/* Explanation (only for wrong answers) */}
                      {!answer.isCorrect && expandedQuestion === index && (
                        <div className="px-4 pb-4 border-t border-red-200 bg-white">
                          <div className="pt-4">
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                              <svg
                                className="h-4 w-4 mr-2 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Explanation
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {answer.question.explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Feedback Form */}
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}
