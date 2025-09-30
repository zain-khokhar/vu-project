import Link from 'next/link';
import { ArrowLeft, CreditCard, RefreshCw, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Refund Policy - DocLibrary',
  description: 'DocLibrary refund and cancellation policy for premium services and subscriptions.',
  keywords: 'refund policy, cancellation, subscription, premium services, billing'
};

export default function RefundPolicyPage() {
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
            <CreditCard className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-xl text-gray-600">
            Our refund and cancellation policy for premium services.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At DocLibrary, we strive to provide excellent educational services and support. This refund policy outlines the terms for refunds and cancellations of our premium services, subscriptions, and paid features.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 font-medium">
                  <CheckCircle className="h-5 w-5 inline mr-2" />
                  This policy applies to all paid services offered by DocLibrary as of the effective date below.
                </p>
              </div>
            </section>

            {/* Free Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Services</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">No Refund Required</h3>
                <p className="text-green-700 leading-relaxed mb-4">
                  Our core educational services are provided free of charge, including:
                </p>
                <ul className="list-disc list-inside text-green-700 space-y-2">
                  <li>Access to educational documents and resources</li>
                  <li>Basic blog reading and community features</li>
                  <li>Document viewing and downloading</li>
                  <li>Basic academic support information</li>
                </ul>
                <p className="text-green-700 text-sm mt-4">
                  Since these services are free, no refunds are applicable.
                </p>
              </div>
            </section>

            {/* Premium Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Premium Services Refund Policy</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">30-Day Money-Back Guarantee</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-blue-700 leading-relaxed mb-4">
                  We offer a <strong>30-day money-back guarantee</strong> for the following premium services:
                </p>
                <ul className="list-disc list-inside text-blue-700 space-y-2">
                  <li>Premium LMS handling and academic support services</li>
                  <li>One-time consultation or tutoring sessions</li>
                  <li>Premium document access subscriptions</li>
                  <li>Advanced features and tools</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Conditions</h3>
              <p className="text-gray-600 mb-4">To be eligible for a refund, the following conditions must be met:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Request must be made within 30 days of the original purchase date</li>
                <li>Service must not have been fully completed or delivered</li>
                <li>Valid reason for dissatisfaction must be provided</li>
                <li>No violation of our Terms of Service</li>
                <li>Original payment method must be verifiable</li>
              </ul>
            </section>

            {/* Subscription Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <RefreshCw className="h-6 w-6 text-purple-600 mr-2" />
                Subscription and Recurring Services
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Monthly Subscriptions</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Can be cancelled at any time before the next billing cycle</li>
                <li>No refund for partial months already billed</li>
                <li>Service continues until the end of the current billing period</li>
                <li>Automatic renewal can be disabled in account settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Annual Subscriptions</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>30-day money-back guarantee from purchase date</li>
                <li>After 30 days: prorated refund for unused months (minimum 6 months remaining)</li>
                <li>Refund calculated from cancellation request date</li>
                <li>Processing fees may be deducted from refund amount</li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">
                  <Clock className="h-5 w-5 inline mr-2" />
                  Cancellation becomes effective at the end of the current billing period to ensure uninterrupted access.
                </p>
              </div>
            </section>

            {/* Non-Refundable Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                Non-Refundable Services
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-800 font-semibold mb-3">The following services are non-refundable:</p>
                <ul className="list-disc list-inside text-red-700 space-y-2">
                  <li>Custom academic work or assignments completed and delivered</li>
                  <li>Individual tutoring sessions that have been conducted</li>
                  <li>Digital downloads that have been accessed or downloaded</li>
                  <li>Services consumed or used beyond the 30-day guarantee period</li>
                  <li>Third-party service fees (payment processing, etc.)</li>
                  <li>Services purchased with promotional codes or discounts (unless required by law)</li>
                </ul>
              </div>
            </section>

            {/* Refund Process */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Step-by-Step Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contact Support</h4>
                    <p className="text-gray-600">Email us at <strong>billing@doclibrary.com</strong> with your refund request</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Provide Required Information</h4>
                    <p className="text-gray-600">Include order number, purchase date, and reason for refund request</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Review Process</h4>
                    <p className="text-gray-600">We will review your request within 3-5 business days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Refund Processing</h4>
                    <p className="text-gray-600">If approved, refund will be processed to original payment method within 7-10 business days</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Required Information</h3>
              <p className="text-gray-600 mb-4">Please include the following in your refund request:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Full name and email address associated with the account</li>
                <li>Order number or transaction ID</li>
                <li>Date of purchase</li>
                <li>Detailed reason for the refund request</li>
                <li>Any relevant screenshots or documentation</li>
              </ul>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Cancellation</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Cancel</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Log into your DocLibrary account</li>
                <li>Go to Account Settings → Subscription Management</li>
                <li>Click "Cancel Subscription" and follow the prompts</li>
                <li>Alternatively, contact support at <strong>support@doclibrary.com</strong></li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cancellation Effects</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Subscription will remain active until the end of the current billing period</li>
                <li>You will retain access to premium features until expiration</li>
                <li>No automatic renewal will occur</li>
                <li>Account will revert to free tier after expiration</li>
              </ul>
            </section>

            {/* Payment Issues */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Billing Issues</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Failed Payments</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>We will attempt to process failed payments up to 3 times</li>
                <li>Account may be suspended after repeated payment failures</li>
                <li>Update payment information in account settings to avoid disruption</li>
                <li>Contact support for assistance with payment issues</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Disputed Charges</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Contact us directly before disputing charges with your bank</li>
                <li>We will work to resolve billing discrepancies promptly</li>
                <li>Chargebacks may result in account suspension pending resolution</li>
              </ul>
            </section>

            {/* Special Circumstances */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Issues</h3>
              <p className="text-gray-600 mb-4">
                If you experience technical problems that prevent you from using our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Report the issue to technical support immediately</li>
                <li>We will work to resolve technical problems promptly</li>
                <li>Extended service disruptions may qualify for refunds or credits</li>
                <li>Temporary outages typically do not qualify for refunds</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exceptional Cases</h3>
              <p className="text-gray-600 mb-4">
                We may consider refunds outside this policy in exceptional circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Medical emergencies or family crises</li>
                <li>Military deployment or emergency relocation</li>
                <li>Significant changes to academic program requirements</li>
                <li>Other extraordinary circumstances (evaluated case by case)</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Refunds and Billing</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                For refund requests, billing questions, or cancellation assistance:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-gray-600"><strong>Billing Support:</strong> billing@doclibrary.com</p>
                <p className="text-gray-600"><strong>General Support:</strong> support@doclibrary.com</p>
                <p className="text-gray-600"><strong>Phone:</strong> +1 (555) 123-4567 (Mon-Fri, 9AM-6PM EST)</p>
                <p className="text-gray-600"><strong>Response Time:</strong> 3-5 business days for refund requests</p>
              </div>
            </section>

            {/* Policy Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the updated policy. Significant changes will be communicated via email to active subscribers.
              </p>
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