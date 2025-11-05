import { Suspense } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DocumentCard from '@/components/DocumentCard';
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
        <div key={i} className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl shadow-2xl border border-white/90 overflow-hidden">
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
async function DocumentsContent({ searchParams }) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const search = params?.search || '';
  const type = params?.type || '';
  const subject = params?.subject || '';
  const university = params?.university || '';
  const year = params?.year || '';

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

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative min-h-screen">
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

      {/* Premium Liquid Background */}


      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="mb-12">
            {/* Premium Badge */}
            <div className="mb-6">
              <div className="relative backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden inline-block group">
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

      {/* Search and Filters */}
      <SearchFilters filterOptions={filterOptions} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        {/* Documents Grid */}
        {documents && documents.length > 0 ? (
          <>
            {/* Section Heading */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                Available Documents
              </h2>
              <p className="text-gray-600 font-light">
                Browse our collection of educational materials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {documents.map((document) => (
                <div key={document._id} className="group backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-white/100 hover:bg-white/80 overflow-hidden">
                  <div className="relative">
                    <DocumentCard document={document} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && <Pagination pagination={pagination} />}
          </>
        ) : (
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-12 shadow-2xl text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-light text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-700 mb-6 font-light">
              {search || type || subject || university || year
                ? "Try adjusting your search criteria or filters"
                : "No documents have been uploaded yet"
              }
            </p>
            {(!search && !type && !subject && !university && !year) && (
              <Link
                href="/admin/upload"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="h-4 w-4" />
                <span>Upload Document</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function DocumentsPage({ searchParams }) {
  return (
    <Suspense fallback={
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <DocumentsLoading />
        </div>
      </div>
    }>
      <DocumentsContent searchParams={searchParams} />
    </Suspense>
  );
}

// Generate static params for popular document types
export async function generateStaticParams() {
  // Pre-generate static pages for common document types and filters
  const staticParams = [
    {},
    { type: 'book' },
    { type: 'notes' },
    { type: 'handout' },
    { type: 'past-paper' },
    { type: 'assignment' },
  ];

  return staticParams;
}

// Generate dynamic metadata based on search params
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || '';
  const type = params?.type || '';
  const subject = params?.subject || '';
  const university = params?.university || '';
  const year = params?.year || '';
  const page = parseInt(params?.page) || 1;

  // Build dynamic title and description
  let title = 'Browse Educational Documents';
  let description = 'Browse our comprehensive collection of free educational documents including books, notes, handouts, past papers, and study materials.';
  const keywords = ['educational documents', 'study materials', 'free documents', 'student resources'];

  if (search) {
    title = `Search Results for "${search}" - VUEDU`;
    description = `Find educational documents matching "${search}". Browse books, notes, handouts, and more.`;
    keywords.push(search, `${search} documents`, `${search} study material`);
  } else if (type) {
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
    title = `${typeLabel} - Educational Documents | VUEDU`;
    description = `Browse our collection of free ${typeLabel.toLowerCase()}. High-quality educational resources for students.`;
    keywords.push(type, `${type} documents`, `free ${type}`);
  }

  if (subject) {
    title = `${subject} ${type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Documents'} - VUEDU`;
    description = `Free ${subject} ${type || 'educational materials'}. Comprehensive study resources for ${subject}.`;
    keywords.push(subject, `${subject} documents`, `${subject} study material`);
  }

  if (university) {
    title = `${university} ${subject || 'Documents'} - VUEDU`;
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
    canonical: page > 1 ? `/documents?page=${page}` : '/documents',
    type: 'website',
    images: [
      {
        url: '/og-documents.jpg',
        width: 1200,
        height: 630,
        alt: 'VUEDU - Educational Documents',
      },
    ],
  });
}

export const dynamic = 'force-dynamic'; // Enable dynamic rendering for search/filter
export const revalidate = 0; // Disable caching for real-time search results