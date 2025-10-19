import { Calendar, Globe, Twitter, Linkedin } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AuthorInfo({ author, publishedDate }) {
  if (!author) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-6 my-8 shadow-2xl glass">
      <div className="flex items-start space-x-4">
        {/* Author Avatar */}
        <img
          src={author.avatar}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        
        {/* Author Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{author.name}</h4>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{author.bio}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Published {formatDate(publishedDate)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}