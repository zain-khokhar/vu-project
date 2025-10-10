'use client';

import { useState, useEffect, useCallback } from 'react';
import { Clock, Hash } from 'lucide-react';
import ResultPage from '@/components/ResultPage';

export default function QuizClient({ quizData, settings }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimer, setQuestionTimer] = useState(settings.timePerQuestion);
  const [totalTimer, setTotalTimer] = useState(settings.questionCount * settings.timePerQuestion);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime] = useState(Date.now());

  // Initialize random questions
  useEffect(() => {
    const shuffled = [...quizData.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, settings.questionCount);
    setSelectedQuestions(shuffled);
  }, [quizData.questions, settings.questionCount]);

  // Question Timer
  useEffect(() => {
    if (showResults || selectedQuestions.length === 0) return;

    const timer = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return settings.timePerQuestion;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showResults, selectedQuestions]);

  // Total Timer
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

  const handleNextQuestion = useCallback(() => {
    // Save answer
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const answer = {
      question: currentQuestion,
      userAnswer: selectedOption,
      isCorrect: selectedOption === currentQuestion.correct,
      timeTaken: settings.timePerQuestion - questionTimer,
    };
    
    setUserAnswers((prev) => [...prev, answer]);
    setSelectedOption(null);

    // Move to next or finish
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionTimer(settings.timePerQuestion);
    } else {
      finishQuiz();
    }
  }, [currentQuestionIndex, selectedQuestions, selectedOption, questionTimer, settings.timePerQuestion]);

  const finishQuiz = useCallback(() => {
    // Save last answer if exists
    if (selectedOption !== null && currentQuestionIndex < selectedQuestions.length) {
      const currentQuestion = selectedQuestions[currentQuestionIndex];
      const answer = {
        question: currentQuestion,
        userAnswer: selectedOption,
        isCorrect: selectedOption === currentQuestion.correct,
        timeTaken: settings.timePerQuestion - questionTimer,
      };
      setUserAnswers((prev) => [...prev, answer]);
    }

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
      localStorage.setItem('lastQuizResult', JSON.stringify(result));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    setShowResults(true);
  }, [selectedOption, currentQuestionIndex, selectedQuestions, settings, quizData, questionTimer, quizStartTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <ResultPage
        username={settings.username}
        category={quizData.displayName}
        userAnswers={userAnswers}
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
  const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Stats */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Hash className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Question</p>
                <p className="text-lg font-bold text-gray-900">
                  {currentQuestionIndex + 1} / {selectedQuestions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Question Time</p>
                <p className={`text-lg font-bold ${questionTimer <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-900'}`}>
                  {questionTimer}s
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Time</p>
                <p className={`text-lg font-bold ${totalTimer <= 30 ? 'text-red-600' : 'text-gray-900'}`}>
                  {formatTime(totalTimer)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
            {currentQuestion.difficulty && (
              <span className="inline-block mt-3 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                {currentQuestion.difficulty}
              </span>
            )}
          </div>

          {/* Options */}
          <div className="p-6 space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option
                    ? 'border-indigo-600 bg-indigo-50 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${
                      selectedOption === option
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Next Button */}
          <div className="p-6 pt-0">
            <button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>
                {currentQuestionIndex < selectedQuestions.length - 1
                  ? 'Next Question'
                  : 'Finish Quiz'}
              </span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Helper Text */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          {selectedOption
            ? 'Click "Next Question" to continue'
            : 'Select an option to proceed'}
        </p>
      </div>
    </div>
  );
}
