import Link from 'next/link';
import { BookOpen, Download, Search, Users, ArrowRight, FileText } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import BlogCard from '@/components/BlogCard';
import { getLatestDocuments } from '@/actions/documents';
import { getLatestBlogs } from '@/actions/blogs';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import {
  generateDocumentMetadata,
  generateDocumentStructuredData,
  generateWebsiteStructuredData,
  generateFAQStructuredData,
} from '@/lib/seo-utils';

export const metadata = generateDocumentMetadata({
  title: "VUEDU - Free Educational Documents & Study Resources in Pakistan",
  description: "Pakistan's leading educational platform. Access thousands of free educational documents, books, notes, handouts, past papers, and study materials for Pakistani universities and colleges. Join students from Karachi, Lahore, Islamabad, and across Pakistan.",
  keywords: [
    "educational documents pakistan",
    "free study materials pakistan",
    "pakistani university notes",
    "past papers pakistan",
    "handouts pakistan",
    "student resources pakistan",
    "karachi university documents",
    "lahore university notes",
    "islamabad study materials",
    "pakistani colleges resources",
    "urdu study materials",
    "vu virtual university",
    "aiou study materials",
    "nust resources",
    "lums study guides",
    "pakistan educational platform",
    "online learning pakistan",
    "books pakistan",
    "study guides pakistan",
  ],
  url: "/",
  type: "website",
});

export default async function Home() {
  const { documents } = await getLatestDocuments(3);
  const blogsResult = await getLatestBlogs(3);
  const { blogs } = blogsResult.success ? blogsResult : { blogs: [] };

  // FAQ Structured Data
  const faqData = [
    {
      question: "What is VUEDU?",
      answer: "VUEDU is Pakistan's leading free educational platform where students and educators can access and share educational documents including books, notes, handouts, past papers, and study materials. We serve students from all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and across Pakistan.",
    },
    {
      question: "Is VUEDU available in Pakistan?",
      answer: "Yes! VUEDU is specifically designed for Pakistani students and educators. We offer resources for all major Pakistani universities including Virtual University (VU), AIOU, NUST, LUMS, UET, Punjab University, Karachi University, and many more.",
    },
    {
      question: "Is VUEDU really free?",
      answer: "Yes! VUEDU is completely free to use. You can browse, download, and share documents without any charges or hidden fees. We believe education should be accessible to all Pakistani students.",
    },
    {
      question: "What types of documents can I find?",
      answer: "You can find various types of educational materials including textbooks, lecture notes, handouts, past exam papers, assignments, study guides, and solved papers for Pakistani universities and colleges across different subjects and courses.",
    },
    {
      question: "Can I upload my own documents?",
      answer: "Yes, you can contribute to the community by uploading your own educational documents and study materials to help other Pakistani students.",
    },
    {
      question: "Which Pakistani universities are covered?",
      answer: "VUEDU covers all major Pakistani universities including Virtual University (VU), AIOU, NUST, LUMS, UET, FAST, COMSATS, Punjab University, Karachi University, Peshawar University, Quaid-e-Azam University, and many more institutions across Pakistan.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteStructuredData(),
            generateFAQStructuredData(faqData),
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'VUEDU',
              description: 'Pakistan\'s leading free educational platform for sharing documents and study materials',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev',
              areaServed: {
                '@type': 'Country',
                name: 'Pakistan',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PK',
                addressRegion: 'Punjab',
              },
              availableLanguage: ['English', 'Urdu'],
              sameAs: [
                'https://twitter.com/vuedu',
                'https://facebook.com/vuedu',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'support@vuedu.dev',
                areaServed: 'PK',
                availableLanguage: ['English', 'Urdu'],
              },
              serviceArea: {
                '@type': 'AdministrativeArea',
                name: 'Pakistan',
              },
              audience: {
                '@type': 'EducationalAudience',
                educationalRole: 'student',
                geographicArea: {
                  '@type': 'Country',
                  name: 'Pakistan',
                },
              },
              keywords: 'educational documents pakistan, study materials, university notes, past papers, virtual university, AIOU, NUST, Pakistani students',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'VUEDU',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev'}/documents?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
              inLanguage: ['en', 'ur'],
            },
          ]),
        }}
      />
      <div className="absolute inset-0 gradient-mesh pointer-events-none"></div>

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
                  <span className="relative text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">🇵🇰 #1 LEARNING PLATFORM</span>
                </div>
              </div>

              {/* Liquid Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Your Gateway to
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent  ">
                    Academic Excellence
                  </span>
                </h1>
                <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full  "></div>
              </div>

              {/* Premium Subheading */}
              <p className="leading-tight font-light text-xl text-gray-700 leading-relaxed max-w-lg">
                Access free notes, past papers, books, and handouts from top Pakistani universities. Join 100,000+ students nationwide.              </p>

              {/* Liquid CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">


                <Link
                  href="/documents"
                  className="group relative px-4 py-2 shadow-lg backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium text-sm rounded-xl border border-white/70 hover:border-white/90 overflow-hidden transition-all duration-500 hover:shadow-white/20 hover:scale-105 active:scale-95"
                >

                  <div className="relative flex items-center justify-center space-x-2">
                    <BookOpen className="h-4 w-4 text-purple-600 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300" />
                    <span>Explore Documents</span>
                  </div>
                </Link>
              </div>

              {/* Premium Stats with Liquid Effects */}
              <div className="flex flex-wrap gap-3 pt-6">
                <div className="group backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/80 rounded-2xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/70">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full   shadow-lg"></div>
                    <span className="text-sm font-normal text-gray-900 tracking-wide">100% FREE</span>
                  </div>
                </div>
                <div className="group backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/80 rounded-2xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/70">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full   shadow-lg"></div>
                    <span className="text-sm font-normal text-gray-900 tracking-wide">10,000+ RESOURCES</span>
                  </div>
                </div>
                <div className="group backdrop-blur-2xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 border border-white/80 rounded-2xl px-4 py-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/70">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full   shadow-lg"></div>
                    <span className="text-sm font-normal text-gray-900 tracking-wide">ALL UNIVERSITIES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Modern Liquid Showcase Cards */}
            <div className="relative h-[500px] hidden lg:block">
              {/* Card 1 - Modern Liquid Document Card - Top Left */}
              <div className="absolute top-0 left-0 w-[48%] h-[45%] group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-cyan-400/25 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125"></div>
                <div className="relative h-full backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:border-white/100 group-hover:shadow-blue-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-cyan-50/30 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>

                  <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-br from-blue-500/60 via-blue-600/50 to-blue-700/60 backdrop-blur-xl rounded-xl border border-white/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl flex-shrink-0">
                          <BookOpen className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-normal text-gray-900 text-sm">VU Notes & Books</h3>
                          <p className="text-xs text-gray-700 truncate font-light">Virtual University</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400/60 via-blue-500/50 to-blue-600/60 backdrop-blur-xl rounded-xl flex items-center justify-center text-xs font-medium text-white border border-white/60 flex-shrink-0 shadow-xl">1K+</div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs text-gray-700 font-light">
                        <span>Verified Content</span>
                        <span className="text-blue-600 font-medium text-sm">98%</span>
                      </div>
                      <div className="w-full h-1 bg-gradient-to-r from-white/40 to-white/60 rounded-full overflow-hidden border border-white/50 shadow-inner">
                        <div className="h-full w-[98%] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg  "></div>
                      </div>
                      <div className="flex items-center space-x-1 pt-1">
                        <div className="flex -space-x-1.5">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white/80 shadow-lg  "></div>
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white/80 shadow-lg  " style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 border-2 border-white/80 shadow-lg  " style={{ animationDelay: '1s' }}></div>
                        </div>
                        <span className="text-xs text-gray-700 font-light">+15.2K Students</span>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>

                  <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <div className="p-2 bg-gradient-to-br from-emerald-500/60 via-green-600/50 to-green-700/60 backdrop-blur-xl rounded-xl border border-white/60 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-2xl flex-shrink-0">
                          <Download className="h-4 w-4 text-white drop-shadow-lg" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-normal text-gray-900 text-sm">Past Papers</h3>
                          <p className="text-xs text-gray-700 truncate font-light">This Month</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-lg font-medium text-emerald-600 drop-shadow-lg">12.5K</span>
                        <span className="text-xs text-emerald-600 font-light flex items-center gap-0.5">
                          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full  "></span>
                          +58%
                        </span>
                      </div>
                    </div>

                    {/* Liquid Chart */}
                    <div className="flex items-end justify-between gap-0.5 h-6">
                      <div className="flex-1 h-2 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-70 shadow-lg  "></div>
                      <div className="flex-1 h-4 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-85 shadow-lg  " style={{ animationDelay: '0.2s' }}></div>
                      <div className="flex-1 h-3 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-75 shadow-lg  " style={{ animationDelay: '0.4s' }}></div>
                      <div className="flex-1 h-6 bg-gradient-to-t from-emerald-500 via-emerald-400 to-emerald-300 rounded-full shadow-xl  " style={{ animationDelay: '0.6s' }}></div>
                      <div className="flex-1 h-3.5 bg-gradient-to-t from-emerald-400 via-emerald-300 to-emerald-200 rounded-full opacity-80 shadow-lg  " style={{ animationDelay: '0.8s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Modern Liquid Community Card - Bottom Center */}
              <div className="absolute bottom-0 left-1/2 w-[60%] h-[45%] group transform -translate-x-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-pink-400/25 to-transparent rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-125"></div>
                <div className="relative h-full backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 hover:scale-105 hover:border-white/100 group-hover:shadow-purple-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-pink-50/30 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>

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
                          <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full  "></span> Live
                        </span>
                      </div>
                    </div>

                    {/* Liquid Member Stack */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 border-2 border-white/90 shadow-xl  "></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 border-2 border-white/90 shadow-xl  " style={{ animationDelay: '0.3s' }}></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-2 border-white/90 shadow-xl  " style={{ animationDelay: '0.6s' }}></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border-2 border-white/90 shadow-xl  " style={{ animationDelay: '0.9s' }}></div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 border-2 border-white/90 shadow-xl flex items-center justify-center text-xs font-medium text-white  " style={{ animationDelay: '1.2s' }}>+</div>
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
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full blur-3xl  "></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-3xl  " style={{ animationDelay: '2s' }}></div>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-500"></div>
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
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/15 via-pink-300/10 to-transparent rounded-full blur-3xl  "></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-400/15 via-blue-300/10 to-transparent rounded-full blur-3xl  " style={{ animationDelay: '2s' }}></div>
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
