/**
 * DocumentMetadata Component
 * Clean card-style metadata display for document pages
 * Responsive design with compact layout on mobile
 */

import { BookOpen, University, Calendar, Upload, FileType } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DocumentMetadata({ document, typeConfig }) {
  const metadata = [
    {
      icon: BookOpen,
      label: 'Subject',
      value: document.subject,
      id: 'subject',
    },
    {
      icon: University,
      label: 'University',
      value: document.university,
      id: 'university',
    },
    {
      icon: Calendar,
      label: 'Academic Year',
      value: document.year,
      id: 'year',
    },
    {
      icon: Upload,
      label: 'Uploaded',
      value: formatDate(document.createdAt),
      id: 'uploaded',
    },
  ];

  return (
    <section
      className="mt-6 sm:mt-8"
      aria-labelledby="metadata-heading"
    >
      <h2 id="metadata-heading" className="sr-only">
        Document Information
      </h2>

      {/* Document Type Banner */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 pb-3 sm:pb-4 border-b border-gray-100">
        <div className={`p-1.5 sm:p-2 rounded-lg ${typeConfig?.color || 'bg-gray-100 text-gray-600'}`}>
          <FileType className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
        <div>
          <span className="text-xs sm:text-sm text-gray-500 block">Document Type</span>
          <span className="text-sm sm:text-base font-semibold text-gray-900" itemProp="credentialCategory">
            {typeConfig?.label || 'Document'}
          </span>
        </div>
      </div>

      {/* Metadata Grid - Compact on mobile */}
      <dl className="grid grid-cols-2 gap-2 sm:gap-3">
        {metadata.map(({ icon: Icon, label, value, id }) => (
          <div
            key={id}
            className="p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Icon
                className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400"
                aria-hidden="true"
              />
              <dt className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label}
              </dt>
            </div>
            <dd
              className="text-xs sm:text-sm text-gray-900 font-semibold truncate"
              title={value}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
