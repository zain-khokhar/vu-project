import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";

export default function FoldedCornerCard({ quiz }) {

    // 1. JS Function to extract the 'from-' color
    const extractColor = (gradientString) => {
        // Fallback set to a known Tailwind class (e.g., orange-500 or orange-400)
        const FALLBACK_COLOR = "orange-400";

        if (!gradientString) return FALLBACK_COLOR;

        // Split the string "from-indigo-500 to-purple-500"
        const parts = gradientString.split(" ");

        // Find the part starting with 'from-'
        const fromColor = parts.find((part) => part.startsWith("from-"));

        // Remove 'from-' to get just 'indigo-500'
        return fromColor ? fromColor.replace("from-", "") : FALLBACK_COLOR;
    };

    const baseColor = extractColor(quiz.color);

    return (
        <Link href={`/quiz/${quiz.id}`} className="group relative block h-full">
            {/* 🛑 FIX: The following empty div contains Tailwind classes 
                 to ensure 'border-orange-500' and other common fallbacks 
                 are generated in the CSS bundle, resolving the dynamic class issue. */}
            <div className="hidden
  border-indigo-500 border-orange-500
  bg-indigo-500 bg-orange-500
"></div>


            <div className="flex h-full flex-col justify-between rounded-tr-[3rem] rounded-bl-3xl rounded-tl-3xl rounded-br-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gray-200">

                {/* The Fold Effect (Absolute) - No change needed here as quiz.color is used for bg-gradient */}
                <div
                    className={`absolute top-0 right-0 h-12 w-12 rounded-bl-2xl bg-gradient-to-br ${quiz.color} shadow-sm transition-all duration-300 group-hover:h-14 group-hover:w-14 group-hover:shadow-md`}
                />

                {/* Top Section: Content */}
                <div className="relative z-10 flex-1 pr-8">
                    <div className="mb-3">
                        <span className="inline-flex items-stretch gap-2">
                            {/* Vertical left line */}
                            <span className={`w-1 rounded-full bg-${baseColor}`} />

                            {/* Badge */}
                            <span className="py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                {quiz.category}
                            </span>
                        </span>
                    </div>


                    <h3 className="text-xl font-medium leading-tight text-gray-900 transition-colors">
                        {quiz.name}
                    </h3>
                </div>

                {/* Bottom Section: Divider, Stats & Button */}
                {/* APPLYING EXTRACTED COLOR TO DIVIDER BORDER */}
                <div className={`mt-6 border-t pt-4 border-${baseColor}`}>
                    <div className="flex items-center justify-between">

                        {/* Questions Count */}
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:text-gray-600">
                                <Layers className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold uppercase text-gray-400">Total</span>
                                <span className="text-sm font-medium text-gray-800">
                                    {quiz.questionsCount} Qs
                                </span>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            className={`group/btn relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r ${quiz.color} px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110`}
                        >
                            <span className="relative z-10">Start</span>
                            <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}