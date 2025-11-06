import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

// GET - Fetch all quizzes or a specific quiz by slug
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Fetch specific quiz
      const quiz = await Quiz.findOne({ slug, isActive: true });
      
      if (!quiz) {
        return NextResponse.json(
          { error: 'Quiz not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(quiz);
    }

    // Fetch all active quizzes (without questions for listing)
    const quizzes = await Quiz.find({ isActive: true })
      .select('-questions')
      .sort({ createdAt: -1 });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

// POST - Create a new quiz
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, description, category, icon, color, questions } = body;

    // Validate required fields
    if (!title || !description || !category || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existingQuiz = await Quiz.findOne({ slug });
    if (existingQuiz) {
      return NextResponse.json(
        { error: 'A quiz with this title already exists' },
        { status: 409 }
      );
    }

    // Create new quiz
    const quiz = await Quiz.create({
      title,
      description,
      category,
      icon: icon || '📚',
      color: color || 'from-gray-500 to-slate-500',
      questions,
      totalQuestions: questions.length,
    });

    return NextResponse.json(
      { message: 'Quiz created successfully', quiz },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating quiz:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create quiz' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a quiz by slug
export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Quiz slug is required' },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findOneAndDelete({ slug });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Quiz deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { error: 'Failed to delete quiz' },
      { status: 500 }
    );
  }
}
