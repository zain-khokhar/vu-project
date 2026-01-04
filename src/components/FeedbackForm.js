'use client';

import { useState } from 'react';
import { MessageCircle, Send, User, Mail, Phone, Loader2, CheckCircle, AlertCircle, Quote } from 'lucide-react';

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
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        {/* Left Side: Call to Action */}
        <div className="lg:w-1/3 pt-2 sm:pt-4 w-full">
          <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-inner ring-1 ring-white/20">
            <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Rate Your Experience</h3>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed opacity-90">
            Help us improve the quiz platform. Did you find any wrong answers or have suggestions for new features? Let us know!
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-2/3 w-full bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg text-slate-800">
          {/* Status Message */}
          {status.message && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl flex items-center space-x-3 text-xs sm:text-sm font-medium ${status.type === 'success'
              ? 'bg-emerald-50 border border-emerald-100 text-emerald-700'
              : 'bg-rose-50 border border-rose-100 text-rose-700'
              }`}>
              {status.type === 'success' ? (
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              )}
              <p>{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Name */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 sm:mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base text-slate-900 placeholder-slate-400"
                  placeholder="John Doe"
                />
              </div>
              {/* Contact */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 sm:mb-2">Contact (Optional)</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base text-slate-900 placeholder-slate-400"
                  placeholder="Email or Phone"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 sm:mb-2">Feedback *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="block w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm sm:text-base text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Tell us what you think..."
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Send Feedback</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}