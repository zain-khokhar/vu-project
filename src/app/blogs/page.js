import Link from 'next/link';
import { FileText } from 'lucide-react';
import { getBlogs } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import FeaturedPosts from '@/components/FeaturedPosts';
import {
  generateDocumentMetadata,
  generateDocumentStructuredData,
  generateWebsiteStructuredData,
} from '@/lib/seo-utils';

export default async function BlogsPage() {
  const page = 1;
  const result = await getBlogs(page, 12);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white/80 to-blue-50/30 overflow-hidden relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteStructuredData(),
            generateDocumentStructuredData({
              type: 'Blog',
              name: 'Vuedu Blog',
              description: 'Educational articles, tutorials, and insights for students and learners',
              url: '/blogs',
              breadcrumbs: [
                { name: 'Home', url: '/' },
                { name: 'Blogs', url: '/blogs' },
              ],
              items: enhancedBlogs.slice(0, 13).map(blog => ({
                title: blog.title,
                description: blog.excerpt || blog.description,
                url: `/blogs/${blog.slug}`,
                type: 'BlogPosting',
                subject: blog.tags?.[0] || 'Education',
              })),
              totalItems: pagination?.totalCount || enhancedBlogs.length,
              dateModified: enhancedBlogs[0]?.updatedAt || new Date().toISOString(),
            }),
          ]),
        }}
      />

      {/* Premium Liquid Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-40"></div>

        {/* Liquid orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 via-pink-300/10 to-transparent rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-400/20 via-cyan-300/10 to-transparent rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-300/10 via-blue-300/10 to-purple-300/10 rounded-full filter blur-3xl transform -translate-x-1/2 opacity-60"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div className="space-y-6">
              {/* Premium Badge */}
              <div className="inline-block group">
                <div className="relative backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">COMMUNITY KNOWLEDGE</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                    Explore Our
                  </span>
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent  ">
                    Blog Collection
                  </span>
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full  "></div>
              </div>

              {/* Subheading */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl font-normal">
                Discover insightful articles, tutorials, and knowledge shared by our community. Learn from experts and grow your skills.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="#first"
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-500/80 via-purple-600/70 to-pink-600/80 text-white font-medium text-sm rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95 w-fit"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-0"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <FileText className="h-4 w-4 text-pink-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <span>Explore Blogs</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Side - Vector Sketch Elements (truncated for brevity) */}
            <div className="relative h-[500px] hidden lg:block">
              <div className="absolute inset-0 pointer-events-none">
                {/* Decorative elements */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {enhancedBlogs.length > 0 && (
        <section className="relative py-12 !px-4 !sm:px-6 !lg:px-12" id='first'>
          <FeaturedPosts blogs={enhancedBlogs} />
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">LATEST POSTS</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl !font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">Latest Blog Posts</h2>
              <p className="text-lg text-gray-700 !font-light">Stay updated with the newest articles and insights</p>
            </div>
          </div>

          {/* Content */}
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(3).map((blog) => (
                <div key={blog._id} className="group  overflow-hidden">
                  <div className="relative">
                    <BlogCard blog={blog} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <Pagination
                pagination={enhancedPagination}
                baseUrl="/blogs"
              />
            </div>
          </>
        </div>
      </section>
    </div>
  );
}

// Generate dynamic metadata
export async function generateMetadata() {
  const title = 'Educational Blogs & Articles - Vuedu';
  const description = 'Read the latest educational articles, tutorials, study tips, and insights from experts. Learn about programming, data structures, web development, and more.';
  const keywords = [
    'educational blogs',
    'programming tutorials',
    'study tips',
    'computer science articles',
    'web development',
    'data structures',
    'algorithms',
    'student resources',
    'learning materials',
    'tech education',
  ];

  return generateDocumentMetadata({
    title,
    description,
    keywords,
    url: '/blogs',
    canonical: '/blogs',
    type: 'website',
    images: [
      {
        url: '/og-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Vuedu Blog - Educational Articles & Tutorials',
      },
    ],
  });
}

// Main page can be static as blogs don't have filters
export const dynamic = 'force-static';
export const revalidate = false;