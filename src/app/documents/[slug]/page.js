import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';

/**
 * Redirect handler for old document URLs
 * Redirects /documents/[slug] to /[documenttype]/[slug]
 * Uses 307 temporary redirect (Next.js default for redirect())
 */
export default async function DocumentRedirectPage({ params }) {
  const { slug } = await params;

  console.log('[REDIRECT] Looking for document with slug:', slug);

  await connectDB();

  // Try to find document by slug
  const document = await Document.findOne({ slug }).select('type slug').lean();

  console.log('[REDIRECT] Document found:', document ? 'YES' : 'NO');

  if (!document) {
    // Fallback: Check if there are any documents at all (for debugging)
    const totalDocs = await Document.countDocuments();
    console.log('[REDIRECT] Total documents in DB:', totalDocs);

    // List all slugs for debugging
    const allDocs = await Document.find({}).select('slug type title').limit(10).lean();
    console.log('[REDIRECT] Sample documents:', allDocs.map(d => ({ slug: d.slug, type: d.type, title: d.title })));

    // If document not found, redirect to documents listing
    console.log('[REDIRECT] Document not found, redirecting to /documents');
    redirect('/documents');
  }

  // Permanent redirect to new URL structure
  const newUrl = `/${document.type}/${document.slug}`;
  console.log('[REDIRECT] Redirecting to:', newUrl);
  redirect(newUrl);
}