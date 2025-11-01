import Link from 'next/link';
import { PenTool, BookOpen, ArrowRight, FileText } from 'lucide-react';
import { getBlogs } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import FeaturedPosts from '@/components/FeaturedPosts';
import {
  generateDocumentMetadata,
  generateDocumentStructuredData,
  generateWebsiteStructuredData,
  formatSEODate
} from '@/lib/seo-utils';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteStructuredData(),
            generateDocumentStructuredData({
              type: 'Blog',
              name: 'VUEDU Blog',
              description: 'Educational articles, tutorials, and insights for students and learners',
              url: '/blogs',
              breadcrumbs: [
                { name: 'Home', url: '/' },
                { name: 'Blogs', url: '/blogs' },
              ],
              items: enhancedBlogs.slice(0, 10).map(blog => ({
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
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/15 via-pink-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-400/15 via-cyan-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-300/8 via-blue-300/8 to-purple-300/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse transform -translate-x-1/2" style={{ animationDelay: '4s' }}></div>
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
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                    Blog Collection
                  </span>
                </h1>
                <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse"></div>
              </div>

              {/* Subheading */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl font-normal">
                Discover insightful articles, tutorials, and knowledge shared by our community. Learn from experts and grow your skills.
              </p>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/blog/write"
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-500/80 via-purple-600/70 to-pink-600/80 text-white font-medium text-sm rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95 w-fit"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-0"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <FileText className="h-4 w-4 text-pink-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <span>Write a Blog Post</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Side - Vector Sketch Elements */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Floating Vector Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Badge - Top Right */}
                <div className="absolute top-0 right-0 w-40 h-14 backdrop-blur-xl bg-gradient-to-r from-purple-100/50 via-white/40 to-pink-100/50 border-2 border-white/70 rounded-full shadow-xl p-3 animate-pulse">
                  <div className="flex items-center justify-between h-full">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"></div>
                  </div>
                </div>

                {/* Half Badge - Top Right (Semi-circle) */}
                <div className="absolute top-20 right-12 w-32 h-16 backdrop-blur-xl bg-gradient-to-b from-blue-100/50 to-transparent border-l-2 border-b-2 border-white/70 rounded-bl-3xl shadow-lg p-3 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="space-y-1">
                    <div className="w-3/4 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <div className="w-1/2 h-1 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full"></div>
                  </div>
                </div>

                {/* Full Circle - Right Side Middle */}
                <div className="absolute top-1/3 right-4 w-24 h-24 backdrop-blur-xl bg-gradient-to-br from-pink-100/50 to-purple-100/50 border-2 border-white/70 rounded-full shadow-xl animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-400/60 to-purple-400/60 rounded-full"></div>
                  </div>
                </div>

                {/* Rectangle with rounded corners - Left Center */}
                <div className="absolute top-2/3 left-0 w-36 h-20 backdrop-blur-xl bg-gradient-to-br from-indigo-100/50 via-white/40 to-blue-100/50 border-2 border-white/70 rounded-3xl shadow-lg p-3 hover:scale-105 transition-transform duration-500">
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full"></div>
                    <div className="w-4/5 h-1.5 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full"></div>
                    <div className="w-3/5 h-1.5 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full"></div>
                  </div>
                </div>

                {/* Vector Card 1 - Top Center */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-40 backdrop-blur-xl bg-gradient-to-br from-purple-100/40 via-white/30 to-purple-50/40 border-2 border-white/70 rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-pulse">
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <div className="w-4/5 h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"></div>
                    <div className="w-3/5 h-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full"></div>
                  </div>
                </div>

                {/* Half Circle Bottom - Left */}
                <div className="absolute bottom-24 left-8 w-32 h-16 backdrop-blur-xl bg-gradient-to-t from-green-100/50 to-transparent border-l-2 border-t-2 border-white/70 rounded-tl-3xl shadow-lg animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
                  <div className="p-2">
                    <div className="w-2/3 h-1.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  </div>
                </div>

                {/* Vector Circle with Dots - Center */}
                <div className="absolute top-1/3 right-24 w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full opacity-80 animate-spin" style={{ animationDuration: '30s' }}>
                    <circle cx="100" cy="100" r="90" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
                    <circle cx="100" cy="20" r="6" fill="#a78bfa" opacity="0.8" />
                    <circle cx="170" cy="70" r="5" fill="#ec4899" opacity="0.7" />
                    <circle cx="170" cy="130" r="5" fill="#3b82f6" opacity="0.7" />
                    <circle cx="100" cy="180" r="6" fill="#a78bfa" opacity="0.8" />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Rounded Rectangle - Right Bottom */}
                <div className="absolute bottom-12 right-0 w-40 h-24 backdrop-blur-xl bg-gradient-to-br from-cyan-100/50 via-white/40 to-blue-100/50 border-2 border-white/70 rounded-2xl shadow-xl p-3 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }}>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    <div className="w-4/5 h-1.5 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full"></div>
                  </div>
                </div>

                {/* Sketch Lines - Decorative */}
                <div className="absolute bottom-20 right-12 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-lg"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-transparent rounded-full"></div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg"></div>
                  </div>
                </div>

                {/* Floating Shapes */}
                <div className="absolute top-1/2 right-0 space-y-4">
                  <div className="w-16 h-16 border-2 border-purple-300 rounded-2xl opacity-50 animate-bounce" style={{ animationDuration: '4s' }}></div>
                  <div className="w-12 h-12 border-2 border-pink-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
                  <div className="w-10 h-10 border-2 border-blue-300 rounded-lg opacity-50 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
                </div>

                {/* Small Half Badges Collection */}
                <div className="absolute bottom-32 left-1/4 w-24 h-12 backdrop-blur-xl bg-gradient-to-r from-orange-100/50 to-amber-100/50 border-r-2 border-b-2 border-white/70 rounded-br-2xl shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="absolute top-2/3 right-1/4 w-28 h-14 backdrop-blur-xl bg-gradient-to-b from-rose-100/50 via-white/40 to-rose-50/50 border-t-2 border-r-2 border-white/70 rounded-tr-2xl shadow-lg animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {enhancedBlogs.length > 0 && (
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <FeaturedPosts blogs={enhancedBlogs} />
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Liquid Background Orbs */}
        {/* <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">LATEST POSTS</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">Latest Blog Posts</h2>
              <p className="text-lg text-gray-700 font-light">Stay updated with the newest articles and insights</p>
            </div>
          </div>

          {/* Content */}
          {blogs.length > 0 ? (
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <div key={blog._id} className="group  overflow-hidden">
                    {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-white/20 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div> */}
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
          ) : (
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-12 shadow-2xl text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-700 mb-6 font-light">Be the first to share your knowledge with the community!</p>
              <Link
                href="/blog/write"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/80 via-purple-600/70 to-pink-600/80 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                <FileText className="h-4 w-4" />
                <span>Write First Blog Post</span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Generate static params for pagination
export async function generateStaticParams() {
  // Pre-generate first few pages statically
  return [
    {},
    { page: '1' },
    { page: '2' },
    { page: '3' },
  ];
}

// Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;

  let title = 'Educational Blogs & Articles - VUEDU';
  let description = 'Read the latest educational articles, tutorials, study tips, and insights from experts. Learn about programming, data structures, web development, and more.';
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

  if (page > 1) {
    title = `Educational Blogs & Articles - Page ${page} | VUEDU`;
    description = `Browse educational articles and tutorials - Page ${page}. Expert insights on programming, computer science, and study strategies.`;
  }

  return generateDocumentMetadata({
    title,
    description,
    keywords,
    url: '/blogs',
    canonical: page > 1 ? `/blogs?page=${page}` : '/blogs',
    type: 'website',
    images: [
      {
        url: '/og-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'VUEDU Blog - Educational Articles & Tutorials',
      },
    ],
  });
}

export const dynamic = 'force-static';
export const revalidate = 1800; // Revalidate every 30 minutes