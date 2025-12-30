/**
 * DocumentHeader Component
 * Modern file-icon style header with document type visual
 * Designed to look like a document/file download page, not a blog
 */

import { FileText, FileSpreadsheet, BookOpen, File, Newspaper, ClipboardList } from 'lucide-react';

const documentIcons = {
  note: FileText,
  'past-paper': ClipboardList,
  handout: BookOpen,
  assignment: FileSpreadsheet,
  article: Newspaper,
  default: File,
};

export default function DocumentHeader({ title, type, ariaLabel }) {
  const IconComponent = documentIcons[type] || documentIcons.default;

  return (
    <header
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-6"
      role="banner"
      aria-label={ariaLabel || "Document header"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">
        {/* Large File Icon */}
        <div className="mb-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
          <IconComponent
            className="h-16 w-16 sm:h-20 sm:w-20 text-white"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Document Code Badge */}
        <div className="mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-sm font-mono text-white/80 tracking-widest uppercase">
            {(title || 'DOC').substring(0, 8)}
          </span>
        </div>

        {/* Decorative Line */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </header>
  );
}
