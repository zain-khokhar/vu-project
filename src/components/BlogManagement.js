'use client';

import { useState, useEffect } from 'react';
import { FileText, Edit, Trash2, Search, RefreshCw, User, Clock, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminPagination from './AdminPagination';
import { getAllBlogsAdmin, deleteBlogAdmin } from '@/actions/admin';

export default function BlogManagement() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
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

    // Fetch blogs data
    const fetchBlogs = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const data = await getAllBlogsAdmin(page, limit, search);

            if (data.success) {
                setBlogs(data.blogs || []);
                setTotalPages(data.totalPages || 1);
                setCurrentPage(data.currentPage || 1);
                setTotalCount(data.totalCount || 0);
            } else {
                setError(data.error || 'Failed to fetch blogs');
                setBlogs([]);
            }
        } catch (err) {
            setError('Error while fetching blogs');
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    // Delete blog
    const handleDeleteBlog = async (id) => {
        if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            return;
        }

        setDeletingId(id);
        try {
            const data = await deleteBlogAdmin(id);

            if (data.success) {
                // Refresh the list
                fetchBlogs(currentPage, searchQuery);
            } else {
                alert(data.error || 'Failed to delete blog');
            }
        } catch (err) {
            alert('Error while deleting blog');
        } finally {
            setDeletingId('');
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchBlogs(1, searchQuery);
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchBlogs(page, searchQuery);
    };

    // Initial load
    useEffect(() => {
        fetchBlogs();
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
                    <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-600 mt-1">Manage and edit your blog posts ({totalCount} total)</p>
                </div>
                <button
                    onClick={() => fetchBlogs(currentPage, searchQuery)}
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
                        placeholder="Search blogs by title or excerpt..."
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

            {/* Blogs List */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/60 border border-white/90 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading blogs...</p>
                    </div>
                ) : (!blogs || blogs.length === 0) ? (
                    <div className="p-8 text-center">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No blogs found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-start justify-between">
                                    {/* Blog Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                                            {blog.published ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                    <EyeOff className="h-3 w-3 mr-1" />
                                                    Draft
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-700 mb-3 line-clamp-2">{blog.excerpt}</p>

                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            {blog.author && (
                                                <div className="flex items-center">
                                                    <User className="h-4 w-4 mr-1" />
                                                    <span>{blog.author.name}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1" />
                                                {formatDate(blog.createdAt)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2 ml-4">
                                        {/* Edit Button */}
                                        <button
                                            onClick={() => router.push(`/admin/write?edit=${blog.slug}`)}
                                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="Edit Blog"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDeleteBlog(blog._id)}
                                            disabled={deletingId === blog._id}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Blog"
                                        >
                                            {deletingId === blog._id ? (
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
