"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isQuizPage = pathname?.startsWith("/quiz/");

  useEffect(() => {
    const body = document.body;
    if (isQuizPage) {
      body.className = "antialiased min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50";
    } else {
      body.className = "antialiased min-h-screen flex flex-col bg-gray-50";
    }
  }, [isQuizPage]);

  return (
    <>
      {!isQuizPage && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isQuizPage && <Footer />}
    </>
  );
}