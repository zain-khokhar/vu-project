/**
 * DocumentTags Component
 * Displays document tags with proper semantic markup
 * Accessible tag list with navigation capabilities
 */

import Link from 'next/link';
import { Tag } from 'lucide-react';

export default function DocumentTags({ tags }) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <section 
      className="mb-6"
      aria-labelledby="tags-heading"
    >
      <div className="flex items-center space-x-2 mb-3">
        <Tag className="h-4 w-4 text-gray-400" aria-hidden="true" />
        <h2 
          id="tags-heading"
          className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
        >
          Tags
        </h2>
      </div>
      
      <ul 
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Document tags"
      >
        {tags.map((tag, index) => (
          <li key={index}>
            <Link
              href={`/documents?search=${encodeURIComponent(tag)}`}
              className="inline-block bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`View documents tagged with ${tag}`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
