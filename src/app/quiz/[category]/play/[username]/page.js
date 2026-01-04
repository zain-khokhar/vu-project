"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import QuizClient from "@/components/QuizClient";

export default function QuizPlayPage({ params }) {
    const router = useRouter();
    const { category, username } = use(params);
    const [quizData, setQuizData] = useState(null);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const footer = document.querySelector("footer");
        const navbar = document.querySelector("#navbar");
        if (footer) {
            footer.style.display = "none";
        }
        if (navbar) {
            navbar.style.display = "none";
        }
        // Optional: restore footer when unmounting
        return () => {
            if (footer) {
                footer.style.display = "";
            }
            if (navbar) {
                navbar.style.display = "";
            }
        };
    }, []);
    // useEffect(() => {
    //     const observer = new MutationObserver(() => {
    //         const footer = document.querySelector("footer");
    //         if (footer) {
    //             footer.style.display = "none";
    //         }
    //     });

    //     observer.observe(document.body, { childList: true, subtree: true });

    //     return () => observer.disconnect();
    // }, []);

    useEffect(() => {
        // Read quiz session data from sessionStorage
        const sessionData = sessionStorage.getItem('quizSession');

        if (!sessionData) {
            setError("Quiz session not found. Please start the quiz again.");
            setLoading(false);
            return;
        }

        try {
            const { quizData: storedQuizData, settings: storedSettings } = JSON.parse(sessionData);

            // Verify the username matches the URL
            const usernameFromUrl = decodeURIComponent(username);
            if (storedSettings.username !== usernameFromUrl) {
                setError("Quiz session mismatch. Please start the quiz again.");
                setLoading(false);
                return;
            }

            setQuizData(storedQuizData);
            setSettings(storedSettings);

            // Clear the session storage after reading (optional - prevents reuse)
            // sessionStorage.removeItem('quizSession');
        } catch (err) {
            console.error("Error parsing quiz session:", err);
            setError("Invalid quiz session. Please start the quiz again.");
        } finally {
            setLoading(false);
        }
    }, [username]);

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
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
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
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
                    <div className="text-yellow-500 text-6xl mb-4">📭</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Questions Found</h2>
                    <p className="text-gray-600 mb-6">This quiz doesn't have any questions yet.</p>
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return <QuizClient quizData={quizData} settings={settings} />;
}
