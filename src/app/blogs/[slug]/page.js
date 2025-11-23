import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogBySlug, getAllBlogs } from '@/actions/blogs';
import { formatDate } from '@/lib/utils';
import {
  getReadingTime,
  generateBlogMetadata,
  generateBlogStructuredData,
  getCoverImageData
} from '@/lib/blog-utils';
import AuthorInfo from '@/components/AuthorInfo';

/**
 * Generate static paths for all blog posts at build time
 * This enables Static Site Generation (SSG) for better performance
 */
export async function generateStaticParams() {
  try {
    const result = await getAllBlogs();

    if (!result.success || !result.blogs) {
      return [];
    }

    return result.blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Generate metadata for SEO optimization
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result.success) {
    return {
      title: 'Blog Not Found - VUEDU',
      description: 'The blog post you are looking for could not be found.',
      robots: {
        index: false,
        follow: true,
      }
    };
  }

  const { blog } = result;
  return generateBlogMetadata(blog, slug);
}

/**
 * Blog Post Page Component
 * Displays individual blog post with metadata and structured data
 */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result.success) {
    notFound();
  }

  const { blog } = result;
  const readingTime = getReadingTime(blog.content);
  const structuredData = generateBlogStructuredData(blog, readingTime);

  // Get optimized cover image data (handles both old string and new object format)
  const coverImageData = getCoverImageData(blog.coverImage);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-gray-50" aria-labelledby="blog-title">
        <div className="max-w-5xl bg-gray-50 mx-auto px-4 max-sm:px-0 lg:px-8 py-8">

          {/* Back Button */}
          <Link
            href="/blogs"
            prefetch={false}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Go back to all blog posts"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Blog</span>
          </Link>

          {/* Cover Image */}
          <figure
            className="relative w-full glass rounded-2xl overflow-hidden mb-12 shadow-2xl"
            style={{ 
              aspectRatio: `${coverImageData.width} / ${coverImageData.height}`,
              maxHeight: '500px'
            }}
            role="img"
            aria-label={coverImageData.alt}
          >
            <Image
              src={coverImageData.url}
              alt={coverImageData.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </figure>

          {/* Article */}
          <article
            className="rounded-sm border border-gray-200 overflow-hidden shadow-2xl glass"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <div className="p-8 md:p-12">

              {/* Meta Info */}
              <header
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200"
                aria-label="Post metadata"
              >
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time
                      dateTime={blog.createdAt}
                      className="text-sm"
                      itemProp="datePublished"
                    >
                      {formatDate(blog.createdAt)}
                    </time>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    <span className="text-sm" itemProp="timeRequired">
                      {readingTime} min read
                    </span>
                  </div>
                </div>
              </header>

              {/* Hidden structured data properties */}
              <meta itemProp="image" content={coverImageData.url} />
              <meta itemProp="author" content={blog.author?.name || 'VUEDU'} />
              <meta itemProp="publisher" content="VUEDU" />
              {blog.updatedAt && (
                <meta itemProp="dateModified" content={blog.updatedAt} />
              )}

              {/* Blog Content */}
              <section
                className="blog-content prose prose-lg max-w-none"
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: blog.content }}
                aria-label="Blog article content"
              />
            </div>
          </article>

          {/* Author Info */}
          <footer className="mt-12" aria-label="Author information">
            <AuthorInfo author={blog.author} publishedDate={blog.createdAt} />
          </footer>
        </div>
      </main>
    </>
  );

}

