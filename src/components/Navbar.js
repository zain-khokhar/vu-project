import Link from 'next/link';
import { BookOpen, Search, Upload } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DocLibrary</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/documents" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Browse Documents</span>
            </Link>
            <Link 
              href="/blogs" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Blogs
            </Link>
            <Link 
              href="/services" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </Link>
            <Link 
              href="/admin/upload" 
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
            <Link 
              href="/admin/seed" 
              className="flex items-center space-x-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Seed DB</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link 
              href="/documents" 
              className="text-gray-700 hover:text-blue-600"
            >
              <Search className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link 
            href="/documents" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600"
          >
            Browse Documents
          </Link>
          <Link 
            href="/blogs" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600"
          >
            Blogs
          </Link>
          <Link 
            href="/services" 
            className="block px-3 py-2 text-gray-700 hover:text-blue-600"
          >
            Services
          </Link>
          <Link 
            href="/admin/upload" 
            className="block px-3 py-2 text-blue-600 font-medium"
          >
            Upload Document
          </Link>
        </div>
      </div>
    </nav>
  );
}