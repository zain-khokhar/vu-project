'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare, Clock, Sparkles } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status when user modifies form
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Set loading state
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call (replace with your actual API endpoint)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden relative">
      {/* Premium Liquid Background with Smooth Gradients */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/40"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-50/20 via-transparent to-indigo-50/30 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/20 via-pink-50/10 to-blue-50/20 opacity-50"></div>

        {/* Smooth gradient light overlays */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 via-white/20 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-50/30 via-purple-50/20 to-transparent pointer-events-none"></div>

        {/* Liquid orbs with enhanced gradients - More visible and prominent */}
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/25 via-cyan-300/15 to-transparent rounded-full mix-blend-multiply filter blur-3xl  "></div>
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-purple-400/25 via-pink-300/15 to-transparent rounded-full mix-blend-multiply filter blur-3xl  " style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/20 via-blue-300/15 to-purple-300/15 rounded-full mix-blend-multiply filter blur-3xl   transform -translate-x-1/2" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-gradient-to-l from-cyan-300/20 via-blue-300/15 to-transparent rounded-full mix-blend-multiply filter blur-3xl  " style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/15 via-purple-300/10 to-transparent rounded-full mix-blend-multiply filter blur-3xl  " style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Page Header */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8 group">
            <div className="p-4 bg-gradient-to-br from-indigo-500/70 via-purple-600/70 to-blue-600/70 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500">
              <MessageSquare className="h-12 w-12 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight tracking-tight mb-6 text-center">
            <span className="block bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed text-center font-light">
            Have questions about our services? Need academic support? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 p-8">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <h2 className="text-3xl font-light text-gray-900 mb-8 flex items-center relative">
                <Sparkles className="h-6 w-6 mr-3 text-indigo-600" />
                Send us a Message
              </h2>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 backdrop-blur-xl bg-gradient-to-r from-green-50/70 via-emerald-50/60 to-green-50/50 border border-green-200/80 rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">Message sent successfully!</p>
                    <p className="text-green-700 text-sm font-light">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 backdrop-blur-xl bg-gradient-to-r from-red-50/70 via-pink-50/60 to-red-50/50 border border-red-200/80 rounded-2xl p-4 flex items-center space-x-3 shadow-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Failed to send message</p>
                    <p className="text-red-700 text-sm font-light">Please try again or contact us directly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-900 placeholder-gray-500 ${
                      errors.fullName 
                        ? 'border-red-400/50 bg-gradient-to-r from-red-50/70 via-red-50/60 to-red-50/50' 
                        : 'border-white/80'
                    }`}
                    placeholder="Enter your full name"
                    disabled={isSubmitting}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-900 placeholder-gray-500 ${
                      errors.email 
                        ? 'border-red-400/50 bg-gradient-to-r from-red-50/70 via-red-50/60 to-red-50/50' 
                        : 'border-white/80'
                    }`}
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-900 placeholder-gray-500 ${
                      errors.subject 
                        ? 'border-red-400/50 bg-gradient-to-r from-red-50/70 via-red-50/60 to-red-50/50' 
                        : 'border-white/80'
                    }`}
                    placeholder="What is this about?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-4 backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-900 placeholder-gray-500 resize-vertical ${
                      errors.message 
                        ? 'border-red-400/50 bg-gradient-to-r from-red-50/70 via-red-50/60 to-red-50/50' 
                        : 'border-white/80'
                    }`}
                    placeholder="Please describe your question or concern in detail..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 font-light">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-6 rounded-2xl font-medium text-white transition-all duration-500 flex items-center justify-center space-x-2 group/btn relative overflow-hidden shadow-2xl hover:shadow-3xl ${
                    isSubmitting
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500/80 via-purple-600/70 to-blue-600/80 hover:scale-105 active:scale-95'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-transparent to-white/15 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -skew-x-12 group-hover/btn:skew-x-0"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>

              <div className="mt-8 backdrop-blur-xl bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/50 border border-indigo-200/50 rounded-2xl p-4">
                <p className="text-indigo-700 text-sm font-light">
                  <strong>Response Time:</strong> We typically respond within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Details */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-light text-gray-900 mb-6 relative">Contact Information</h3>
              
              <div className="relative space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-100/50 via-purple-100/30 to-blue-100/50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <Mail className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-indigo-600 font-light">support@vuedu.dev</p>
                    <p className="text-sm text-gray-600 font-light">General inquiries & support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-100/50 via-purple-100/30 to-blue-100/50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <Phone className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-indigo-600 font-light">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-600 font-light">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-100/50 via-purple-100/30 to-blue-100/50 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-700 font-light">123 Education Street</p>
                    <p className="text-gray-700 font-light">Learning City, LC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 border border-white/90 rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              
              <h3 className="text-2xl font-light text-gray-900 mb-6 relative flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                Support Hours
              </h3>
              
              <div className="relative space-y-3 text-sm mb-6">
                <div className="flex justify-between backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-xl p-3">
                  <span className="text-gray-600 font-light">Monday - Friday</span>
                  <span className="font-medium text-indigo-600">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-xl p-3">
                  <span className="text-gray-600 font-light">Saturday</span>
                  <span className="font-medium text-indigo-600">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between backdrop-blur-xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 border border-white/80 rounded-xl p-3">
                  <span className="text-gray-600 font-light">Sunday</span>
                  <span className="text-gray-500 font-light">Closed</span>
                </div>
              </div>
              
              <div className="backdrop-blur-xl bg-gradient-to-r from-yellow-50/70 via-orange-50/60 to-yellow-50/50 border border-yellow-200/50 rounded-2xl p-3 relative">
                <p className="text-yellow-700 text-sm font-light">
                  <strong>Note:</strong> All times are in Eastern Standard Time (EST)
                </p>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="backdrop-blur-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/60 to-blue-50/50 border border-indigo-200/50 rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              
              <h3 className="text-xl font-light text-gray-900 mb-3 relative flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                Quick Help
              </h3>
              <p className="text-gray-700 text-sm mb-4 font-light">
                Looking for immediate answers? Check out our frequently asked questions.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium text-sm group/link"
              >
                <span>Visit FAQ Page</span>
                <span className="ml-2 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>

            {/* Feedback Form */}
            {/* <FeedbackForm /> */}
          </div>
        </div>
      </div>
    </div>
  );
}