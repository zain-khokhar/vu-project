'use client';

import { useState } from 'react';
import { X, Download, ExternalLink, AlertTriangle } from 'lucide-react';

export default function IframeViewer({ fileUrl, documentTitle, onClose }) {
  const [iframeError, setIframeError] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
  };

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
            <p className="text-sm text-gray-600">Document Preview</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
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
          
          {/* Open in New Tab */}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open in Tab</span>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="h-full">
        {iframeError ? (
          <div className="flex items-center justify-center h-full p-8">
            <div className="max-w-md text-center bg-white rounded-lg p-8 shadow-lg">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Not Available</h3>
              <p className="text-gray-600 mb-6">
                This document cannot be previewed in the browser. You can download it or open it in a new tab.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </a>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open in New Tab</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`${fileUrl}#toolbar=1&navpanes=1&scrollbar=1`}
            className="w-full h-full border-0"
            title={documentTitle}
            onError={handleIframeError}
            onLoad={(e) => {
              // Check if iframe loaded successfully
              try {
                const iframe = e.target;
                if (!iframe.contentDocument && !iframe.contentWindow) {
                  handleIframeError();
                }
              } catch (error) {
                handleIframeError();
              }
            }}
          />
        )}
      </div>
    </div>
  );
}