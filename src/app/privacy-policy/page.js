import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Database, UserCheck, Cookie } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - Vuedu',
  description: 'Learn how Vuedu protects your privacy. We collect minimal data - only Google Analytics for website improvement.',
  keywords: 'privacy policy, data protection, Google Analytics, minimal data collection',
  alternates: {
    canonical: '/privacy-policy'
  }
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
            Your privacy matters. We collect minimal data to provide you with the best educational experience.
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
                Vuedu ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains our minimal data collection practices when you visit our website and use our educational resources.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not agree with our policies, please do not use our services.
              </p>
            </section>

            {/* No Account System */}
            <section className="mb-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-green-900 mb-3 flex items-center">
                  <UserCheck className="h-6 w-6 text-green-600 mr-2" />
                  No User Accounts Required
                </h2>
                <p className="text-green-700 leading-relaxed">
                  <strong>Vuedu does not require user registration or authentication.</strong> We do not collect emails, passwords, or any personal account information. You can access all our educational resources without creating an account.
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-blue-600 mr-2" />
                Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Analytics Data (Google Analytics Only)</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use Google Analytics to understand how visitors use our website. This helps us improve our content and user experience. Google Analytics automatically collects:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Anonymous usage statistics (pages visited, time on site, navigation patterns)</li>
                <li>Device information (browser type, operating system, screen resolution)</li>
                <li>Geographic location (country/city level only, not precise location)</li>
                <li>Referral sources (how you found our website)</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>Important:</strong> Google Analytics data is anonymized and aggregated. We cannot identify individual users from this data.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Feedback and Comments</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                When you submit feedback or post comments on our platform, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li><strong>Name:</strong> Optional display name you provide</li>
                <li><strong>Comment/Feedback Content:</strong> The text you submit</li>
                <li><strong>Timestamp:</strong> When the feedback/comment was submitted</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>Note:</strong> You are not required to provide real personal information. You may use a pseudonym or nickname.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use minimal cookies for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Google Analytics:</strong> To track anonymous usage statistics</li>
                <li><strong>Essential Functionality:</strong> To remember your preferences (theme, language, etc.)</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                For more details, see our <Link href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            {/* What We DON'T Collect */}
            <section className="mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-3">What We DON'T Collect</h2>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li>Email addresses or passwords (no user accounts)</li>
                  <li>Payment or financial information</li>
                  <li>Social security numbers or government IDs</li>
                  <li>Precise geolocation data</li>
                  <li>Personal health information</li>
                  <li>Biometric data</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Analytics:</strong> To understand website usage and improve our content</li>
                <li><strong>Feedback/Comments:</strong> To display your contributions and improve our services</li>
                <li><strong>Technical Operations:</strong> To maintain website functionality and security</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>We do not sell, trade, or rent your information to third parties.</strong> We may share information only in these limited circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Google Analytics:</strong> Anonymous usage data is processed by Google under their privacy policy</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Public Comments:</strong> Comments you post are publicly visible on our website</li>
              </ul>
            </section>

            {/* Third-Party Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our website uses the following third-party services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Google Analytics:</strong> For anonymous website traffic analysis (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Privacy Policy</a>)</li>
                <li><strong>Cloudinary:</strong> For image hosting and optimization</li>
                <li><strong>MongoDB Atlas:</strong> For secure data storage (feedback and comments)</li>
                <li><strong>Vercel:</strong> For website hosting and content delivery</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                These services have their own privacy policies. We encourage you to review them.
              </p>
            </section>

            {/* User Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the following rights:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Opt-Out of Analytics:</strong> Use browser settings or extensions to block Google Analytics</li>
                <li><strong>Delete Comments/Feedback:</strong> Contact us to request deletion of your comments or feedback</li>
                <li><strong>Access Data:</strong> Request information about what data we have (if any)</li>
                <li><strong>Cookie Control:</strong> Manage cookies through your browser settings</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                To exercise these rights, please contact us at <a href="mailto:team@vuedu.dev" className="text-blue-600 hover:underline">team@vuedu.dev</a>.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate security measures to protect the minimal data we collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>HTTPS/SSL encryption for all data transmission</li>
                <li>Secure database hosting with access controls</li>
                <li>Regular security updates and monitoring</li>
                <li>Limited data collection minimizes risk</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Analytics Data:</strong> Retained by Google Analytics according to their retention policies (typically 26 months)</li>
                <li><strong>Comments/Feedback:</strong> Retained indefinitely unless you request deletion</li>
                <li><strong>Cookies:</strong> Expire according to their individual settings (see Cookie Policy)</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our services are educational and appropriate for all ages. Since we don't collect personal information (no accounts, no emails), we comply with children's privacy regulations. Parents/guardians should supervise children's use of our feedback and comment features.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> team@vuedu.dev</p>
                <p className="text-gray-600"><strong>Subject:</strong> Privacy Policy Inquiry</p>
                <p className="text-gray-600"><strong>Address:</strong> Punjab, Lahore, Pakistan</p>
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