import Link from 'next/link';
import { BookOpen, Download, Search, Users, ArrowRight, FileText, HelpCircle, Mail } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import BlogCard from '@/components/BlogCard';
import QuizCard from '@/components/QuizCard';
import { getLatestDocuments } from '@/actions/documents';
import { getLatestBlogs } from '@/actions/blogs';
import { getLatestQuizzes } from '@/actions/quizzes';
import dynamic from 'next/dynamic';

const Features = dynamic(() => import('@/components/Features'));
const CTA = dynamic(() => import('@/components/CTA'));
import {
  generateDocumentMetadata,
  generateDocumentStructuredData,
  generateWebsiteStructuredData,
  generateFAQStructuredData,
} from '@/lib/seo-utils';
import Image from 'next/image';
import Script from 'next/script';

export const metadata = generateDocumentMetadata({
  title: "Vuedu - Free Educational Documents & Study Resources in Pakistan",
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
  const { documents } = await getLatestDocuments(6);
  const blogsResult = await getLatestBlogs(6);
  const { blogs } = blogsResult.success ? blogsResult : { blogs: [] };
  const quizzesResult = await getLatestQuizzes(6);
  const { quizzes } = quizzesResult.success ? quizzesResult : { quizzes: [] };

  // Ensure consistent URL for hydration
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vuedu.dev';

  // FAQ Structured Data
  const faqData = [
    {
      question: "What is Vuedu?",
      answer: "Vuedu is Pakistan's leading free educational platform where students and educators can access and share educational documents including books, notes, handouts, past papers, and study materials. We serve students from all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and across Pakistan.",
    },
    {
      question: "Is Vuedu available in Pakistan?",
      answer: "Yes! Vuedu is specifically designed for Pakistani students and educators. We offer resources for all major Pakistani universities including Virtual University (VU), AIOU, NUST, LUMS, UET, Punjab University, Karachi University, and many more.",
    },
    {
      question: "Is Vuedu really free?",
      answer: "Yes! Vuedu is completely free to use. You can browse, download, and share documents without any charges or hidden fees. We believe education should be accessible to all Pakistani students.",
    },
    {
      question: "What types of documents can I find?",
      answer: "You can find various types of educational materials including textbooks, lecture notes, handouts, past exam papers, assignments, study guides, and solved papers for Pakistani universities and colleges across different subjects and courses.",
    },
    {
      question: "Which Pakistani universities are covered?",
      answer: "Vuedu covers all major Pakistani universities including Virtual University (VU), AIOU, NUST, LUMS, UET, FAST, COMSATS, Punjab University, Karachi University, Peshawar University, Quaid-e-Azam University, and many more institutions across Pakistan.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      {/* JSON-LD Structured Data */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteStructuredData(),
            generateFAQStructuredData(faqData),
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Vuedu',
              description: 'Pakistan\'s leading free educational platform for sharing documents and study materials',
              url: siteUrl,
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
                email: 'team@vuedu.dev',
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
              name: 'Vuedu',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/documents?search={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
              inLanguage: ['en', 'ur'],
            },
          ]),
        }}
      />

      {/* Hero Section with Liquid Effects */}
      <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 !font-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Side - Premium Text Content */}
            <div className="space-y-6 relative z-10">
              {/* Premium Badge with Liquid Effect */}
              <div className="inline-block group">
                <div className="relative bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden">
                  <span className="relative text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">🇵🇰 #1 LEARNING PLATFORM</span>
                </div>
              </div>
              {/* Liquid Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl !font-light text-gray-900 leading-tight tracking-tight">
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
              <p className="leading-tight !font-light text-xl text-gray-700 leading-relaxed max-w-lg">
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

            {/* Right Side - Hero Image */}
            <div className="relative hidden lg:block h-[600px] w-full">
              <Image
                src="/bg1.webp"
                alt="Vuedu Hero Background"
                fill
                className="object-contain"
                priority
              />
            </div>


          </div>
        </div>
      </section>
      <Features />
      {/* Latest Documents - Glossy Liquid Design */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">PREMIUM CONTENT</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent  !font-light">Latest Documents</h2>
              <p className="text-lg text-gray-700 !font-light">Recently uploaded educational materials</p>
            </div>
            <Link
              href="/documents"
              className="hidden md:flex items-center space-x-2 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium rounded-2xl border border-white/70 hover:border-white/90 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <div key={document._id} className="group  border border-white/90 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-white/100 hover:bg-white/80 overflow-hidden">
                <div className="relative">
                  <DocumentCard document={document} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs - Glossy Liquid Design */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">COMMUNITY INSIGHTS</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl  !font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">Latest Blog Posts</h2>
              <p className="text-lg text-gray-700 !font-light">Insights and knowledge from our community</p>
            </div>
            <Link
              href="/blogs"
              className="hidden md:flex items-center space-x-2 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium rounded-2xl border border-white/70 hover:border-white/90 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className=" overflow-hidden">
                <div className="relative">
                  <BlogCard blog={blog} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Latest MCQs - Glossy Liquid Design */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-wide">TEST YOUR KNOWLEDGE</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl  !font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent">Latest MCQs</h2>
              <p className="text-lg text-gray-700 !font-light">Practice with our curated quiz collections</p>
            </div>
            <Link
              href="/quiz"
              className="hidden md:flex items-center space-x-2 px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/50 to-white/60 text-gray-900 font-medium rounded-2xl border border-white/70 hover:border-white/90 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:scale-105"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="overflow-hidden">
                <div className="relative">
                  <QuizCard quiz={quiz} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Can't Find Section */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-rose-50/80 via-white/70 to-pink-50/80 border border-white/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl text-center">
            <div className="flex flex-col items-center gap-4">
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-medium text-gray-900">
                  Can't find what you're looking for?
                </h3>
                <p className="text-gray-600 !font-light text-sm sm:text-base max-w-lg mx-auto">
                  Don't worry! If you can't find your required <span className="font-medium text-rose-600">books</span>, <span className="font-medium text-pink-600">handouts</span>, or <span className="font-medium text-purple-600">MCQs</span>, just let us know and we'll try to help you.
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="mailto:team@vuedu.dev?subject=Resource Request"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Email Us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 
             bg-white/60 border border-white/80 text-gray-700 
             font-medium text-sm rounded-xl shadow-lg 
             hover:bg-white/80 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Semantic HTML */}
      <section
        className="relative py-20 overflow-hidden"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="inline-block mb-4 group">
              <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span className="text-xs font-medium bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-wide">GOT QUESTIONS?</span>
              </div>
            </div>
            <h2
              id="faq-heading"
              className="text-4xl md:text-5xl  !font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-amber-800 to-orange-800 bg-clip-text text-transparent"
            >
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700 !font-light">Everything you need to know about Vuedu</p>
          </header>

          {/* FAQ Accordion */}
          <dl className="space-y-4" role="list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <details className="group" name="faq-accordion">
                  <summary
                    className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-2xl"
                  >
                    <dt className="text-lg font-medium text-gray-900 text-left">
                      {faq.question}
                    </dt>
                    <span
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-600 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </summary>
                  <div className="faq-content">
                    <dd className="faq-content-inner px-6 pb-6 text-gray-700 !font-light leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </dd>
                  </div>
                </details>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTA />

    </div>
  );
}
