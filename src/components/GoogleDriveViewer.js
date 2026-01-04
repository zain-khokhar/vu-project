'use client';

import { useState } from 'react';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';

/**
 * Optimized Google Drive Viewer
 * Uses the native /preview endpoint which is the most performant way to embed Drive files.
 * Removes unnecessary retry logic and complex state management.
 */
export default function GoogleDriveViewer({ fileUrl, documentTitle, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Extract File ID for the fastest preview URL construction
  // Supported formats: 
  // - https://drive.google.com/file/d/[ID]/view
  // - https://drive.google.com/open?id=[ID]
  const getFileId = (url) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/) || url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  };

  const fileId = getFileId(fileUrl);

  // The /preview endpoint is the modern, optimized embed viewer for Google Drive
  // efficient caching and native PDF rendering support
  const embedUrl = fileId
    ? `https://drive.google.com/file/d/${fileId}/preview`
    : fileUrl;

  const downloadUrl = fileId
    ? `https://drive.google.com/uc?export=download&id=${fileId}`
    : fileUrl;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Header - Transparent overlay style for better immersion */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-start justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-200 hover:scale-105"
            title="Close Preview"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-white font-medium text-sm sm:text-base drop-shadow-md truncate max-w-[200px] sm:max-w-md hidden sm:block">
            {documentTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600/90 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>

          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-200 hover:scale-105"
            title="Open in Drive"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full h-full flex items-center justify-center pt-16 pb-4 px-4 sm:pt-0 sm:pb-0 sm:px-0">
        <div className="w-full h-full sm:max-w-5xl sm:h-[85vh] bg-white rounded-lg sm:rounded-xl shadow-2xl overflow-hidden relative">

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-20">
              <div className="text-center">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">Loading preview...</p>
              </div>
            </div>
          )}

          {/* Error Fallback */}
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-6 text-center z-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-sm w-full">
                <h3 className="text-gray-900 font-semibold mb-2">Preview Unavailable</h3>
                <p className="text-gray-500 text-sm mb-6">
                  This document cannot be embedded directly. Please view it on Google Drive.
                </p>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Google Drive
                </a>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 bg-white"
              title={documentTitle}
              sandbox="allow-scripts allow-same-origin allow-popups"

              allow="autoplay"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}