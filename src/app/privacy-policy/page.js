import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - DocLibrary',
  description: 'Learn how DocLibrary collects, uses, and protects your personal information and data.',
  keywords: 'privacy policy, data protection, user rights, cookies, analytics'
};

export default function PrivacyPolicyPage() {
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
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-blue-600 mr-2" />
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                DocLibrary ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Name and email address when you create an account or contact us</li>
                <li>Profile information including bio and avatar when creating blog posts</li>
                <li>Communication data when you contact our support team</li>
                <li>Feedback and survey responses</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>IP address, browser type, and operating system</li>
                <li>Pages visited, time spent on pages, and navigation patterns</li>
                <li>Device information and screen resolution</li>
                <li>Referral sources and search terms used</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies and Tracking Technologies</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies (Google Analytics) for usage statistics</li>
                <li>Preference cookies to remember your settings</li>
                <li>Third-party cookies from embedded content</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To provide, maintain, and improve our services</li>
                <li>To personalize your experience and content recommendations</li>
                <li>To communicate with you about updates, announcements, and support</li>
                <li>To analyze usage patterns and optimize website performance</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our website (hosting, analytics, email services)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our website uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Google Analytics:</strong> For website traffic analysis and user behavior insights</li>
                <li><strong>Cloudinary:</strong> For image hosting and optimization</li>
                <li><strong>MongoDB Atlas:</strong> For secure data storage</li>
                <li><strong>Vercel/Netlify:</strong> For website hosting and content delivery</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                These services have their own privacy policies. We encourage you to review their policies when using our services.
              </p>
            </section>

            {/* User Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
                Your Rights and Choices
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your information for direct marketing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@doclibrary.com" className="text-blue-600 hover:underline">privacy@doclibrary.com</a>.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure database hosting with access controls</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
                <li>Incident response procedures</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. We may retain information longer if required by law or for legitimate business purposes such as fraud prevention.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us and we will delete such information.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> privacy@doclibrary.com</p>
                <p className="text-gray-600"><strong>Address:</strong> DocLibrary Privacy Team</p>
                <p className="text-gray-600">123 Education Street, Learning City, LC 12345</p>
              </div>
            </section>

            {/* Last Updated */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center">
                Last Updated: September 30, 2025
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}