import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Globe, Twitter, Linkedin } from 'lucide-react';
import { getAuthorBySlug } from '@/actions/authors';
import { getBlogsByAuthor } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';

/**
 * Generate static paths for all authors at build time
 */
export async function generateStaticParams() {
  try {
    const { getAuthors } = await import('@/actions/authors');
    const result = await getAuthors();

    if (!result.success || !result.authors) {
      return [];
    }

    return result.authors.map((author) => ({
      slug: author.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for authors:', error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getAuthorBySlug(slug);

  if (!result.success) {
    return {
      title: 'Author Not Found - Vuedu',
      description: 'The author you are looking for could not be found.',
      robots: {
        index: false,
        follow: true,
      }
    };
  }

  const { author } = result;

  return {
    title: `${author.name} - Author Profile | Vuedu`,
    description: author.bio,
    keywords: `${author.name}, author, blog writer, educational content, Vuedu`,
    openGraph: {
      title: `${author.name} - Author Profile`,
      description: author.bio,
      type: 'profile',
      url: `/authors/${slug}`,
      images: [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} - Author Profile`,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

/**
 * Disable automatic ISR - only use manual revalidation
 */
export const revalidate = false;


/**
 * Author Profile Page
 */
export default async function AuthorPage({ params }) {
  const { slug } = await params;
  
  const [authorResult, blogsResult] = await Promise.all([
    getAuthorBySlug(slug),
    getBlogsByAuthor(slug)
  ]);

  if (!authorResult.success) {
    notFound();
  }

  const { author } = authorResult;
  const { blogs = [] } = blogsResult.success ? blogsResult : { blogs: [] };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
              '@type': 'Person',
              name: author.name,
              description: author.bio,
              image: author.avatar,
              email: author.email,
              sameAs: [
                author.social?.twitter,
                author.social?.linkedin,
                author.social?.website,
              ].filter(Boolean),
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Back Navigation */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blogs</span>
          </Link>
        </nav>

        {/* Author Header */}
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Author Avatar */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {author.name}
                </h1>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                  {author.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {author.social?.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                      aria-label="Visit website"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                      aria-label="Twitter profile"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {author.social?.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author's Blog Posts */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Articles by {author.name}
            <span className="text-gray-500 text-xl ml-3">({blogs.length})</span>
          </h2>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <p className="text-gray-600 text-lg">
                No published articles yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
