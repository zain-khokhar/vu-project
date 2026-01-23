import { BookOpen } from 'lucide-react';
import Pagination from '@/components/Pagination';
import SearchFilters from '@/components/SearchFilters';
import { getQuizzes, getQuizFilterOptions } from '@/actions/quizzes';
import QuizCard from '@/components/QuizCard';
import QuizFAQ from '@/components/QuizFAQ';
import QuizCTA from '@/components/QuizCTA';
import { generateFAQSchema, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/quizSchemas';

export const metadata = {
    title: 'Online Quiz System - Test Your Knowledge | Vuedu',
    description: 'Access interactive online quizzes across multiple categories. Test your knowledge with timed questions, instant feedback, and detailed explanations. Best place for Virtual University of Pakistan Students to prepare for their exams. Start learning today!',
    keywords: 'online quiz, interactive quiz, test knowledge, quiz system, educational quizzes, practice tests, free quizzes, custom quiz',
    authors: [{ name: 'Vuedu' }],
    openGraph: {
        title: 'Online Quiz System - Test Your Knowledge | Vuedu',
        description: 'Access interactive online quizzes with instant feedback and detailed explanations. Completely free!',
        type: 'website',
        url: 'https://vuedu.dev/quiz',
        siteName: 'Vuedu',
        images: [
            {
                url: 'https://vuedu.dev/og-quiz.jpg',
                width: 1200,
                height: 630,
                alt: 'Vuedu Online Quiz System',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Online Quiz System | Vuedu',
        description: 'Test your knowledge with interactive quizzes - completely free!',
        images: ['https://vuedu.dev/og-quiz.jpg'],
    },
    alternates: {
        canonical: 'https://vuedu.dev/quiz',
    },
};

export default async function QuizPageNumber({ params, searchParams }) {
    const { pageNumber } = await params;
    const page = parseInt(pageNumber) || 1;

    const urlParams = await searchParams;
    const search = urlParams?.search || '';
    const category = urlParams?.category || '';

    const [quizzesResult, filterOptionsResult] = await Promise.all([
        getQuizzes({ page, limit: 12, search, category }),
        getQuizFilterOptions()
    ]);

    const { quizzes, pagination } = quizzesResult.success
        ? quizzesResult
        : { quizzes: [], pagination: null };

    const { categories } = filterOptionsResult.success
        ? filterOptionsResult
        : { categories: [] };

    // Build base URL with filters for pagination
    const buildBaseUrl = () => {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (category) params.set('category', category);

        const queryString = params.toString();
        return queryString ? `/quiz?${queryString}` : '/quiz';
    };

    // Generate JSON-LD schemas
    const faqSchema = generateFAQSchema();
    const breadcrumbSchema = generateBreadcrumbSchema();
    const webPageSchema = generateWebPageSchema();

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />

            <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative" role="main">
                <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    {/* Hero Section - Only on page 1 without filters */}
                    {page === 1 && !search && !category && (
                        <header className="mb-16" aria-labelledby="page-title">
                            {/* Premium Badge */}
                            <div className="mb-6">
                                <span className="relative bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl overflow-hidden inline-block" aria-label="Interactive Learning Platform">
                                    <span className="relative sm:text-sm text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">INTERACTIVE LEARNING</span>
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 id="page-title" className="text-5xl md:text-6xl lg:text-7xl !font-light text-gray-900 leading-tight tracking-tight mb-6 lg:mb-4">
                                <span className="block bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                                    Online Quiz
                                </span>
                                <span className="block xl:inline bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    System
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light leading-relaxed lg:-mt-16">
                                Test your knowledge with our interactive quizzes. Choose a category and challenge yourself with engaging questions!
                            </p>
                        </header>
                    )}

                    {/* Search and Filters */}
                    <search className="mb-12" role="search" aria-label="Search and filter quizzes">
                        <SearchFilters
                            filterOptions={{
                                categories: categories
                            }}
                            baseUrl="/quiz"
                            searchPlaceholder="Search quizzes by title or course code..."
                            searchLabel="Search quizzes by title or course code"
                            searchHelpText="💡 Tip: Search by quiz title or course code (e.g., CS101, MTH202). Use the category filter to narrow down results."
                            showTypeFilter={false}
                            showSubjectFilter={false}
                            showUniversityFilter={false}
                            showYearFilter={false}
                            showCategoryFilter={true}
                            categoryLabel="Category"
                        />
                    </search>

                    {/* Add spacing for fixed search bar */}
                    <div className="h-48"></div>

                    {/* Quiz Cards */}
                    {quizzes.length > 0 ? (
                        <section aria-labelledby="quizzes-heading">
                            {/* Header with Liquid Badge */}
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <div className="inline-block mb-4 group">
                                        <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                            <span className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                                                {page === 1 ? 'AVAILABLE QUIZZES' : `PAGE ${page}`}
                                            </span>
                                        </div>
                                    </div>
                                    <h2 id="quizzes-heading" className="text-4xl md:text-5xl !font-light text-gray-900 mb-2 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                                        {search ? `Search Results for "${search}"` : page === 1 ? 'Available Quizzes' : `Quizzes - Page ${page}`}
                                    </h2>
                                    <p className="text-lg text-gray-700 !font-light">
                                        {page === 1
                                            ? (pagination?.totalCount ? `${pagination.totalCount} quizzes found` : 'Choose a subject to test your knowledge')
                                            : `Showing page ${page} of ${pagination.totalPages}`
                                        }
                                    </p>
                                </div>
                            </div>

                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 list-none p-0" role="list" aria-label="Quiz list">
                                {quizzes.map((quiz) => (
                                    <li key={quiz.id}>
                                        <QuizCard quiz={quiz} />
                                    </li>
                                ))}
                            </ul>

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <nav className="mt-8" aria-label="Quiz pagination">
                                    <Pagination
                                        pagination={pagination}
                                        baseUrl={buildBaseUrl()}
                                    />
                                </nav>
                            )}
                        </section>
                    ) : (
                        <section className="bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-12 shadow-2xl text-center max-w-md mx-auto mb-16" aria-labelledby="no-quizzes-heading" role="status">
                            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" aria-hidden="true" />
                            <h2 id="no-quizzes-heading" className="text-2xl font-light text-gray-900 mb-2">
                                No Quizzes Available
                            </h2>
                            <p className="text-gray-700 font-light">
                                {search || category ? 'Try adjusting your search criteria or filters' : 'Please add quiz JSON files to the /data folder.'}
                            </p>
                        </section>
                    )}

                    {/* CTA Section - Only on page 1 */}
                    {page === 1 && <QuizCTA />}

                    {/* FAQ Section - Only on page 1 */}
                    {page === 1 && <QuizFAQ />}
                </div>
            </main>
        </>
    );
}

// Generate static params for all quiz pages
export async function generateStaticParams() {
    const result = await getQuizzes({ page: 1, limit: 12 });

    if (!result.success || !result.pagination) {
        return [{ pageNumber: '1' }];
    }

    const { totalPages } = result.pagination;

    // Generate params for all pages
    return Array.from({ length: totalPages }, (_, i) => ({
        pageNumber: String(i + 1)
    }));
}

export const dynamic = 'force-static';
export const revalidate = false;
