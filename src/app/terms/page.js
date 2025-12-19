import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Users, BookOpen, AlertTriangle, Upload } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - Vuedu',
  description: 'Terms and conditions for using Vuedu educational platform and resources.',
  keywords: 'terms of service, terms and conditions, user agreement, acceptable use'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using Vuedu.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to Vuedu! These Terms of Service ("Terms") govern your access to and use of our website, services, and educational resources (collectively, the "Services").
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our Services.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-700 text-sm">
                  <strong>Important:</strong> Vuedu is a free educational platform. We do not require user accounts or registration to access our resources.
                </p>
              </div>
            </section>

            {/* Platform Overview */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                About Vuedu
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vuedu is an educational resource platform that provides:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access to educational documents, notes, papers, and past exams</li>
                <li>Interactive quizzes and learning materials</li>
                <li>Blog posts and educational articles</li>
                <li>Community feedback and comment features</li>
              </ul>
            </section>

            {/* No User Accounts */}
            <section className="mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-900 mb-3 flex items-center">
                  <Users className="h-6 w-6 text-green-600 mr-2" />
                  No User Accounts Required
                </h2>
                <p className="text-green-700 leading-relaxed mb-3">
                  <strong>Vuedu does not require user registration.</strong> You can access all educational resources without creating an account, providing an email, or setting a password.
                </p>
                <p className="text-green-700 leading-relaxed">
                  Users can provide feedback and post comments without authentication. However, only authorized administrators can upload or modify content.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Permitted Uses</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Access and download educational documents for personal study</li>
                <li>Take quizzes and use interactive learning tools</li>
                <li>Read blog posts and educational articles</li>
                <li>Provide constructive feedback and comments</li>
                <li>Share resources with others for educational purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Uses</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Attempting to upload, modify, or delete content without authorization</li>
                <li>Using automated tools to scrape or download bulk content</li>
                <li>Posting spam, offensive, or inappropriate comments</li>
                <li>Impersonating others or providing false information</li>
                <li>Attempting to hack, disrupt, or compromise our Services</li>
                <li>Using content for commercial purposes without permission</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Redistributing our proprietary content without permission</li>
              </ul>
            </section>

            {/* Content and Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Upload className="h-6 w-6 text-blue-600 mr-2" />
                Content and Intellectual Property
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Content</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Vuedu hosts two types of content:
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-900 mb-2">1. Third-Party Educational Materials</h4>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Documents, papers, and materials uploaded by our administrators that originate from universities, educational institutions, or other organizations. <strong>We credit the original owners and organizations</strong> for all such content. These materials are provided for educational purposes only.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-indigo-900 mb-2">2. Vuedu Proprietary Content</h4>
                <p className="text-indigo-700 text-sm leading-relaxed">
                  Original content created by Vuedu, including but not limited to: custom quizzes, blog posts, tutorials, and educational materials. <strong>This content is proprietary and may not be uploaded to other platforms without our explicit written permission.</strong>
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Generated Content (Comments & Feedback)</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>You retain ownership of comments and feedback you submit</li>
                <li>By posting, you grant Vuedu a non-exclusive license to display your content</li>
                <li>You are responsible for the content you post</li>
                <li>We reserve the right to remove inappropriate or spam content</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Copyright and Attribution</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>All third-party content is attributed to its original source</li>
                <li>If you believe your copyrighted work is being used improperly, contact us at team@vuedu.dev</li>
                <li>We respect intellectual property rights and will respond to valid DMCA notices</li>
              </ul>
            </section>

            {/* Content Upload Restrictions */}
            <section className="mb-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-900 mb-3 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                  Content Upload Restrictions
                </h2>
                <p className="text-red-700 leading-relaxed mb-3">
                  <strong>Only authorized Vuedu administrators can upload documents and educational materials.</strong>
                </p>
                <p className="text-red-700 leading-relaxed">
                  Regular users cannot upload files or create content beyond comments and feedback. Any attempt to bypass these restrictions may result in being blocked from our Services.
                </p>
              </div>
            </section>

            {/* Educational Use Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational Use and Academic Integrity</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Student Responsibility</h3>
                <p className="text-yellow-700 leading-relaxed">
                  <strong>Resources on Vuedu are for study and reference purposes only.</strong> Students are responsible for:
                </p>
                <ul className="list-disc list-inside text-yellow-700 mt-2 space-y-1">
                  <li>Using materials ethically and in accordance with their institution's academic integrity policies</li>
                  <li>Not submitting downloaded content as their own work</li>
                  <li>Understanding that past papers and exams are for practice, not cheating</li>
                  <li>Verifying information accuracy with official sources</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Accuracy</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We strive for accuracy but do not guarantee all content is error-free</li>
                <li>Users should verify important information with official sources</li>
                <li>Past papers and materials may be outdated</li>
                <li>We are not responsible for academic consequences of using our materials</li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Accuracy, completeness, or reliability of content</li>
                <li>Uninterrupted or error-free service</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of third-party rights</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To the maximum extent permitted by law, Vuedu shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Loss of data or academic performance</li>
                <li>Service interruptions or errors</li>
                <li>Reliance on content accuracy</li>
                <li>Unauthorized access to your device or data</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                <strong>Use our Services at your own risk.</strong> We provide educational resources as a free service and cannot be held responsible for how you use them.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to restrict or terminate access to our Services for users who violate these Terms, engage in prohibited activities, or for any other reason at our discretion. Since we don't have user accounts, termination may involve IP blocking or other technical measures.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these Terms from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our Services after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> team@vuedu.dev</p>
                <p className="text-gray-600"><strong>Address:</strong> Vuedu Legal Team</p>
                <p className="text-gray-600">Punjab, Lahore, Pakistan</p>
              </div>
            </section>

            {/* Last Updated */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center">
                Last Updated: December 13, 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}