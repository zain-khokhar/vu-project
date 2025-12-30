import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function QuizCard({ quiz }) {

    // JS Function to extract the 'from-' color
    const extractColor = (gradientString) => {
        const FALLBACK_COLOR = "orange-400";

        if (!gradientString) return FALLBACK_COLOR;

        const parts = gradientString.split(" ");
        const fromColor = parts.find((part) => part.startsWith("from-"));

        return fromColor ? fromColor.replace("from-", "") : FALLBACK_COLOR;
    };

    const baseColor = extractColor(quiz.color);

    return (
        <article
            className="group relative block h-full"
            aria-labelledby={`quiz-title-${quiz.id}`}
        >
            {/* Tailwind safelist for dynamic color classes */}
            <div className="hidden
  from-blue-500 to-cyan-500 border-blue-500 bg-blue-500 border-cyan-500 bg-cyan-500
  from-green-500 to-emerald-500 border-green-500 bg-green-500 border-emerald-500 bg-emerald-500
  from-purple-500 to-pink-500 border-purple-500 bg-purple-500 border-pink-500 bg-pink-500
  from-orange-500 to-red-500 border-orange-500 bg-orange-500 border-red-500 bg-red-500
  from-indigo-500 to-blue-500 border-indigo-500 bg-indigo-500
  from-gray-500 to-slate-500 border-gray-500 bg-gray-500 border-slate-500 bg-slate-500
" aria-hidden="true"></div>

            <Link
                href={`/quiz/${quiz.id}`}
                className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-3xl"
                aria-label={`Start ${quiz.name} quiz - ${quiz.questionsCount} questions in ${quiz.category} category`}
            >
                <div className="flex h-full flex-col justify-between rounded-tr-[3rem] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-200">

                    {/* Decorative fold effect */}
                    <div
                        className={`absolute top-0 right-0 h-12 w-12 rounded-bl-2xl bg-gradient-to-br ${quiz.color} shadow-sm transition-all duration-300 group-hover:h-14 group-hover:w-14 group-hover:shadow-md`}
                        aria-hidden="true"
                    />

                    {/* Card Header */}
                    <header className="relative z-10 flex-1 pr-8">
                        <div className="mb-3">
                            <span className="inline-flex items-stretch gap-2">
                                {/* Decorative vertical line */}
                                <span
                                    className={`w-1 rounded-full bg-${baseColor}`}
                                    aria-hidden="true"
                                />
                                {/* Category badge */}
                                <span className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    {quiz.category}
                                </span>
                            </span>
                        </div>

                        <h3
                            id={`quiz-title-${quiz.id}`}
                            className="text-xl font-medium leading-tight text-gray-900 transition-colors"
                        >
                            {quiz.name}
                        </h3>
                    </header>

                    {/* Card Footer */}
                    <footer className={`mt-6 border-t pt-4 border-${baseColor}`}>
                        <div className="flex items-center justify-between">

                            {/* Questions Count */}
                            <div className="flex items-center gap-2">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:text-gray-600"
                                    aria-hidden="true"
                                >
                                    <Layers className="h-4 w-4" />
                                </div>
                                <dl className="flex flex-col">
                                    <dt className="text-[10px] font-bold uppercase text-gray-400">
                                        Total
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-800">
                                        {quiz.questionsCount} <abbr title="Questions" className="no-underline">Qs</abbr>
                                    </dd>
                                </dl>
                            </div>

                            {/* CTA Button (visual only, link handles navigation) */}
                            <span
                                className={`group/btn relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r ${quiz.color} px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:brightness-110`}
                                aria-hidden="true"
                            >
                                <span className="relative z-10">Start</span>
                                <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </div>
                    </footer>
                </div>
            </Link>
        </article>
    );
}