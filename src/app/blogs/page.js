import Link from 'next/link';
import { PenTool, BookOpen } from 'lucide-react';
import { getBlogs } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import FeaturedPosts from '@/components/FeaturedPosts';

export const metadata = {
  title: 'Blogs - DocLibrary',
  description: 'Read the latest blog posts and insights from the DocLibrary community',
};

export default async function BlogsPage({ searchParams }) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const result = await getBlogs(page, 9);

  const { blogs = [], pagination = {} } = result.success
    ? result
    : { blogs: [], pagination: {} };

  // Enhance the pagination object with hasPrev and hasNext flags
  const enhancedPagination = pagination ? {
    ...pagination,
    hasPrev: pagination.currentPage > 1,
    hasNext: pagination.hasMore || pagination.currentPage < pagination.totalPages
  } : {};

  // Add category for each blog if it doesn't exist
  const enhancedBlogs = blogs.map(blog => ({
    ...blog,
    tags: blog.tags || ['General'],
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Posts Section */}


      <div className=" py-8">

        {enhancedBlogs.length > 0 && (
          <FeaturedPosts blogs={enhancedBlogs} />
        )}
        <div className='w-full mt-16 sm:mt-24 md:mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

          <h2 className="text-3xl max-w-7xl mx-auto font-bold text-gray-900 mb-10">Latest Posts</h2>
        </div>

        {/* Content */}
        {blogs.length > 0 ? (
          <>
            {/* Blog Grid */}
            <div className="grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">

              {blogs.map((blog) => (
                <article key={blog._id} className='col-span-1 row-span-1 relative'>

                  <BlogCard key={blog._id} blog={blog} />
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <Pagination
                pagination={enhancedPagination}
                baseUrl="/blogs"
              />
            </div>
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
            
          </div>
        )}
      </div>
    </div>
  );
}