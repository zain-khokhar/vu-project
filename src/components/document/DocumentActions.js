/**
 * DocumentActions Component
 * Prominent download-focused action buttons
 * Responsive design with smaller text on mobile
 */

import Link from 'next/link';
import { Eye, Download, ExternalLink, FileDown } from 'lucide-react';

export default function DocumentActions({ slug, previewInfo, title }) {
  return (
    <div
      className="flex flex-col gap-3"
      aria-label="Document actions"
    >
      {/* Primary Download Button - Large & Prominent */}
      <a
        href={previewInfo.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 inline-flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        aria-label={`Download ${title}`}
      >
        <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <FileDown className="h-5 w-5" aria-hidden="true" />
        <span>Download Document</span>
        {previewInfo.type === 'googledrive' && (
          <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full" aria-label="Direct download available">
            Direct
          </span>
        )}
      </a>

      {/* Secondary Preview Button */}
      <Link
        href={`/documents/${slug}/preview`}
        className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-medium text-sm sm:text-base transition-all duration-300 inline-flex items-center justify-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200"
        aria-label={`Preview ${title} online`}
      >
        <Eye className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        <span>Preview Online</span>
        <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-400" aria-hidden="true" />
      </Link>

      {/* File Info Hint */}
      <p className="text-center text-xs sm:text-sm text-gray-500">
        PDF file • Opens in new tab
      </p>
    </div>
  );
}
