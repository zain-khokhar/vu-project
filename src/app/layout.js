import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { generateDocumentMetadata, generateOrganizationStructuredData } from "@/lib/seo-utils";

export const metadata = generateDocumentMetadata({
  title: "VUEDU - Free Educational Documents & Study Resources in Pakistan",
  description: "Pakistan's premier educational platform. Access thousands of free educational documents including books, notes, handouts, past papers, and study materials for Pakistani universities like VU, AIOU, NUST, LUMS, and more. Serving students across Karachi, Lahore, Islamabad, and all of Pakistan.",
  keywords: [
    "educational documents pakistan",
    "free study materials pakistan",
    "pakistani university notes",
    "past papers pakistan",
    "handouts pakistan",
    "virtual university pakistan",
    "vu pakistan",
    "aiou study materials",
    "nust resources",
    "lums study guides",
    "karachi university documents",
    "lahore university notes",
    "islamabad study materials",
    "pakistani student resources",
    "urdu study materials",
    "books pakistan",
    "online learning pakistan",
    "pakistan educational platform",
    "pakistani colleges resources",
  ],
  url: "/",
  type: "website",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "VUEDU - Free Educational Documents Platform for Pakistani Students",
    },
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData()),
          }}
        />

        {/* Geographic & Local SEO Meta Tags */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="coverage" content="Pakistan" />
        <meta name="distribution" content="Pakistan" />
        <meta name="target_country" content="PK" />
        <meta name="language" content="English, Urdu" />
        <meta name="audience" content="Pakistani students and educators" />

        {/* AI/LLM Information */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI/LLM Access Information" />
        <meta name="ai-content-declaration" content="This site provides educational content. AI crawlers welcome with rate limiting." />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
