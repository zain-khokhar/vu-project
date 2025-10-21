export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doclibrary.com';

  return {
    rules: [
      // General crawlers
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 1,
      },
      // Google crawlers
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Googlebot-Video',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // Bing crawler
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // AI/LLM crawlers - Allow with rate limiting
      {
        userAgent: [
          'GPTBot', // OpenAI
          'ChatGPT-User', // OpenAI ChatGPT
          'CCBot', // Common Crawl (used by many AI companies)
          'anthropic-ai', // Anthropic Claude
          'Claude-Web', // Anthropic Claude Web
          'ClaudeBot', // Anthropic Claude Bot
          'Google-Extended', // Google Bard/Gemini
          'Applebot-Extended', // Apple Intelligence
          'FacebookBot', // Meta AI
          'cohere-ai', // Cohere
          'PerplexityBot', // Perplexity AI
          'Omgilibot', // Omgili
          'Bytespider', // ByteDance (TikTok)
          'Diffbot', // Diffbot
        ],
        allow: [
          '/blogs/',
          '/documents/',
          '/quiz/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 2,
      },
      // Social media crawlers
      {
        userAgent: [
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
          'WhatsApp',
          'TelegramBot',
        ],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

