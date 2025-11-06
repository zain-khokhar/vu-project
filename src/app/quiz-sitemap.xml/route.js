import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    await connectDB();
    
    const quizzes = await Quiz.find({ isActive: true })
      .select('slug title updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vuedu.dev';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Quiz Listing Page -->
  <url>
    <loc>${baseUrl}/quiz</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Individual Quiz Pages -->
${quizzes
  .map(
    (quiz) => `  <url>
    <loc>${baseUrl}/quiz/${quiz.slug}</loc>
    <lastmod>${quiz.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}

</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating quiz sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
