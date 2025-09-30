import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover Image */}
      <Link href={`/blogs/${blog.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Author */}
        {blog.author && (
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">{blog.author.name}</div>
            </div>
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={`/blogs/${blog.slug}`}
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}