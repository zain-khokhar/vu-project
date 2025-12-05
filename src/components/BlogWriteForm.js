'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Upload, Loader2, Save, User, Image as ImageIcon, X } from 'lucide-react';
import BlogEditor from '@/components/BlogEditor';
import { createBlog, getBlogForEdit, updateBlog } from '@/actions/blogs';
import { getAuthors } from '@/actions/authors';
import { uploadToCloudinary } from '@/lib/cloudinary';

export default function BlogWriteForm() {
  const searchParams = useSearchParams();
  const editSlug = searchParams.get('edit');
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState({
    url: '',
    alt: '',
    publicId: '',
    width: 0,
    height: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [content, setContent] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [authors, setAuthors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  // Load blog data when in edit mode
  useEffect(() => {
    if (editSlug) {
      setIsEditMode(true);
      loadBlogData(editSlug);
    }
  }, [editSlug]);

  const loadBlogData = async (slug) => {
    setIsLoadingData(true);
    try {
      const result = await getBlogForEdit(slug);
      if (result.success) {
        const blog = result.blog;
        setTitle(blog.title);
        setExcerpt(blog.excerpt);
        setContent(blog.content);
        setCoverImage(blog.coverImage);
        setSelectedAuthor(blog.author._id);
        setError('');
      } else {
        setError(result.error || 'Failed to load blog');
      }
    } catch (error) {
      setError('Error loading blog data');
    } finally {
      setIsLoadingData(false);
    }
  };

  // Fetch authors on component mount
  useEffect(() => {
    const fetchAuthors = async () => {
      const result = await getAuthors();
      if (result.success) {
        setAuthors(result.authors);
        // Auto-select first author if available and not in edit mode
        if (result.authors.length > 0 && !editSlug) {
          setSelectedAuthor(result.authors[0]._id);
        }
      }
    };
    fetchAuthors();
  }, [editSlug]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const result = await uploadToCloudinary(file, 'blog-covers');

      if (!result.success) {
        setError(result.error || 'Failed to upload image. Please try again.');
        return;
      }

      setCoverImage({
        url: result.url,
        alt: coverImage.alt || '', // Preserve existing alt text if any
        publicId: result.publicId,
        width: result.width,
        height: result.height,
      });
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setCoverImage({
      url: '',
      alt: '',
      publicId: '',
      width: 0,
      height: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validate form
    if (!title.trim() || !excerpt.trim() || !coverImage.url || !content.trim() || !selectedAuthor) {
      setError('All fields including author and cover image are required');
      setIsSubmitting(false);
      return;
    }

    // Validate alt text
    if (!coverImage.alt.trim()) {
      setError('Please provide alt text for the cover image (for accessibility)');
      setIsSubmitting(false);
      return;
    }

    try {
      const blogData = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        coverImage,
        author: selectedAuthor,
      };

      let result;
      if (isEditMode) {
        result = await updateBlog(editSlug, blogData);
      } else {
        result = await createBlog(blogData);
      }

      if (result.success && result.blog && result.blog.slug) {
        router.push('/admin');
      } else {
        console.error('Blog operation result:', result);
        setError(result.error || `Failed to ${isEditMode ? 'update' : 'create'} blog post`);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Blog operation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isLoadingData && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-medium">Loading blog data...</span>
        </div>
      )}

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
            {/* Upload Button */}
            <div className="flex items-center space-x-4">
              <label className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${isUploading
                  ? 'bg-gray-100 cursor-not-allowed'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4" />
                    <span>{coverImage.url ? 'Change Image' : 'Upload Image'}</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              <span className="text-sm text-gray-500">
                Max 5MB (JPG, PNG, WebP)
              </span>
            </div>

            {/* Image Preview with Alt Text */}
            {coverImage.url && (
              <div className="space-y-3">
                <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={coverImage.url}
                    alt={coverImage.alt || 'Cover preview'}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Alt Text Input */}
                <div>
                  <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-2">
                    Image Alt Text (for accessibility) *
                  </label>
                  <input
                    id="imageAlt"
                    type="text"
                    value={coverImage.alt}
                    onChange={(e) => setCoverImage({ ...coverImage, alt: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the image (e.g., 'JavaScript code on laptop screen')"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Describe what's in the image for screen readers and SEO
                  </p>
                </div>

                {/* Image Metadata */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Dimensions: {coverImage.width} × {coverImage.height}px</p>
                  <p>Uploaded to Cloudinary</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Blog Content */}
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
            disabled={isSubmitting || isLoadingData}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isEditMode ? 'Updating...' : 'Publishing...'}</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditMode ? 'Update Blog' : 'Publish Blog'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}