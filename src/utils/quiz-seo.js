/**
 * Quiz SEO Utilities
 * Comprehensive SEO functions for quiz pages following schema.org standards
 */

/**
 * Generate rich metadata for quiz pages
 * @param {Object} quiz - Quiz data object
 * @returns {Object} Next.js metadata object
 */
export function generateQuizMetadata(quiz) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.dev';
  const quizUrl = `${baseUrl}/quiz/${quiz.slug}`;

  const title = `${quiz.title} - Interactive Online Quiz | Vuedu`;
  const description = quiz.description ||
    `Test your ${quiz.category} knowledge with ${quiz.totalQuestions} carefully crafted questions. ${quiz.title} - Free interactive quiz with instant results and detailed explanations.`;

  const keywords = [
    quiz.title,
    quiz.category,
    'quiz',
    'online quiz',
    'test',
    'practice questions',
    'MCQ',
    'education',
    'learning',
    'Vuedu',
    `${quiz.category} quiz`,
    'free quiz',
    'interactive quiz'
  ].join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Vuedu Team' }],
    creator: 'Vuedu',
    publisher: 'Vuedu',

    // Open Graph
    openGraph: {
      title,
      description,
      url: quizUrl,
      siteName: 'Vuedu',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/api/og?title=${encodeURIComponent(quiz.title)}&type=quiz`,
          width: 1200,
          height: 630,
          alt: quiz.title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/api/og?title=${encodeURIComponent(quiz.title)}&type=quiz`],
      creator: '@vuedu',
    },

    // Additional SEO
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Alternates
    alternates: {
      canonical: quizUrl,
    },

    // Verification
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
  };
}

/**
 * Generate JSON-LD structured data for quiz
 * @param {Object} quiz - Quiz data object
 * @returns {Object} JSON-LD structured data
 */
export function generateQuizStructuredData(quiz) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.dev';
  const quizUrl = `${baseUrl}/quiz/${quiz.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    '@id': quizUrl,
    name: quiz.title,
    description: quiz.description,
    url: quizUrl,
    inLanguage: 'en',

    // Educational context
    educationalLevel: 'intermediate',
    learningResourceType: 'Assessment',
    educationalUse: 'assessment',

    // Quiz details
    timeRequired: `PT${Math.ceil(quiz.totalQuestions * 0.5)}M`, // ISO 8601 duration

    // Subject matter
    about: {
      '@type': 'Thing',
      name: quiz.category,
    },

    // Provider
    provider: {
      '@type': 'Organization',
      name: 'Vuedu',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },

    // Interactivity
    interactivityType: 'active',
    isAccessibleForFree: true,

    // Offers (free)
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },

    // Dates
    datePublished: quiz.createdAt,
    dateModified: quiz.updatedAt,
  };
}

/**
 * Generate breadcrumb structured data
 * @param {Object} quiz - Quiz data object
 * @returns {Object} Breadcrumb JSON-LD
 */
export function generateQuizBreadcrumbs(quiz) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.dev';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
        name: 'Quizzes',
        item: `${baseUrl}/quiz`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: quiz.category,
        item: `${baseUrl}/quiz?category=${encodeURIComponent(quiz.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: quiz.title,
        item: `${baseUrl}/quiz/${quiz.slug}`,
      },
    ],
  };
}

/**
 * Generate FAQ structured data from quiz
 * @param {Object} quiz - Quiz data with sample questions
 * @returns {Object} FAQ JSON-LD
 */
export function generateQuizFAQData(quiz) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How many questions are in the ${quiz.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ${quiz.title} contains ${quiz.totalQuestions} carefully crafted multiple-choice questions covering various aspects of ${quiz.category}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is this quiz free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this quiz is completely free to take. No registration or payment is required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does the quiz take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The quiz typically takes around ${Math.ceil(quiz.totalQuestions * 0.5)} minutes to complete, depending on your pace.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Will I get instant results?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you will receive instant results with detailed explanations for each question after completing the quiz.',
        },
      },
    ],
  };
}

/**
 * Generate WebPage structured data
 * @param {Object} quiz - Quiz data object
 * @returns {Object} WebPage JSON-LD
 */
export function generateQuizWebPageData(quiz) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.dev';
  const quizUrl = `${baseUrl}/quiz/${quiz.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': quizUrl,
    url: quizUrl,
    name: quiz.title,
    description: quiz.description,

    breadcrumb: generateQuizBreadcrumbs(quiz),

    mainEntity: {
      '@type': 'Quiz',
      name: quiz.title,
    },

    isPartOf: {
      '@type': 'WebSite',
      name: 'Vuedu',
      url: baseUrl,
    },

    inLanguage: 'en',
    datePublished: quiz.createdAt,
    dateModified: quiz.updatedAt,
  };
}

/**
 * Combine all structured data for quiz page
 * @param {Object} quiz - Quiz data object
 * @returns {Array} Array of JSON-LD objects
 */
export function generateAllQuizStructuredData(quiz) {
  return [
    generateQuizStructuredData(quiz),
    generateQuizBreadcrumbs(quiz),
    generateQuizFAQData(quiz),
    generateQuizWebPageData(quiz),
  ];
}
