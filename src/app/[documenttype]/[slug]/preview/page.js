import { notFound } from 'next/navigation';
import { getDocumentBySlug } from '@/actions/documents';
import PDFViewerWrapper from '@/components/PDFViewerWrapper';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getDocumentBySlug(slug);

  if (!result.success) {
    return {
      title: 'Document Not Found - Vuedu'
    };
  }

  const { document } = result;

  return {
    title: `Preview: ${document.title} - Vuedu`,
    description: `Preview ${document.title} online`,
  };
}

export default async function PreviewPage({ params }) {
  const { slug } = await params;
  const result = await getDocumentBySlug(slug);

  if (!result.success) {
    notFound();
  }

  const { document } = result;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fallback UI in case JavaScript is disabled */}
      <noscript>
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">JavaScript Required</h1>
            <p className="text-gray-600 mb-6">
              PDF preview requires JavaScript to be enabled. You can still download the document directly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href={`/documents/${slug}`}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Document
              </Link>
              <a
                href={document.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </noscript>

      {/* PDF Viewer Component */}
      <PDFViewerWrapper document={document} />
    </div>
  );
}