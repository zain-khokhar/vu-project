import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <Database className="h-16 w-16 text-blue-600 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Database Seeding
        </h1>
        
        <p className="text-gray-600 mb-8">
          Click the button below to populate the database with sample documents including PDFs from Google Drive.
        </p>
        
        <SeedButton />
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/documents"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View Documents</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, Database } from 'lucide-react';

function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSeed = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/seed');
      const result = await response.json();
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/documents';
        }, 2000);
      } else {
        setError(result.error || 'Failed to seed database');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <p className="text-green-600 font-medium">Database seeded successfully!</p>
        <p className="text-sm text-gray-500 mt-2">Redirecting to documents...</p>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Seeding...</span>
          </>
        ) : (
          <>
            <Database className="h-5 w-5" />
            <span>Seed Database</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}