/**
 * DocumentActions Component
 * Displays preview and download action buttons
 * Fully accessible with proper ARIA labels
 */

import Link from 'next/link';
import { Eye, Download, ExternalLink } from 'lucide-react';

export default function DocumentActions({ slug, previewInfo, title }) {
  return (
    <nav 
      className="flex flex-col sm:flex-row gap-3 mb-6"
      aria-label="Document actions"
    >
      <Link
        href={`/documents/${slug}/preview`}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label={`Preview ${title} online`}
      >
        <Eye className="h-5 w-5" aria-hidden="true" />
        <span>Preview Online</span>
      </Link>

      <a
        href={previewInfo.downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        download
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`Download ${title}`}
      >
        <Download className="h-5 w-5" aria-hidden="true" />
        <span>Download</span>
        {previewInfo.type === 'googledrive' ? (
          <span className="text-xs bg-blue-500 px-1 rounded" aria-label="Direct download available">
            Direct
          </span>
        ) : (
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        )}
      </a>
    </nav>
  );
}
