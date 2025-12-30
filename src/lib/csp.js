/**
 * Content Security Policy (CSP) Utilities
 * Centralized CSP configuration and management
 */

/**
 * Generate CSP header value based on environment
 * @param {boolean} isDevelopment - Whether running in development mode
 * @returns {string} CSP header value
 */
export function generateCSPHeader(isDevelopment = false) {
  const directives = [
    // Default policy - only allow same-origin
    "default-src 'self'",

    // Scripts - allow same-origin, inline scripts (required for Next.js), eval, and Google services
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",

    // Styles - allow same-origin, inline styles, and Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

    // Fonts - allow same-origin and Google Fonts
    "font-src 'self' https://fonts.gstatic.com",

    // Images - allow same-origin, data URIs, HTTPS, blob URLs, and Google services
    "img-src 'self' data: https: blob: https://www.googletagmanager.com https://www.google-analytics.com",

    // Connections - allow same-origin, external services, and Google Analytics
    "connect-src 'self' https://res.cloudinary.com https://drive.google.com https://www.google-analytics.com",

    // Frames - allow embedding Google Drive documents and Google Tag Manager
    "frame-src 'self' https://drive.google.com https://docs.google.com https://www.googletagmanager.com",

    // Objects - block all object/embed/applet elements
    "object-src 'none'",

    // Base URI - restrict base tag usage
    "base-uri 'self'",

    // Forms - only allow same-origin form submissions
    "form-action 'self'",

    // Frame ancestors - prevent clickjacking
    "frame-ancestors 'none'",

    // Report violations to our endpoint
    "report-uri /api/csp-report"
  ];

  // Add upgrade-insecure-requests only in production
  if (!isDevelopment) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join('; ');
}

/**
 * CSP violation report structure
 * @typedef {Object} CSPViolationReport
 * @property {string} document-uri - The URI of the document in which the violation occurred
 * @property {string} violated-directive - The directive that was violated
 * @property {string} effective-directive - The directive whose enforcement caused the violation
 * @property {string} original-policy - The original policy as specified by the Content-Security-Policy header
 * @property {string} blocked-uri - The URI of the resource that was blocked
 * @property {string} status-code - The HTTP status code of the blocked resource
 */

/**
 * Process CSP violation report
 * @param {CSPViolationReport} report - The CSP violation report
 * @param {Object} requestInfo - Additional request information
 */
export function processCSPViolation(report, requestInfo) {
  const violation = {
    timestamp: new Date().toISOString(),
    userAgent: requestInfo.userAgent,
    ip: requestInfo.ip,
    violation: report
  };

  // Log violation
  console.warn('CSP Violation:', violation);

  // In production, you might want to:
  // - Store in database for analysis
  // - Send alerts for critical violations
  // - Use monitoring services like Sentry

  return violation;
}