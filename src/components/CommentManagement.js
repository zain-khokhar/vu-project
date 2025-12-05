'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Eye, Trash2, Search, RefreshCw, User, Clock, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export default function CommentManagement() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({ total: 0, visible: 0, deleted: 0 });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    // Filters
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Loading states for actions
    const [updatingStatus, setUpdatingStatus] = useState('');
    const [deletingId, setDeletingId] = useState('');

    // Fetch comments data
    const fetchComments = async (page = 1, status = 'all', search = '') => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(status !== 'all' && { status }),
                ...(search && { search })
            });

            const response = await fetch(`/api/admin/comments?${params}`);
            const data = await response.json();

            if (data.success) {
                setComments(data.comments || []);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
            } else {
                setError(data.error || 'Failed to fetch comments');
                setComments([]);
            }
        } catch (err) {
            setError('Network error while fetching comments');
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch stats
    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/comments/stats');
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    // Update comment status
    const updateStatus = async (id, newStatus) => {
        setUpdatingStatus(id);
        try {
            const response = await fetch(`/api/admin/comments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();
            if (data.success) {
                // Update local state
                setComments(prev =>
                    (prev || []).map(comment =>
                        (comment._id || comment.id) === id ? { ...comment, status: newStatus } : comment
                    )
                );
                fetchStats(); // Refresh stats
            } else {
                alert(data.error || 'Failed to update status');
            }
        } catch (err) {
            alert('Network error while updating status');
        } finally {
            setUpdatingStatus('');
        }
    };

    // Delete comment
    const deleteComment = async (id) => {
        if (!confirm('Are you sure you want to delete this comment? It will be hidden from the document page.')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/admin/comments/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
                // Refresh the list
                fetchComments(currentPage, statusFilter, searchQuery);
                fetchStats();
            } else {
                alert(data.error || 'Failed to delete comment');
            }
        } catch (err) {
            alert('Network error while deleting comment');
        } finally {
            setDeletingId('');
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchComments(1, statusFilter, searchQuery);
    };

    // Handle filter change
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
        fetchComments(1, status, searchQuery);
    };

    // Initial load
    useEffect(() => {
        fetchComments();
        fetchStats();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => {
        const styles = {
            visible: 'bg-green-100 text-green-800 border-green-200',
            deleted: 'bg-red-100 text-red-800 border-red-200'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
                {status === 'visible' ? (
                    <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Visible
                    </>
                ) : (
                    <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Deleted
                    </>
                )}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Comment Management</h1>
                    <p className="text-gray-600 mt-1">Manage user comments on documents</p>
                </div>
                <button
                    onClick={() => {
                        fetchComments(currentPage, statusFilter, searchQuery);
                        fetchStats();
                    }}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                            <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-green-100/60 border border-green-200/50 rounded-2xl p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                            <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-green-700">Visible</p>
                            <p className="text-2xl font-bold text-green-900">{stats.visible}</p>
                        </div>
                    </div>
                </div>

                <div className="backdrop-blur-xl bg-gradient-to-br from-red-50/80 to-red-100/60 border border-red-200/50 rounded-2xl p-6">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                            <AlertCircle className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-red-700">Deleted</p>
                            <p className="text-2xl font-bold text-red-900">{stats.deleted}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search Comments</label>
                        <div className="flex">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Search by name or content..."
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    </form>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="visible">Visible</option>
                            <option value="deleted">Deleted</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* Comments List */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading comments...</p>
                    </div>
                ) : (!comments || comments.length === 0) ? (
                    <div className="p-8 text-center">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No comments found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {comments.map((comment) => (
                            <div key={comment.id || comment._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-start justify-between">
                                    {/* Comment Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-gray-500" />
                                                <span className="font-medium text-gray-900">{comment.name}</span>
                                            </div>
                                            {getStatusBadge(comment.status)}
                                        </div>

                                        <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>

                                        {/* Document Info */}
                                        <div className="flex items-center text-sm text-indigo-600 mb-2">
                                            <FileText className="h-4 w-4 mr-1" />
                                            <span className="font-medium">{comment.documentTitle}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {formatDate(comment.createdAt)}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 ml-4">
                                        {/* Status Toggle */}
                                        {comment.status === 'visible' ? (
                                            <button
                                                onClick={() => updateStatus(comment.id || comment._id, 'deleted')}
                                                disabled={updatingStatus === (comment.id || comment._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hide Comment"
                                            >
                                                {updatingStatus === (comment.id || comment._id) ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => updateStatus(comment.id || comment._id, 'visible')}
                                                disabled={updatingStatus === (comment.id || comment._id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Show Comment"
                                            >
                                                {updatingStatus === (comment.id || comment._id) ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                                                ) : (
                                                    <CheckCircle className="h-4 w-4" />
                                                )}
                                            </button>
                                        )}

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteComment(comment.id || comment._id)}
                                            disabled={deletingId === (comment.id || comment._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Comment"
                                        >
                                            {deletingId === (comment.id || comment._id) ? (
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
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => {
                                const newPage = currentPage - 1;
                                setCurrentPage(newPage);
                                fetchComments(newPage, statusFilter, searchQuery);
                            }}
                            disabled={currentPage === 1}
                            className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                            return (
                                <button
                                    key={page}
                                    onClick={() => {
                                        setCurrentPage(page);
                                        fetchComments(page, statusFilter, searchQuery);
                                    }}
                                    className={`px-3 py-2 border rounded-lg ${currentPage === page
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => {
                                const newPage = currentPage + 1;
                                setCurrentPage(newPage);
                                fetchComments(newPage, statusFilter, searchQuery);
                            }}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
