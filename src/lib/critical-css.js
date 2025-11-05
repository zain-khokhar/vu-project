/**
 * Critical CSS Extraction and Inlining Utility
 * Extracts above-the-fold CSS and inlines it to improve LCP
 */

const CRITICAL_CSS = `
/* Critical CSS - Above the fold styles for initial render */
@import "tailwindcss/base";

/* CSS Variables for critical rendering */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --font-size: 16px;
}

/* Critical body and html styles */
html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

/* Critical layout styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Critical navigation styles */
nav {
  position: relative;
  z-index: 50;
}

/* Critical typography */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 600;
  line-height: 1.2;
}

h1 { font-size: 2.25rem; }
h2 { font-size: 1.875rem; }
h3 { font-size: 1.5rem; }

p {
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

/* Critical button styles */
button {
  cursor: pointer;
  border: none;
  outline: none;
  font-family: inherit;
}

/* Critical link styles */
a {
  color: inherit;
  text-decoration: none;
}

/* Critical utility classes */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Critical responsive utilities */
@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

/* Critical loading states */
.loading {
  opacity: 0.7;
  pointer-events: none;
}
`;

/**
 * Get critical CSS for inlining
 * @returns {string} Critical CSS string
 */
export function getCriticalCSS() {
  return CRITICAL_CSS.trim();
}

/**
 * Load non-critical CSS asynchronously
 * @param {string} href - CSS file URL
 */
export function loadNonCriticalCSS(href) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };

  document.head.appendChild(link);
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.onload = () => {
    fontLink.rel = 'stylesheet';
  };
  document.head.appendChild(fontLink);
}