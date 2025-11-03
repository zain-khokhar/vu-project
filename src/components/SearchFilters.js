'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { documentTypes } from '@/lib/utils';

export default function SearchFilters({ filterOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);

  const currentFilters = {
    type: searchParams.get('type') || '',
    subject: searchParams.get('subject') || '',
    university: searchParams.get('university') || '',
    year: searchParams.get('year') || ''
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
      router.push(`/documents${queryString ? `?${queryString}` : ''}`);
    });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    startTransition(() => {
      router.push('/documents');
    });
  };

  const hasActiveFilters = Object.values(currentFilters).some(filter => filter) || searchTerm;

  return (
    <div className="sticky top-16 z-40 backdrop-blur-2xl py-6 border-b border-purple-200/40 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 backdrop-blur-xl bg-white/90 border-2 border-gray-200/80 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 shadow-sm hover:shadow-md hover:border-gray-300/80"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="group relative px-7 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-semibold text-sm rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-0"></div>
            <div className="relative">Search</div>
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="group flex items-center space-x-2 px-5 py-3 backdrop-blur-xl bg-white/90 text-gray-900 font-semibold text-sm rounded-xl border-2 border-gray-200/80 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Filter className={`h-4 w-4 transition-all duration-300 ${showFilters ? 'rotate-180 text-purple-600' : 'group-hover:rotate-12 text-gray-700'}`} />
            <span>Filters</span>
          </button>
        </form>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4 p-4 backdrop-blur-xl bg-white/80 rounded-2xl border border-purple-200/40 shadow-lg">
            <span className="text-sm font-bold text-gray-900 mr-1">Active filters:</span>

            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm border border-blue-400/60 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 font-medium">
                Search: "{searchTerm}"
                <button
                  onClick={() => {
                    setSearchTerm('');
                    updateURL({ search: '' });
                  }}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors ml-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            )}

            {Object.entries(currentFilters).map(([key, value]) => {
              if (!value) return null;

              const displayValue = key === 'type' ? documentTypes[value]?.label : value;

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm border border-purple-400/60 shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 font-medium"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {displayValue}
                  <button
                    onClick={() => updateURL({ [key]: '' })}
                    className="hover:bg-white/20 rounded-full p-1 transition-colors ml-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              );
            })}

            <button
              onClick={clearAllFilters}
              className="text-sm font-bold text-red-600 hover:text-red-700 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 backdrop-blur-xl bg-white/90 border-2 border-purple-200/50 rounded-2xl shadow-xl shadow-purple-500/10 mb-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                Type
              </label>
              <select
                value={currentFilters.type}
                onChange={(e) => updateURL({ type: e.target.value })}
                className="w-full backdrop-blur-xl bg-white/80 border-2 border-gray-200/80 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
              >
                <option value="">All Types</option>
                {Object.entries(documentTypes).map(([value, config]) => (
                  <option key={value} value={value}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                Subject
              </label>
              <select
                value={currentFilters.subject}
                onChange={(e) => updateURL({ subject: e.target.value })}
                className="w-full backdrop-blur-xl bg-white/80 border-2 border-gray-200/80 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
              >
                <option value="">All Subjects</option>
                {filterOptions.subjects?.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* University Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                University
              </label>
              <select
                value={currentFilters.university}
                onChange={(e) => updateURL({ university: e.target.value })}
                className="w-full backdrop-blur-xl bg-white/80 border-2 border-gray-200/80 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
              >
                <option value="">All Universities</option>
                {filterOptions.universities?.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2.5">
                Year
              </label>
              <select
                value={currentFilters.year}
                onChange={(e) => updateURL({ year: e.target.value })}
                className="w-full backdrop-blur-xl bg-white/80 border-2 border-gray-200/80 rounded-xl px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-400/20 transition-all duration-300 hover:border-gray-300/80 shadow-sm"
              >
                <option value="">All Years</option>
                {filterOptions.years?.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}