'use client';

/**
 * CSS Optimizer Component
 * Handles non-blocking CSS loading for better LCP
 */

import { useEffect } from 'react';

export default function CSSOptimizer() {
  useEffect(() => {
    // Load non-critical CSS asynchronously after initial render
    const loadNonCriticalCSS = () => {
      // Load additional stylesheets that aren't critical for initial render
      const stylesheets = [
        // Add any additional CSS files here that can be loaded asynchronously
        // For example: '/css/components.css', '/css/utilities.css'
      ];

      stylesheets.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = () => {
          link.media = 'all';
        };
        document.head.appendChild(link);
      });
    };

    // Load non-critical CSS after a small delay to ensure initial render is complete
    const timer = setTimeout(loadNonCriticalCSS, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}