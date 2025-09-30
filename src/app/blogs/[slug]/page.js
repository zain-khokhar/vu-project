import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogBySlug } from '@/actions/blogs';
import { formatDate } from '@/lib/utils';
import BlogContent from '@/components/BlogContent';
import AuthorInfo from '@/components/AuthorInfo';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const result = await getBlogBySlug(slug);
  
  if (!result.success) {
    return {
      title: 'Blog Not Found - DocLibrary'
    };
  }

  const { blog } = result;
  
  return {
    title: `${blog.title} - DocLibrary Blog`,
    description: blog.excerpt,
    keywords: `blog, ${blog.title}`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    }
  };
}

// Estimate reading time based on word count (average 200 WPM)
function getReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const words = text.split(' ').filter(word => word.length > 0);
  const minutes = Math.ceil(words.length / 200);
  return minutes;
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const result = await getBlogBySlug(slug);

  if (!result.success) {
    notFound();
  }

  const { blog } = result;
  const readingTime = getReadingTime(blog.content);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/blogs"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blogs</span>
        </Link>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-64 md:h-96 w-full">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{readingTime} min read</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Author Info */}
            <AuthorInfo author={blog.author} publishedDate={blog.createdAt} />

            {/* Blog Content */}
            <div className="blog-content">
              <BlogContent content={blog.content} />
            </div>
          </div>
        </article>

        {/* Related Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/blogs"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
          >
            ← More Blog Posts
          </Link>
          <Link
            href="/blog/write"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
          >
            Write Your Own Blog →
          </Link>
        </div>
      </div>
    </div>
  );
}