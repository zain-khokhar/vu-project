import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/documents", label: "Documents" },
    { href: "/blogs", label: "Blogs" },
    { href: "/quiz", label: "Quiz" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="top-0 left-0 right-0 z-50 w-full">
      <div className="bg-white/40 backdrop-blur glass mx-4 max-sm:mx-2 mt-4 rounded-3xl shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-6 max-sm:px-2 lg:px-2">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image src={"/favicon.png"} height={48} width={48} alt="website logo" />
              <Link href="/" className="text-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                EDU
              </Link>
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

            {/* Mobile Menu - Pure CSS */}
            <div className="lg:hidden group/menu">
              <input
                type="checkbox"
                id="mobile-menu-toggle"
                className="hidden peer"
              />

              {/* Menu Button */}
              <label
                htmlFor="mobile-menu-toggle"
                className="cursor-pointer p-2 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <span className="group-has-[:checked]/menu:hidden">
                  <Menu className="h-5 w-5 text-gray-900" />
                </span>
                <span className="hidden group-has-[:checked]/menu:block">
                  <X className="h-5 w-5 text-gray-900" />
                </span>
              </label>

              {/* Backdrop - click to close */}
              <label
                htmlFor="mobile-menu-toggle"
                className="hidden group-has-[:checked]/menu:block fixed inset-0 z-40 cursor-default"
              />

              {/* Mobile Menu Dropdown */}
              <div className="hidden group-has-[:checked]/menu:block fixed left-2 right-2 top-28 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/50 z-50">
                <nav className="px-4 py-6 space-y-2">
                  {navLinks.map((link) => (
                    <label
                      key={link.href}
                      htmlFor="mobile-menu-toggle"
                      className="block cursor-pointer"
                    >
                      <a
                        href={link.href}
                        className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 rounded-xl transition-all duration-300 font-medium text-sm"
                      >
                        {link.label}
                      </a>
                    </label>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
