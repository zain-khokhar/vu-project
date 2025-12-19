import Link from 'next/link';
import {
  CheckSquare,
  Settings,
  FileText,
  Clock,
  GraduationCap,
  Network,
  FolderOpen,
  Folder,
  Rocket,
  Lightbulb,
  Wrench,
  Sparkles,
  ArrowLeft,
  Star,
  Zap
} from 'lucide-react';
import CTA from '@/components/CTA';

export const metadata = {
  title: 'Our Services - Vuedu',
  description: 'Explore our professional academic and LMS support services designed to make your learning journey smooth and stress-free.',
  keywords: 'LMS handling, academic support, assignments, quizzes, final year project, FYP guidance'
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, highlight = false }) => (
  <div className={`group backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden relative ${highlight ? 'ring-2 ring-indigo-200/50' : ''}`}>
    {/* Glossy overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

    <div className="relative flex items-start space-x-4">
      <div className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-500 ${highlight ? 'bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-blue-400/30 group-hover:scale-110' : 'bg-gradient-to-br from-indigo-100/50 via-purple-100/30 to-blue-100/50 group-hover:scale-110'}`}>
        <Icon className={`h-6 w-6 transition-all duration-500 ${highlight ? 'text-indigo-600' : 'text-indigo-600'}`} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-700 font-light leading-relaxed">{description}</p>
        {highlight && (
          <div className="mt-3 flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-medium text-amber-600">Premium Service</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, description, icon: Icon }) => (
  <div className="mb-16">
    <div className="flex items-center justify-center mb-6 group">
      {Icon && (
        <div className="p-4 bg-gradient-to-br from-indigo-500/70 via-purple-600/70 to-blue-600/70 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
          <Icon className="h-12 w-12 text-white drop-shadow-lg" />
        </div>
      )}
    </div>
    <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight tracking-tight mb-4 text-center bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-center font-light">{description}</p>
  </div>
);

export default function ServicesPage() {
  const lmsServices = [
    {
      icon: CheckSquare,
      title: "Full LMS Handling",
      description: "We fully manage your LMS, including quizzes, assignments, and lectures.",
      highlight: true
    },
    {
      icon: Settings,
      title: "Half LMS Handling",
      description: "Choose what you want us to handle — flexible academic support.",
      highlight: true
    },
    {
      icon: FileText,
      title: "Assignments & GDBs",
      description: "Expert assistance with assignments and graded discussions."
    },
    {
      icon: Clock,
      title: "Quizzes",
      description: "Accurate and on-time quiz handling."
    },
    {
      icon: GraduationCap,
      title: "Lecture Watching",
      description: "Lecture summaries to save you time and boost understanding."
    },
    {
      icon: Network,
      title: "Cisco Assignments",
      description: "Specialized help for Cisco coursework and tasks."
    }
  ];

  const academicSupport = [
    {
      icon: FolderOpen,
      title: "Midterm Resources",
      description: "Curated study materials to help you ace your midterms."
    },
    {
      icon: Folder,
      title: "Final Term Resources",
      description: "Key resources and guides for stress-free final term prep."
    }
  ];

  const fypServices = [
    {
      icon: Rocket,
      title: "FYP Guidance",
      description: "Step-by-step guidance for building your Final Year Project."
    },
    {
      icon: Lightbulb,
      title: "Idea Brainstorming",
      description: "Creative, practical project ideas tailored to your field."
    },
    {
      icon: Wrench,
      title: "Project Development Support",
      description: "Help with coding, documentation, and implementation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      {/* Premium Liquid Background with Smooth Gradients */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/40"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-50/20 via-transparent to-indigo-50/30 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/20 via-pink-50/10 to-blue-50/20 opacity-50"></div>

        {/* Smooth gradient light overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 via-white/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-50/30 via-purple-50/20 to-transparent pointer-events-none"></div>

        {/* Liquid orbs with enhanced gradients */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl  "></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/15 via-pink-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl  " style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-indigo-300/8 via-blue-300/8 to-purple-300/8 rounded-full mix-blend-multiply filter blur-3xl   transform -translate-x-1/2" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-cyan-300/8 via-blue-300/8 to-transparent rounded-full mix-blend-multiply filter blur-3xl  " style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        {/* <div className="mb-20">
          <div className="flex items-center justify-center mb-8 group">
            <div className="p-4 bg-gradient-to-br from-indigo-500/70 via-purple-600/70 to-blue-600/70 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="h-12 w-12 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight mb-6 text-center">
            <span className="block bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed text-center font-light">
            Explore our professional academic and LMS support services designed to make your learning journey smooth and stress-free.
          </p>
        </div> */}

        {/* LMS Handling Services */}
        <section className="mb-24">
          <SectionHeader
            icon={Zap}
            title="LMS Handling Services"
            description="Comprehensive LMS management solutions tailored to your academic needs"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lmsServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                highlight={service.highlight}
              />
            ))}
          </div>
        </section>

        {/* Additional Academic Support */}
        <section className="mb-24">
          <SectionHeader
            icon={GraduationCap}
            title="Academic Support Resources"
            description="Extra resources and materials to boost your academic performance"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {academicSupport.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </section>

        {/* FYP Project Builder & Helper Section */}
        <section className="mb-24">
          <SectionHeader
            icon={Rocket}
            title="FYP Project Builder & Helper"
            description="Complete support for your Final Year Project from conception to completion"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fypServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </section>
        <CTA />
      </div>
    </div>
  );
}