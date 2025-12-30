/**
 * DocumentMetadata Component
 * Displays document metadata in a structured grid
 * Semantic HTML with proper accessibility attributes
 */

import { BookOpen, University, Calendar, Upload } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DocumentMetadata({ document }) {
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
      label: 'Upload Date',
      value: formatDate(document.createdAt),
      id: 'uploaded',
    },
  ];

  return (
    <section 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100"
      aria-labelledby="metadata-heading"
    >
      <h2 id="metadata-heading" className="sr-only">
        Document Information
      </h2>
      
      <dl className="contents">
        {metadata.map(({ icon: Icon, label, value, id }) => (
          <div 
            key={id}
            className="flex items-start space-x-3"
          >
            <Icon 
              className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" 
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                {label}
              </dt>
              <dd 
                className="text-sm text-gray-900 font-semibold truncate"
                title={value}
              >
                {value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
