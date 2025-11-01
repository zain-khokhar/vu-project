import Link from 'next/link';
import { BookOpen, Github, Heart, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Liquid Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30"></div>
        
        {/* Liquid orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 via-cyan-300/5 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/10 via-pink-300/5 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-light bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">VUEDU</span>
            </Link>
            <p className="text-gray-700 mb-6 max-w-md font-light leading-relaxed">
              A free document library platform where students can access and share 
              educational materials including handouts, books, notes, and exams without 
              any barriers or premium features.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 font-light">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for students worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
            <h3 className="font-medium text-gray-900 mb-4 relative">Quick Links</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/documents" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Browse Documents</span>
                </Link>
              </li>
              <li>
                <Link href="/documents?type=book" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Books</span>
                </Link>
              </li>
              <li>
                <Link href="/documents?type=note" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Notes</span>
                </Link>
              </li>
              <li>
                <Link href="/documents?type=exam" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Exams</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
            <h3 className="font-medium text-gray-900 mb-4 relative">Resources</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/admin/upload" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Upload Document</span>
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link">
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:scale-150 transition-transform"></span>
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">Blog</span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-purple-600 transition-all duration-300 group/link"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover/link:scale-150 transition-transform"></span>
                  <Github className="h-4 w-4" />
                  <span className="font-light group-hover/link:translate-x-1 transition-transform">GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 font-light">
              © {new Date().getFullYear()} VUEDU. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/privacy-policy" 
                className="text-sm text-gray-600 hover:text-purple-600 font-light transition-all duration-300 hover:translate-y-[-2px]"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-600 hover:text-purple-600 font-light transition-all duration-300 hover:translate-y-[-2px]"
              >
                Terms of Service
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-purple-600 font-light transition-all duration-300 group"
              >
                <span>Contact</span>
                <Mail className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}