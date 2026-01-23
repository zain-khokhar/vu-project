import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from '@/components/ChevronRight';
import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from '@/actions/blogs';
import { formatDate } from '@/lib/utils';
import {
  getReadingTime,
  generateBlogMetadata,
  generateBlogStructuredData,
  getCoverImageData,
  processContentForTOC
} from '@/lib/blog-utils';
import AuthorInfo from '@/components/AuthorInfo';
import BlogCard from '@/components/BlogCard';
import TableOfContents from '@/components/TableOfContents';

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
  const resolvedParams = await params;
  const { slug } = resolvedParams;
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
  const displayExcerpt = blog.excerpt;
  // Process content for Table of Contents - generate IDs and extract TOC
  const { processedContent, toc } = processContentForTOC(cleanedContent);

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

      <main className="min-h-screen" aria-labelledby="blog-title">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-12 py-8">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 px-2 flex flex-wrap items-center text-sm text-gray-500">
            <Link
              href="/"
              prefetch={false}
              className="hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={16} className="mx-1 text-gray-400" aria-hidden="true" />
            <Link
              href="/blogs"
              prefetch={false}
              className="hover:text-purple-600 transition-colors"
            >
              Blogs
            </Link>
            <ChevronRight size={16} className="mx-1 text-gray-400" aria-hidden="true" />
            <span className="text-gray-900 truncate max-w-[200px] sm:max-w-md" aria-current="page">
              Blog
            </span>
          </nav>

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
              fetchPriority='high'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </figure>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-sm:px-4">

            {/* Article Content - Spans 8 columns on large screens */}
            <div className="lg:col-span-8">
              <article
                className="" itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <div className="py-4 sm:py-6 overflow-hidden">

                  <meta itemProp="image" content={coverImageData.url} />
                  <meta itemProp="author" content={blog.author?.name || 'Vuedu'} />
                  <meta itemProp="publisher" content="Vuedu" />
                  {blog.updatedAt && (
                    <meta itemProp="dateModified" content={blog.updatedAt} />
                  )}

                  <section
                    itemProp="articleBody"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                    className="prose xl:prose-lg max-w-none
            prose-table:max-w-full
            prose-td:py-0 prose-td:px-2 prose-a:hover:text-purple-600 prose-img:rounded-xl"
                  />

                </div>
              </article>

              {/* Author Info - Full version at bottom */}
              <footer className="mt-12 pt-8 border-t border-gray-100" aria-label="Author information">
                <AuthorInfo author={blog.author} publishedDate={blog.createdAt} />
              </footer>
            </div>

            {/* Sidebar - Spans 4 columns on large screens */}
            <aside className="lg:col-span-4 order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                <TableOfContents toc={toc} />
              </div>
            </aside>

          </div>

          {/* Explore More / Related Blogs Section */}
          {relatedBlogs.length > 0 && (
            <section className="mt-20 pt-12 border-t border-gray-200 max-sm:px-4" aria-label="Related blog posts">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Explore More
                </h2>
                <Link
                  href="/blogs"
                  prefetch={false}
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

