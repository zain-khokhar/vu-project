import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

// GET - Fetch random questions from a quiz
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const count = parseInt(searchParams.get('count')) || 10;

    if (!slug) {
      return NextResponse.json(
        { error: 'Quiz slug is required' },
        { status: 400 }
      );
    }

    // Fetch quiz
    const quiz = await Quiz.findOne({ slug, isActive: true });

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Get random questions
    const totalQuestions = quiz.questions.length;
    const questionsToReturn = Math.min(count, totalQuestions);
    
    // Shuffle and select questions
    const shuffledQuestions = [...quiz.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, questionsToReturn);

    return NextResponse.json({
      quizTitle: quiz.title,
      quizDescription: quiz.description,
      totalQuestions: totalQuestions,
      selectedCount: questionsToReturn,
      questions: shuffledQuestions,
    });
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz questions' },
      { status: 500 }
    );
  }
}
