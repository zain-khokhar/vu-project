"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Hash, CheckCircle, Circle } from "lucide-react";
import ResultPage from "@/components/ResultPage";

export default function QuizClient({ quizData, settings }) {
  // Initialize questions once on mount (shuffled)
  const [selectedQuestions] = useState(() => {
    if (quizData.questions && quizData.questions.length > 0) {
      return [...quizData.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, settings.questionCount);
    }
    return [];
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [totalTimer, setTotalTimer] = useState(
    settings.questionCount * settings.timePerQuestion
  );
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime] = useState(Date.now());
  const [questionStates, setQuestionStates] = useState({}); // Track if question has been checked
  const [feedbackShown, setFeedbackShown] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isInstantMode = settings.quizMode === "instant";

  // Security: Disable right-click, copy, select, and keyboard shortcuts
  // useEffect(() => {
  //   const handleContextMenu = (e) => e.preventDefault();
  //   const handleCopy = (e) => e.preventDefault();
  //   const handleCut = (e) => e.preventDefault();
  //   const handleKeyDown = (e) => {
  //     // Prevent Ctrl+C, Ctrl+V, Ctrl+U, F12
  //     if (
  //       (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 'v' || e.key === 's')) ||
  //       e.key === 'F12'
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.addEventListener('contextmenu', handleContextMenu);
  //   document.addEventListener('copy', handleCopy);
  //   document.addEventListener('cut', handleCut);
  //   document.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('copy', handleCopy);
  //     document.removeEventListener('cut', handleCut);
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

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

    // Reset feedback state when answer changes
    if (isInstantMode) {
      setFeedbackShown((prev) => ({
        ...prev,
        [currentQuestionIndex]: false,
      }));
    }
  };

  const handleSaveAndCheck = () => {
    if (!userAnswers[currentQuestionIndex]) return;

    setQuestionStates((prev) => ({
      ...prev,
      [currentQuestionIndex]: 'checked',
    }));

    setFeedbackShown((prev) => ({
      ...prev,
      [currentQuestionIndex]: true,
    }));
  };

  const handleNextAfterCheck = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleNextQuestion = () => {
    if (isInstantMode && !questionStates[currentQuestionIndex]) {
      // In instant mode, must check answer first
      return;
    }

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

  const handleSubmitClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmDialog(false);
    finishQuiz();
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
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
    <main
      className=" select-none"
      role="main"
      aria-label="Quiz interface"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* LEFT SIDE - Question Card */}
          <article className="lg:col-span-2" aria-labelledby="question-heading">
            <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
              {/* Question Header */}
              <header className="p-6 border-b-2 border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-700 text-base font-semibold" aria-live="polite">
                    Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                  </span>
                  {currentQuestion.difficulty && (
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-semibold text-gray-700" aria-label={`Difficulty: ${currentQuestion.difficulty}`}>
                      {currentQuestion.difficulty}
                    </span>
                  )}
                </div>
                <h2 id="question-heading" className="text-lg md:text-xl border border-gray-300 rounded p-3 text-gray-900 leading-relaxed min-h-[170px] max-h-[170px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {currentQuestion.question}
                </h2>
              </header>

              {/* Options */}
              <fieldset className="p-8 space-y-4 flex-grow min-h-[370px] border-b-2 border-gray-200" aria-labelledby="question-heading">
                <legend className="sr-only">Select your answer</legend>
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`w-full block text-left p-4 rounded border-2 transition-all duration-200 cursor-pointer ${selectedOption === option
                      ? "border-indigo-600 bg-indigo-50 shadow-md"
                      : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleAnswerSelect(option)}
                      className="sr-only"
                      aria-describedby={`option-${index}`}
                    />
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${selectedOption === option
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-gray-400"
                          }`}
                        aria-hidden="true"
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
                      <span id={`option-${index}`} className="text-gray-900 font-light text-md">
                        {option}
                      </span>
                    </div>
                  </label>
                ))}
              </fieldset>

              {/* Instant Feedback */}
              {isInstantMode && feedbackShown[currentQuestionIndex] && (
                <aside className="px-8 pb-4" role="alert" aria-live="polite">
                  <div className={`p-4 rounded-lg border-2 ${userAnswers[currentQuestionIndex] === currentQuestion.correct
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-red-50 border-red-500 text-red-700'
                    }`}>
                    <div className="flex items-center space-x-2">
                      {userAnswers[currentQuestionIndex] === currentQuestion.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                      ) : (
                        <Circle className="h-5 w-5 text-red-600" aria-hidden="true" />
                      )}
                      <span className="font-semibold">
                        {userAnswers[currentQuestionIndex] === currentQuestion.correct
                          ? 'Correct!'
                          : 'Incorrect'}
                      </span>
                    </div>
                    {userAnswers[currentQuestionIndex] !== currentQuestion.correct && (
                      <p className="mt-2 text-sm">
                        Correct answer: <strong>{currentQuestion.correct}</strong>
                      </p>
                    )}
                    {currentQuestion.explanation && (
                      <p className="mt-2 text-sm">
                        <strong>Explanation:</strong> {currentQuestion.explanation}
                      </p>
                    )}
                  </div>
                </aside>
              )}

              {/* Navigation Buttons */}
              <nav className="p-8 flex gap-4" aria-label="Question navigation">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded font-semibold text-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="Previous question"
                >
                  Previous
                </button>

                {isInstantMode ? (
                  // Instant feedback mode buttons
                  !feedbackShown[currentQuestionIndex] ? (
                    <button
                      onClick={handleSaveAndCheck}
                      disabled={!userAnswers[currentQuestionIndex]}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl"
                      aria-label="Save and check your answer"
                    >
                      Save & Check
                    </button>
                  ) : (
                    currentQuestionIndex < selectedQuestions.length - 1 ? (
                      <button
                        onClick={handleNextAfterCheck}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl"
                        aria-label="Go to next question"
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitClick}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-xl"
                        aria-label="Submit quiz"
                      >
                        Submit Quiz
                      </button>
                    )
                  )
                ) : (
                  // Normal mode buttons
                  currentQuestionIndex < selectedQuestions.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl"
                      aria-label="Go to next question"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitClick}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-xl"
                      aria-label="Submit quiz"
                    >
                      Submit Quiz
                    </button>
                  )
                )}
              </nav>
            </section>
          </article>

          {/* RIGHT SIDE - Stats & Navigation */}
          <aside className="lg:col-span-1 bg-white h-full border border-gray-200 rounded-2xl shadow-xl overflow-hidden" aria-label="Quiz statistics and navigation">
            <div className="space-y-6 p-6">
              {/* Timer Card */}
              <section className="pb-6 border-b-2 border-gray-200" aria-labelledby="timer-heading">
                <header className="flex items-center justify-between mb-4">
                  <h3 id="timer-heading" className="font-semibold text-gray-900 text-lg">
                    Time Remaining
                  </h3>
                  <Clock className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </header>
                <div className="text-center" role="timer" aria-live="polite" aria-atomic="true">
                  <p
                    className={`text-4xl font-bold ${totalTimer <= 30
                      ? "text-red-600"
                      : "text-gray-900"
                      }`}
                    aria-label={`${Math.floor(totalTimer / 60)} minutes and ${totalTimer % 60} seconds remaining`}
                  >
                    {formatTime(totalTimer)}
                  </p>
                </div>
              </section>

              {/* Question Bubble Menu */}
              <nav className="pb-6 border-b-2 border-gray-200 flex flex-col h-[350px]" aria-label="Question navigation">
                {/* Header */}
                <header className="flex items-center justify-between mb-4 flex-shrink-0">
                  <h3 className="font-semibold text-gray-900 text-lg flex items-center">
                    <Hash className="h-5 w-5 mr-2 text-indigo-600" aria-hidden="true" />
                    All Questions
                  </h3>
                </header>

                {/* Scrollable Grid */}
                <div className="grid grid-cols-6 gap-2 pb-4 overflow-y-auto bg-gray-200 rounded p-2 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex-grow shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]" role="list" aria-label="Question list">
                  {selectedQuestions.map((_, index) => {
                    const isAnswered = userAnswers[index] !== undefined;
                    const isCurrent = index === currentQuestionIndex;
                    const isChecked = questionStates[index] === 'checked';
                    const isCorrect = isChecked && userAnswers[index] === selectedQuestions[index].correct;

                    return (
                      <button
                        key={index}
                        onClick={() => goToQuestion(index)}
                        role="listitem"
                        aria-label={`Question ${index + 1}${isAnswered ? ', answered' : ', not answered'}${isCurrent ? ', current' : ''}`}
                        aria-current={isCurrent ? 'true' : undefined}
                        className={`aspect-square rounded-full h-12 w-12 font-semibold text-sm flex items-center justify-center border-2 transition-all ${isCurrent
                          ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-500 ring-2 ring-indigo-300"
                          : isInstantMode && isChecked
                            ? isCorrect
                              ? "bg-green-500 text-white hover:bg-green-600 border-green-600"
                              : "bg-red-500 text-white hover:bg-red-600 border-red-600"
                            : isAnswered
                              ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-600"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-400"
                          }`}
                      >
                        {(isAnswered && !isCurrent) || isChecked ? (
                          <CheckCircle className="h-5 w-5" aria-hidden="true" />
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
                    {isInstantMode ? (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded bg-green-500 border-2 border-green-600"></div>
                          <span className="text-gray-600 font-medium">
                            Correct
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded bg-red-500 border-2 border-red-600"></div>
                          <span className="text-gray-600 font-medium">
                            Incorrect
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded bg-blue-500 border-2 border-blue-600"></div>
                          <span className="text-gray-600 font-medium">
                            Selected
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
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </nav>

              {/* Progress Card */}
              <section className="pb-6 border-b-2 border-gray-200" aria-labelledby="progress-heading">
                <h3 id="progress-heading" className="font-semibold text-gray-900 text-lg mb-4">
                  Progress
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span className="font-medium">Questions Answered</span>
                      <span className="font-bold text-gray-900 text-base" aria-live="polite">
                        {getAnsweredCount()} / {selectedQuestions.length}
                      </span>
                    </div>
                    <div
                      className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-gray-300"
                      role="progressbar"
                      aria-valuenow={getAnsweredCount()}
                      aria-valuemin={0}
                      aria-valuemax={selectedQuestions.length}
                      aria-label="Quiz progress"
                    >
                      <div
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                        style={{
                          width: `${(getAnsweredCount() / selectedQuestions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <div>
                <button
                  onClick={handleSubmitClick}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                  aria-label="Submit quiz now"
                >
                  <span>Submit Quiz</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
          </aside>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
        >
          <article className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all" role="alertdialog">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                <svg
                  className="h-10 w-10 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 id="confirm-dialog-title" className="text-2xl font-bold text-gray-900 mb-3">
                Submit Quiz?
              </h2>

              {/* Message */}
              <div className="mb-6 space-y-3">
                <p className="text-gray-600 text-base">
                  Are you sure you want to submit your quiz?
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Questions Answered:</span>
                    <span className="font-semibold text-gray-900">
                      {getAnsweredCount()} / {selectedQuestions.length}
                    </span>
                  </div>
                  {getAnsweredCount() < selectedQuestions.length && (
                    <p className="text-yellow-600 text-sm font-medium mt-2">
                      ⚠️ You have {selectedQuestions.length - getAnsweredCount()} unanswered question(s)
                    </p>
                  )}
                </div>
                <p className="text-gray-500 text-sm">
                  Once submitted, you cannot change your answers.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelSubmit}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
