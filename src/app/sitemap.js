import { getBlogs } from '@/actions/blogs';
import { getDocuments } from '@/actions/documents';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export const dynamic = 'force-dynamic';

// Helper function to safely parse dates
function safeDate(dateValue, fallback = new Date()) {
  if (!dateValue) return fallback;

  const date = new Date(dateValue);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return fallback;
  }

  return date;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Get all blogs
  let blogRoutes = [];
  try {
    const blogsResult = await getBlogs(1, 100); // Get first 100 blogs
    if (blogsResult.success && blogsResult.blogs) {
      blogRoutes = blogsResult.blogs
        .filter(blog => blog && blog.slug) // Filter out invalid blogs
        .map((blog) => ({
          url: `${baseUrl}/blogs/${blog.slug}`,
          lastModified: safeDate(blog.updatedAt || blog.createdAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  // Get all documents
  let documentRoutes = [];
  try {
    const documentsResult = await getDocuments({ page: 1, limit: 1000 }); // Get all documents for sitemap
    if (documentsResult.success && documentsResult.documents) {
      documentRoutes = documentsResult.documents
        .filter(doc => doc && doc.slug && doc.type) // Filter out invalid documents
        .map((doc) => ({
          url: `${baseUrl}/${doc.type}/${doc.slug}`,
          lastModified: safeDate(doc.updatedAt || doc.createdAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Error fetching documents for sitemap:', error);
  }

  // Get all quizzes
  let quizRoutes = [];
  try {
    await connectDB();
    const quizzes = await Quiz.find({ isActive: true })
      .select('slug updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    if (quizzes) {
      quizRoutes = quizzes
        .filter(quiz => quiz && quiz.slug) // Filter out invalid quizzes
        .map((quiz) => ({
          url: `${baseUrl}/quiz/${quiz.slug}`,
          lastModified: safeDate(quiz.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error('Error fetching quizzes for sitemap:', error);
  }

  return [...staticRoutes, ...blogRoutes, ...documentRoutes, ...quizRoutes];
}
