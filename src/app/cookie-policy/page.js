import Link from 'next/link';
import { ArrowLeft, Cookie, Settings, Eye, BarChart3, Shield } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy - DocLibrary',
  description: 'Information about how DocLibrary uses cookies and similar technologies to enhance your experience.',
  keywords: 'cookies, tracking, privacy, web storage, analytics'
};

export default function CookiePage() {
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
            <Cookie className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600">
            How we use cookies and similar technologies to improve your experience.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and enabling certain functionality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                This Cookie Policy explains how DocLibrary ("we," "our," or "us") uses cookies and similar technologies when you visit our website at doclibrary.com (the "Service").
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  <Cookie className="h-5 w-5 inline mr-2" />
                  By continuing to use our website, you consent to our use of cookies as described in this policy.
                </p>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>

              {/* Essential Cookies */}
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Essential Cookies (Required)
                </h3>
                <p className="text-green-700 mb-4">
                  These cookies are necessary for the website to function properly and cannot be disabled.
                </p>
                <ul className="list-disc list-inside text-green-700 space-y-2">
                  <li><strong>Authentication:</strong> Remember your login status and keep you signed in</li>
                  <li><strong>Security:</strong> Protect against cross-site request forgery attacks</li>
                  <li><strong>Session Management:</strong> Maintain your session while browsing</li>
                  <li><strong>Preferences:</strong> Store your language and accessibility settings</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2" />
                  Analytics Cookies (Optional)
                </h3>
                <p className="text-blue-700 mb-4">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li><strong>Google Analytics:</strong> Track page views, user behavior, and site performance</li>
                  <li><strong>Usage Statistics:</strong> Understand which features are most popular</li>
                  <li><strong>Error Tracking:</strong> Help us identify and fix technical issues</li>
                  <li><strong>Performance Metrics:</strong> Monitor site speed and optimization opportunities</li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="mb-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                  <Settings className="h-6 w-6 mr-2" />
                  Functional Cookies (Optional)
                </h3>
                <p className="text-purple-700 mb-4">
                  These cookies enhance your experience by remembering your choices and preferences.
                </p>
                <ul className="list-disc list-inside text-purple-700 space-y-2">
                  <li><strong>Theme Preferences:</strong> Remember your dark/light mode choice</li>
                  <li><strong>Layout Settings:</strong> Save your preferred view options</li>
                  <li><strong>Recently Viewed:</strong> Show your recently accessed documents</li>
                  <li><strong>Form Data:</strong> Remember partially completed forms</li>
                </ul>
              </div>

              {/* Advertising Cookies */}
              <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center">
                  <Eye className="h-6 w-6 mr-2" />
                  Advertising Cookies (Not Currently Used)
                </h3>
                <p className="text-orange-700">
                  We currently do not use advertising cookies. If this changes in the future, we will update this policy and obtain your consent where required.
                </p>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Some cookies on our site are set by third-party services we use to enhance functionality:
              </p>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Purpose: Website analytics and performance tracking
                  </p>
                  <p className="text-gray-600 text-sm">
                    Privacy Policy: <Link href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank">Google Privacy Policy</Link>
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cloudinary</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Purpose: Image optimization and content delivery
                  </p>
                  <p className="text-gray-600 text-sm">
                    Privacy Policy: <Link href="https://cloudinary.com/privacy" className="text-blue-600 hover:underline" target="_blank">Cloudinary Privacy Policy</Link>
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Vercel Analytics</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Purpose: Performance monitoring and error tracking
                  </p>
                  <p className="text-gray-600 text-sm">
                    Privacy Policy: <Link href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:underline" target="_blank">Vercel Privacy Policy</Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>View which cookies are stored on your device</li>
                <li>Delete all cookies or specific ones</li>
                <li>Block cookies from all sites or specific sites</li>
                <li>Set cookies to be deleted when you close your browser</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser-Specific Instructions</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                  <p className="text-gray-600 text-sm">
                    Settings → Privacy and Security → Cookies and other site data
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                  <p className="text-gray-600 text-sm">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                  <p className="text-gray-600 text-sm">
                    Preferences → Privacy → Cookies and website data
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                  <p className="text-gray-600 text-sm">
                    Settings → Cookies and site permissions → Cookies and site data
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium mb-2">Important Note:</p>
                <p className="text-yellow-700 text-sm">
                  Disabling essential cookies may prevent certain features of our website from working properly. You may not be able to log in, save preferences, or access some content.
                </p>
              </div>
            </section>

            {/* Opt-Out Options */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Opt-Out of Analytics</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You can opt out of Google Analytics tracking by:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Installing the <Link href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank">
                    Google Analytics Opt-out Browser Add-on
                  </Link>
                </li>
                <li>Enabling "Do Not Track" in your browser settings</li>
                <li>Using privacy-focused browsers or browser extensions</li>
                <li>Disabling cookies in your browser (may affect site functionality)</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Data Retention</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Authentication Cookies:</strong> Expire after 30 days of inactivity</li>
                <li><strong>Preference Cookies:</strong> Retained for up to 1 year</li>
                <li><strong>Analytics Cookies:</strong> Retained for up to 26 months (Google Analytics default)</li>
                <li><strong>Security Cookies:</strong> Expire after 24 hours</li>
              </ul>
            </section>

            {/* Mobile Apps */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile Applications</h2>
              <p className="text-gray-600 leading-relaxed">
                If we develop mobile applications in the future, they may use similar technologies to cookies (such as local storage, SDKs, and device identifiers) to provide personalized experiences. We will update this policy to reflect any such usage.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our practices. We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> privacy@doclibrary.com</p>
                <p className="text-gray-600"><strong>Subject:</strong> Cookie Policy Inquiry</p>
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