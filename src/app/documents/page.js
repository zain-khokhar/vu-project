import { Suspense } from 'react';
import { BookOpen } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import SearchFilters from '@/components/SearchFilters';
import Pagination from '@/components/Pagination';
import { getDocuments, getFilterOptions } from '@/actions/documents';

// Loading component for Suspense
function DocumentsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filters */}
      <SearchFilters filterOptions={filterOptions} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Documents</h1>
          {pagination && (
            <p className="text-gray-600">
              Showing {((pagination.currentPage - 1) * 12) + 1} - {Math.min(pagination.currentPage * 12, pagination.totalCount)} of {pagination.totalCount} documents
            </p>
          )}
        </div>

        {/* Documents Grid */}
        {documents && documents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {documents.map((document) => (
                <DocumentCard key={document._id} document={document} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && <Pagination pagination={pagination} />}
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600 mb-6">
              {search || type || subject || university || year
                ? "Try adjusting your search criteria or filters"
                : "No documents have been uploaded yet"
              }
            </p>
            {(!search && !type && !subject && !university && !year) && (
              <a
                href="/admin/upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Upload First Document
              </a>
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
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 h-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
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