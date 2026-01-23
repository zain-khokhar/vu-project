'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { documentTypes } from '@/lib/utils';

export default function SearchFilters({
  filterOptions,
  baseUrl = '/documents',
  searchPlaceholder = 'Search documents...',
  searchLabel = 'Search documents by title or keywords',
  showTypeFilter = true,
  showSubjectFilter = true,
  showUniversityFilter = true,
  showYearFilter = true,
  showCategoryFilter = false,
  categoryLabel = 'Category',
  searchHelpText = null
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);

  const currentFilters = {
    type: searchParams.get('type') || '',
    subject: searchParams.get('subject') || '',
    university: searchParams.get('university') || '',
    year: searchParams.get('year') || '',
    category: searchParams.get('category') || ''
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL({ search: searchTerm });
  };

  const updateURL = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    // Update or remove parameters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.delete('page');

    const queryString = params.toString();
    startTransition(() => {
      router.push(`${baseUrl}${queryString ? `?${queryString}` : ''}`);
    });

    // Auto-hide filters after selection on all screen sizes
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    startTransition(() => {
      router.push(baseUrl);
    });
  };

  const hasActiveFilters = Object.values(currentFilters).some(filter => filter) || searchTerm;

  return (
    <div className="sticky top-16 z-40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          {/* Search Input with Icon */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              id="search-input"
              name="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200/80 rounded-3xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/80"
              aria-label={searchLabel}
              autoComplete="off"
            />
          </div>

          {/* Search Button - Hidden on mobile, shown on desktop */}
          <button
            type="submit"
            disabled={isPending}
            className="hidden sm:flex group relative px-7 py-3 bg-purple-600 text-white font-semibold text-sm rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed items-center justify-center gap-2"
            aria-label="Search"
          >
            <span>Search</span>
          </button>

          {/* Mobile: Search + Filter buttons */}
          <div className="flex sm:hidden gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="group relative p-3 bg-purple-600 text-white font-semibold text-sm rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Search"
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="group p-3 bg-white text-gray-900 font-semibold text-sm rounded-3xl border-2 border-gray-200/80 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 active:scale-95"
              aria-label={showFilters ? 'Hide filters' : 'Show filters'}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter
                className={`h-5 w-5 transition-all duration-300 ${showFilters ? 'rotate-180 text-purple-600' : 'text-gray-700'}`}
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Desktop: Filter button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="hidden sm:flex group items-center justify-start gap-2 px-5 py-3 bg-white text-gray-900 font-semibold text-sm rounded-3xl border-2 border-gray-200/80 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label={showFilters ? 'Hide filters' : 'Show filters'}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <Filter
              className={`h-4 w-4 transition-all duration-300 ${showFilters ? 'rotate-180 text-purple-600' : 'group-hover:rotate-12 text-gray-700'}`}
              aria-hidden="true"
            />
            <span>Filters</span>
          </button>
        </form>

        {/* Search Help Text */}
        {searchHelpText && (
          <div className="mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">{searchHelpText}</p>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div
            className="flex flex-wrap items-center gap-2 p-4 bg-white rounded-2xl border border-purple-200/40 shadow-lg mb-6"
            role="status"
            aria-label="Active filters"
          >
            <span className="text-sm font-bold text-gray-900 mr-1">Active filters:</span>

            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs sm:text-sm border border-blue-400/60 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 font-medium">
                <span className="truncate max-w-[150px] sm:max-w-none">Search: "{searchTerm}"</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    updateURL({ search: '' });
                  }}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  aria-label="Clear search filter"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}

            {Object.entries(currentFilters).map(([key, value]) => {
              if (!value) return null;

              const displayValue = key === 'type' ? documentTypes[value]?.label : value;

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-xs sm:text-sm border border-purple-400/60 shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 font-medium"
                >
                  <span className="truncate max-w-[150px] sm:max-w-none">
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {displayValue}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateURL({ [key]: '' })}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Clear ${key} filter`}
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              );
            })}

            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-all duration-200"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filter Options */}
        {showFilters && (
          <div
            id="filter-panel"
            className={`grid grid-cols-1 ${[showTypeFilter, showSubjectFilter, showUniversityFilter, showYearFilter, showCategoryFilter].filter(Boolean).length > 2
              ? 'sm:grid-cols-2 lg:grid-cols-4'
              : 'sm:grid-cols-2'
              } gap-3 sm:gap-4 p-4 sm:p-6 bg-white border-2 border-purple-200/50 rounded-2xl shadow-xl shadow-purple-500/10 mt-4`}
            role="region"
            aria-label="Filter options"
          >
            {/* Type Filter */}
            {showTypeFilter && (
              <div>
                <label
                  htmlFor="filter-type"
                  className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2.5"
                >
                  Type
                </label>
                <select
                  id="filter-type"
                  value={currentFilters.type}
                  onChange={(e) => updateURL({ type: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200/80 rounded-3xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
                  aria-label="Filter by document type"
                >
                  <option value="">All Types</option>
                  {Object.entries(documentTypes).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Subject Filter */}
            {showSubjectFilter && (
              <div>
                <label
                  htmlFor="filter-subject"
                  className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2.5"
                >
                  Subject
                </label>
                <select
                  id="filter-subject"
                  value={currentFilters.subject}
                  onChange={(e) => updateURL({ subject: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200/80 rounded-3xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
                  aria-label="Filter by subject"
                >
                  <option value="">All Subjects</option>
                  {filterOptions.subjects?.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* University Filter */}
            {showUniversityFilter && (
              <div>
                <label
                  htmlFor="filter-university"
                  className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2.5"
                >
                  University
                </label>
                <select
                  id="filter-university"
                  value={currentFilters.university}
                  onChange={(e) => updateURL({ university: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200/80 rounded-3xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
                  aria-label="Filter by university"
                >
                  <option value="">All Universities</option>
                  {filterOptions.universities?.map((university) => (
                    <option key={university} value={university}>
                      {university}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Year Filter */}
            {showYearFilter && (
              <div>
                <label
                  htmlFor="filter-year"
                  className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2.5"
                >
                  Year
                </label>
                <select
                  id="filter-year"
                  value={currentFilters.year}
                  onChange={(e) => updateURL({ year: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200/80 rounded-3xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
                  aria-label="Filter by year"
                >
                  <option value="">All Years</option>
                  {filterOptions.years?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Category Filter */}
            {showCategoryFilter && (
              <div>
                <label
                  htmlFor="filter-category"
                  className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2.5"
                >
                  {categoryLabel}
                </label>
                <select
                  id="filter-category"
                  value={currentFilters.category}
                  onChange={(e) => updateURL({ category: e.target.value })}
                  className="w-full bg-white border-2 border-gray-200/80 rounded-3xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
                  aria-label={`Filter by ${categoryLabel.toLowerCase()}`}
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}