"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { requireAdminAuth, clearAdminSession } from '@/lib/auth';
import Link from 'next/link';
import {
  Shield,
  PenTool,
  Upload,
  Brain,
  LogOut,
  Settings,
  BarChart3,
  Users,
  FileText,
  Zap
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!requireAdminAuth()) {
      return;
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    clearAdminSession();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const adminActions = [
    {
      title: 'Write Blog',
      description: 'Create and publish new blog posts',
      icon: PenTool,
      href: '/admin/write',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Upload Documents',
      description: 'Upload course materials and documents',
      icon: Upload,
      href: '/admin/upload',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Add Quiz',
      description: 'Create and manage quiz questions',
      icon: Brain,
      href: '/admin/quiz/upload',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-50'
    }
  ];

  const statsCards = [
    {
      title: 'Total Blogs',
      value: '24',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Documents',
      value: '156',
      icon: Upload,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Quizzes',
      value: '12',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Users',
      value: '1.2k',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">VUEDU Management Panel</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Visit Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600">Manage your educational platform content and settings</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <div className={`group backdrop-blur-xl bg-gradient-to-br ${action.bgColor} border border-white/60 rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer`}>
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                    
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h4>
                      <p className="text-gray-600 mb-4">{action.description}</p>
                      
                      <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                        <span>Get Started</span>
                        <Zap className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="backdrop-blur-xl bg-white/80 border border-gray-200/60 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50/80 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-700">New blog post published: "Advanced React Patterns"</p>
                <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50/80 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <p className="text-gray-700">Document uploaded: "CS301 Midterm Study Guide"</p>
                <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50/80 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="text-gray-700">Quiz created: "JavaScript Fundamentals"</p>
                <span className="text-sm text-gray-500 ml-auto">3 days ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}