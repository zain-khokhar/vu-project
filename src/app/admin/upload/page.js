'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { createDocument } from '@/actions/documents';
import { documentTypes } from '@/lib/utils';
import BlogEditor from '@/components/BlogEditor';

export default function UploadPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'note',
    coverImage: '',
    fileUrl: '',
    subject: '',
    university: '',
    year: new Date().getFullYear(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const documentData = {
        ...formData,
        year: parseInt(formData.year),
        tags: tags
      };

      const result = await createDocument(documentData);

      if (result.success) {
        setMessage({ 
          type: 'success', 
          content: 'Document uploaded successfully!' 
        });
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          type: 'note',
          coverImage: '',
          fileUrl: '',
          subject: '',
          university: '',
          year: new Date().getFullYear(),
        });
        setTags([]);
        
        // Redirect to the new document after a delay
        setTimeout(() => {
          router.push(`/documents/${result.document.slug}`);
        }, 2000);
      } else {
        setMessage({ 
          type: 'error', 
          content: result.error || 'Failed to upload document' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        content: 'An unexpected error occurred' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
          <p className="text-gray-600">
            Share educational materials with the community. All uploads are free and accessible to everyone.
          </p>
        </div>

        {/* Message */}
        {message.content && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.content}</span>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter document title"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(documentTypes).map(([value, config]) => (
                    <option key={value} value={value}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max={new Date().getFullYear() + 10}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mathematics, Physics, Computer Science"
                />
              </div>

              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                  University *
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Harvard University, MIT"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <BlogEditor
                content={formData.description}
                onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                placeholder="Provide a detailed description of the document content, topics covered, etc. Use the toolbar to format your text with headings, lists, and emphasis."
              />
            </div>

            {/* File URLs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use a service like Cloudinary, Imgur, or any public image URL
                </p>
              </div>

              <div>
                <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Document File URL *
                </label>
                <input
                  type="url"
                  id="fileUrl"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/document.pdf"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Direct download link to the document (PDF, DOC, etc.)
                </p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag and press Enter"
                  maxLength={50}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Add relevant keywords to help others find this document. Maximum 10 tags.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>{isLoading ? 'Uploading...' : 'Upload Document'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Upload Guidelines</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Ensure you have the right to share the document</li>
            <li>• Use descriptive titles and comprehensive descriptions</li>
            <li>• Upload high-quality, readable documents</li>
            <li>• Add relevant tags to help others discover your content</li>
            <li>• Verify all URLs are accessible and working</li>
          </ul>
        </div>
      </div>
    </div>
  );
}