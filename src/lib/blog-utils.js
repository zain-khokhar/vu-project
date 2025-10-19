/**
 * Blog utility functions for SEO, metadata, and structured data
 */

/**
 * Estimate reading time based on word count (average 200 WPM)
 * @param {string} content - HTML content string
 * @returns {number} Reading time in minutes
 */
export function getReadingTime(content) {
  const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  const words = text.split(' ').filter(word => word.length > 0);
  const minutes = Math.ceil(words.length / 200);
  return minutes;
}

/**
 * Extract plain text from HTML content
 * @param {string} html - HTML content string
 * @returns {string} Plain text content
 */
export function extractPlainText(html) {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Get word count from content
 * @param {string} content - HTML content string
 * @returns {number} Word count
 */
export function getWordCount(content) {
  const text = extractPlainText(content);
  return text.split(' ').filter(word => word.length > 0).length;
}

/**
 * Generate excerpt from content
 * @param {string} content - HTML content string
 * @param {number} maxLength - Maximum length of excerpt (default: 155)
 * @returns {string} Excerpt with ellipsis
 */
export function generateExcerpt(content, maxLength = 155) {
  const plainText = extractPlainText(content);
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Generate comprehensive metadata for blog posts
 * @param {Object} blog - Blog post object
 * @param {string} slug - Blog post slug
 * @returns {Object} Next.js metadata object
 */
export function generateBlogMetadata(blog, slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://doclibrary.com';
  const url = `${baseUrl}/blogs/${slug}`;
  
  // Extract plain text excerpt from content
  const plainTextContent = extractPlainText(blog.content);
  const excerpt = blog.excerpt || generateExcerpt(plainTextContent);
  
  // Calculate reading time
  const words = plainTextContent.split(' ').filter(word => word.length > 0);
  const readingTime = Math.ceil(words.length / 200);

  return {
    title: `${blog.title} | DocLibrary Blog`,
    description: excerpt,
    keywords: [
      blog.title,
      'educational blog',
      'learning resources',
      'academic content',
      'DocLibrary',
      ...(blog.tags || [])
    ].join(', '),
    authors: blog.author ? [{ 
      name: blog.author.name,
      url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`
    }] : [],
    creator: blog.author?.name,
    publisher: 'DocLibrary',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      title: blog.title,
      description: excerpt,
      url: url,
      siteName: 'DocLibrary',
      locale: 'en_US',
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
          type: 'image/jpeg',
        }
      ],
      article: {
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt || blog.createdAt,
        authors: blog.author ? [blog.author.name] : [],
        tags: blog.tags || [],
        section: 'Education',
      }
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: excerpt,
      images: [blog.coverImage],
      creator: blog.author?.twitter || '@DocLibrary',
      site: '@DocLibrary',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    },
    other: {
      'article:reading_time': `${readingTime} min`,
      'article:word_count': words.length.toString(),
    }
  };
}

/**
 * Generate JSON-LD structured data for blog posts
 * @param {Object} blog - Blog post object
 * @param {number} readingTime - Reading time in minutes
 * @returns {Object} JSON-LD structured data
 */
export function generateBlogStructuredData(blog, readingTime) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://doclibrary.com';
  const plainTextContent = extractPlainText(blog.content);
  const excerpt = blog.excerpt || generateExcerpt(plainTextContent);
  const wordCount = getWordCount(blog.content);
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Main Article
      {
        '@type': 'BlogPosting',
        '@id': `${baseUrl}/blogs/${blog.slug}#article`,
        headline: blog.title,
        name: blog.title,
        description: excerpt,
        image: {
          '@type': 'ImageObject',
          url: blog.coverImage,
          width: 1200,
          height: 630,
        },
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        author: blog.author ? {
          '@type': 'Person',
          '@id': `${baseUrl}/authors/${blog.author._id}#person`,
          name: blog.author.name,
          url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`,
          image: blog.author.avatar ? {
            '@type': 'ImageObject',
            url: blog.author.avatar,
          } : undefined,
          description: blog.author.bio,
        } : {
          '@type': 'Organization',
          name: 'DocLibrary',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
          name: 'DocLibrary',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
            width: 600,
            height: 60,
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blogs/${blog.slug}`,
        },
        articleSection: 'Education',
        keywords: blog.tags?.join(', ') || 'education, learning, academic',
        timeRequired: `PT${readingTime}M`,
        wordCount: wordCount,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        url: `${baseUrl}/blogs/${blog.slug}`,
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/blogs/${blog.slug}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${baseUrl}/blogs`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: blog.title,
            item: `${baseUrl}/blogs/${blog.slug}`,
          }
        ]
      },
      // WebPage
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blogs/${blog.slug}`,
        url: `${baseUrl}/blogs/${blog.slug}`,
        name: blog.title,
        description: excerpt,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'DocLibrary',
          url: baseUrl,
        },
        breadcrumb: {
          '@id': `${baseUrl}/blogs/${blog.slug}#breadcrumb`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: blog.coverImage,
        },
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        inLanguage: 'en-US',
      }
    ]
  };
}
