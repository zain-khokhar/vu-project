import Link from 'next/link';
import { PenTool, BookOpen } from 'lucide-react';
import { getBlogs } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

export const metadata = {
  title: 'Blogs - DocLibrary',
  description: 'Read the latest blog posts and insights from the DocLibrary community',
};

export default async function BlogsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const result = await getBlogs(page, 12);
  
  const { blogs = [], pagination = {} } = result.success 
    ? result 
    : { blogs: [], pagination: {} };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Blog Posts
                </h1>
              </div>
              <p className="text-gray-600">
                Discover insights, tutorials, and knowledge shared by our community
              </p>
            </div>

            <Link
              href="/blog/write"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <PenTool className="h-5 w-5" />
              <span>Write Blog</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {pagination.totalCount || 0}
                </div>
                <div className="text-sm text-gray-500">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {pagination.totalPages || 0}
                </div>
                <div className="text-sm text-gray-500">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {blogs.length}
                </div>
                <div className="text-sm text-gray-500">This Page</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {blogs.length > 0 ? (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                baseUrl="/blogs"
              />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No blog posts yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share your knowledge with the community!
            </p>
            <Link
              href="/blog/write"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <PenTool className="h-5 w-5" />
              <span>Write First Blog</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}