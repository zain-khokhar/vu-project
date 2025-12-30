import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowLeft, PenTool } from 'lucide-react';
import BlogWriteForm from '@/components/BlogWriteForm';

export const metadata = {
  title: 'Write New Blog - Vuedu',
  description: 'Create and publish a new blog post on Vuedu',
};

export default function BlogWritePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blogs</span>
          </Link>

          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PenTool className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Write New Blog Post
            </h1>
          </div>
          <p className="text-gray-600">
            Share your knowledge and insights with the Vuedu community.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <Suspense fallback={<div className="p-8">Loading form...</div>}>
            <BlogWriteForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}