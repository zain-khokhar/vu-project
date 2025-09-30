import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="antialiased bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
