'use client';

import { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, X, Loader2, ExternalLink } from 'lucide-react';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ fileUrl, onClose, documentTitle, onError }) {
  const [numPages, setNumPages] = useState(null);
  const [visiblePages, setVisiblePages] = useState(5);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    let errorMessage = 'Failed to load PDF document. Please try downloading instead.';
    
    if (error.name === 'InvalidPDFException') {
      errorMessage = 'This file appears to be corrupted or is not a valid PDF.';
    } else if (error.name === 'MissingPDFException') {
      errorMessage = 'PDF file not found. The link may be broken.';
    } else if (error.name === 'UnexpectedResponseException') {
      errorMessage = 'Unable to access the PDF. It may be behind authentication or blocked by CORS.';
    }
    
    setError(errorMessage);
    setLoading(false);
    
    // If onError callback is provided, call it after a delay to try fallback
    if (onError) {
      setTimeout(() => {
        onError();
      }, 2000);
    }
  };

  // Handle scroll to load more pages
  const handleScroll = useCallback(() => {
    if (loadingMore || visiblePages >= numPages) return;

    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Load more when user scrolls near the bottom
    if (scrollTop + windowHeight >= documentHeight - 1000) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisiblePages(prev => Math.min(prev + 5, numPages));
        setLoadingMore(false);
      }, 500);
    }
  }, [loadingMore, visiblePages, numPages]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close Preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 truncate max-w-96">
              {documentTitle}
            </h2>
            {numPages && (
              <p className="text-sm text-gray-600">
                Showing {Math.min(visiblePages, numPages)} of {numPages} pages
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Zoom Controls */}
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom Out"
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Zoom In"
            disabled={scale >= 3.0}
          >
            <ZoomIn className="h-5 w-5" />
          </button>

          {/* Download Button */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </a>
        </div>
      </div>

      {/* PDF Content */}
      <div className="max-w-4xl mx-auto p-4">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading PDF...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-800 mb-4">{error}</div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {onError && (
                <button
                  onClick={onError}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Try Alternative Viewer</span>
                </button>
              )}
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF Instead</span>
              </a>
            </div>
          </div>
        )}

        {!loading && !error && (
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading PDF...</span>
              </div>
            }
          >
            <div className="space-y-6">
              {Array.from(new Array(Math.min(visiblePages, numPages || 0)), (el, index) => (
                <div key={`page_${index + 1}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 font-medium">
                    Page {index + 1}
                  </div>
                  <div className="flex justify-center p-4">
                    <Page
                      pageNumber={index + 1}
                      scale={scale}
                      loading={
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                        </div>
                      }
                      className="border border-gray-200"
                    />
                  </div>
                </div>
              ))}

              {/* Load More Indicator */}
              {loadingMore && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading more pages...</span>
                </div>
              )}

              {/* End of Document */}
              {numPages && visiblePages >= numPages && (
                <div className="text-center py-8 text-gray-600">
                  <p>End of document</p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Full Document</span>
                  </a>
                </div>
              )}
            </div>
          </Document>
        )}
      </div>
    </div>
  );
}