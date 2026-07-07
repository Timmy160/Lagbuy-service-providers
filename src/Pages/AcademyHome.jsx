import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageTemp from "../assets/nikhill.jpeg";

function AcademyHome() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden">
      {/* ═══════════════════════════════════════
          WARM SMOKY WHITE BACKGROUND
          ═══════════════════════════════════════ */}
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/8 blur-[100px]" />
        <div className="absolute top-[30%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/10 blur-[90px]" />
        <div className="absolute -bottom-[10%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-[#1A362B]/5 blur-[80px]" />
        <div className="absolute top-[60%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-[#94BD0A]/5 blur-[70px]" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-32 left-[10%] w-3 h-3 rounded-full bg-[#94BD0A]/20 animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute top-56 right-[15%] w-2 h-2 rounded-full bg-[#FCE67A]/30 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      <div className="absolute bottom-48 left-[25%] w-4 h-4 rounded-full bg-[#94BD0A]/15 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }} />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A362B 1px, transparent 1px), linear-gradient(90deg, #1A362B 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#94BD0A]/30 to-transparent pointer-events-none" />

      {/* ═══════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════ */}
      <div ref={sectionRef} className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        {/* Header */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-[#94BD0A]/10 border border-[#94BD0A]/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#1A362B]/70">
              Now Enrolling
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#1A362B] tracking-tight leading-tight">
            LagBuy Academy
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[#1A362B]/50 max-w-2xl mx-auto leading-relaxed">
            Learn the skills that pay. Real courses, real tutors, real results.
          </p>
        </div>

        {/* Featured Course Card */}
        <div className={`mx-auto max-w-3xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div
            className={`
              group 
              bg-white/70 backdrop-blur-xl 
              rounded-3xl 
              shadow-[0_8px_40px_rgba(26,54,43,0.06),0_2px_8px_rgba(26,54,43,0.04)] 
              border border-white/60 
              overflow-hidden transition-all duration-500 
              hover:shadow-[0_12px_60px_rgba(148,189,10,0.12),0_4px_12px_rgba(26,54,43,0.06)] 
              hover:border-[#94BD0A]/20
              hover:-translate-y-1
            `}
          >
            <div className="h-1.5 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

            <div className="p-6 sm:p-8 md:p-10 space-y-8">
              
              {/* Course Image with Drama */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#1A362B]/5 group-hover:ring-[#94BD0A]/15 transition-all duration-500">
                <img
                  src={ImageTemp}
                  alt="The Bu$iness of Content Creation"
                  className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 min-h-[280px] sm:min-h-[400px] md:min-h-[480px]"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A362B]/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Preview badge on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    <svg className="w-5 h-5 text-[#94BD0A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-sm font-bold text-[#1A362B]">Preview Course</span>
                  </div>
                </div>

                {/* Live badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#94BD0A]/20 px-3 py-1.5 rounded-full shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
                  <span className="text-xs font-bold text-[#1A362B] uppercase tracking-wide">Live Course</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A362B] leading-tight">
                  The Bu$iness of Content Creation
                </h2>

                <p className="text-[#1A362B]/60 text-base sm:text-lg md:text-xl leading-relaxed">
                  Turn your creativity into a paycheck. Learn how to build a personal brand, grow an engaged audience, and monetize your content across platforms, from sponsorships and affiliate deals to selling your own products. This isn't just about posting. It's about building a business around what you love to create.
                </p>

                <div className="flex items-center gap-3 text-[#1A362B]/70">
                  <div className="w-10 h-10 rounded-full bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#1A362B]/40 uppercase tracking-wide font-semibold">Instructor</div>
                    <div className="text-base font-semibold text-[#1A362B]">Joses Frank-Ndubisi</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/course-auth")}
                className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1A362B] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:bg-[#152b22] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Enroll Now
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className={`mt-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-[#1A362B]/40 uppercase tracking-widest">Coming Soon</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { 
                title: "Monetize Your Audience", 
                desc: "Turn followers into customers. Pricing, funnels, and passive income.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              },
              { 
                title: "The Freelance Blueprint", 
                desc: "Land high-ticket clients, negotiate rates, and build a six-figure freelance career.",
                icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-4 6v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2z" 
              },
            ].map((course) => (
              <div
                key={course.title}
                className="group bg-white/50 backdrop-blur-md rounded-2xl border border-[#1A362B]/8 p-6 hover:bg-white/80 hover:border-[#94BD0A]/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE67A]/20 border border-[#FCE67A]/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#1A362B]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={course.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#1A362B] mb-1">{course.title}</h4>
                    <p className="text-sm text-[#1A362B]/40">{course.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-[#1A362B]/20 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#1A362B]/20" />
            <span>LagBuy — Live It. Love It.</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#1A362B]/20" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default AcademyHome;