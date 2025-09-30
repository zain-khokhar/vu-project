import Link from 'next/link';
import Image from 'next/image';
import { Calendar, University, BookOpen } from 'lucide-react';
import { documentTypes } from '@/lib/utils';

export default function DocumentCard({ document }) {
  const typeConfig = documentTypes[document.type] || documentTypes.note;

  return (
    <Link href={`/documents/${document.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Cover Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={document.coverImage}
            alt={"document.title"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeConfig.color}`}>
              {typeConfig.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {document.title}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{document.subject}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <University className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{document.university}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{document.year}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}