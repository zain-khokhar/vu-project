'use client';

import { useState, useEffect } from 'react';
import { FileText, Edit, Trash2, Search, RefreshCw, Clock, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminPagination from './AdminPagination';
import { getAllDocumentsAdmin, deleteDocumentAdmin } from '@/actions/admin';

export default function DocumentManagement() {
    const router = useRouter();
    const [documents, setDocuments] = useState([]);
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
    const [deletingId, setDeletingId] = useState('');

    // Fetch documents data
    const fetchDocuments = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const data = await getAllDocumentsAdmin(page, limit, search);

            if (data.success) {
                setDocuments(data.documents || []);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
                setTotalCount(data.totalCount || 0);
            } else {
                setError(data.error || 'Failed to fetch documents');
                setDocuments([]);
            }
        } catch (err) {
            setError('Error while fetching documents');
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete document
    const handleDeleteDocument = async (id) => {
        if (!confirm('Are you sure you want to delete this document? This action cannot be undone and will also delete all associated comments.')) {
            return;
        }

        setDeletingId(id);
        try {
            const data = await deleteDocumentAdmin(id);

            if (data.success) {
                // Refresh the list
                fetchDocuments(currentPage, searchQuery);
            } else {
                alert(data.error || 'Failed to delete document');
            }
        } catch (err) {
            alert('Error while deleting document');
        } finally {
            setDeletingId('');
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchDocuments(1, searchQuery);
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchDocuments(page, searchQuery);
    };

    // Initial load
    useEffect(() => {
        fetchDocuments();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeBadge = (type) => {
        const styles = {
            handout: 'bg-blue-100 text-blue-800 border-blue-200',
            book: 'bg-purple-100 text-purple-800 border-purple-200',
            note: 'bg-green-100 text-green-800 border-green-200',
            exam: 'bg-red-100 text-red-800 border-red-200'
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || styles.handout}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
                    <p className="text-gray-600 mt-1">Manage course materials and documents ({totalCount} total)</p>
                </div>
                <button
                    onClick={() => fetchDocuments(currentPage, searchQuery)}
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
                        placeholder="Search documents by title, subject, or description..."
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

            {/* Documents List */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading documents...</p>
                    </div>
                ) : (!documents || documents.length === 0) ? (
                    <div className="p-8 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No documents found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {documents.map((doc) => (
                            <div key={doc._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-start justify-between">
                                    {/* Document Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                                            {getTypeBadge(doc.type)}
                                        </div>

                                        <p className="text-gray-700 mb-3 line-clamp-2">{doc.description}</p>

                                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <BookOpen className="h-4 w-4 mr-1" />
                                                <span>{doc.subject}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <GraduationCap className="h-4 w-4 mr-1" />
                                                <span>{doc.university}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span>{doc.year}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {formatDate(doc.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 ml-4">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => router.push(`/admin/upload?edit=${doc._id}`)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Edit Document"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteDocument(doc._id)}
                                            disabled={deletingId === doc._id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Document"
                                        >
                                            {deletingId === doc._id ? (
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
