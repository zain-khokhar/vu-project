"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import QuizClient from "@/components/QuizClient";

export default function QuizPlayPage({ params }) {
    const searchParams = useSearchParams();
    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get settings from URL params
    const settings = {
        username: searchParams.get("username") || "Guest",
        questionCount: parseInt(searchParams.get("count")) || 10,
        timePerQuestion: parseInt(searchParams.get("time")) || 30,
        quizMode: searchParams.get("mode") || "instant",
    };

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                setLoading(true);
                const category = params.category;

                const response = await fetch(
                    `/api/quiz/questions?slug=${category}&count=${settings.questionCount}`
                );

                if (!response.ok) {
                    throw new Error("Failed to load quiz questions");
                }

                const data = await response.json();

                setQuizData({
                    slug: category,
                    displayName: data.quizTitle || category,
                    description: data.quizDescription,
                    questions: data.questions,
                    totalQuestions: data.totalQuestions,
                });
            } catch (err) {
                console.error("Error loading questions:", err);
                setError("Failed to load quiz questions. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizQuestions();
    }, [params.category, settings.questionCount]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
                    <div className="text-yellow-500 text-6xl mb-4">📭</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Questions Found</h2>
                    <p className="text-gray-600 mb-4">This quiz doesn't have any questions yet.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return <QuizClient quizData={quizData} settings={settings} />;
}
