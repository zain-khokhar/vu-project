import Link from "next/link";
import {
  Calendar,
  University,
  BookOpen,
  ArrowRight,
  FileText,
  StickyNote,
  Download,
  Sparkles,
} from "lucide-react";

// Ultra-Clean Theme System (scales well for future types)
const typeConfig = {
  handout: {
    label: "Handout",
    Icon: StickyNote,
    gradient: "from-blue-500 to-indigo-600",
  },
  exam: {
    label: "Exam Paper",
    Icon: FileText,
    gradient: "from-rose-500 to-red-600",
  },
  note: {
    label: "Note",
    Icon: FileText,
    gradient: "from-yellow-500 to-orange-500",
  },
  default: {
    label: "Document",
    Icon: FileText,
    gradient: "from-slate-500 to-zinc-600",
  },
  pastpaper: {
    label: "Pastpaper",
    Icon: FileText,
    gradient: "from-slate-500 to-zinc-600",
  },
  assignment: {
    label: "Assignment",
    Icon: FileText,
    gradient: "from-slate-500 to-zinc-600",
  },
  mcqs: {
    label: "MCQs File",
    Icon: FileText,
    gradient: "from-rose-500 to-red-600",
  },
  syllabus: {
    label: "Syllabus",
    Icon: FileText,
    gradient: "from-yellow-500 to-orange-500",
  },
};

export default function DocumentCard({ document }) {
  const { Icon, label, gradient } =
    typeConfig[document.type] || typeConfig.default;

  return (
    <Link href={`/${document.type}/${document.slug}`} className="block h-full">

      {/* Card */}
      <div className="relative h-full rounded-3xl bg-white/80 border border-gray-200 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300">
        {/* Top Bar */}
        <div className="p-5 pb-4">
          <div className="flex items-center justify-between mb-4">
            {/* Type Badge */}
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-white text-xs font-bold bg-gradient-to-r ${gradient}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </span>

            {/* Free Tag */}
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
              <Sparkles className="w-3 h-3" />
              Free
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-medium text-gray-900 leading-snug line-clamp-2 min-h-[3.2rem] group-hover:text-indigo-600 transition-colors"
            title={document.title}
          >
            {document.title}
          </h3>
        </div>

        {/* Meta Info */}
        <div className="px-5 pb-5 space-y-3">
          <Meta
            icon={BookOpen}
            label="Subject"
            value={document.subject}
            color="blue"
          />
          <Meta
            icon={University}
            label="University"
            value={document.university}
            color="purple"
          />
          <Meta
            icon={Calendar}
            label="Year"
            value={document.year}
            color="emerald"
          />
        </div>

        {/* Action */}
        <div className="mt-auto p-4 bg-gray-100">
          <div className="flex justify-end">
            <div
              className={`inline-flex rounded-3xl items-center gap-3 px-4 py-3 text-white bg-gradient-to-r ${gradient} shadow-md group-hover:shadow-lg transition-all`}
            >
              {/* <Download className="w-4 h-4" /> */}
              <span className="text-sm font-bold">Get Document</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

function Meta({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${color}-100 text-${color}-600`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm font-semibold text-gray-800 truncate" title={value}>
          {value}
        </p>
      </div>
    </div>
  );
}
