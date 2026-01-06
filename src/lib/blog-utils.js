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
 * Get cover image data (handles both old string and new object format)
 * @param {string|Object} coverImage - Cover image (string URL or object)
 * @returns {Object} Normalized image object
 */
export function getCoverImageData(coverImage) {
  if (!coverImage) {
    return {
      url: '/default-blog-cover.jpg',
      alt: 'Blog post cover image',
      width: 1200,
      height: 630,
    };
  }

  // Old format: string URL
  if (typeof coverImage === 'string') {
    return {
      url: coverImage,
      alt: 'Blog post cover image',
      width: 1200,
      height: 630,
    };
  }

  // New format: object with metadata
  return {
    url: coverImage.url || '/default-blog-cover.jpg',
    alt: coverImage.alt || 'Blog post cover image',
    width: coverImage.width || 1200,
    height: coverImage.height || 630,
    publicId: coverImage.publicId,
  };
}

/**
 * Generate comprehensive metadata for blog posts
 * @param {Object} blog - Blog post object
 * @param {string} slug - Blog post slug
 * @returns {Object} Next.js metadata object
 */
export function generateBlogMetadata(blog, slug) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.dev';
  const url = `${baseUrl}/blogs/${slug}`;

  // Extract plain text excerpt from content
  const plainTextContent = extractPlainText(blog.content);
  const excerpt = blog.excerpt || generateExcerpt(plainTextContent);

  // Calculate reading time
  const words = plainTextContent.split(' ').filter(word => word.length > 0);

  // Get normalized cover image data
  const coverImageData = getCoverImageData(blog.coverImage);

  return {
    title: `${blog.title}`,
    description: excerpt,
    authors: blog.author ? [{
      name: blog.author.name,
      url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`
    }] : [],
    creator: blog.author?.name,
    publisher: 'Vuedu',
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
      siteName: 'Vuedu',
      locale: 'en_US',
      images: [
        {
          url: coverImageData.url,
          width: coverImageData.width,
          height: coverImageData.height,
          alt: coverImageData.alt,
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
      images: [coverImageData.url],
      creator: blog.author?.twitter || '@Vuedu',
      site: '@Vuedu',
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
  };
}

/**
 * Generate JSON-LD structured data for blog posts
 * @param {Object} blog - Blog post object
 * @param {number} readingTime - Reading time in minutes
 * @returns {Object} JSON-LD structured data
 */
export function generateBlogStructuredData(blog, readingTime) {
  const baseUrl = 'https://vuedu.dev';
  const plainTextContent = extractPlainText(blog.content);
  const excerpt = blog.excerpt || generateExcerpt(plainTextContent);
  const wordCount = getWordCount(blog.content);

  // Get normalized cover image data
  const coverImageData = getCoverImageData(blog.coverImage);

  // Ensure we have valid dates
  const publishedDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString();
  const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishedDate;

  // Create the structured data with both root-level and @graph approaches
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. The Blog Post
      {
        '@type': 'BlogPosting',
        '@id': `${baseUrl}/blogs/${blog.slug}#article`,
        headline: blog.title,
        description: excerpt,
        image: {
          '@type': 'ImageObject',
          url: coverImageData.url,
          width: coverImageData.width,
          height: coverImageData.height,
          caption: coverImageData.alt,
        },
        author: blog.author ? {
          '@type': 'Person',
          '@id': `${baseUrl}/authors/${blog.author._id}#person`,
          name: blog.author.name,
          url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`,
          image: blog.author.avatar ? {
            '@type': 'ImageObject',
            url: blog.author.avatar,
            width: 150, // Assuming 150, adjust if known
            height: 150, // Assuming 150, adjust if known
          } : undefined,
          description: blog.author.bio,
          // sameAs: [
          //   blog.author.social?.twitter,
          //   blog.author.social?.linkedin,
          //   blog.author.social?.website
          // ].filter(Boolean),
        } : {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`
        },
        publisher: {
          '@id': `${baseUrl}#organization`
        },
        datePublished: publishedDate,
        dateModified: modifiedDate,
        mainEntityOfPage: {
          '@id': `${baseUrl}/blogs/${blog.slug}`
        },
        articleSection: 'Education',
        wordCount: wordCount,
        timeRequired: `PT${readingTime}M`,
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        url: `${baseUrl}/blogs/${blog.slug}`,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.blog-content']
        },
        // articleBody: plainTextContent.substring(0, 5000),
      },
      // 2. The Breadcrumbs
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/blogs/${blog.slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${baseUrl}/blogs` },
          { '@type': 'ListItem', position: 3, name: blog.title, item: `${baseUrl}/blogs/${blog.slug}` }
        ]
      },
      // 3. The Web Page
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/blogs/${blog.slug}`,
        url: `${baseUrl}/blogs/${blog.slug}`,
        name: blog.title,
        description: excerpt,
        isPartOf: {
          '@id': `${baseUrl}#website` // Correctly links to #website
        },
        breadcrumb: {
          '@id': `${baseUrl}/blogs/${blog.slug}#breadcrumb`
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: coverImageData.url,
        },
        datePublished: publishedDate,
        dateModified: modifiedDate,
        inLanguage: 'en-US',
      },
      // 4. The Organization (Publisher)
      {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'Vuedu',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
          width: 600,
          height: 60,
        },
        description: 'Educational content creators and technology enthusiasts...',
        sameAs: [
          `${baseUrl}`,
          // Add social media URLs here
        ]
      },
      // 5. The Website (NEWLY ADDED)
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}#website`,
        url: baseUrl,
        name: 'Vuedu',
        publisher: {
          '@id': `${baseUrl}#organization`
        },
        inLanguage: 'en-US',
      }
    ]
  };

  return structuredData;
}
