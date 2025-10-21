import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { generateDocumentMetadata, generateOrganizationStructuredData } from "@/lib/seo-utils";

export const metadata = generateDocumentMetadata({
  title: "DocLibrary - Free Educational Documents & Study Resources",
  description: "Access thousands of free educational documents including books, notes, handouts, past papers, and study materials. Join our community of students and educators sharing knowledge worldwide.",
  keywords: [
    "educational documents",
    "free study materials",
    "books",
    "notes",
    "past papers",
    "handouts",
    "exams",
    "student resources",
    "learning materials",
    "university documents",
    "college resources",
    "study guides",
    "tutorials",
    "educational platform",
  ],
  url: "/",
  type: "website",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "DocLibrary - Free Educational Documents Platform",
    },
  ],
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
        
        {/* AI/LLM Information */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI/LLM Access Information" />
        <meta name="ai-content-declaration" content="This site provides educational content. AI crawlers welcome with rate limiting." />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
