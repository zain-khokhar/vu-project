import { notFound } from 'next/navigation';
import QuizSetup from '@/components/QuizSetup';
import { getQuizBySlug } from '@/actions/quizzes';
import {
  generateQuizMetadata,
  generateAllQuizStructuredData
} from '@/utils/quiz-seo';
import { User, Clock, Hash, Play, ArrowLeft, CheckCircle2, AlertCircle, Loader2, Brain, Sparkles, Target, Zap, Calendar, Tag, Info } from "lucide-react";
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

// Generate static params for all active quizzes
export async function generateStaticParams() {
  try {
    await connectDB();
    const quizzes = await Quiz.find({ isActive: true })
      .select('slug')
      .lean();

    return quizzes.map((quiz) => ({
      category: quiz.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate comprehensive metadata
export async function generateMetadata({ params }) {
  const { category } = await params;

  try {
    await connectDB();
    const quiz = await Quiz.findOne({ slug: category, isActive: true })
      .select('title description slug category icon color totalQuestions createdAt updatedAt')
      .lean();

    if (!quiz) {
      return {
        title: 'Quiz Not Found - VUEDU',
        description: 'The requested quiz could not be found',
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return generateQuizMetadata(quiz);
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Quiz - VUEDU',
      description: 'Test your knowledge with our interactive quiz',
    };
  }
}

export default async function QuizCategoryPage({ params }) {
  const { category } = await params;
  const result = await getQuizBySlug(category);

  if (!result.success) {
    notFound();
  }

  const quizData = result.quiz;

  // Generate structured data for SEO
  const structuredData = generateAllQuizStructuredData(quizData);

  return (
    <>
      {/* JSON-LD Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="main-content" role="main">
        <article className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true"></div>

          {/* Header Section */}
          <header className="relative bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 p-8 text-white overflow-hidden" role="banner">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

            {/* Navigation */}
            <nav aria-label="Quiz navigation" className="flex justify-between items-start mb-6">
              <Link
                href="/quiz"
                prefetch={false}
                className="group flex items-center space-x-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-4 py-2 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600"
                aria-label="Return to quiz listing page"
              >
                <ArrowLeft className="h-4 w-4 text-white group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
                <span className="text-sm font-medium text-white">
                  Back to Quizzes
                </span>
              </Link>
            </nav>

            <div className="relative">
              {/* Quiz Title and Icon Section */}
              <section aria-labelledby="quiz-title" className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl group-hover:scale-110 transition-transform duration-500" role="img" aria-label={`Quiz icon: ${quizData.icon || 'book'}`}>
                  <span className="text-4xl" aria-hidden="true">{quizData.icon || '📚'}</span>
                </div>
                <div className="flex-1">
                  <h1 id="quiz-title" className="text-3xl md:text-4xl font-light mb-1" itemProp="name">
                    {quizData.title}
                  </h1>
                  <p className="text-indigo-100 font-light" aria-label={`${quizData.totalQuestions} questions available in this quiz`}>
                    {quizData.totalQuestions} questions available
                  </p>
                </div>
              </section>

              {/* Quiz Description */}
              {quizData.description && (
                <section aria-labelledby="quiz-description" className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <h2 id="quiz-description" className="sr-only">Quiz Description</h2>
                  <p className="text-white/90 text-sm leading-relaxed" itemProp="description">
                    {quizData.description}
                  </p>
                </section>
              )}

              {/* Quiz Metadata */}
              <section aria-label="Quiz metadata" className="mt-4 flex flex-wrap gap-3 text-xs">
                {quizData.category && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20" role="group" aria-label={`Category: ${quizData.category}`}>
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    <span itemProp="educationalLevel">{quizData.category}</span>
                  </div>
                )}
                {quizData.createdAt && (
                  <time
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    dateTime={quizData.createdAt}
                    aria-label={`Quiz created on ${new Date(quizData.createdAt).toLocaleDateString()}`}
                    itemProp="dateCreated"
                  >
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>Created: {new Date(quizData.createdAt).toLocaleDateString()}</span>
                  </time>
                )}
                {quizData.updatedAt && quizData.updatedAt !== quizData.createdAt && (
                  <time
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    dateTime={quizData.updatedAt}
                    aria-label={`Quiz last updated on ${new Date(quizData.updatedAt).toLocaleDateString()}`}
                    itemProp="dateModified"
                  >
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>Updated: {new Date(quizData.updatedAt).toLocaleDateString()}</span>
                  </time>
                )}
              </section>
            </div>
          </header>
        </article>
      </main>

      {/* Quiz Setup Section */}
      <section aria-labelledby="quiz-setup-heading" className="mt-8">
        <h2 id="quiz-setup-heading" className="sr-only">Quiz Setup</h2>
        <QuizSetup quizData={quizData} />
      </section>
    </>
  );
}
