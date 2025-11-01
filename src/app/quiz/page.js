import Link from 'next/link';
import { BookOpen,ArrowRight } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata = {
  title: 'Online Quiz System - VUEDU',
  description: 'Test your knowledge with our interactive quiz system',
};

async function getAvailableQuizzes() {
  try {
    const dataDirectory = path.join(process.cwd(), 'data');
    const files = await fs.readdir(dataDirectory);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    const quizzes = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(dataDirectory, file);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const questions = JSON.parse(fileContents);
        
        const name = file.replace('.json', '');
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);
        
        return {
          id: name,
          name: displayName,
          questionsCount: questions.length,
          icon: getIconForCategory(name),
          color: getColorForCategory(name),
        };
      })
    );
    
    return quizzes;
  } catch (error) {
    console.error('Error reading quiz files:', error);
    return [];
  }
}

function getIconForCategory(category) {
  const icons = {
    physics: '⚛️',
    chemistry: '🧪',
    mathematics: '📐',
    biology: '🧬',
    default: '📚'
  };
  return icons[category.toLowerCase()] || icons.default;
}

function getColorForCategory(category) {
  const colors = {
    physics: 'from-blue-500 to-cyan-500',
    chemistry: 'from-green-500 to-emerald-500',
    mathematics: 'from-purple-500 to-pink-500',
    biology: 'from-orange-500 to-red-500',
    default: 'from-gray-500 to-slate-500'
  };
  return colors[category.toLowerCase()] || colors.default;
}

export default async function QuizHomePage() {
  const quizzes = await getAvailableQuizzes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          {/* Premium Badge */}
          <div className="mb-6">
            <div className="relative backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 overflow-hidden inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">INTERACTIVE LEARNING</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight mb-6 lg:mb-4">
            <span className="block bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              Online Quiz
            </span>
            <span className="block xl:inline bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              System
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light leading-relaxed lg:-mt-16">
            Test your knowledge with our interactive quizzes. Choose a category and challenge yourself with engaging questions!
          </p>
        </div>

        {/* Quiz Cards */}
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className="group"
              >
                <div className="h-full backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-white/100 overflow-hidden">
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 pointer-events-none"></div>

                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-br ${quiz.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-between mb-4">
                      <span className="text-6xl drop-shadow-lg">{quiz.icon}</span>
                      <div className="backdrop-blur-xl bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium border border-white/40 shadow-lg">
                        {quiz.questionsCount} Q
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light">{quiz.name}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="relative p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                        <span className="text-sm font-light">Multiple Choice Questions</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                        <span className="text-sm font-light">Timed Quiz Challenge</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                        <span className="text-sm font-light">Instant Results & Feedback</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 group/btn relative px-6 py-3 bg-gradient-to-r from-indigo-500/80 via-purple-600/70 to-blue-600/80 text-white font-medium text-sm rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover/btn:skew-x-0"></div>
                      <div className="relative flex items-center justify-center space-x-2">
                        <span>Start Quiz</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-12 shadow-2xl text-center max-w-md mx-auto mb-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-light text-gray-900 mb-2">
              No Quizzes Available
            </h3>
            <p className="text-gray-700 font-light">
              Please add quiz JSON files to the /data folder.
            </p>
          </div>
        )}

        {/* Features Section */}
        <section className="relative py-12 overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/10 via-blue-300/8 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-purple-400/10 via-pink-300/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">POWERFUL FEATURES</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                Quiz Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Timed Questions",
                  description: "Each question has a timer to challenge your speed and knowledge",
                  icon: "⏱️",
                  gradient: "from-blue-100/50 via-cyan-100/30 to-blue-50/50"
                },
                {
                  title: "Detailed Results",
                  description: "Get comprehensive results with explanations for each answer",
                  icon: "📊",
                  gradient: "from-green-100/50 via-emerald-100/30 to-green-50/50"
                },
                {
                  title: "Random Questions",
                  description: "Questions are randomized each time for a fresh experience",
                  icon: "🔄",
                  gradient: "from-purple-100/50 via-pink-100/30 to-purple-50/50"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                  
                  <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-3xl drop-shadow-lg">{feature.icon}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-light text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
