'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination = {}, baseUrl = '/documents' }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Add default values in case pagination is undefined
  const {
    currentPage = 1,
    totalPages = 1,
    hasPrev = false,
    hasNext = false
  } = pagination || {};

  const navigateToPage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${baseUrl}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    // If totalPages is less than 2, return empty array
    if (totalPages <= 1) return [];

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++) {
      range.push(i);
    }

    // Only add page 1 if total pages > 1
    if (totalPages > 1) {
      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }
    }

    rangeWithDots.push(...range);

    // Only add last page if it's different from page 1
    if (totalPages > 1) {
      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  // If pagination data isn't valid or totalPages <= 1, don't render anything
  if (!pagination || totalPages <= 1) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Liquid Background Orbs */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

      <div className="relative backdrop-blur-2xl bg-gradient-to-r from-white/70 via-white/60 to-white/70 border border-white/80 rounded-3xl shadow-xl shadow-purple-500/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => navigateToPage(currentPage - 1)}
              disabled={!hasPrev}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 text-white font-medium text-sm rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-0"></div>
              <div className="relative flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </div>
            </button>
            <button
              onClick={() => navigateToPage(currentPage + 1)}
              disabled={!hasNext}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 text-white font-medium text-sm rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-0"></div>
              <div className="relative flex items-center gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          </div>

          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                Page <span className="font-bold text-blue-600">{currentPage}</span> of{' '}
                <span className="font-bold text-purple-600">{totalPages}</span>
              </p>
            </div>

            <div>
              <nav className="isolate inline-flex -space-x-px rounded-2xl shadow-lg shadow-purple-500/10 overflow-hidden backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/70" aria-label="Pagination">
                {/* Previous Button */}
                <button
                  onClick={() => navigateToPage(currentPage - 1)}
                  disabled={!hasPrev}
                  className="group relative inline-flex items-center px-4 py-3 text-gray-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5 relative z-10" aria-hidden="true" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="relative inline-flex items-center px-4 py-3 text-sm font-semibold text-gray-500 border-l border-white/50"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = page === currentPage;
                  return (
                    <button
                      key={page}
                      onClick={() => navigateToPage(page)}
                      className={`group relative inline-flex items-center px-4 py-3 text-sm font-semibold transition-all duration-300 border-l border-white/50 hover:text-white ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/90 via-blue-600/80 to-purple-600/90 text-white shadow-lg shadow-blue-500/30'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-500/80 hover:via-blue-600/70 hover:to-purple-600/80'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">{page}</span>
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => navigateToPage(currentPage + 1)}
                  disabled={!hasNext}
                  className="group relative inline-flex items-center px-4 py-3 text-gray-600 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5 relative z-10" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}