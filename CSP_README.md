# Content Security Policy (CSP) Implementation

This document explains the Content Security Policy implementation in the VUEDU project to protect against XSS attacks.

## Overview

A Content Security Policy (CSP) is implemented to significantly reduce the risk of cross-site scripting (XSS) attacks by restricting which resources can be loaded and executed on the website.

## Implementation Details

### CSP Header Configuration

The CSP is configured in `src/middleware.js` and uses the utility functions in `src/lib/csp.js` for maintainability.

**Key Directives:**
- `default-src 'self'` - Only allow resources from the same origin
- `script-src 'self' 'unsafe-inline' 'unsafe-eval'` - Allow same-origin scripts, inline scripts (required for Next.js), and eval
- `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` - Allow styles from same origin, inline styles, and Google Fonts
- `img-src 'self' data: https: blob:` - Allow images from same origin, data URIs, HTTPS, and blob URLs
- `connect-src 'self' https://res.cloudinary.com https://drive.google.com` - Allow connections to Cloudinary and Google Drive
- `frame-src 'self' https://drive.google.com https://docs.google.com` - Allow embedding Google Drive documents
- `object-src 'none'` - Block all object/embed elements
- `frame-ancestors 'none'` - Prevent clickjacking attacks
- `report-uri /api/csp-report` - Send violation reports to our endpoint

### Environment-Specific Configuration

- **Development**: More permissive to allow Next.js development features
- **Production**: Includes `upgrade-insecure-requests` to force HTTPS

## Violation Reporting

CSP violations are reported to `/api/csp-report` endpoint, which logs violations for monitoring and policy refinement.

### Report Structure

```json
{
  "csp-report": {
    "document-uri": "https://vuedu.dev/page",
    "violated-directive": "script-src",
    "effective-directive": "script-src",
    "original-policy": "script-src 'self' 'unsafe-inline'",
    "blocked-uri": "https://malicious-site.com/script.js",
    "status-code": 200
  }
}
```

## Maintenance Guidelines

### Adding New External Resources

When adding new external resources (CDNs, APIs, etc.), update the CSP directives:

1. **Scripts**: Add to `script-src`
2. **Styles**: Add to `style-src`
3. **Fonts**: Add to `font-src`
4. **Images**: Add to `img-src`
5. **API Calls**: Add to `connect-src`
6. **Embeds/Frames**: Add to `frame-src`

### Testing CSP Changes

1. Test in development environment first
2. Check browser console for CSP violations
3. Monitor `/api/csp-report` endpoint for violation reports
4. Test all features that use external resources

### Monitoring Violations

- Check server logs for CSP violation reports
- Set up alerts for critical violations in production
- Regularly review and refine the policy based on legitimate use cases

## Security Benefits

1. **XSS Protection**: Prevents injection of malicious scripts
2. **Clickjacking Prevention**: `frame-ancestors 'none'` blocks iframe embedding
3. **Data Exfiltration Prevention**: Restricts external connections
4. **Resource Loading Control**: Only allows approved resource sources

## Troubleshooting

### Common Issues

1. **Next.js Development Features**: May require `'unsafe-eval'` for hot reloading
2. **Inline Styles/Scripts**: Next.js uses inline styles, requiring `'unsafe-inline'`
3. **External Fonts/Images**: Must be explicitly allowed in CSP

### Debugging

1. Check browser developer tools for CSP violation messages
2. Review server logs for detailed violation reports
3. Use CSP evaluator tools to validate policy syntax

## References

- [MDN CSP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)