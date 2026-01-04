import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
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

        // Fetch all documents, selecting slug and type fields
        const documents = await Document.find({})
            .select('slug type')
            .lean();

        // Return array of parameters for static generation
        return documents.map((document) => ({
            documenttype: document.type,
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
            title: 'Document Not Found - Vuedu',
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
 * Modern document download page design
 * Distinct from blog pages with file-focused UI
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
                {/* Back Navigation - Floating */}
                <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        href="/documents"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
                        aria-label="Back to all documents"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        <span>Back to Documents</span>
                    </Link>
                </nav>

                {/* Document Header - Hero Section */}
                <DocumentHeader
                    title={document.title}
                    type={document.type}
                    ariaLabel={`Document: ${document.title}`}
                />

                {/* Main Content Area */}
                <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 -mt-8 relative z-10">
                    <article
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                        itemScope
                        itemType="https://schema.org/EducationalOccupationalCredential"
                    >
                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

                            {/* Left Column - Main Info (appears first on mobile) */}
                            <div className="lg:col-span-3 p-4 sm:p-6 lg:p-10 lg:border-r border-gray-100 order-2 lg:order-1">
                                {/* Document Title */}
                                <header className="mb-6 sm:mb-8">
                                    <h1
                                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight"
                                        itemProp="name"
                                    >
                                        {document.title}
                                    </h1>

                                    {/* Quick Info Pills */}
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full ${typeConfig.color}`}>
                                            {typeConfig.label}
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                                            {document.year}
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                                            {document.subject}
                                        </span>
                                    </div>
                                </header>

                                {/* Description Section */}
                                {document.description && (
                                    <section className="mb-6 sm:mb-8">
                                        {/* <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" aria-hidden="true" />
                                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">About this Document</h2>
                                        </div> */}
                                        <div
                                            className="prose prose-a:no-underline

                    prose-a:text-purple-500 hover:prose-a:underline
                    prose-quote:border-purple-500
                    prose-ul:list-disc 
                    max-w-none overflow-hidden"
                                            itemProp="description"
                                            dangerouslySetInnerHTML={{ __html: document.description }}
                                            aria-label="Document description and details"
                                        />
                                    </section>
                                )}

                                {/* Tags Section */}
                                <DocumentTags tags={document.tags} />

                                {/* Document Metadata */}
                            </div>

                            {/* Right Column - Download Actions (appears second on mobile, first visually on large screens) */}
                            <div className="lg:col-span-2 p-4 sm:p-6 lg:p-10 bg-gradient-to-b from-gray-50 to-white order-1 lg:order-2 border-b lg:border-b-0 border-gray-100">

                                <div className="sticky top-8">
                                    {/* Download Card Header */}
                                    <div className="text-left mb-6">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                            Get this Document
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Download or preview online
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <DocumentActions
                                        slug={slug}
                                        previewInfo={previewInfo}
                                        title={document.title}
                                        type={document.type}
                                    />

                                    {/* Additional Info */}
                                    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <p className="text-sm text-blue-800 text-center">
                                            <strong>Free Download</strong> • No registration required
                                        </p>
                                    </div>
                                    <DocumentMetadata document={document} typeConfig={typeConfig} />

                                </div>
                            </div>
                        </div>

                        {/* Educational Context (Hidden Semantic Data) */}
                        <div className="sr-only" itemProp="educationalLevel">
                            {document.year}
                        </div>
                        <div className="sr-only" itemProp="competencyRequired">
                            {document.subject}
                        </div>
                    </article>
                </div>

                {/* Related Documents Section */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <DocumentRelatedLinks
                        document={document}
                        typeConfig={typeConfig}
                    />

                    {/* Comments Section */}
                    <section aria-labelledby="comments-heading" className="mt-12">
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