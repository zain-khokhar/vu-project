import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// Portable Button component (no Radix). Keeps the same props shape used in the project:
// props: variant, size, asChild, className, children, and other button props
function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className = "",
  children,
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-light transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    default: "bg-[#6b46ff] text-white hover:bg-[#5a3ee6]",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
    link: "text-[#6b46ff] underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-9 px-4",
    sm: "h-8 rounded-md gap-1.5 px-3",
    lg: "h-10 rounded-md px-6",
    icon: "h-10 w-10 p-0",
  };

  const classes = [base, variants[variant] || variants.default, sizes[size] || sizes.default, className]
    .filter(Boolean)
    .join(" ");

  // support asChild: if true and children is a valid element, clone it with merged props
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: [children.props.className, classes].filter(Boolean).join(" "),
      ...props,
    });
  }

  // default render a button
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function CTA() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">

          {/* Main CTA card */}
          <div className="relative bg-white/40 rounded-2xl sm:rounded-[2rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-16 text-center overflow-hidden shadow-2xl">

            <div className="max-w-3xl mx-auto flex flex-col gap-4 sm:gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/30 w-fit shadow-lg mx-auto">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                <span className="text-xs sm:text-sm bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">🇵🇰 Trusted by 1000+ Pakistani Students</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light bg-gradient-to-br from-[#1a1f36] to-[#667eea] bg-clip-text text-transparent leading-tight">
                Start Your Learning Journey Today
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-700/70 font-light px-2 sm:px-0">
                Join thousands of Pakistani students accessing free educational resources from VU, AIOU, NUST, and all major universities across Pakistan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
                <Button
                  size="lg"
                  asChild
                  className="gap-2 bg-gradient-to-br from-[#6b46ff] to-[#764ba2] text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 w-full sm:w-auto"
                >
                  <Link href="/documents">
                    Browse Documents
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="gap-2 bg-white/30 border-white/50 hover:bg-white/40 transition-all shadow-xl duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  <Link href="/blogs">
                    Explore Resources
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600/60">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                  <span>100% Free Forever</span>
                </div>
                <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-400/30"></div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600/60">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
                  <span>Instant Access</span>
                </div>
                <div className="hidden sm:block h-1 w-1 rounded-full bg-gray-400/30"></div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600/60">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
                  <span>No Registration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;