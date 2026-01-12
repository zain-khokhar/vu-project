/**
 * SEO Utilities
 * Centralized functions for generating metadata, structured data, and SEO elements
 */

/**
 * Generate comprehensive metadata for documents
 * @param {Object} options - Metadata options
 * @returns {Object} Next.js metadata object
 */
export function generateDocumentMetadata({
  title,
  description,
  keywords = [],
  type = 'website',
  images = [],
  url,
  noindex = false,
  canonical,
  publishedTime,
  modifiedTime,
  author = 'Vuedu Team'
}) {
  const baseUrl = 'https://vuedu.dev';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical || fullUrl;

  const metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: 'Vuedu',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Vuedu',
      locale: 'en_US',
      type,
      images: images.length > 0 ? images : [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? images : ['/og-image.jpg'],
      creator: '@vuedu',
      site: '@vuedu',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Add article-specific metadata
  if (type === 'article' && (publishedTime || modifiedTime)) {
    metadata.openGraph.publishedTime = publishedTime;
    metadata.openGraph.modifiedTime = modifiedTime;
    metadata.openGraph.authors = [author];
  }

  return metadata;
}

/**
 * Generate JSON-LD structured data for documents
 * @param {Object} options - Structured data options
 * @returns {Object} JSON-LD structured data
 */
export function generateDocumentStructuredData({
  type = 'CollectionPage',
  name,
  description,
  url,
  breadcrumbs = [],
  items = [],
  totalItems = 0,
  author,
  datePublished,
  dateModified,
  image
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: fullUrl,
  };

  // Add breadcrumb list
  if (breadcrumbs.length > 0) {
    structuredData.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.url}`,
      })),
    };
  }

  // Add item list for collection pages
  if (items.length > 0) {
    structuredData.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: totalItems,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'EducationalResource',
          name: item.title,
          description: item.description,
          url: `${baseUrl}${item.url}`,
          learningResourceType: item.type || 'Document',
          about: item.subject,
        },
      })),
    };
  }

  // Add author and dates for articles
  if (author) {
    structuredData.author = {
      '@type': 'Organization',
      name: author,
      url: baseUrl,
    };
  }

  if (datePublished) {
    structuredData.datePublished = datePublished;
  }

  if (dateModified) {
    structuredData.dateModified = dateModified;
  }

  if (image) {
    structuredData.image = image;
  }

  // Add organization data
  structuredData.publisher = {
    '@type': 'Organization',
    name: 'Vuedu',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
    },
  };

  return structuredData;
}

/**
 * Generate website structured data
 * @returns {Object} Website JSON-LD structured data
 */
export function generateWebsiteStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Vuedu',
    description: 'Free educational documents, notes, books, and study materials for students',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/documents?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vuedu',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
      sameAs: [
        'https://twitter.com/vuedu',
        'https://facebook.com/vuedu',
        'https://linkedin.com/company/vuedu',
      ],
    },
  };
}

/**
 * Generate organization structured data
 * @returns {Object} Organization JSON-LD structured data
 */
export function generateOrganizationStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vuedu',
    alternateName: 'Doc Library',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Educational platform providing free documents and study materials',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'team@vuedu.dev',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/vuedu',
      'https://facebook.com/vuedu',
      'https://linkedin.com/company/vuedu',
    ],
  };
}

/**
 * Generate FAQ structured data
 * @param {Array} faqs - Array of FAQ objects with question and answer
 * @returns {Object} FAQ JSON-LD structured data
 */
export function generateFAQStructuredData(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate reading time in minutes
 * @param {string} text - Text content
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate excerpt from content
 * @param {string} content - Full content
 * @param {number} length - Maximum length
 * @returns {string} Excerpt
 */
export function generateExcerpt(content, length = 160) {
  const stripped = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (stripped.length <= length) return stripped;
  return stripped.substring(0, length).trim() + '...';
}

/**
 * Format date for SEO
 * @param {Date|string} date - Date to format
 * @returns {string} ISO formatted date
 */
export function formatSEODate(date) {
  return new Date(date).toISOString();
}

/**
 * Generate canonical URL
 * @param {string} path - URL path
 * @returns {string} Full canonical URL
 */
export function generateCanonicalUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';
  return `${baseUrl}${path}`;
}

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @param {number} count - Number of keywords to extract
 * @returns {Array} Array of keywords
 */
export function extractKeywords(text, count = 10) {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'should', 'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}
