export function generateCSPHeader(nonce, isDevelopment = false) {
  const directives = [
    "default-src 'self'",

    isDevelopment
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com"
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com`,

    "style-src 'self' 'unsafe-inline'",

    "img-src 'self' data: https://res.cloudinary.com",

    "connect-src 'self' https://res.cloudinary.com https://www.google-analytics.com",

    "frame-src 'self' https://drive.google.com https://docs.google.com https://www.googletagmanager.com",

    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
  ];

  if (!isDevelopment) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}
