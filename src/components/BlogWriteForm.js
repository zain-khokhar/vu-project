'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Loader2, Save, User } from 'lucide-react';
import BlogEditor from '@/components/BlogEditor';
import { createBlog } from '@/actions/blogs';
import { getAuthors } from '@/actions/authors';

export default function BlogWriteForm() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [authors, setAuthors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  // Fetch authors on component mount
  useEffect(() => {
    const fetchAuthors = async () => {
      const result = await getAuthors();
      if (result.success) {
        setAuthors(result.authors);
        // Auto-select first author if available
        if (result.authors.length > 0) {
          setSelectedAuthor(result.authors[0]._id);
        }
      }
    };
    fetchAuthors();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, we'll use a placeholder URL
      // In production, you'd upload to a service like Cloudinary or S3
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate form
    if (!title.trim() || !excerpt.trim() || !coverImage || !content.trim() || !selectedAuthor) {
      setError('All fields including author are required');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('excerpt', excerpt.trim());
      formData.append('coverImage', coverImage);
      formData.append('content', content);
      formData.append('author', selectedAuthor);

      const result = await createBlog(formData);

      if (result.success && result.blog && result.blog.slug) {
        router.push(`/blogs/${result.blog.slug}`);
      } else {
        console.error('Blog creation result:', result);
        setError(result.error || 'Failed to create blog post');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Blog creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your blog title..."
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            maxLength={300}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Write a brief description of your blog post (max 300 characters)..."
            required
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {excerpt.length}/300
          </div>
        </div>

        {/* Author Selection */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author *
          </label>
          <div className="relative">
            <select
              id="author"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              required
            >
              <option value="">Select an author...</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
            <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Author Preview */}
          {selectedAuthor && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              {(() => {
                const author = authors.find(a => a._id === selectedAuthor);
                return author ? (
                  <div className="flex items-center space-x-3">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{author.name}</div>
                      <div className="text-sm text-gray-600 line-clamp-2">{author.bio}</div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image *
          </label>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                <Upload className="h-4 w-4" />
                <span>Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                Or paste an image URL
              </span>
            </div>
            
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />

            {/* Image Preview */}
            {coverImage && (
              <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <BlogEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your blog post..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Publish Blog</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}