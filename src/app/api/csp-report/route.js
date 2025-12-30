/**
 * CSP Violation Report Endpoint
 * Handles Content Security Policy violation reports
 * Logs violations for monitoring and policy refinement
 */

import { processCSPViolation } from '@/lib/csp';

export async function POST(request) {
  try {
    const report = await request.json();

    // Process and log CSP violation
    const requestInfo = {
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    processCSPViolation(report['csp-report'] || report, requestInfo);

    return Response.json({
      success: true,
      message: 'CSP violation report received'
    });

  } catch (error) {
    console.error('Error processing CSP report:', error);
    return Response.json({
      success: false,
      error: 'Failed to process CSP report'
    }, { status: 500 });
  }
}