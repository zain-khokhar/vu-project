"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Hash, CheckCircle, Circle } from "lucide-react";
import ResultPage from "@/components/ResultPage";

export default function QuizClient({ quizData, settings }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [totalTimer, setTotalTimer] = useState(
    settings.questionCount * settings.timePerQuestion
  );
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime] = useState(Date.now());

  // Initialize random questions
  useEffect(() => {
    const shuffled = [...quizData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.questionCount);
    setSelectedQuestions(shuffled);
  }, [quizData.questions, settings.questionCount]);

  // Total Timer only
  useEffect(() => {
    if (showResults || selectedQuestions.length === 0) return;

    const timer = setInterval(() => {
      setTotalTimer((prev) => {
        if (prev <= 1) {
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults, selectedQuestions]);

  const handleAnswerSelect = (option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = useCallback(() => {
    // Convert userAnswers object to array format for ResultPage
    const answersArray = selectedQuestions.map((question, index) => ({
      question,
      userAnswer: userAnswers[index] || null,
      isCorrect: userAnswers[index] === question.correct,
      timeTaken: 0,
    }));

    // Calculate results
    const quizEndTime = Date.now();
    const timeTaken = Math.floor((quizEndTime - quizStartTime) / 1000);

    // Store in localStorage
    const result = {
      username: settings.username,
      category: quizData.displayName,
      totalQuestions: selectedQuestions.length,
      timeTaken,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem("lastQuizResult", JSON.stringify(result));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }

    setShowResults(true);
  }, [selectedQuestions, userAnswers, settings, quizData, quizStartTime]);

  const getAnsweredCount = () => {
    return Object.keys(userAnswers).length;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showResults) {
    const answersArray = selectedQuestions.map((question, index) => ({
      question,
      userAnswer: userAnswers[index] || null,
      isCorrect: userAnswers[index] === question.correct,
      timeTaken: 0,
    }));

    return (
      <ResultPage
        username={settings.username}
        category={quizData.displayName}
        userAnswers={answersArray}
        totalQuestions={selectedQuestions.length}
        remainingTime={totalTimer}
      />
    );
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex] || null;
  const progress =
    ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

  return (
    <div className="max-h-screen">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* LEFT SIDE - Question Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
              {/* Question Header */}
              <div className="p-6 border-b-2 border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-700 text-base font-semibold">
                    Question {currentQuestionIndex + 1} of{" "}
                    {selectedQuestions.length}
                  </span>
                  {currentQuestion.difficulty && (
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700">
                      {currentQuestion.difficulty}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl border border-gray-300 rounded p-3 text-gray-900 leading-relaxed min-h-[170px] max-h-[170px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="p-8 space-y-4 flex-grow min-h-[370px] border-b-2 border-gray-200">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded border-2 transition-all duration-200 ${
                      selectedOption === option
                        ? "border-indigo-600 bg-indigo-50 shadow-md"
                        : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                          selectedOption === option
                            ? "border-indigo-600 bg-indigo-600"
                            : "border-gray-400"
                        }`}
                      >
                        {selectedOption === option && (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-900 font-light text-xl">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="p-8 flex gap-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded font-semibold text-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>
                {currentQuestionIndex < selectedQuestions.length - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={finishQuiz}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-xl"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Stats & Navigation */}
          <div className="lg:col-span-1 bg-white h-full border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="space-y-6 p-6">
              {/* Timer Card */}
              <div className="pb-6 border-b-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    Time Remaining
                  </h3>
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-center">
                  <p
                    className={`text-4xl font-bold ${
                      totalTimer <= 30
                        ? "text-red-600 animate-pulse"
                        : "text-gray-900"
                    }`}
                  >
                    {formatTime(totalTimer)}
                  </p>
                </div>
              </div>

              {/* Question Bubble Menu */}
              <div className="pb-6 border-b-2 border-gray-200 flex flex-col h-[350px]">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h3 className="font-semibold text-gray-900 text-lg flex items-center">
                    <Hash className="h-5 w-5 mr-2 text-indigo-600" />
                    All Questions
                  </h3>
                </div>

                {/* Scrollable Grid */}
                <div className="grid grid-cols-6 gap-2 pb-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-grow">
                  {selectedQuestions.map((_, index) => {
                    const isAnswered = userAnswers[index] !== undefined;
                    const isCurrent = index === currentQuestionIndex;

                    return (
                      <button
                        key={index}
                        onClick={() => goToQuestion(index)}
                        className={`aspect-square rounded-full h-12 w-12 font-semibold text-sm flex items-center justify-center border-2 transition-all ${
                          isCurrent
                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-500 ring-2 ring-indigo-300"
                            : isAnswered
                            ? "bg-green-500 text-white hover:bg-green-600 border-green-600"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-400"
                        }`}
                      >
                        {isAnswered && !isCurrent ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex-shrink-0">
                  <div className="flex flex-wrap items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-green-500 border-2 border-green-600"></div>
                      <span className="text-gray-600 font-medium">
                        Answered
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-400"></div>
                      <span className="text-gray-600 font-medium">
                        Unanswered
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-indigo-500"></div>
                      <span className="text-gray-600 font-medium">Current</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="pb-6 border-b-2 border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">
                  Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span className="font-medium">Questions Answered</span>
                      <span className="font-bold text-gray-900 text-base">
                        {getAnsweredCount()} / {selectedQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300">
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (getAnsweredCount() / selectedQuestions.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  onClick={finishQuiz}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Submit Quiz</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
