import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Calendar, University, BookOpen, Tag, ArrowLeft, ExternalLink, Eye } from 'lucide-react';
import { getDocumentBySlug } from '@/actions/documents';
import { getComments } from '@/actions/comments';
import { documentTypes, formatDate } from '@/lib/utils';
import { getPdfPreviewInfo } from '@/lib/urlUtils';
import RichTextContent from '@/components/RichTextContent';
import CommentSection from '@/components/CommentSection';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const result = await getDocumentBySlug(slug);
  
  if (!result.success) {
    return {
      title: 'Document Not Found - DocLibrary'
    };
  }

  const { document } = result;
  
  return {
    title: `${document.title} - DocLibrary`,
    description: document.description,
    keywords: `${document.subject}, ${document.university}, ${document.type}, ${document.tags?.join(', ')}`,
    openGraph: {
      title: document.title,
      description: document.description,
      images: [document.coverImage],
    }
  };
}

export default async function DocumentPage({ params }) {
  const { slug } = params;
  const result = await getDocumentBySlug(slug);

  if (!result.success) {
    notFound();
  }

  const { document } = result;
  const typeConfig = documentTypes[document.type] || documentTypes.note;

  // Fetch initial comments
  const commentsResult = await getComments(document._id.toString(), 1, 4);
  const { comments, pagination } = commentsResult.success 
    ? commentsResult 
    : { comments: [], pagination: { currentPage: 1, totalPages: 0, totalCount: 0, hasMore: false } };

  // Get proper URLs for preview and download
  const previewInfo = getPdfPreviewInfo(document.fileUrl);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/documents"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Documents</span>
        </Link>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Cover Image - Centered at Top */}
          <div className="flex justify-center bg-gray-100 py-8">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
              <Image
                src={document.coverImage}
                alt={document.title}
                fill
                className="object-cover rounded-lg shadow-md"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
              {/* Header */}
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${typeConfig.color} mb-3`}>
                  {typeConfig.label}
                </span>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  {document.title}
                </h1>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link
                    href={`/documents/${document.slug}/preview`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2"
                  >
                    <Eye className="h-5 w-5" />
                    <span>Preview Online</span>
                  </Link>
                  
                  <a
                    href={previewInfo.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Document</span>
                    {previewInfo.type === 'googledrive' ? (
                      <span className="text-xs bg-blue-500 px-1 rounded">Direct</span>
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                  </a>
                </div>
              </div>

              {/* Document Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">Subject</div>
                    <div className="text-sm text-gray-900 font-medium">{document.subject}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <University className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">University</div>
                    <div className="text-sm text-gray-900 font-medium">{document.university}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">Year</div>
                    <div className="text-sm text-gray-900 font-medium">{document.year}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="text-xs font-medium text-gray-500">Uploaded</div>
                    <div className="text-sm text-gray-900 font-medium">{formatDate(document.createdAt)}</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {document.tags && document.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {document.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <RichTextContent content={document.description} />
              </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href={`/documents?subject=${encodeURIComponent(document.subject)}`}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            More from {document.subject}
          </Link>
          <Link
            href={`/documents?university=${encodeURIComponent(document.university)}`}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            More from {document.university}
          </Link>
          <Link
            href={`/documents?type=${document.type}`}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            More {typeConfig.label}s
          </Link>
        </div>

        {/* Comment Section */}
        <CommentSection 
          documentId={document._id.toString()} 
          initialComments={comments}
          initialPagination={pagination}
        />
      </div>
    </div>
  );
}