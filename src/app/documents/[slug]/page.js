import { notFound, permanentRedirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';

/**
 * Redirect handler for old document URLs
 * Redirects /documents/[slug] to /[documenttype]/[slug]
 * Uses 308 permanent redirect for SEO
 */
export default async function DocumentRedirectPage({ params }) {
  const { slug } = await params;

  await connectDB();

  const document = await Document.findOne({ slug }).select('type slug').lean();

  if (!document) {
    notFound();
  }

  const newUrl = `/${document.type}/${document.slug}`;
  permanentRedirect(newUrl);
}