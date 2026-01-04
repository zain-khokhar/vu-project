'use client';

import { useState } from 'react';
import PDFViewer from '@/components/PDFViewer';
import IframeViewer from '@/components/IframeViewer';
import GoogleDriveViewer from '@/components/GoogleDriveViewer';
import { getPdfPreviewInfo } from '@/lib/urlUtils';

export default function PDFViewerWrapper({ document }) {
  const [useFallback, setUseFallback] = useState(false);

  const previewInfo = getPdfPreviewInfo(document.fileUrl);

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = `/${document.type}/${document.slug}`;
    }
  };

  const handlePDFError = () => {
    setUseFallback(true);
  };

  // Handle Google Drive files specifically
  if (previewInfo.type === 'googledrive') {
    return (
      <GoogleDriveViewer
        fileUrl={document.fileUrl}
        documentTitle={document.title}
        onClose={handleClose}
      />
    );
  }

  // If fallback is needed, use iframe viewer
  if (useFallback || previewInfo.requiresIframe) {
    return (
      <IframeViewer
        fileUrl={previewInfo.previewUrl}
        documentTitle={document.title}
        onClose={handleClose}
      />
    );
  }

  // Try PDF viewer first for direct PDF URLs
  return (
    <PDFViewer
      fileUrl={previewInfo.previewUrl}
      documentTitle={document.title}
      onClose={handleClose}
      onError={handlePDFError}
    />
  );
}