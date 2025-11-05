import React from "react";
import { FileSearch, Users, Shield, Zap, FolderTree, Cloud } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Smart Search",
    description: "Find any document instantly with powerful search and filtering capabilities.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: FolderTree,
    title: "Organized Structure",
    description: "Create custom folders and hierarchies that match your workflow.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share documents, collaborate in real-time, and manage permissions easily.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with industry security standards.",
    gradient: "from-red-500 to-orange-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Upload, access, and share documents at incredible speeds.",
    gradient: "from-yellow-500 to-amber-500"
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Access your documents anywhere, anytime, from any device.",
    gradient: "from-indigo-500 to-purple-500"
  }
];

export function Features() {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      {/* Background decoration */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
       */}
        <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 w-fit shadow-lg mb-6 mx-auto">
            <span className="h-2 w-2 rounded-full bg-purple-500  "></span>
            <span className="text-sm bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl mb-4 font-light bg-gradient-to-br from-[#1a1f36] to-[#667eea] bg-clip-text text-transparent">
            Everything you need to manage documents
          </h2>
          <p className="text-xl text-gray-700/70 max-w-2xl mx-auto">
            Powerful features designed to make document management simple and efficient
          </p>
        </div>
        
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl group"
              >
                <div className="flex flex-col gap-5">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;


{/* <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Liquid
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-normal">
              Experience the pinnacle of digital craftsmanship with our macOS-inspired liquid interface
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:border-white/100 hover:bg-white/80 overflow-hidden hover:scale-105 group-hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/60 via-blue-600/50 to-blue-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/60 shadow-2xl">
                  <BookOpen className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-3">Curated Excellence</h3>
                <p className="text-gray-700 leading-relaxed text-base font-light">
                  Every document undergoes rigorous expert review. We prioritize quality over quantity, ensuring only the finest educational content reaches our platform.
                </p>
              </div>
            </div>

            <div className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:border-white/100 hover:bg-white/80 overflow-hidden hover:scale-105 group-hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-green-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/60 via-green-600/50 to-green-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 border border-white/60 shadow-2xl">
                  <Download className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-3">Instant Velocity</h3>
                <p className="text-gray-700 leading-relaxed text-base font-light">
                  Lightning-fast downloads with zero registration barriers. Experience the smoothest content access with our optimized delivery system.
                </p>
              </div>
            </div>

            <div className="group relative p-8 backdrop-blur-3xl bg-gradient-to-br from-white/70 via-white/60 to-white/50 rounded-3xl border border-white/90 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:border-white/100 hover:bg-white/80 overflow-hidden hover:scale-105 group-hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:  transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/60 via-purple-600/50 to-purple-700/60 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/60 shadow-2xl">
                  <Users className="h-7 w-7 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-2xl font-normal text-gray-900 mb-3">Global Network</h3>
                <p className="text-gray-700 leading-relaxed text-base font-light">
                  Connect with millions of learners worldwide. Share knowledge, collaborate on projects, and grow together in our vibrant educational ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}