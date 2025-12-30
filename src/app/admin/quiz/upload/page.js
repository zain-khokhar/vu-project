'use client';

import { useState, useEffect } from 'react';
import { Upload, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdminProtected from '@/components/AdminProtected';
import { getQuizForEdit, updateQuiz } from '@/actions/quizzes';

function QuizUploadPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editSlug = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    icon: '📚',
    color: 'from-gray-500 to-slate-500',
    questionsJson: '',
  });

  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Load quiz data when in edit mode
  useEffect(() => {
    if (editSlug) {
      setIsEditMode(true);
      loadQuizData(editSlug);
    }
  }, [editSlug]);

  const loadQuizData = async (slug) => {
    setIsLoadingData(true);
    try {
      const result = await getQuizForEdit(slug);
      if (result.success) {
        const quiz = result.quiz;
        setFormData({
          title: quiz.title,
          description: quiz.description,
          category: quiz.category,
          icon: quiz.icon || '📚',
          color: quiz.color || 'from-gray-500 to-slate-500',
          questionsJson: JSON.stringify(quiz.questions, null, 2)
        });
        setParsedQuestions(quiz.questions);
        setStatus({ type: 'success', message: `Loaded quiz with ${quiz.questions.length} questions` });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to load quiz' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Error loading quiz data' });
    } finally {
      setIsLoadingData(false);
    }
  };

  // Available icons and colors
  const icons = [
    { emoji: '📚', label: 'Book' },
    { emoji: '⚛️', label: 'Physics' },
    { emoji: '🧪', label: 'Chemistry' },
    { emoji: '📐', label: 'Mathematics' },
    { emoji: '🧬', label: 'Biology' },
    { emoji: '💻', label: 'Computer' },
    { emoji: '🌍', label: 'Geography' },
    { emoji: '📖', label: 'History' },
  ];

  const colors = [
    { value: 'from-blue-500 to-cyan-500', label: 'Blue' },
    { value: 'from-green-500 to-emerald-500', label: 'Green' },
    { value: 'from-purple-500 to-pink-500', label: 'Purple' },
    { value: 'from-orange-500 to-red-500', label: 'Orange' },
    { value: 'from-indigo-500 to-blue-500', label: 'Indigo' },
    { value: 'from-gray-500 to-slate-500', label: 'Gray' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJsonChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, questionsJson: value }));

    // Try to parse JSON
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          setParsedQuestions(parsed);
          setStatus({ type: 'success', message: `✓ Valid JSON with ${parsed.length} questions` });
        } else {
          setParsedQuestions([]);
          setStatus({ type: 'error', message: 'JSON must be an array of questions' });
        }
      } else {
        setParsedQuestions([]);
        setStatus({ type: '', message: '' });
      }
    } catch (error) {
      setParsedQuestions([]);
      setStatus({ type: 'error', message: 'Invalid JSON format' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Validate
      if (!formData.title || !formData.description || !formData.category) {
        setStatus({ type: 'error', message: 'Please fill in all required fields' });
        setIsLoading(false);
        return;
      }

      if (parsedQuestions.length === 0) {
        setStatus({ type: 'error', message: 'Please provide valid quiz questions in JSON format' });
        setIsLoading(false);
        return;
      }

      const quizData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        icon: formData.icon,
        color: formData.color,
        questions: parsedQuestions,
      };

      let result;
      if (isEditMode) {
        // Update existing quiz
        result = await updateQuiz(editSlug, quizData);
      } else {
        // Create new quiz via API
        result = await createQuiz(quizData);
      }

      if (result.success || result.quiz) {
        setStatus({
          type: 'success',
          message: isEditMode
            ? `✓ Quiz "${formData.title}" updated successfully!`
            : `✓ Quiz "${formData.title}" created successfully with ${parsedQuestions.length} questions!`
        });

        // Redirect to admin after 2 seconds
        setTimeout(() => {
          router.push('/admin');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to save quiz' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred while saving the quiz' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="backdrop-blur-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-full px-6 py-3 shadow-2xl">
              <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                QUIZ MANAGEMENT
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              {isEditMode ? 'Edit Quiz' : 'Upload New Quiz'}
            </span>
          </h1>
          <p className="text-gray-600 font-light">
            {isEditMode ? 'Update quiz details and questions' : 'Create a new quiz by providing details and questions in JSON format'}
          </p>
        </div>

        {/* Loading Data Indicator */}
        {isLoadingData && (
          <div className="mb-6 p-4 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-3">
            <Loader className="h-5 w-5 animate-spin" />
            <span className="font-medium">Loading quiz data...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl p-8">
          {/* Status Message */}
          {status.message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
              {status.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-medium">{status.message}</span>
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., CS101 Grand Quiz Midterm"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., Computer Science, Physics, Mathematics"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Brief description of the quiz..."
            />
          </div>

          {/* Icon and Color Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {icons.map(({ emoji, label }) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon: emoji }))}
                    className={`p-3 rounded-xl border-2 transition-all hover:scale-110 ${formData.icon === emoji
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-indigo-300'
                      }`}
                    title={label}
                  >
                    <span className="text-2xl">{emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Color
              </label>
              <div className="space-y-2">
                {colors.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, color: value }))}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${formData.color === value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                      }`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${value}`}></div>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions JSON */}
          <div className="mb-6">
            <label htmlFor="questionsJson" className="block text-sm font-medium text-gray-700 mb-2">
              Quiz Questions (JSON Format) *
            </label>
            <textarea
              id="questionsJson"
              name="questionsJson"
              value={formData.questionsJson}
              onChange={handleJsonChange}
              required
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono text-sm"
              placeholder={`[\n  {\n    "id": 1,\n    "question": "What is 2+2?",\n    "options": ["2", "3", "4", "5"],\n    "correct": "4",\n    "explanation": "Basic arithmetic",\n    "difficulty": "Easy",\n    "importance": 5\n  }\n]`}
            />
            {parsedQuestions.length > 0 && (
              <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Total Questions: <strong>{parsedQuestions.length}</strong></span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || isLoadingData || parsedQuestions.length === 0}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>{isEditMode ? 'Updating...' : 'Uploading...'}</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>{isEditMode ? 'Update Quiz' : 'Upload Quiz'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function QuizUploadPage() {
  return (
    <AdminProtected>
      <QuizUploadPageContent />
    </AdminProtected>
  );
}
