import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

export function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const documentTypes = {
  handout: {
    label: 'Handout',
    color: 'bg-blue-100 text-blue-800'
  },
  book: {
    label: 'Book',
    color: 'bg-green-100 text-green-800'
  },
  note: {
    label: 'Note',
    color: 'bg-yellow-100 text-yellow-800'
  },
  exam: {
    label: 'Exam',
    color: 'bg-red-100 text-red-800'
  },
  mcqs: {
    label: 'MCQs',
    color: 'bg-indigo-100 text-indigo-800'
  },
  syllabus: {
    label: 'Syllabus',
    color: 'bg-indigo-100 text-indigo-800'
  },
  pastpaper: {
    label: 'Pastpaper',
    color: 'bg-indigo-100 text-indigo-800'
  },
  assignment: {
    label: 'Assignment',
    color: 'bg-indigo-100 text-indigo-800'
  }
};