import { Suspense } from 'react';
import { BookOpen } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import DocumentRequestForm from '@/components/DocumentRequestForm';
import SearchFilters from '@/components/SearchFilters';
import Pagination from '@/components/Pagination';
import { getDocuments, getFilterOptions } from '@/actions/documents';
import {
    generateDocumentMetadata,
    generateDocumentStructuredData,
    generateWebsiteStructuredData
} from '@/lib/seo-utils';

// Loading component for Suspense
function DocumentsLoading() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl shadow-2xl border border-white/90 overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-white/40 to-white/20"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gradient-to-r from-white/40 to-white/20 rounded w-3/4"></div>
                        <div className="h-3 bg-gradient-to-r from-white/40 to-white/20 rounded w-1/2"></div>
                        <div className="h-3 bg-gradient-to-r from-white/40 to-white/20 rounded w-2/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// Server component for documents content
async function DocumentsContent({ params, searchParams }) {
    const { pageNumber } = await params;
    const page = parseInt(pageNumber) || 1;

    const urlParams = await searchParams;
    const search = urlParams?.search || '';
    const type = urlParams?.type || '';
    const subject = urlParams?.subject || '';
    const university = urlParams?.university || '';
    const year = urlParams?.year || '';

    const [documentsResult, filterOptionsResult] = await Promise.all([
        getDocuments({ page, search, type, subject, university, year }),
        getFilterOptions()
    ]);

    const { documents, pagination } = documentsResult.success
        ? documentsResult
        : { documents: [], pagination: null };

    const filterOptions = filterOptionsResult.success
        ? filterOptionsResult.filters
        : { subjects: [], universities: [], years: [] };

    // Build base URL with filters for pagination
    const buildBaseUrl = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (type) params.set('type', type);
        if (subject) params.set('subject', subject);
        if (university) params.set('university', university);
        if (year) params.set('year', year);

        const queryString = params.toString();
        return queryString ? `/documents?${queryString}` : '/documents';
    };

    return (
        <div className="relative min-h-screen">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        generateWebsiteStructuredData(),
                        generateDocumentStructuredData({
                            type: 'CollectionPage',
                            name: search
                                ? `Search Results for "${search}"`
                                : type
                                    ? `${type.charAt(0).toUpperCase() + type.slice(1)} Documents`
                                    : 'All Educational Documents',
                            description: 'Browse our comprehensive collection of free educational documents including books, notes, handouts, past papers, and study materials.',
                            url: '/documents',
                            breadcrumbs: [
                                { name: 'Home', url: '/' },
                                { name: 'Documents', url: '/documents' },
                            ],
                            items: documents.slice(0, 10).map(doc => ({
                                title: doc.title,
                                description: doc.description || `${doc.type} for ${doc.subject}`,
                                url: `/documents/${doc.slug}`,
                                type: doc.type,
                                subject: doc.subject,
                            })),
                            totalItems: pagination?.totalCount || documents.length,
                            dateModified: new Date().toISOString(),
                        }),
                    ]),
                }}
            />

            {/* Hero Section - Only on page 1 without filters */}
            {page === 1 && !search && !type && !subject && !university && !year && (
                <section className="relative pt-32 pb-12">
                    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
                        <div className="mb-12">
                            {/* Premium Badge */}
                            <div className="mb-6">
                                <div className="relative bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden inline-block group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="relative text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">PREMIUM CONTENT</span>
                                </div>
                            </div>

                            {/* Heading */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight mb-6 lg:mb-4">
                                <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                    Educational Documents
                                </span>
                                <span className="block xl:inline bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Library
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light leading-relaxed lg:-mt-16">
                                Access thousands of free educational documents including books, notes, handouts, past papers, and study materials shared by students worldwide.
                            </p>
                        </div>
                    </div>
                </section>
            )}
            {/* Search and Filters */}
            {/* <div className="sticky top-16 z-40 bg-white/80 backdrop-blur"> */}
            <SearchFilters filterOptions={filterOptions} />
            {/* </div> */}


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
                {/* Documents Grid */}
                {documents && documents.length > 0 ? (
                    <>
                        {/* Header with Liquid Badge */}
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <div className="inline-block mb-4 group">
                                    <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                        <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                                            {page === 1 ? 'AVAILABLE DOCUMENTS' : `PAGE ${page}`}
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl !font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                                    {search ? `Search Results for "${search}"` : page === 1 ? 'Available Documents' : `Documents - Page ${page}`}
                                </h2>
                                <p className="text-lg text-gray-700 !font-light">
                                    {page === 1
                                        ? (pagination?.totalCount ? `${pagination.totalCount} documents found` : 'Browse our collection of educational materials')
                                        : `Showing page ${page} of ${pagination.totalPages}`
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {documents.map((document) => (
                                <div key={document._id} className="group bg-gradient-to-br from-white/70 via-white/60 to-white/50  rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                                    <div className="relative">
                                        <DocumentCard document={document} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && <Pagination pagination={pagination} baseUrl={buildBaseUrl()} />}

                        {/* Document Request Form */}
                        <div className="mt-12">
                            <DocumentRequestForm />
                        </div>
                    </>
                ) : (
                    <div className=" bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl p-12 shadow-2xl text-center">
                        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-light text-gray-900 mb-2">No documents found</h3>
                        <p className="text-gray-700 mb-6 font-light">
                            {search || type || subject || university || year
                                ? "Try adjusting your search criteria or filters"
                                : "No documents have been uploaded yet"
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DocumentsPageNumber({ params, searchParams }) {
    return (
        <Suspense fallback={
            <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <DocumentsLoading />
                </div>
            </div>
        }>
            <DocumentsContent params={params} searchParams={searchParams} />
        </Suspense>
    );
}

// Generate static params for all document pages
export async function generateStaticParams() {
    const result = await getDocuments({ page: 1, limit: 12 });

    if (!result.success || !result.pagination) {
        return [{ pageNumber: '1' }];
    }

    const { totalPages } = result.pagination;

    // Generate params for all pages
    return Array.from({ length: totalPages }, (_, i) => ({
        pageNumber: String(i + 1)
    }));
}

// Generate dynamic metadata based on search params
export async function generateMetadata({ params, searchParams }) {
    const { pageNumber } = await params;
    const urlParams = await searchParams;

    const page = parseInt(pageNumber) || 1;
    const search = urlParams?.search || '';
    const type = urlParams?.type || '';
    const subject = urlParams?.subject || '';
    const university = urlParams?.university || '';
    const year = urlParams?.year || '';

    // Build dynamic title and description
    let title = 'Browse Educational Documents';
    let description = 'Browse our comprehensive collection of free educational documents including books, notes, handouts, past papers, and study materials.';
    const keywords = ['educational documents', 'study materials', 'free documents', 'student resources'];

    if (search) {
        title = `Search Results for "${search}" - Vuedu`;
        description = `Find educational documents matching "${search}". Browse books, notes, handouts, and more.`;
        keywords.push(search, `${search} documents`, `${search} study material`);
    } else if (type) {
        const typeLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
        title = `${typeLabel} - Educational Documents | Vuedu`;
        description = `Browse our collection of free ${typeLabel.toLowerCase()}. High-quality educational resources for students.`;
        keywords.push(type, `${type} documents`, `free ${type}`);
    }

    if (subject) {
        title = `${subject} ${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Documents'} - Vuedu`;
        description = `Free ${subject} ${type || 'educational materials'}. Comprehensive study resources for ${subject}.`;
        keywords.push(subject, `${subject} documents`, `${subject} study material`);
    }

    if (university) {
        title = `${university} ${subject || 'Documents'} - Vuedu`;
        description = `Educational materials from ${university}. ${subject ? `${subject} resources` : 'Study materials'} shared by students.`;
        keywords.push(university, `${university} documents`);
    }

    if (year) {
        keywords.push(`${year} documents`, year);
    }

    if (page > 1) {
        title = `${title} - Page ${page}`;
        description = `${description} - Page ${page}`;
    }

    return generateDocumentMetadata({
        title,
        description,
        keywords,
        url: '/documents',
        canonical: page > 1 ? `/documents/page/${page}` : '/documents',
        type: 'website',
        images: [
            {
                url: '/og-documents.jpg',
                width: 1200,
                height: 630,
                alt: 'Vuedu - Educational Documents',
            },
        ],
    });
}

export const dynamic = 'force-static';
export const revalidate = false;
