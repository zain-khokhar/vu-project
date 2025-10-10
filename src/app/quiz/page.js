import Link from 'next/link';
import { BookOpen, Brain, Flask, Calculator } from 'lucide-react';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata = {
  title: 'Online Quiz System - DocLibrary',
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Online Quiz System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with our interactive quizzes. Choose a category and challenge yourself!
          </p>
        </div>

        {/* Quiz Cards */}
        {quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quiz/${quiz.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-1">
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-br ${quiz.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-5xl">{quiz.icon}</span>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {quiz.questionsCount} Questions
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{quiz.name}</h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
                        <span className="text-sm">Multiple Choice Questions</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Timed Quiz</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">Instant Results</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg">
                      <span>Start Quiz</span>
                      <svg className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Quizzes Available
              </h3>
              <p className="text-gray-600">
                Please add quiz JSON files to the /data folder.
              </p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Quiz Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Timed Questions</h3>
              <p className="text-gray-600 text-sm">
                Each question has a timer to challenge your speed and knowledge
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Results</h3>
              <p className="text-gray-600 text-sm">
                Get comprehensive results with explanations for each answer
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Random Questions</h3>
              <p className="text-gray-600 text-sm">
                Questions are randomized each time for a fresh experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
