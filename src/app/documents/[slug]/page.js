import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Document from '@/models/Document';
import { getDocumentBySlug } from '@/actions/documents';
import { getComments } from '@/actions/comments';
import { documentTypes } from '@/lib/utils';
import { getPdfPreviewInfo } from '@/lib/urlUtils';
import {
  generateDocumentMetadata,
  generateAllDocumentStructuredData,
} from '@/lib/document-seo';
import DocumentHeader from '@/components/document/DocumentHeader';
import DocumentActions from '@/components/document/DocumentActions';
import DocumentMetadata from '@/components/document/DocumentMetadata';
import DocumentTags from '@/components/document/DocumentTags';
import DocumentRelatedLinks from '@/components/document/DocumentRelatedLinks';
import CommentSection from '@/components/CommentSection';

/**
 * Generate static paths for all documents at build time
 * Enables Static Site Generation (SSG)
 */
export async function generateStaticParams() {
  try {
    await connectDB();

    // Fetch all documents, selecting only the slug field for performance
    const documents = await Document.find({})
      .select('slug')
      .lean();

    // Return array of slug parameters for static generation
    return documents.map((document) => ({
      slug: document.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for documents:', error);
    // Return empty array on error to prevent build failures
    return [];
  }
}

/**
 * Generate comprehensive SEO metadata
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getDocumentBySlug(slug);

  if (!result.success) {
    return {
      title: 'Document Not Found - VUEDU',
      description: 'The requested document could not be found.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const { document } = result;
  return generateDocumentMetadata(document, slug);
}

/**
 * Document Detail Page
 * Displays comprehensive document information with SEO optimization
 * Fully semantic HTML5, accessible, and optimized for search engines
 */
export default async function DocumentPage({ params }) {
  const { slug } = await params;
  const result = await getDocumentBySlug(slug);

  if (!result.success) {
    notFound();
  }

  const { document } = result;
  const typeConfig = documentTypes[document.type] || documentTypes.note;

  // Fetch initial comments
  const commentsResult = await getComments(document._id.toString(), 1, 4);
  const { comments, pagination } = commentsResult.success
    ? commentsResult
    : { comments: [], pagination: { currentPage: 1, totalPages: 0, totalCount: 0, hasMore: false } };

  // Get proper URLs for preview and download
  const previewInfo = getPdfPreviewInfo(document.fileUrl);

  // Generate all structured data for SEO
  const structuredData = generateAllDocumentStructuredData(document, slug);

  return (
    <>
      {/* JSON-LD Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/documents"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Back to all documents"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Documents</span>
            </Link>
          </nav>

          {/* Main Article Content */}
          <article
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            itemScope
            itemType="https://schema.org/EducationalOccupationalCredential"
          >
            {/* Document Header with ID Badge */}
            <DocumentHeader 
              title={document.title}
              ariaLabel={`Document identifier for ${document.title}`}
            />

            {/* Main Content Section */}
            <div className="p-6 lg:p-8">
              {/* Document Title and Type */}
              <header className="mb-6">
                <div className="mb-4">
                  <span 
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${typeConfig.color}`}
                    itemProp="credentialCategory"
                  >
                    {typeConfig.label}
                  </span>
                </div>
                
                <h1 
                  className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight"
                  itemProp="name"
                >
                  {document.title}
                </h1>

                {/* Action Buttons */}
                <DocumentActions
                  slug={slug}
                  previewInfo={previewInfo}
                  title={document.title}
                />
              </header>

              {/* Document Metadata Grid */}
              <DocumentMetadata document={document} />

              {/* Tags Section */}
              <DocumentTags tags={document.tags} />

              {/* Description/Content */}
              <section
                className="blog-content prose prose-lg max-w-none mb-8"
                itemProp="description"
                dangerouslySetInnerHTML={{ __html: document.description }}
                aria-label="Document description and details"
              />

              {/* Educational Context (Hidden Semantic Data) */}
              <div className="sr-only" itemProp="educationalLevel">
                {document.year}
              </div>
              <div className="sr-only" itemProp="competencyRequired">
                {document.subject}
              </div>
            </div>
          </article>

          {/* Related Documents Navigation */}
          <DocumentRelatedLinks 
            document={document}
            typeConfig={typeConfig}
          />

          {/* Comments Section */}
          <section aria-labelledby="comments-heading">
            <h2 id="comments-heading" className="sr-only">
              Comments and Discussion
            </h2>
            <CommentSection
              documentId={document._id.toString()}
              initialComments={comments}
              initialPagination={pagination}
            />
          </section>
        </div>
      </div>
    </>
  );
}