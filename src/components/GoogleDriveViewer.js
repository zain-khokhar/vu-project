'use client';

import { useState, useEffect } from 'react';
import { X, Download, ExternalLink, AlertTriangle, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';
import { convertGoogleDriveUrl, convertGoogleDrivePreviewUrl } from '@/lib/urlUtils';

export default function GoogleDriveViewer({ fileUrl, documentTitle, onClose }) {
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const previewUrl = convertGoogleDrivePreviewUrl(fileUrl);
  const downloadUrl = convertGoogleDriveUrl(fileUrl);

  // Generate alternative preview URLs for better compatibility
  const getFileId = (url) => {
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    return fileIdMatch ? fileIdMatch[1] : null;
  };

  const fileId = getFileId(fileUrl);
  
  // Multiple preview URL strategies
  const previewUrls = fileId ? [
    `https://drive.google.com/file/d/${fileId}/preview`,
    `https://docs.google.com/viewer?url=https://drive.google.com/uc?id=${fileId}&embedded=true`,
    `https://drive.google.com/viewerng/viewer?url=https://drive.google.com/uc?id=${fileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`
  ] : [previewUrl];

  const currentPreviewUrl = previewUrls[Math.min(retryCount, previewUrls.length - 1)];

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
  };

  const handleRetry = () => {
    if (retryCount < previewUrls.length - 1) {
      setRetryCount(prev => prev + 1);
      setIframeError(false);
      setIsLoading(true);
    } else {
      setIframeError(true);
    }
  };

  // Auto-retry once after 3 seconds if first attempt fails
  useEffect(() => {
    if (iframeError && retryCount === 0) {
      const timer = setTimeout(() => {
        handleRetry();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [iframeError, retryCount]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-95">
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
            <p className="text-sm text-gray-600">Google Drive Preview</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Retry Button */}
          {iframeError && (
            <button
              onClick={handleRetry}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          )}

          {/* Download Button */}
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </a>
          
          {/* Open in Google Drive */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open in Drive</span>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="h-full relative">
        {/* Loading Indicator */}
        {isLoading && !iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading document preview...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {iframeError ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="max-w-md text-center bg-white rounded-lg p-8 shadow-lg">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Not Available</h3>
              <p className="text-gray-600 mb-4">
                {retryCount < previewUrls.length - 1 
                  ? "Trying alternative preview method..." 
                  : "This Google Drive document cannot be previewed directly."
                }
              </p>
              {retryCount >= previewUrls.length - 1 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-4">This might be due to:</p>
                  <ul className="text-sm text-gray-600 text-left space-y-1">
                    <li>• Document permissions restrictions</li>
                    <li>• File format not supported for preview</li>
                    <li>• Network connectivity issues</li>
                    <li>• Google Drive temporary unavailability</li>
                  </ul>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {retryCount < previewUrls.length - 1 ? (
                  <button
                    onClick={handleRetry}
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Try Alternative Method</span>
                  </button>
                ) : (
                  <>
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open in Drive</span>
                    </a>
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Google Drive Iframe */
          <iframe
            key={retryCount} // Force re-render when retrying
            src={currentPreviewUrl}
            className="w-full h-full border-0"
            title={documentTitle}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allow="autoplay fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
            style={{ minHeight: '600px' }}
          />
        )}
      </div>
    </div>
  );
}