import "./globals.css";
import LayoutContent from "@/components/LayoutContent";

export const metadata = {
  title: "DocLibrary - Free Document Sharing Platform",
  description: "Access thousands of educational documents including handouts, books, notes, and exams. A free platform for students worldwide.",
  keywords: "documents, education, books, notes, exams, handouts, free, student resources",
  author: "DocLibrary",
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
