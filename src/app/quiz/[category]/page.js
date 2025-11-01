import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import QuizSetup from '@/components/QuizSetup';

export async function generateMetadata({ params }) {
  const { category } = await params;
  const displayName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${displayName} Quiz - VUEDU`,
    description: `Test your ${displayName} knowledge with our interactive quiz`,
  };
}

async function getQuizData(category) {
  try {
    const filePath = path.join(process.cwd(), 'data', `${category}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const questions = JSON.parse(fileContents);
    
    return {
      category,
      displayName: category.charAt(0).toUpperCase() + category.slice(1),
      questions,
      totalQuestions: questions.length,
    };
  } catch (error) {
    console.error('Error reading quiz file:', error);
    return null;
  }
}

export default async function QuizCategoryPage({ params }) {
  const { category } = await params;
  const quizData = await getQuizData(category);

  if (!quizData) {
    notFound();
  }

  return <QuizSetup quizData={quizData} />;
}
