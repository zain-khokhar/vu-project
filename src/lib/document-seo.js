/**
 * SEO Utilities for Document Pages
 * Generates comprehensive metadata, structured data, and Open Graph tags
 */

const SITE_NAME = 'Vuedu';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';

/**
 * Generate comprehensive metadata for document pages
 */
export function generateDocumentMetadata(document, slug) {
  const title = `${document.title} | ${document.subject} - ${SITE_NAME}`;
  const description = document.description
    ? document.description.replace(/<[^>]*>/g, '').substring(0, 160)
    : `Download ${document.title} - ${document.subject} notes from ${document.university}. Free educational documents for ${document.year}.`;

  const keywords = [
    document.title,
    document.subject,
    document.university,
    document.type,
    document.year,
    ...(document.tags || []),
    'free download',
    'educational documents',
    'study materials',
    'academic resources',
  ].join(', ');

  const documentUrl = `${SITE_URL}/${document.type}/${slug}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,

    // Open Graph
    openGraph: {
      title,
      description,
      url: documentUrl,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_US',
      publishedTime: document.createdAt,
      modifiedTime: document.updatedAt || document.createdAt,
      section: document.subject,
      tags: document.tags || [],
      authors: [SITE_NAME],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@vuedu',
      creator: '@vuedu',
    },

    // Additional metadata
    alternates: {
      canonical: documentUrl,
    },

    // Robots
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
      },
    },

    // Other
    category: document.subject,
  };
}

/**
 * Generate JSON-LD structured data for educational documents
 */
export function generateDocumentStructuredData(document, slug) {
  const documentUrl = `${SITE_URL}/documents/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    '@id': documentUrl,
    name: document.title,
    description: document.description?.replace(/<[^>]*>/g, '').substring(0, 200) || document.title,
    url: documentUrl,
    educationalLevel: document.year,
    competencyRequired: document.subject,
    credentialCategory: document.type,

    // Educational Material properties
    learningResourceType: document.type,
    educationalUse: 'study',
    inLanguage: 'en',

    // Organization info
    provider: {
      '@type': 'EducationalOrganization',
      name: document.university,
    },

    // Publishing info
    datePublished: document.createdAt,
    dateModified: document.updatedAt || document.createdAt,

    // Subject area
    about: {
      '@type': 'Thing',
      name: document.subject,
    },

    // Tags as keywords
    keywords: document.tags?.join(', ') || '',

    // Interaction statistics
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/DownloadAction',
      userInteractionCount: 0, // You can add download count if tracked
    },

    // Offer (Free)
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbStructuredData(document, slug) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Documents',
        item: `${SITE_URL}/documents`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: document.subject,
        item: `${SITE_URL}/documents?subject=${encodeURIComponent(document.subject)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: document.title,
        item: `${SITE_URL}/documents/${slug}`,
      },
    ],
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageStructuredData(document, slug) {
  const documentUrl = `${SITE_URL}/documents/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': documentUrl,
    url: documentUrl,
    name: document.title,
    description: document.description?.replace(/<[^>]*>/g, '').substring(0, 200) || document.title,
    datePublished: document.createdAt,
    dateModified: document.updatedAt || document.createdAt,
    inLanguage: 'en-US',

    // Main entity
    mainEntity: {
      '@type': 'DigitalDocument',
      name: document.title,
      description: document.description?.replace(/<[^>]*>/g, '').substring(0, 200),
      about: document.subject,
      educationalUse: 'study',
      learningResourceType: document.type,
    },

    // Breadcrumb
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Documents',
          item: `${SITE_URL}/documents`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: document.title,
        },
      ],
    },

    // Publisher
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Generate all structured data for a document page
 */
export function generateAllDocumentStructuredData(document, slug) {
  return [
    generateDocumentStructuredData(document, slug),
    generateBreadcrumbStructuredData(document, slug),
    generateWebPageStructuredData(document, slug),
  ];
}
