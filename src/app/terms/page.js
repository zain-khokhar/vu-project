import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Scale, Globe } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions - VUEDU',
  description: 'Terms of service, acceptable use policy, and legal information for VUEDU users.',
  keywords: 'terms of service, conditions, acceptable use, liability, legal'
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms and Conditions ("Terms") govern your use of VUEDU's website and services ("Service") operated by VUEDU ("us," "we," or "our").
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  <AlertTriangle className="h-5 w-5 inline mr-2" />
                  These Terms constitute a legally binding agreement between you and VUEDU.
                </p>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Permitted Uses</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Access and download educational documents for personal study</li>
                <li>Upload original academic content you have rights to share</li>
                <li>Use our LMS handling and academic support services</li>
                <li>Participate in our community through comments and blogs</li>
                <li>Share resources with fellow students for educational purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
              <p className="text-gray-600 mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Upload copyrighted material without proper authorization</li>
                <li>Use the service for commercial purposes without permission</li>
                <li>Attempt to hack, disrupt, or damage the website or servers</li>
                <li>Share login credentials or create multiple accounts</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Engage in harassment, spam, or abusive behavior</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Resell or redistribute our services without authorization</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must provide accurate and complete information during registration</li>
                <li>You are responsible for all activities under your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                <li>One person may not maintain more than one account</li>
              </ul>
            </section>

            {/* Content and Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content and Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>You retain ownership of content you upload or create</li>
                <li>You grant us a license to display, distribute, and promote your content</li>
                <li>You represent that you have rights to all content you upload</li>
                <li>We may remove content that violates these terms or applicable laws</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Content</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>VUEDU's original content is protected by intellectual property laws</li>
                <li>You may not copy, modify, or create derivative works without permission</li>
                <li>Our trademarks and logos may not be used without written consent</li>
              </ul>
            </section>

            {/* Services Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
                Services Disclaimer
              </h2>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Academic Support Services</h3>
                <ul className="list-disc list-inside text-orange-700 space-y-2">
                  <li>Our LMS handling and academic support services are supplementary aids</li>
                  <li>We do not guarantee specific grades, outcomes, or academic success</li>
                  <li>Students remain responsible for their own academic integrity</li>
                  <li>Services should be used in compliance with your institution's policies</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Accuracy</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We do not guarantee the accuracy, completeness, or reliability of user-generated content</li>
                <li>Educational materials are provided "as-is" for informational purposes</li>
                <li>Users should verify information from multiple sources</li>
                <li>We are not responsible for errors in third-party content</li>
              </ul>
            </section>

            {/* Liability Limitations */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Scale className="h-6 w-6 text-blue-600 mr-2" />
                Limitation of Liability
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>IMPORTANT:</strong> To the maximum extent permitted by law:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>VUEDU shall not be liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid by you for our services</li>
                  <li>We are not responsible for losses due to service interruptions or technical issues</li>
                  <li>We disclaim all warranties, express or implied, including merchantability and fitness for purpose</li>
                  <li>Users assume all risks associated with using our services</li>
                </ul>
              </div>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links and Services</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Our website may contain links to third-party websites and services</li>
                <li>We do not control or endorse third-party content or practices</li>
                <li>Your interactions with third parties are solely between you and them</li>
                <li>We are not responsible for third-party privacy policies or terms</li>
                <li>Use third-party services at your own risk</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>We may terminate or suspend your account immediately for terms violations</li>
                <li>You may terminate your account at any time by contacting us</li>
                <li>Upon termination, your right to use the service ceases immediately</li>
                <li>We may retain certain information as required by law or for legitimate purposes</li>
                <li>Provisions regarding liability, indemnity, and governing law survive termination</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify and hold harmless VUEDU, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the service, violation of these terms, or infringement of any rights of another party.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-6 w-6 text-blue-600 mr-2" />
                Governing Law and Jurisdiction
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>These Terms are governed by the laws of [Your Jurisdiction]</li>
                <li>Any disputes shall be resolved in the courts of [Your Jurisdiction]</li>
                <li>If any provision is found unenforceable, the remainder remains in effect</li>
                <li>These Terms constitute the entire agreement between you and VUEDU</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or website notice. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> legal@vuedu.dev</p>
                <p className="text-gray-600"><strong>Address:</strong> VUEDU Legal Team</p>
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