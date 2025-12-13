import Link from 'next/link';
import { ArrowLeft, AlertTriangle, BookOpen, Users, Shield, Info } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer - VUEDU',
  description: 'Important disclaimers about VUEDU services, educational content, and limitations.',
  keywords: 'disclaimer, educational content, academic integrity, limitations, liability'
};

export default function DisclaimerPage() {
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
            <AlertTriangle className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-xl text-gray-600">
            Important information about the use and limitations of our services.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">

            {/* General Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">General Disclaimer</h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-800 font-semibold mb-3">
                  <AlertTriangle className="h-5 w-5 inline mr-2" />
                  IMPORTANT: READ CAREFULLY
                </p>
                <p className="text-red-700 leading-relaxed">
                  The information and services provided by VUEDU are for educational and informational purposes only. By using our website and services, you acknowledge and agree to the limitations and disclaimers outlined below.
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4">
                VUEDU ("we," "our," or "us") provides academic resources, document management tools, and educational support services. These services are designed to assist students and educators, but they come with important limitations that users must understand.
              </p>
            </section>

            {/* Educational Content Disclaimer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                Educational Content Disclaimer
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Accuracy</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Educational materials are provided "as-is" for informational purposes only</li>
                <li>We do not guarantee the accuracy, completeness, or reliability of any content</li>
                <li>Information may become outdated or incorrect over time</li>
                <li>Users should verify information from multiple authoritative sources</li>
                <li>Content reflects the views of individual contributors, not necessarily VUEDU</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Generated Content</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Documents and materials uploaded by users may contain errors or inaccuracies</li>
                <li>We do not review, edit, or fact-check all user-submitted content</li>
                <li>Quality and accuracy of content varies between contributors</li>
                <li>Users are responsible for evaluating the reliability of shared materials</li>
              </ul>
            </section>

            {/* Academic Integrity */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="h-6 w-6 text-green-600 mr-2" />
                Academic Integrity Notice
              </h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Student Responsibility</h3>
                <p className="text-yellow-700 leading-relaxed">
                  Students using VUEDU services must comply with their institution's academic integrity policies, honor codes, and ethical guidelines. Our services are intended to support learning, not replace it.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proper Use Guidelines</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Use our resources for learning, research, and educational reference</li>
                <li>Properly cite and attribute all sources used in your work</li>
                <li>Do not submit downloaded materials as your own original work</li>
                <li>Understand your institution's policies on collaboration and resource sharing</li>
                <li>Seek guidance from instructors when uncertain about acceptable use</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">LMS and Academic Support Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Our LMS handling and academic support are supplementary aids only</li>
                <li>Services should complement, not replace, your own academic efforts</li>
                <li>Final responsibility for academic work remains with the student</li>
                <li>Use services in accordance with your institution's policies</li>
              </ul>
            </section>

            {/* No Professional Advice */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Professional Advice</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-800 font-semibold mb-3">Important Limitation:</p>
                <p className="text-blue-700 leading-relaxed mb-4">
                  VUEDU does not provide professional academic advising, career counseling, or official educational guidance. Our services are informational only.
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li>We are not a substitute for qualified academic advisors or counselors</li>
                  <li>Do not rely solely on our platform for important academic decisions</li>
                  <li>Consult with appropriate professionals for personalized guidance</li>
                  <li>Our staff are not licensed educational or career professionals</li>
                </ul>
              </div>
            </section>

            {/* Technical Limitations */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Limitations</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Services may be temporarily unavailable due to maintenance or technical issues</li>
                <li>We do not guarantee 100% uptime or continuous access</li>
                <li>System performance may vary based on usage and technical factors</li>
                <li>Features may be added, modified, or discontinued without notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data and Security</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>While we implement security measures, no system is completely secure</li>
                <li>Users should not upload highly sensitive or confidential information</li>
                <li>Regular backups are recommended for important documents</li>
                <li>We are not liable for data loss due to technical failures</li>
              </ul>
            </section>

            {/* Third-Party Content */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content and Links</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Our website may contain links to external websites and resources</li>
                <li>We do not control or endorse third-party content or services</li>
                <li>External links are provided for convenience only</li>
                <li>Users access third-party sites at their own risk</li>
                <li>We are not responsible for the accuracy or availability of external content</li>
              </ul>
            </section>

            {/* Copyright and Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Copyright Notice</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Copyright Compliance:</strong> Users are responsible for ensuring they have proper rights to upload and share content on our platform.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Do not upload copyrighted material without permission</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Report suspected copyright violations to our team</li>
                  <li>We will respond to valid DMCA takedown requests</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-red-600 mr-2" />
                Limitation of Liability
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-800 font-semibold mb-3">LIMITATION NOTICE:</p>
                <p className="text-red-700 leading-relaxed mb-4">
                  To the maximum extent permitted by applicable law, VUEDU disclaims all liability for:
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  <li>Academic consequences resulting from use of our services</li>
                  <li>Inaccurate, incomplete, or outdated information</li>
                  <li>Technical failures, data loss, or service interruptions</li>
                  <li>Actions taken based on content found on our platform</li>
                  <li>Third-party content, links, or services</li>
                  <li>Any damages, direct or indirect, arising from service use</li>
                </ul>
              </div>
            </section>

            {/* Geographic Limitations */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Geographic and Legal Limitations</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Services may not be available in all countries or regions</li>
                <li>Content may not comply with laws in all jurisdictions</li>
                <li>Users are responsible for compliance with local laws and regulations</li>
                <li>Educational standards and requirements vary by location</li>
                <li>Some features may be restricted based on geographic location</li>
              </ul>
            </section>

            {/* Updates and Changes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify this disclaimer at any time without prior notice. Changes become effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the updated disclaimer. Users are encouraged to review this page regularly.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Info className="h-6 w-6 text-blue-600 mr-2" />
                Questions or Concerns
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have questions about this disclaimer or need clarification about our services:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-600"><strong>Email:</strong> team@vuedu.dev</p>
                <p className="text-gray-600"><strong>Subject:</strong> Disclaimer Inquiry</p>
                <p className="text-gray-600"><strong>Address:</strong> VUEDU Support Team</p>
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