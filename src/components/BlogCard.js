import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Calendar, BookOpen } from 'lucide-react';

export default function BlogCard({ blog }) {
  // Handle both old string format and new object format for backward compatibility
  const coverImageUrl = typeof blog.coverImage === 'string' 
    ? blog.coverImage 
    : blog.coverImage?.url || '/default-blog-cover.jpg';
  
  const coverImageAlt = typeof blog.coverImage === 'object' && blog.coverImage?.alt
    ? blog.coverImage.alt
    : blog.title;

  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="group h-full flex flex-col rounded-3xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border-2 bg-clip-padding border-transparent cursor-pointer" style={{
        // backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.3), rgba(168, 85, 247, 0.2))',
        // backgroundOrigin: 'border-box',
        // backgroundClip: 'padding-box, border-box'
      }}>

        <div className={`relative `}>
          {/* Glow effects */}
          {/* <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-75 animate-pulse" aria-hidden /> */}

          {/* Glass frame */}
          <div className="relative bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 backdrop-blur-sm rounded-3xl p-2 ">
            <div className="relative overflow-hidden rounded-2xl h-64">
              <Image 
                src={coverImageUrl} 
                width={400}
                height={400}
                alt={coverImageAlt} 
                className="w-full h-full object-cover" 
              />

              {/* Glossy overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" aria-hidden /> */}
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative flex-1 p-5 md:p-6 flex flex-col justify-between">
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative">
            {/* Title */}
            <h2 className="font-medium text-gray-900 text-xl md:text-xl leading-tight mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
              {blog.title}
            </h2>

            {/* Date with Icon */}
            <div className="flex items-center space-x-2 text-gray-600 text-sm font-light mb-4">
              <Calendar className="h-3.5 w-3.5 text-purple-500/70" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>

            {/* Read More Link */}
            <div className="flex items-center space-x-2 text-purple-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read More</span>
              <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400/0 via-purple-400/60 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </Link>
  );
}