import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import Image from "next/image";

// A lightweight theme hook that toggles a 'dark' class on <html>
function useLocalTheme(defaultTheme = "light") {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  return { theme, toggleTheme };
}

export default function Header({ defaultTheme = "light" }) {
  const { theme, toggleTheme } = useLocalTheme(defaultTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/documents", label: "Documents" },
    { href: "/blogs", label: "Blogs" },
    { href: "/quiz", label: "Quiz" },
    // { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className=" top-0 left-0 right-0 z-50 w-full">
      <div className="bg-white/40 backdrop-blur glass mx-4 max-sm:mx-2 mt-4 rounded-3xl shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-6 max-sm:px-2 lg:px-2">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-lg"> */}
                {/* <BookOpen className="h-5 w-5 text-white" /> */}
                <Image src={"/favicon.png"} height={48} width={64} alt="website logo"/>
              {/* </div> */}
              <Link href="/" className="text-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent hover:opacity-80 transition-opacity">EDU</Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700/70 hover:text-gray-900 transition-all duration-300 hover:scale-105 font-medium text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/30 rounded-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-900" />
              ) : (
                <Menu className="h-5 w-5 text-gray-900" />
              )}
            </button>

            {/* <div className="flex items-center gap-2 sm:gap-3">
              <SimpleButton
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105 h-10 w-10"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M7.05 7.05L5.64 5.64m12.02 0l-1.41 1.41M7.05 16.95l-1.41 1.41" /></svg>
                )}
                <span className="sr-only">Toggle theme</span>
              </SimpleButton>

              <SimpleButton variant="ghost" className="hidden sm:inline-flex hover:bg-white/30 transition-all duration-300 hover:scale-105">Sign In</SimpleButton>

              <SimpleButton className="hidden sm:inline-flex bg-gradient-to-br from-[#6b46ff] to-[#764ba2] text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">Get Started</SimpleButton>
            </div> */}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed bg-white/40 backdrop-blur glass mx-2 mt-2 rounded-3xl shadow-lg">
          <div className="px-2 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-white/30 rounded-lg transition-all duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/30 pt-3 space-y-2">
              <SimpleButton variant="ghost" className="w-full hover:bg-white/30 transition-all duration-300">Sign In</SimpleButton>
              <SimpleButton className="w-full bg-gradient-to-br from-[#6b46ff] to-[#764ba2] text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300">Get Started</SimpleButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export function SimpleButton({
  variant = "default",
  size = "default",
  as: Comp = "button",
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    default: "bg-[#6b46ff] text-white hover:bg-[#5a3ee6]",
    outline: "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
  };

  const sizes = {
    default: "h-9 px-4",
    lg: "h-10 px-6",
    icon: "h-10 w-10 p-0",
  };

  const classes = [base, variants[variant] || variants.default, sizes[size] || sizes.default, className]
    .filter(Boolean)
    .join(" ");

  return <Comp className={classes} {...props} />;
}
