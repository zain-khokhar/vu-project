import { notFound } from 'next/navigation';
import QuizSetup from '@/components/QuizSetup';
import ExpandableDescription from '@/components/ExpandableDescription';
import { getQuizBySlug } from '@/actions/quizzes';
import {
  generateQuizMetadata,
  generateAllQuizStructuredData
} from '@/utils/quiz-seo';
import { ArrowLeft, Calendar, Tag } from "lucide-react";
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
      .select('title description slug category color totalQuestions createdAt updatedAt')
      .lean();

    if (!quiz) {
      return {
        title: 'Quiz Not Found - Vuedu',
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
      title: 'Quiz - Vuedu',
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-8">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="main-content" role="main">
          {/* Back Navigation */}
          <nav aria-label="Quiz navigation" className="mb-6">
            <Link
              href="/quiz"
              prefetch={false}
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-3 py-2"
              aria-label="Return to quiz listing page"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" aria-hidden="true" />
              <span className="text-sm font-medium">
                Back to Quizzes
              </span>
            </Link>
          </nav>

          {/* Quiz Header Card */}
          <article className="bg-white/80 border border-gray-200 rounded-3xl shadow-sm overflow-hidden mb-8" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
            {/* Header Section with Gradient */}
            <header className={`relative bg-gradient-to-br ${quizData.color || 'from-indigo-500 via-purple-600 to-blue-600'} p-8 text-white`} role="banner">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

              <div className="relative">
                {/* Icon and Title Section */}
                <section aria-labelledby="quiz-title" className="mb-6">
                  {/* Title */}
                  <h1 id="quiz-title" className="text-xl md:text-4xl font-semibold mb-2" itemProp="name">
                    {quizData.title}
                  </h1>

                  {/* Question Count */}
                  <p className="text-white/90 text-sm font-medium" aria-label={`${quizData.totalQuestions} questions available in this quiz`}>
                    {quizData.totalQuestions} {quizData.totalQuestions === 1 ? 'Question' : 'Questions'} Available
                  </p>
                </section>

                {/* Quiz Metadata Badges */}
                <section aria-label="Quiz metadata" className="flex flex-wrap gap-2">
                  {quizData.category && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-xs font-medium" role="group" aria-label={`Category: ${quizData.category}`}>
                      <Tag className="h-3 w-3" aria-hidden="true" />
                      <span itemProp="educationalLevel">{quizData.category}</span>
                    </div>
                  )}
                  {quizData.createdAt && (
                    <time
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-xs font-medium"
                      dateTime={quizData.createdAt}
                      aria-label={`Quiz created on ${new Date(quizData.createdAt).toLocaleDateString()}`}
                      itemProp="dateCreated"
                    >
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <span>{new Date(quizData.createdAt).toLocaleDateString()}</span>
                    </time>
                  )}
                </section>
              </div>
            </header>

            {/* Description Section */}
            {quizData.description && (
              <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                <ExpandableDescription description={quizData.description} />
              </div>
            )}
          </article>

          {/* Quiz Setup Section */}
          <section aria-labelledby="quiz-setup-heading">
            <h2 id="quiz-setup-heading" className="sr-only">Quiz Setup</h2>
            <QuizSetup quizData={quizData} />
          </section>
        </main>
      </div>
    </>
  );
}
