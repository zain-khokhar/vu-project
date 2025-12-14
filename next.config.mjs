/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slash configuration - ensures consistent URLs
  trailingSlash: false, // URLs without trailing slashes (e.g., /about instead of /about/)

  // Skip trailing slash redirect for specific paths if needed
  skipTrailingSlashRedirect: false,

  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.w3.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mozilla.github.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.adobe.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techolyze.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Configure allowed quality values for images
    qualities: [75, 85],
    // Disable image optimization for external images to prevent 500 errors
    unoptimized: true,
  },
};

export default nextConfig;
