"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { requireAdminAuth } from '@/lib/auth';

export default function AdminProtected({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (requireAdminAuth()) {
        setAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return children;
}