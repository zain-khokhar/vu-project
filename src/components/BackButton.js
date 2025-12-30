"use cleint"

import { ArrowLeft } from "lucide-react"
import { Router } from "next/router"

export default function BackButton({to}) {
    return (
        <button
            onClick={() => Router.push(to)}
            className="mb-8 group flex items-center space-x-2 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
            <ArrowLeft className="h-4 w-4 text-indigo-600 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Back to Quizzes
            </span>
        </button>
    )
}
