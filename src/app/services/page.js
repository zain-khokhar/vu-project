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
  ArrowLeft
} from 'lucide-react';

export const metadata = {
  title: 'Our Services - DocLibrary',
  description: 'Explore our professional academic and LMS support services designed to make your learning journey smooth and stress-free.',
  keywords: 'LMS handling, academic support, assignments, quizzes, final year project, FYP guidance'
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, highlight = false }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300 hover:border-blue-300 ${highlight ? 'ring-2 ring-blue-100' : ''}`}>
    <div className="flex items-start space-x-4">
      <div className={`flex-shrink-0 p-3 rounded-lg ${highlight ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <Icon className={`h-6 w-6 ${highlight ? 'text-blue-600' : 'text-gray-600'}`} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, description }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore our professional academic and LMS support services designed to make your learning journey smooth and stress-free.
          </p>
        </div>

        {/* LMS Handling Services */}
        <section className="mb-20">
          <SectionHeader 
            title="LMS Handling Services Available"
            description="Comprehensive LMS management solutions tailored to your academic needs"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <section className="mb-20">
          <SectionHeader 
            title="Additional Academic Support"
            description="Extra resources and materials to boost your academic performance"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
        <section className="mb-20">
          <SectionHeader 
            title="FYP Project Builder & Helper Section"
            description="Complete support for your Final Year Project from conception to completion"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to Transform Your Academic Journey?
              </h2>
            </div>
            <p className="text-xl mb-8 text-blue-100">
              Join me today for a better study experience and a brighter future!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Get Started Today
              </Link>
              <Link
                href="/documents"
                className="bg-blue-500 text-white border-2 border-blue-400 px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors inline-flex items-center justify-center"
              >
                Browse Resources
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}