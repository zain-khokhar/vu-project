import Link from 'next/link';
import {
  Calendar,
  University,
  BookOpen,
  ArrowRight,
  FileText,
  StickyNote,
} from 'lucide-react';

// Glossy Liquid macOS Theme Configuration
const typeConfig = {
  handout: {
    label: 'Handout',
    Icon: StickyNote,
    gradient: 'from-blue-400/20 via-cyan-400/20 to-blue-500/20',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-100/80 text-blue-700',
  },
  exam: {
    label: 'Exam Paper',
    Icon: FileText,
    gradient: 'from-red-400/20 via-pink-400/20 to-red-500/20',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-600',
    badgeColor: 'bg-red-100/80 text-red-700',
  },
  note: {
    label: 'Note',
    Icon: FileText,
    gradient: 'from-amber-400/20 via-orange-400/20 to-amber-500/20',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-600',
    badgeColor: 'bg-amber-100/80 text-amber-700',
  },
  default: {
    label: 'Document',
    Icon: FileText,
    gradient: 'from-gray-400/20 via-slate-400/20 to-gray-500/20',
    iconBg: 'bg-gray-500/20',
    iconColor: 'text-gray-600',
    badgeColor: 'bg-gray-100/80 text-gray-700',
  },
};

export default function DocumentCard({ document }) {
  const { Icon, label, gradient, iconBg, iconColor, badgeColor } =
    typeConfig[document.type] || typeConfig.default;

  return (
    <Link href={`/documents/${document.slug}`} className="group block h-full">
      <article className="h-full backdrop-blur-2xl border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 flex flex-col relative">
        {/* Header with liquid gradient */}
        <div className={`relative bg-gradient-to-br ${gradient} backdrop-blur-xl p-4 border-b border-white/50`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${iconBg} backdrop-blur-xl p-2.5 rounded-xl border border-white/60 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <span className="text-base font-semibold text-gray-800">{label}</span>
            </div>
            <span className={`${badgeColor} backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/60 shadow-sm`}>
              FREE
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative p-5 flex-1 flex flex-col z-10">
          {/* Title with animated underline */}
          <div className="mb-4 relative">
            <h3
              className="text-lg font-medium text-gray-900  line-clamp-2 min-h-[3.5rem] group-hover:text-purple-600 transition-colors duration-300"
              title={document.title}
            >
              {document.title}
            </h3>

          </div>

          {/* Meta Info with glass effect */}
          <div className="space-y-2.5 text-sm text-gray-700 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-blue-100/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/60 shadow-sm">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="truncate font-medium" title={document.subject}>
                {document.subject}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-purple-100/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/60 shadow-sm">
                <University className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <span className="truncate font-medium" title={document.university}>
                {document.university}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-green-100/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/60 shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-green-600" />
              </div>
              <span className="font-medium">{document.year}</span>
            </div>
          </div>

          {/* Footer with glass effect */}
          <div className="mt-auto pt-4 border-t border-gray-400 flex items-center justify-between backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
            <div className="flex items-center text-gray-600 font-medium text-sm group-hover:text-purple-600 transition-colors">
              <span className="mr-1.5">Download</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>

      </article>
    </Link>
  );
}