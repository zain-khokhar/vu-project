'use client';

import { useState, useEffect } from 'react';
import { Brain, Edit, Trash2, Search, RefreshCw, Clock, Tag, Hash, CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminPagination from './AdminPagination';

export default function QuizManagement() {
    const router = useRouter();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [limit, setLimit] = useState(10);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Loading states for actions
    const [deletingSlug, setDeletingSlug] = useState('');

    // Fetch quizzes data
    const fetchQuizzes = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search })
            });

            const response = await fetch(`/api/admin/quizzes?${params}`);
            const data = await response.json();

            if (data.success) {
                setQuizzes(data.quizzes || []);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
                setTotalCount(data.totalCount || 0);
            } else {
                setError(data.error || 'Failed to fetch quizzes');
                setQuizzes([]);
            }
        } catch (err) {
            setError('Network error while fetching quizzes');
            setQuizzes([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete quiz
    const deleteQuiz = async (slug) => {
        if (!confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
            return;
        }

        setDeletingSlug(slug);
        try {
            const response = await fetch(`/api/admin/quizzes/${slug}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
                // Refresh the list
                fetchQuizzes(currentPage, searchQuery);
            } else {
                alert(data.error || 'Failed to delete quiz');
            }
        } catch (err) {
            alert('Network error while deleting quiz');
        } finally {
            setDeletingSlug('');
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchQuizzes(1, searchQuery);
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchQuizzes(page, searchQuery);
    };

    // Initial load
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quiz Management</h1>
                    <p className="text-gray-600 mt-1">Manage and edit your quizzes ({totalCount} total)</p>
                </div>
                <button
                    onClick={() => fetchQuizzes(currentPage, searchQuery)}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </button>
            </div>

            {/* Search Bar */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl p-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search quizzes by title, category, or description..."
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
                    >
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </button>
                </form>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* Quizzes List */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading quizzes...</p>
                    </div>
                ) : (!quizzes || quizzes.length === 0) ? (
                    <div className="p-8 text-center">
                        <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No quizzes found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {quizzes.map((quiz) => (
                            <div key={quiz._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-start justify-between">
                                    {/* Quiz Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <span className="text-2xl">{quiz.icon || '📚'}</span>
                                            <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                                            {quiz.isActive ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Inactive
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-700 mb-3 line-clamp-2">{quiz.description}</p>

                                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Tag className="h-4 w-4 mr-1" />
                                                <span>{quiz.category}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Hash className="h-4 w-4 mr-1" />
                                                <span>{quiz.totalQuestions} questions</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {formatDate(quiz.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 ml-4">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => router.push(`/admin/quiz/upload?edit=${quiz.slug}`)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Edit Quiz"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteQuiz(quiz.slug)}
                                            disabled={deletingSlug === quiz.slug}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Quiz"
                                        >
                                            {deletingSlug === quiz.slug ? (
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
