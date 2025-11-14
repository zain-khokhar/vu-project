'use server';

import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

// Get all quizzes with filtering and pagination
export async function getQuizzes({
  page = 1,
  limit = 6,
  search = '',
  category = ''
} = {}) {
  try {
    await connectDB();
    
    const skip = (page - 1) * limit;
    
    // Build search query
    const query = { isActive: true };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }
    
    const [quizzes, totalCount] = await Promise.all([
      Quiz.find(query)
        .select('title slug description category icon color totalQuestions')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Quiz.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      quizzes: quizzes.map(quiz => ({
        id: quiz.slug,
        name: quiz.title,
        description: quiz.description,
        category: quiz.category,
        questionsCount: quiz.totalQuestions,
        icon: quiz.icon,
        color: quiz.color,
        slug: quiz.slug
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return {
      success: false,
      error: 'Failed to fetch quizzes',
      quizzes: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false
      }
    };
  }
}

// Get quiz filter options
export async function getQuizFilterOptions() {
  try {
    await connectDB();
    
    const categories = await Quiz.distinct('category', { isActive: true });
    
    return {
      success: true,
      categories: categories.filter(cat => cat && cat.trim() !== '')
    };
  } catch (error) {
    console.error('Error fetching quiz filter options:', error);
    return {
      success: false,
      error: 'Failed to fetch filter options',
      categories: []
    };
  }
}

// Get quiz by slug
export async function getQuizBySlug(slug) {
  try {
    await connectDB();
    
    const quiz = await Quiz.findOne({ slug, isActive: true })
      .select('title description slug totalQuestions category icon color createdAt updatedAt')
      .lean();
    
    if (!quiz) {
      return { success: false, error: 'Quiz not found' };
    }
    
    return {
      success: true,
      quiz: {
        slug: quiz.slug,
        title: quiz.title,
        description: quiz.description,
        totalQuestions: quiz.totalQuestions,
        category: quiz.category,
        icon: quiz.icon,
        color: quiz.color,
        createdAt: quiz.createdAt?.toISOString(),
        updatedAt: quiz.updatedAt?.toISOString(),
      }
    };
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return { success: false, error: 'Failed to fetch quiz' };
  }
}

// Get latest quizzes for homepage
export async function getLatestQuizzes(limit = 3) {
  try {
    await connectDB();
    
    const quizzes = await Quiz.find({ isActive: true })
      .select('title slug description category icon color totalQuestions')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    
    return {
      success: true,
      quizzes: quizzes.map(quiz => ({
        id: quiz.slug,
        name: quiz.title,
        description: quiz.description,
        category: quiz.category,
        questionsCount: quiz.totalQuestions,
        icon: quiz.icon,
        color: quiz.color,
        slug: quiz.slug
      }))
    };
  } catch (error) {
    console.error('Error fetching latest quizzes:', error);
    return { success: false, error: 'Failed to fetch quizzes', quizzes: [] };
  }
}

// Create new quiz
export async function createQuiz(quizData) {
  try {
    await connectDB();
    
    const quiz = new Quiz(quizData);
    await quiz.save();
    
    return { success: true, quiz: quiz.toObject() };
  } catch (error) {
    console.error('Error creating quiz:', error);
    return { success: false, error: 'Failed to create quiz' };
  }
}

// Update quiz
export async function updateQuiz(slug, updateData) {
  try {
    await connectDB();
    
    const quiz = await Quiz.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!quiz) {
      return { success: false, error: 'Quiz not found' };
    }
    
    return { success: true, quiz: quiz.toObject() };
  } catch (error) {
    console.error('Error updating quiz:', error);
    return { success: false, error: 'Failed to update quiz' };
  }
}

// Delete quiz
export async function deleteQuiz(slug) {
  try {
    await connectDB();
    
    const quiz = await Quiz.findOneAndUpdate(
      { slug },
      { isActive: false },
      { new: true }
    );
    
    if (!quiz) {
      return { success: false, error: 'Quiz not found' };
    }
    
    return { success: true, message: 'Quiz deleted successfully' };
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return { success: false, error: 'Failed to delete quiz' };
  }
}