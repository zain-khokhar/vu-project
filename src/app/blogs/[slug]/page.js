import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from '@/actions/blogs';
import { formatDate } from '@/lib/utils';
import {
  getReadingTime,
  generateBlogMetadata,
  generateBlogStructuredData,
  getCoverImageData
} from '@/lib/blog-utils';
import AuthorInfo from '@/components/AuthorInfo';
import BlogCard from '@/components/BlogCard';

/**
 * Extract H1 tag content from HTML string
 * Returns the text content of the first H1 tag, or null if not found
 */
function extractH1FromContent(htmlContent) {
  if (!htmlContent) return null;

  // Match the first <h1> tag and extract its content
  const h1Match = htmlContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  if (h1Match && h1Match[1]) {
    // Remove any HTML tags inside the H1 and trim
    return h1Match[1].replace(/<[^>]*>/g, '').trim();
  }

  return null;
}

/**
 * Remove H1 tag from HTML content to avoid duplication
 * Since we display H1 separately above the image
 */
function removeH1FromContent(htmlContent) {
  if (!htmlContent) return htmlContent;
  return htmlContent.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '');
}


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
      title: 'Blog Not Found - Vuedu',
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
 * Google-style layout with title + metadata above cover image
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

  // Extract H1 from content or fallback to blog.title
  const displayTitle = extractH1FromContent(blog.content) || blog.title;

  // Remove H1 from content for body rendering (to avoid duplication)
  const cleanedContent = removeH1FromContent(blog.content);

  // Use blog.excerpt for display
  const displayExcerpt = blog.excerpt;

  // Fetch related blogs for "Explore More" section
  const relatedResult = await getRelatedBlogs(slug, 3);
  const relatedBlogs = relatedResult.success ? relatedResult.blogs : [];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white" aria-labelledby="blog-title">
        <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-12 py-8">

          {/* Back Button */}
          <Link
            href="/blogs"
            prefetch={false}
            className="inline-flex items-center gap-2 px-2 max-sm:text-xs sm:px-4 py-2 sm:py-2 mb-2 cursor-pointer"
            aria-label="Go back to all blog posts"
          >
            <ArrowLeft className="sm:h-4 sm:w-4 h-3 w-3" aria-hidden="true" />
            <span>Back to Blog</span>
          </Link>

          {/* Google-Style Blog Header - Above Image */}
          <header className="mb-8 py-6" aria-label="Blog post header">
            {/* Main Title - H1 extracted from content or fallback */}
            <h1
              id="blog-title"
              className="text-3xl sm:text-4xl md:text-5xl px-3 font-normal text-gray-900 leading-tight mb-6"
              itemProp="headline"
            >
              {displayTitle}
            </h1>

            {/* Meta Info Row - Google Style: Date/Time on left, Excerpt on right */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mt-6 px-3">
              {/* Left side - Date & Reading Time stacked */}
              <div className="flex flex-col text-sm text-gray-500 shrink-0">
                <time
                  dateTime={blog.createdAt}
                  itemProp="datePublished"
                >
                  {formatDate(blog.createdAt)}
                </time>
                <span itemProp="timeRequired">
                  {readingTime} min read
                </span>
              </div>

              {/* Right side - Excerpt with left border */}
              {displayExcerpt && (
                <div className="border-l border-gray-300 pl-4 flex-1">
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    {displayExcerpt}
                  </p>
                </div>
              )}
            </div>

          </header>

          {/* Cover Image - Now below header */}
          <figure
            className="relative w-full rounded overflow-hidden mb-12 max-h-[700px]"
            style={{
              aspectRatio: `${coverImageData.width} / ${coverImageData.height}`,
              // maxHeight: '500px'
            }}
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
            className="overflow-hidden"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <div className="p-3 sm:p-6 md:p-18">

              {/* Hidden structured data properties */}
              <meta itemProp="image" content={coverImageData.url} />
              <meta itemProp="author" content={blog.author?.name || 'Vuedu'} />
              <meta itemProp="publisher" content="Vuedu" />
              {blog.updatedAt && (
                <meta itemProp="dateModified" content={blog.updatedAt} />
              )}

              {/* Blog Content - H1 removed to avoid duplication */}
              <section
                className="blog-content prose prose-lg max-w-none"
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: cleanedContent }}
                aria-label="Blog article content"
              />
            </div>
          </article>

          {/* Author Info - Full version at bottom */}
          <footer className="mt-12 px-3" aria-label="Author information">
            <AuthorInfo author={blog.author} publishedDate={blog.createdAt} />
          </footer>

          {/* Explore More / Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200 px-3" aria-label="Related blog posts">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Explore More
                </h2>
                <Link
                  href="/blogs"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  View all
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog._id} blog={relatedBlog} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );

}

