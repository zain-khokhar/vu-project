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

  // Custom Circular Timer Component
  const TimerCircle = ({ seconds }) => (
    <div className="relative flex items-center justify-center w-16 h-16 bg-[#2D2B44] rounded-full border-4 border-[#00FFFF] shadow-[0_0_15px_rgba(0,255,255,0.4)] z-20 -mb-8">
      <span className="text-[#00FFFF] font-bold text-xl">{seconds}</span>
    </div>
  );

  return (
    <main
      className="bg-gray-50 flex flex-col font-sans select-none"
      role="main"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* 1. Dark Header */}
      <header className="bg-[#2D2B44] text-white h-14 fixed top-0 left-0 right-0 z-1000 shadow-md">
        <div className="max-w-[1920px] mx-auto px-4 h-full flex items-center justify-between">
          {/* Left: Title */}
          <div className="flex-1">
            <h1 className="text-white font-medium text-sm md:text-base truncate">
              {quizData.displayName || "Quiz Session"}
            </h1>
          </div>

          {/* Center: Timer Placeholder (The actual timer sits on top of the border) */}
          <div className="flex-1 flex justify-center">
            {/* This is empty, the timer is absolutely positioned or handled in the sub-header intersection if possible, 
                 but to match the 'overlap' look, let's put it here and translate it down */}
            <div className="translate-y-[50%]">
              <TimerCircle seconds={totalTimer} />
            </div>
          </div>

          {/* Right: User Info */}
          <div className="flex-1 flex justify-end items-center gap-4 text-xs md:text-sm">
            <div className="text-right hidden sm:block">
              <p className="text-gray-300">Start Time {new Date(quizStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="font-bold">{settings.username}</p>
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-600">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>


      {/* 3. Main Content Grid */}
      <div className="flex-grow mt-14 md:p-1 w-full max-w-[1920px] mx-auto ">


        <div className="flex flex-col lg:flex-row gap-1 h-full">

          {/* LEFT: Question Area */}
          <div className="flex-grow lg:w-3/4 flex flex-col gap-1">
            {/* 2. Purple Sub-Header */}
            <div className="bg-[#7341FF] text-white h-10 flex items-center mt-0">
              <div className="max-w-[1920px] w-full mx-auto px-4 flex justify-between items-center text-sm md:text-base font-medium">
                <div className="flex-1">
                  Question No : {currentQuestionIndex + 1} of {selectedQuestions.length}
                </div>
                {/* Spacer for the central timer */}
                <div className="w-20"></div>

                <div className="flex-1 flex justify-end items-center gap-4">
                  <span>Marks: 1</span>
                  <span className="text-[#00FFFF]">(Time {settings.timePerQuestion} Sec)</span>
                  <div className="bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-[#2D2B44] font-bold text-xs" title="Report Issue">!</div>
                </div>
              </div>
            </div>
            {/* Question Text Box */}
            <div className="bg-white border text-md border-gray-300 rounded shadow-sm text-gray-800 p-6 h-[160px] overflow-y-auto relative">
              {currentQuestion.question}
            </div>

            {/* Answer Section */}
            <div className="bg-white border border-gray-300 rounded shadow-sm flex flex-col overflow-y-auto mb-5 transition-all">
              <div className="bg-[#7341FF] text-white px-4 py-2 font-medium text-sm">
                Answer
              </div>
              <div className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-400px)]">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="contents">
                    <label
                      className={`flex items-center gap-3 my-2 p-3 rounded border cursor-pointer hover:bg-gray-50 transition-colors ${selectedOption === option ? 'border-[#FFB800] bg-yellow-50' : 'border-gray-200'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`q-${currentQuestionIndex}`}
                        className="w-4 h-4 text-[#7341FF] focus:ring-[#7341FF] border-gray-300"
                        checked={selectedOption === option}
                        onChange={() => handleAnswerSelect(option)}
                      />
                      <span className="text-gray-800 text-sm">{option}</span>
                    </label>

                    {/* Feedback for this specific option if selected */}
                    {isInstantMode && feedbackShown[currentQuestionIndex] && selectedOption === option && (
                      <div className={`mt-2 ml-4 p-4 rounded-lg border mb-3 ${userAnswers[currentQuestionIndex] === currentQuestion.correct
                        ? 'bg-green-50 border-green-500 text-green-700'
                        : 'bg-red-50 border-red-500 text-red-700'
                        }`}>
                        {/* <div className="flex items-center space-x-2 mb-2">
                          {userAnswers[currentQuestionIndex] === currentQuestion.correct ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-red-600" />
                          )}
                          <span className="font-bold text-lg">
                            {userAnswers[currentQuestionIndex] === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div> */}

                        {userAnswers[currentQuestionIndex] !== currentQuestion.correct && (
                          <p className="border-l-4 border-red-400 pl-3 py-1 mb-3 bg-red-100/50 rounded-r">
                            Correct answer: <strong>{currentQuestion.correct}</strong>
                          </p>
                        )}

                        {currentQuestion.explanation && (
                          <div className="mt-3 pt-3 border-t border-current/20">
                            <p className="font-semibold mb-1">Explanation:</p>
                            <p className="text-sm leading-relaxed opacity-90">{currentQuestion.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Sidebar (Summary) */}
          <div className="lg:w-1/5 min-w-[280px] flex flex-col mb-5">
            <div className="bg-white border border-gray-300 rounded shadow-sm flex flex-col h-full justify-between overflow-hidden">
              <div>
                <div className="bg-[#7341FF] px-4 py-2 font-medium text-white flex justify-between items-center">
                  <span>Summary</span>
                </div>

                {/* Number Grid */}
                <div className="p-4 flex-grow overflow-y-auto max-h-[300px]">
                  <div className="grid grid-cols-6 gap-1">
                    {selectedQuestions.map((_, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = userAnswers[idx] !== undefined;
                      const isChecked = questionStates[idx] === 'checked';
                      const isCorrect = isChecked && userAnswers[idx] === selectedQuestions[idx].correct;

                      let bgClass = "bg-white border-gray-300 text-gray-600";

                      if (isCurrent) {
                        bgClass = "bg-[#FFB800] border-[#FFB800] text-white"; // Current takes precedence
                      } else if (isInstantMode && isChecked) {
                        if (isCorrect) bgClass = "bg-green-500 border-green-500 text-white";
                        else bgClass = "bg-red-500 border-red-500 text-white";
                      } else if (isAnswered) {
                        bgClass = "bg-[#7341FF] border-[#7341FF] text-white";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => goToQuestion(idx)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-medium transition-all ${bgClass} hover:opacity-80`}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>


              {/* Footer Legend/Status */}
              <div className="bg-gray-50 border-t border-gray-200 p-4 space-y-4 ">

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((getAnsweredCount() / selectedQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#7341FF] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(getAnsweredCount() / selectedQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Legend Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#7341FF] border border-[#7341FF]"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div>
                    <span className="text-gray-600">Unanswered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FFB800] border border-[#FFB800]"></div>
                    <span className="text-gray-600">Current</span>
                  </div>
                  {isInstantMode && (
                    <>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-green-500 border border-green-500"></div>
                        <span className="text-gray-600">Correct</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-red-500"></div>
                        <span className="text-gray-600">Incorrect</span>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
        <div className="max-w-[1920px] mx-auto flex justify-between gap-4">


          <div className="flex gap-4 justify-end w-4/5">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              PREVIOUS
            </button>
            {/* ACTION BUTTON (Save & Check / Next) */}
            {/* Logic: Show if NOT last question OR (is instant mode AND not checked yet) */}
            {(currentQuestionIndex < selectedQuestions.length - 1 || (isInstantMode && !feedbackShown[currentQuestionIndex])) && (
              isInstantMode && !feedbackShown[currentQuestionIndex] ? (
                <button
                  onClick={handleSaveAndCheck}
                  disabled={!selectedOption}
                  className="px-8 py-3 bg-[#7341FF] text-white font-bold rounded-lg hover:bg-[#6035D6] disabled:opacity-50 transition-colors shadow-md"
                >
                  SAVE & CHECK
                </button>
              ) : (
                <button
                  onClick={isInstantMode ? handleNextAfterCheck : handleNextQuestion}
                  className="px-8 py-3 bg-[#7341FF] text-white font-bold rounded-lg hover:bg-[#6035D6] transition-colors shadow-md"
                >
                  NEXT QUESTION
                </button>
              )
            )}


          </div>
          {/* SUBMIT BUTTON - Always visible on right */}
          <div className="w-1/5 flex items-center justify-end">
            <button
              onClick={handleSubmitClick}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              SUBMIT QUIZ
            </button>
          </div>

        </div>
      </div>

      {/* Confirmation Dialog (Kept same but styled slightly to match) */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#2D2B44] mb-4">Submit Quiz?</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to finish the quiz? You have answered {getAnsweredCount()} out of {selectedQuestions.length} questions.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={handleCancelSubmit} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium">Cancel</button>
              <button onClick={handleConfirmSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-medium">Confirm Submit</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
