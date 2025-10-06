import Link from 'next/link';
import { BookOpen, Download, Search, Users, ArrowRight, FileText } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import BlogCard from '@/components/BlogCard';
import { getLatestDocuments } from '@/actions/documents';
import { getLatestBlogs } from '@/actions/blogs';

export default async function Home() {
  const { documents } = await getLatestDocuments(6);
  const blogsResult = await getLatestBlogs(3);
  const { blogs } = blogsResult.success ? blogsResult : { blogs: [] };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 md:py-20 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Free Academic
                  <span className="text-blue-600 block mt-2">Document Library</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
                  Access thousands of educational documents including handouts, books, notes, 
                  and exams. No login required, no premium features, just free knowledge for everyone.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/documents" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Browse Documents</span>
                </Link>
                <Link 
                  href="/admin/upload" 
                  className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Upload Document</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 font-medium">100% Free Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 font-medium">Instant Downloads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 font-medium">No Registration</span>
                </div>
              </div>
            </div>

            {/* Right Side - Image Blocks */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
              {/* Card 1 - Top */}
              <div className="absolute top-0 right-0 w-[85%] md:w-[75%] h-[28%] bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
                <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex flex-col justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Documents</h3>
                      <p className="text-sm text-gray-600">Handouts & Books</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">1000+ Files</span>
                  </div>
                </div>
              </div>

              {/* Card 2 - Middle */}
              <div className="absolute top-[36%] left-0 w-[85%] md:w-[75%] h-[28%] bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
                <div className="h-full bg-gradient-to-br from-green-100 to-green-200 p-6 flex flex-col justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Blog Posts</h3>
                      <p className="text-sm text-gray-600">Insights & Tutorials</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">500+</span>
                    <ArrowRight className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Card 3 - Bottom */}
              <div className="absolute bottom-0 right-0 w-[85%] md:w-[75%] h-[28%] bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
                <div className="h-full bg-gradient-to-br from-purple-100 to-purple-200 p-6 flex flex-col justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Community</h3>
                      <p className="text-sm text-gray-600">Students Worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="h-5 w-5 text-purple-600" />
                    <span className="text-sm text-gray-600 font-medium">Free Downloads</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Access</h3>
              <p className="text-gray-600">
                No registration, no payments, no barriers. Just free educational resources.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Instant Downloads</h3>
              <p className="text-gray-600">
                Download documents instantly without any waiting or premium requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">
                Built by students, for students. Share knowledge and help others succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Documents */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Documents</h2>
              <p className="text-gray-600">Recently uploaded educational materials</p>
            </div>
            <Link 
              href="/documents"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {documents && documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((document) => (
                <DocumentCard key={document._id} document={document} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
              <p className="text-gray-600 mb-4">Be the first to upload a document to our library!</p>
              <Link 
                href="/admin/upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload Document
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Blog Posts</h2>
              <p className="text-gray-600">Insights and knowledge from our community</p>
            </div>
            <Link 
              href="/blogs"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your knowledge with the community!</p>
              <Link 
                href="/blog/write"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Write Blog Post
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to explore our document library?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already benefiting from our free educational resources.
          </p>
          <Link 
            href="/documents"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Start Browsing</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
