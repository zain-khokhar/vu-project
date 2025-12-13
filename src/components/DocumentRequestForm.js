'use client';

import { useState } from 'react';
import { FileQuestion, Send, User, Mail, Phone, Loader2, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Image from 'next/image';

export default function DocumentRequestForm() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        contact: '',
        contactType: 'email'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleContactTypeChange = (type) => {
        setFormData(prev => ({ ...prev, contactType: type }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.description.trim() || !formData.contact.trim() || !formData.contactType) {
            setStatus({ type: 'error', message: 'Please fill in all required fields' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                setStatus({ type: 'success', message: 'Request submitted successfully!' });
                setFormData({ name: '', description: '', contact: '', contactType: '' });
            } else {
                setStatus({ type: 'error', message: result.error || 'Failed to submit request.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Form */}
                    <div className="p-12">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                                Request a Document
                            </h2>
                            <p className="text-sm text-gray-600">Can't find it? We'll help you get it.</p>
                        </div>

                        {/* Status */}
                        {status.message && (
                            <div
                                role="alert"
                                aria-live="polite"
                                className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm font-semibold ${status.type === 'success'
                                    ? 'text-green-700 bg-green-50 border border-green-200'
                                    : 'text-red-700 bg-red-50 border border-red-200'
                                    }`}
                            >
                                {status.type === 'success' ? (
                                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                                ) : (
                                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                                )}
                                {status.message}
                            </div>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            aria-label="Document request form"
                            noValidate
                        >
                            {/* Name Input */}
                            <div>
                                <label
                                    htmlFor="request-name"
                                    className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-1"
                                >
                                    <User className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="request-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-gray-50 transition-all duration-200"
                                    required
                                    aria-required="true"
                                    aria-invalid={!formData.name.trim() && status.type === 'error'}
                                    autoComplete="name"
                                />
                            </div>

                            {/* Contact Type + Input */}
                            <div>
                                <label
                                    htmlFor="request-contact"
                                    className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-1"
                                >
                                    <Mail className="w-4 h-4 text-purple-600" aria-hidden="true" />
                                    Contact
                                </label>
                                <div className="flex gap-2">
                                    {formData.contactType && (
                                        <input
                                            type={formData.contactType === 'email' ? 'email' : 'tel'}
                                            id="request-contact"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            placeholder={formData.contactType === 'email' ? 'you@example.com' : '+92 3xx xxxxxxx'}
                                            className="flex-1 px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 bg-gray-50 transition-all duration-200"
                                            required
                                            aria-required="true"
                                            aria-invalid={!formData.contact.trim() && status.type === 'error'}
                                            autoComplete={formData.contactType === 'email' ? 'email' : 'tel'}
                                            aria-describedby="contact-type-description"
                                        />
                                    )}
                                    <div
                                        role="group"
                                        aria-label="Contact method selection"
                                        className="flex gap-2"
                                    >
                                        {[{ type: 'email', icon: Mail, label: 'Email' }, { type: 'phone', icon: Phone, label: 'Phone' }].map(({ type, icon: Icon, label }) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => handleContactTypeChange(type)}
                                                className={`flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${formData.contactType === type
                                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                                                    }`}
                                                aria-label={`Select ${label} as contact method`}
                                                aria-pressed={formData.contactType === type}
                                            >
                                                <Icon className="w-4 h-4" aria-hidden="true" />
                                                <span className="sr-only">{label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <span id="contact-type-description" className="sr-only">
                                    Choose email or phone as your preferred contact method
                                </span>
                            </div>

                            {/* Info Box */}
                            <div
                                className="p-3 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl text-sm text-blue-700"
                                role="note"
                                aria-label="Alternative submission method"
                            >
                                <Info className="inline w-4 h-4 mr-2" aria-hidden="true" />
                                If you don't want to add contact info, you can request the document in any document's comment box.
                            </div>

                            {/* Document Details */}
                            <div>
                                <label
                                    htmlFor="request-description"
                                    className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-1"
                                >
                                    <FileQuestion className="w-4 h-4 text-amber-600" aria-hidden="true" />
                                    Document Details
                                </label>
                                <textarea
                                    id="request-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Handout, Book, Storybook, etc."
                                    rows={3}
                                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-xl focus:border-amber-600 focus:ring-2 focus:ring-amber-100 bg-gray-50 transition-all duration-200 resize-none"
                                    required
                                    aria-required="true"
                                    aria-invalid={!formData.description.trim() && status.type === 'error'}
                                    maxLength={1000}
                                    aria-describedby="description-hint"
                                />
                                <span id="description-hint" className="sr-only">
                                    Describe the document you need including subject, exam type, and year
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.name || !formData.description || !formData.contact || !formData.contactType}
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-purple-200"
                                aria-label={isSubmitting ? 'Submitting document request' : 'Submit document request'}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" aria-hidden="true" />
                                        <span>Submit Request</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="text-[10px] text-gray-500 text-center mt-4" role="contentinfo">
                            🔒 We'll only use your contact to notify you about this document.
                        </p>
                    </div>

                    {/* Right Side - Image */}
                    <div
                        className="hidden lg:flex relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 items-center justify-center overflow-hidden"
                        aria-hidden="true"
                    >
                        <Image
                            src="/Whimsical Book Scene.webp"
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 0vw, 50vw"
                            className="object-cover"
                            loading="lazy"
                            quality={85}
                            priority={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
