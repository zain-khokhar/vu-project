import { Suspense } from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DocumentCard from '@/components/DocumentCard';
import SearchFilters from '@/components/SearchFilters';
import Pagination from '@/components/Pagination';
import { getDocuments, getFilterOptions } from '@/actions/documents';

// Loading component for Suspense
function DocumentsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl shadow-2xl border border-white/90 overflow-hidden animate-pulse">
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
  const page = parseInt(params.page) || 1;
  const search = params.search || '';
  const type = params.type || '';
  const subject = params.subject || '';
  const university = params.university || '';
  const year = params.year || '';

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
      {/* Premium Liquid Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-40"></div>

        {/* Liquid orbs with enhanced blur */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-300/8 via-blue-300/8 to-purple-300/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Search and Filters */}
      {/* <SearchFilters filterOptions={filterOptions} /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Results Header */}
        <div className="mb-12">
          <div className="inline-block mb-4 group">
            <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">PREMIUM CONTENT</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">All Documents</h1>
          {pagination && (
            <p className="text-lg text-gray-700 font-light">
              Showing {((pagination.currentPage - 1) * 12) + 1} - {Math.min(pagination.currentPage * 12, pagination.totalCount)} of {pagination.totalCount} documents
            </p>
          )}
        </div>

        {/* Documents Grid */}
        {documents && documents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {documents.map((document) => (
                <div key={document._id} className="group backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-white/100 hover:bg-white/80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/20 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
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
        {/* Premium Liquid Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-40"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="h-8 bg-gradient-to-r from-white/60 to-white/40 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gradient-to-r from-white/60 to-white/40 rounded w-96 animate-pulse"></div>
          </div>
          <DocumentsLoading />
        </div>
      </div>
    }>
      <DocumentsContent searchParams={searchParams} />
    </Suspense>
  );
}

export const metadata = {
  title: "Browse Documents - DocLibrary",
  description: "Browse and search through thousands of free educational documents including books, notes, handouts, and exams.",
};