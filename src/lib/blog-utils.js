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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.com';
  const url = `${baseUrl}/blogs/${slug}`;
  
  // Extract plain text excerpt from content
  const plainTextContent = extractPlainText(blog.content);
  const excerpt = blog.excerpt || generateExcerpt(plainTextContent);
  
  // Calculate reading time
  const words = plainTextContent.split(' ').filter(word => word.length > 0);
  const readingTime = Math.ceil(words.length / 200);

  return {
    title: `${blog.title} | VUEDU Blog`,
    description: excerpt,
    keywords: [
      blog.title,
      'educational blog',
      'learning resources',
      'academic content',
      'VUEDU',
      ...(blog.tags || [])
    ].join(', '),
    authors: blog.author ? [{ 
      name: blog.author.name,
      url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`
    }] : [],
    creator: blog.author?.name,
    publisher: 'VUEDU',
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
      siteName: 'VUEDU',
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
      creator: blog.author?.twitter || '@VUEDU',
      site: '@VUEDU',
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.com';
  const plainTextContent = extractPlainText(blog.content);
  const excerpt = blog.excerpt || generateExcerpt(plainTextContent);
  const wordCount = getWordCount(blog.content);

  // Ensure we have valid dates
  const publishedDate = blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString();
  const modifiedDate = blog.updatedAt ? new Date(blog.updatedAt).toISOString() : publishedDate;

  // Create the structured data with both root-level and @graph approaches
  const structuredData = {
    '@context': 'https://schema.org',
    // Root-level BlogPosting for Google Rich Results
    '@type': 'BlogPosting',
    headline: blog.title,
    name: blog.title,
    description: excerpt,
    image: blog.coverImage, // Simple URL for Google Rich Results
    author: blog.author ? {
      '@type': 'Person',
      name: blog.author.name,
      url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`,
      image: blog.author.avatar,
    } : {
      '@type': 'Organization',
      name: 'VUEDU',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VUEDU',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: `${baseUrl}/blogs/${blog.slug}`,
    articleSection: 'Education',
    keywords: blog.tags?.join(', ') || 'education, learning, academic',
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    url: `${baseUrl}/blogs/${blog.slug}`,
    '@graph': [
      // Main Article - BlogPosting (detailed version)
      {
        '@type': 'BlogPosting',
        '@id': `${baseUrl}/blogs/${blog.slug}#article`,
        headline: blog.title,
        name: blog.title,
        description: excerpt,
        image: [
          {
            '@type': 'ImageObject',
            url: blog.coverImage,
            width: 1200,
            height: 630,
            caption: blog.title,
          }
        ],
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: blog.author ? {
          '@type': 'Person',
          '@id': `${baseUrl}/authors/${blog.author._id}#person`,
          name: blog.author.name,
          url: blog.author.website || `${baseUrl}/authors/${blog.author._id}`,
          image: blog.author.avatar ? {
            '@type': 'ImageObject',
            url: blog.author.avatar,
            width: 150,
            height: 150,
          } : undefined,
          description: blog.author.bio,
          sameAs: blog.author.social ? [
            blog.author.social.twitter,
            blog.author.social.linkedin,
            blog.author.social.website
          ].filter(Boolean) : undefined,
        } : {
          '@type': 'Organization',
          name: 'VUEDU',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
            width: 600,
            height: 60,
          }
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
          name: 'VUEDU',
          url: baseUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
            width: 600,
            height: 60,
          },
          sameAs: [
            `${baseUrl}`,
            // Add social media URLs if available
          ]
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
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.blog-content']
        },
        // Additional fields for better Google Rich Results
        articleBody: plainTextContent.substring(0, 5000), // First 5000 chars
        thumbnailUrl: blog.coverImage,
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
          name: 'VUEDU',
          url: baseUrl,
        },
        breadcrumb: {
          '@id': `${baseUrl}/blogs/${blog.slug}#breadcrumb`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: blog.coverImage,
        },
        datePublished: publishedDate,
        dateModified: modifiedDate,
        inLanguage: 'en-US',
      },
      // Organization
      {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'VUEDU',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
          width: 600,
          height: 60,
        },
        description: 'Educational content creators and technology enthusiasts sharing knowledge with students worldwide.',
        sameAs: [
          `${baseUrl}`,
          // Add social media URLs
        ]
      }
    ]
  };

  return structuredData;
}
