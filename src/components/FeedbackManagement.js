'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Eye, Check, X, Trash2, Search, Filter, RefreshCw, User, Clock, AlertCircle } from 'lucide-react';
import { getFeedback, updateFeedbackStatus, deleteFeedback as deleteFeedbackAction, getFeedbackStats } from '@/actions/feedback';

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, resolved: 0 });

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

  // Fetch feedback data
  const fetchFeedbackData = async (page = 1, status = 'all', search = '') => {
    setLoading(true);
    try {
      const data = await getFeedback({
        page,
        limit,
        status: status !== 'all' ? status : '',
        search
      });

      if (data.success) {
        setFeedbacks(data.feedback || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } else {
        setError(data.error || 'Failed to fetch feedback');
        setFeedbacks([]);
      }
    } catch (err) {
      setError('Error while fetching feedback');
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const data = await getFeedbackStats();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // Update feedback status
  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingStatus(id);
    try {
      const data = await updateFeedbackStatus(id, newStatus);

      if (data.success) {
        // Update local state
        setFeedbacks(prev =>
          (prev || []).map(feedback =>
            (feedback._id || feedback.id) === id ? { ...feedback, status: newStatus } : feedback
          )
        );
        fetchStats(); // Refresh stats
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error while updating status');
    } finally {
      setUpdatingStatus('');
    }
  };

  // Delete feedback
  const handleDeleteFeedback = async (id) => {
    if (!confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const data = await deleteFeedbackAction(id);

      if (data.success) {
        setFeedbacks(prev => (prev || []).filter(feedback => (feedback._id || feedback.id) !== id));
        fetchStats(); // Refresh stats

        // If this was the last item on the page and there are previous pages, go back one page
        if (feedbacks && feedbacks.length === 1 && currentPage > 1) {
          fetchFeedbackData(currentPage - 1, statusFilter, searchQuery);
        } else {
          fetchFeedbackData(currentPage, statusFilter, searchQuery);
        }
      } else {
        alert(data.error || 'Failed to delete feedback');
      }
    } catch (err) {
      alert('Error while deleting feedback');
    } finally {
      setDeletingId('');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchFeedbackData(1, statusFilter, searchQuery);
  };

  // Handle filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
    fetchFeedbackData(1, status, searchQuery);
  };

  // Initial load
  useEffect(() => {
    fetchFeedbackData();
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
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      reviewed: 'bg-blue-100 text-blue-800 border-blue-200',
      resolved: 'bg-green-100 text-green-800 border-green-200'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Management</h1>
          <p className="text-gray-600 mt-1">Manage and respond to user feedback</p>
        </div>
        <button
          onClick={() => {
            fetchFeedbackData(currentPage, statusFilter, searchQuery);
            fetchStats();
          }}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

        <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-50/80 to-yellow-100/60 border border-yellow-200/50 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-700">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-50/80 to-blue-100/60 border border-blue-200/50 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-700">Reviewed</p>
              <p className="text-2xl font-bold text-blue-900">{stats.reviewed}</p>
            </div>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-gradient-to-br from-green-50/80 to-green-100/60 border border-green-200/50 rounded-2xl p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-700">Resolved</p>
              <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Feedback</label>
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by name or message..."
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
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
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

      {/* Feedback List */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading feedback...</p>
          </div>
        ) : (!feedbacks || feedbacks.length === 0) ? (
          <div className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No feedback found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <div key={feedback.id || feedback._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between">
                  {/* Feedback Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{feedback.name}</span>
                      </div>
                      {getStatusBadge(feedback.status)}
                    </div>

                    <p className="text-gray-700 mb-3 leading-relaxed">{feedback.description}</p>

                    {feedback.contact && (
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Contact:</strong> {feedback.contact}
                      </p>
                    )}

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(feedback.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {/* Status Update Buttons */}
                    <div className="flex space-x-1">
                      {feedback.status !== 'reviewed' && (
                        <button
                          onClick={() => handleUpdateStatus(feedback.id || feedback._id, 'reviewed')}
                          disabled={updatingStatus === (feedback.id || feedback._id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Mark as Reviewed"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      {feedback.status !== 'resolved' && (
                        <button
                          onClick={() => handleUpdateStatus(feedback.id || feedback._id, 'resolved')}
                          disabled={updatingStatus === (feedback.id || feedback._id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Resolved"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteFeedback(feedback.id || feedback._id)}
                      disabled={deletingId === (feedback.id || feedback._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Feedback"
                    >
                      {deletingId === (feedback.id || feedback._id) ? (
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
                fetchFeedbackData(newPage, statusFilter, searchQuery);
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
                    fetchFeedbackData(page, statusFilter, searchQuery);
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
                fetchFeedbackData(newPage, statusFilter, searchQuery);
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