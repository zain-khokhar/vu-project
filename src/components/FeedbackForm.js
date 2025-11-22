'use client';

import { useState } from 'react';
import { MessageCircle, Send, User, Mail, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact: '',
    contactType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      contactType: type
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ type: 'success', message: 'Thank you! Your feedback has been submitted successfully.' });
        setFormData({
          name: '',
          description: '',
          contact: '',
          contactType: ''
        });
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to submit feedback. Please try again.' });
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-white/80 via-white/70 to-white/60 border border-white/90 rounded-3xl shadow-2xl p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h3>
        <p className="text-gray-600 text-sm">Help us improve your experience. We value your thoughts!</p>
      </div>

      {/* Status Message */}
      {status.message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
          status.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{status.message}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={100}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
              placeholder="Enter your name"
              required
            />
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Your Feedback *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={1000}
            rows={4}
            className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
            placeholder="Share your thoughts, suggestions, or report any issues..."
            required
          />
          <div className="mt-1 text-right">
            <span className={`text-xs ${formData.description.length > 900 ? 'text-red-500' : 'text-gray-400'}`}>
              {formData.description.length}/1000
            </span>
          </div>
        </div>

        {/* Contact Information (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Contact Information <span className="text-gray-400">(Optional - for reply)</span>
          </label>
          
          {/* Contact Type Buttons */}
          <div className="flex space-x-2 mb-3">
            {[
              { type: 'email', icon: Mail, label: 'Email' },
              { type: 'phone', icon: Phone, label: 'Phone' },
              { type: 'other', icon: MessageCircle, label: 'Other' }
            ].map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => handleContactTypeChange(type)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  formData.contactType === type
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-3 w-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Contact Input */}
          {formData.contactType && (
            <div className="relative">
              <input
                type={formData.contactType === 'email' ? 'email' : 'text'}
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                maxLength={100}
                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder={
                  formData.contactType === 'email' ? 'your@email.com' :
                  formData.contactType === 'phone' ? '+1 (555) 123-4567' :
                  'Your contact information'
                }
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.name.trim() || !formData.description.trim()}
          className="w-full group relative px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-purple-600 flex items-center justify-center space-x-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="relative flex items-center space-x-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Submit Feedback</span>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Privacy Notice */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Your feedback helps us improve. We respect your privacy and will only use your contact information to respond to your feedback.
        </p>
      </div>
    </div>
  );
}