import Link from 'next/link';
import { BookOpen, Download, Search, Users, ArrowRight, FileText } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import BlogCard from '@/components/BlogCard';
import { getLatestDocuments } from '@/actions/documents';
import { getLatestBlogs } from '@/actions/blogs';
import Features from '@/components/Features';
import CTA from '@/components/CTA';

export default async function Home() {
  const { documents } = await getLatestDocuments(6);
  const blogsResult = await getLatestBlogs(3);
  const { blogs } = blogsResult.success ? blogsResult : { blogs: [] };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      {/* Premium Liquid Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-40"></div>

        {/* Liquid orbs with enhanced blur */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-300/8 via-blue-300/8 to-purple-300/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>

        {/* Liquid flow effects */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-tl from-purple-300/20 to-transparent rounded-full blur-2xl animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
        {/* Liquid droplets */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-sm animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-2.5 h-2.5 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full blur-sm animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-blue-200/30 rounded-full backdrop-blur-sm animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-12 h-12 border border-purple-200/30 rounded-lg backdrop-blur-sm animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
      </div>

      {/* Hero Section with Liquid Effects */}
      <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Side - Premium Text Content */}
            <div className="space-y-6 relative z-10">
              {/* Premium Badge with Liquid Effect */}
              <div className="inline-block group">
                <div className="relative backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                  <span className="relative text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide"> PREMIUM LEARNING EXPERIENCE</span>
                </div>
              </div>

              {/* Liquid Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Liquid
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-pulse">
                    Knowledge
                  </span>
                </h1>
                <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>

              {/* Premium Subheading */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg font-normal">
                Experience the future of learning with our premium liquid interface. Seamlessly access world-class educational content with macOS-inspired elegance and fluid interactions.
              </p>

              {/* Liquid CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/documents"
                  className="group relative px-4 py-2 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 text-white font-medium text-sm rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover:skew-x-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <Search className="h-4 w-4 text-blue-200 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <span>Explore Documents</span>
                    <ArrowRight className="h-3 w-3 text-blue-200 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>

                <Link
                  href="/admin/upload"
                  className="group relative px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium text-sm rounded-xl border border-white/70 hover:border-white/90 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-white/20 hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/8 via-purple-400/8 to-pink-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <BookOpen className="h-4 w-4 text-purple-600 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                    <span>Share Knowledge</span>
                  </div>
                </Link>
              </div>

              {/* Premium Stats with Liquid Effects */}
              <div className="flex flex-wrap gap-3 pt-6">
                <div className="group backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/80 rounded-2xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/70">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-sm font-normal text-gray-900 tracking-wide">100% FREE</span>
                  </div>
                </div>
                <div className="group backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/80 rounded-2xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/70">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-sm font-normal text-gray-900 tracking-wide">INSTANT ACCESS</span>
                  </div>
                </div>
                <div className="group backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/80 rounded-2xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/70">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-sm font-normal text-gray-900 tracking-wide">NO REGISTRATION</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Modern Liquid Showcase Cards */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Enhanced Floating Liquid Orbs */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 right-12 w-24 h-24 bg-gradient-to-br from-blue-400/25 via-cyan-300/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-16 left-8 w-20 h-20 bg-gradient-to-tl from-purple-400/25 via-pink-300/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-indigo-400/20 via-blue-300/15 to-transparent rounded-full blur-2xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '3s' }}></div>
              </div>

              {/* Card 1 - Modern Liquid Document Card - Top Left */}
              <div className="absolute top-0 left-0 w-[48%] h-[45%] group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-cyan-400/25 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125"></div>
                <div className="relative h-full backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:border-white/100 group-hover:shadow-blue-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-cyan-50/30 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>

                  <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-br from-blue-500/60 via-blue-600/50 to-blue-700/60 backdrop-blur-xl rounded-xl border border-white/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl flex-shrink-0">
                          <BookOpen className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-normal text-gray-900 text-sm">Premium Documents</h3>
                          <p className="text-xs text-gray-700 truncate font-light">Expert Curated</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400/60 via-blue-500/50 to-blue-600/60 backdrop-blur-xl rounded-xl flex items-center justify-center text-xs font-medium text-white border border-white/60 flex-shrink-0 shadow-xl">1K+</div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs text-gray-700 font-light">
                        <span>Quality Score</span>
                        <span className="text-blue-600 font-medium text-sm">98%</span>
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-white/40 to-white/60 rounded-full overflow-hidden border border-white/50 shadow-inner">
                        <div className="h-full w-[98%] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg animate-pulse"></div>
                      </div>
                      <div className="flex items-center space-x-1 pt-1">
                        <div className="flex -space-x-1.5">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white/80 shadow-lg animate-pulse"></div>
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white/80 shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 border-2 border-white/80 shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <span className="text-xs text-gray-700 font-light">+5.2K Downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Modern Liquid Analytics Card - Top Right */}
              <div className="absolute top-0 right-0 w-[48%] h-[45%] group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/30 via-green-400/25 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125"></div>
                <div className="relative h-full backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:border-white/100 group-hover:shadow-green-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-green-50/30 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>

                  <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-br from-emerald-500/60 via-green-600/50 to-green-700/60 backdrop-blur-xl rounded-xl border border-white/60 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-2xl flex-shrink-0">
                          <Download className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-normal text-gray-900 text-sm">Lightning Fast</h3>
                          <p className="text-xs text-gray-700 truncate font-light">This Month</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-lg font-medium text-emerald-600 drop-shadow-lg">8.7K</span>
                        <span className="text-xs text-emerald-600 font-light flex items-center gap-0.5">
                          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                          +42%
                        </span>
                      </div>
                    </div>

                    {/* Liquid Chart */}
                    <div className="flex items-end justify-between gap-0.5 h-6">
                      <div className="flex-1 h-2 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-70 shadow-lg animate-pulse"></div>
                      <div className="flex-1 h-4 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-85 shadow-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="flex-1 h-3 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-75 shadow-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <div className="flex-1 h-6 bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300 rounded-full shadow-xl animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      <div className="flex-1 h-3.5 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-80 shadow-lg animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Modern Liquid Community Card - Bottom Center */}
              <div className="absolute bottom-0 left-1/2 w-[60%] h-[45%] group transform -translate-x-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-pink-400/25 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125"></div>
                <div className="relative h-full backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:border-white/100 group-hover:shadow-purple-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-pink-50/30 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>

                  <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-br from-purple-500/60 via-purple-600/50 to-purple-700/60 backdrop-blur-xl rounded-xl border border-white/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl flex-shrink-0">
                          <Users className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-normal text-gray-900 text-sm">Global Community</h3>
                          <p className="text-xs text-gray-700 truncate font-light">Active Learners</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xl font-medium text-purple-600 drop-shadow-lg">25M</div>
                        <span className="text-xs text-purple-600 font-light flex items-center gap-0.5">
                          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Live
                        </span>
                      </div>
                    </div>

                    {/* Liquid Member Stack */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 border-2 border-white/90 shadow-xl animate-pulse"></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 border-2 border-white/90 shadow-xl animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-2 border-white/90 shadow-xl animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-2 border-white/90 shadow-xl animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 border-2 border-white/90 shadow-xl flex items-center justify-center text-xs font-medium text-white animate-pulse" style={{ animationDelay: '1.2s' }}>+</div>
                      </div>
                      <span className="text-xs font-light text-gray-700">Growing exponentially</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Features />
      {/* Latest Documents - Glossy Liquid Design */}
      <section className="relative py-20 overflow-hidden">
        {/* Liquid Background Orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">PREMIUM CONTENT</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">Latest Documents</h2>
              <p className="text-lg text-gray-700 font-light">Recently uploaded educational materials</p>
            </div>
            <Link
              href="/documents"
              className="hidden md:flex items-center space-x-2 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium rounded-2xl border border-white/70 hover:border-white/90 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {documents && documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((document) => (
                <div key={document._id} className="group backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-white/100 hover:bg-white/80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white/20 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
                  <div className="relative">
                    <DocumentCard document={document} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-12 shadow-2xl text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-2">No documents yet</h3>
              <p className="text-gray-700 mb-6 font-light">Be the first to upload a document to our library!</p>
              <Link
                href="/admin/upload"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/80 via-blue-600/70 to-purple-600/80 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="h-4 w-4" />
                <span>Upload Document</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Latest Blogs - Glossy Liquid Design */}
      <section className="relative py-20 overflow-hidden">
        {/* Liquid Background Orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-400/15 via-blue-300/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">COMMUNITY INSIGHTS</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">Latest Blog Posts</h2>
              <p className="text-lg text-gray-700 font-light">Insights and knowledge from our community</p>
            </div>
            <Link
              href="/blogs"
              className="hidden md:flex items-center space-x-2 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium rounded-2xl border border-white/70 hover:border-white/90 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {blogs && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog._id} className=" overflow-hidden">
                  <div className="relative">
                    <BlogCard blog={blog} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-12 shadow-2xl text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-light text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-700 mb-6 font-light">Be the first to share your knowledge with the community!</p>
              <Link
                href="/blog/write"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/80 via-purple-600/70 to-pink-600/80 text-white font-medium rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                <FileText className="h-4 w-4" />
                <span>Write Blog Post</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTA />

    </div>
  );
}
