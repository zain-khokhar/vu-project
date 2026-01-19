import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/documents", label: "Documents", hasDropdown: true },
    { href: "/blogs", label: "Blogs" },
    { href: "/quiz", label: "Quiz" },
    { href: "/contact", label: "Contact" },
  ];

  const DOCUMENT_TYPES = [
    { value: 'book', label: 'Books' },
    { value: 'note', label: 'Notes' },
    { value: 'handout', label: 'Handouts' },
    { value: 'pastpaper', label: 'Past Papers' },
    { value: 'assignment', label: 'Assignments' },
    { value: 'exam', label: 'Exams' },
    { value: 'mcqs', label: 'MCQs' },
    { value: 'syllabus', label: 'Syllabus' },
  ];

  return (
    <header id="navbar" className="top-0 left-0 sticky right-0 z-50 w-full">
      <div className="bg-white shadow-2xl rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 max-sm:px-2 lg:px-2">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image src={"/favicon.svg"} height={48} width={48} alt="website logo" />
              <Link href="/" className="text-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                EDU
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.href} className="relative group/dropdown">
                    <Link
                      href={link.href}
                      className="text-gray-700/70 hover:text-gray-900 transition-all duration-300 hover:scale-105 font-medium text-sm"
                    >
                      {link.label}
                    </Link>

                    {/* Dropdown Menu - Pure CSS with :hover */}
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-purple-500/20 border border-white/90 py-3 px-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                      <div className="px-3 py-2 mb-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Document Types</p>
                      </div>

                      {/* 2 Column Grid */}
                      <div className="grid grid-cols-2 gap-1">
                        {DOCUMENT_TYPES.map((type) => (
                          <Link
                            key={type.value}
                            href={`/documents?type=${type.value}`}
                            className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 rounded-lg transition-all duration-200 font-medium"
                          >
                            {type.label}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 mt-2 pt-2 px-3">
                        <Link
                          href="/documents"
                          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium inline-block"
                        >
                          View All Documents →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-700/70 hover:text-gray-900 transition-all duration-300 hover:scale-105 font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                )
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
              <div className="hidden group-has-[:checked]/menu:block fixed left-2 right-2 top-28 bg-white rounded-3xl shadow-2xl shadow-purple-500/20 border border-white/50 z-50 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <nav className="px-4 py-6 space-y-2">
                  {navLinks.map((link) => (
                    link.hasDropdown ? (
                      <details key={link.href} className="group/docs">
                        <summary className="cursor-pointer list-none px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 rounded-xl transition-all duration-300 font-medium text-sm flex items-center justify-between">
                          <span>{link.label}</span>
                          <svg
                            className="h-4 w-4 transition-transform duration-200 group-open/docs:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>

                        {/* Document Types - 2 Column Grid for Mobile */}
                        <div className="pl-2 pt-2 pb-2">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Types</p>
                          <div className="grid grid-cols-2 gap-1">
                            {DOCUMENT_TYPES.map((type) => (
                              <label
                                key={type.value}
                                htmlFor="mobile-menu-toggle"
                                className="block cursor-pointer"
                              >
                                <a
                                  href={`/documents?type=${type.value}`}
                                  className="block px-3 py-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium"
                                >
                                  {type.label}
                                </a>
                              </label>
                            ))}
                          </div>

                          <div className="mt-2 pt-2 border-t border-gray-100 px-2">
                            <label
                              htmlFor="mobile-menu-toggle"
                              className="block cursor-pointer"
                            >
                              <a
                                href="/documents"
                                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium inline-block"
                              >
                                View All Documents →
                              </a>
                            </label>
                          </div>
                        </div>
                      </details>
                    ) : (
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
                    )
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