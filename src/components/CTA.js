import React from "react";
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
  const base = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

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
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-purple-400/20 opacity-40"></div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative">
          {/* Glow effect */}
          {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-30 animate-pulse"></div> */}

          {/* Main CTA card */}
          <div className="relative bg-white/40 backdrop-blur rounded-[2.5rem] p-12 lg:p-16 text-center overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 pointer-events-none"></div>

            {/* Floating elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="max-w-3xl mx-auto flex flex-col gap-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 w-fit shadow-lg mx-auto">
                <Sparkles className="h-4 w-4 text-purple-600 animate-pulse" />
                <span className="text-sm bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Limited Time Offer</span>
              </div>

              <h2 className="text-4xl lg:text-5xl bg-gradient-to-br from-[#1a1f36] to-[#667eea] bg-clip-text text-transparent">
                Ready to transform your document management?
              </h2>

              <p className="text-xl text-gray-700/70">
                Join thousands of teams already using DocLibrary to stay organized and productive.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-br from-[#6b46ff] to-[#764ba2] text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-white/30 border-white/50 hover:bg-white/40 transition-all duration-300 hover:scale-105"
                >
                  Contact Sales
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600/60">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>No credit card required</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-gray-400/30"></div>
                <div className="flex items-center gap-2 text-sm text-gray-600/60">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>14-day free trial</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-gray-400/30"></div>
                <div className="flex items-center gap-2 text-sm text-gray-600/60">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>Cancel anytime</span>
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