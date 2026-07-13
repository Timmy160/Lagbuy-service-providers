import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageTemp from "../assets/josp1.jpeg";
import TutorImage from "../assets/josp2.jpeg";

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

  const courses = [
    {
      id: "content-creation",
      title: "The Bu$iness of Content Creation",
      description:
        "Turn your creativity into a paycheck. Learn how to build a personal brand, grow an engaged audience, and monetize your content across platforms — from sponsorships and affiliate deals to selling your own products. This isn't just about posting. It's about building a business around what you love to create.",
      image: ImageTemp,
      badge: "Live Course",
      tutor: {
        name: "Joses Frank-Ndubishi",
        image: TutorImage,
        title: "Content Creator & Digital Entrepreneur",
        bio: "Joses has built multiple successful content channels and helped dozens of creators turn their passion into profit. Her practical, no-fluff approach gets results.",
      },
      coaching: {
        title: "1-on-1 Premium Creator Coaching",
        earlyBird: "₦10,000",
        regular: "₦15,000",
        features: [
          "Two private coaching sessions (1 hour each)",
          "Personalized review of your content and current strategy",
          "Clear action plan tailored to your goals",
          "Content planning and storytelling guidance",
          "Brand positioning and growth strategy",
          "Q&A and accountability throughout the coaching period",
        ],
      },
      ctaText: "Enroll Now",
      ctaRoute: "/course-auth?course=content-creation",
    },
    {
      id: "content-audit",
      title: "Content Audit",
      description:
        "A personalized review of your content to help you identify what's holding your growth back. Get expert eyes on your page and a clear roadmap to fix what's broken.",
      image: TutorImage,
      badge: "New",
      tutor: {
        name: "Joses Frank-Ndubishi",
        image: TutorImage,
        title: "Content Creator & Digital Entrepreneur",
        bio: "Joses has built multiple successful content channels and helped dozens of creators turn their passion into profit. Her practical, no-fluff approach gets results.",
      },
      price: "₦5,000",
      features: [
        "In-depth review of your social media page",
        "Bio and profile optimization",
        "Content and storytelling feedback",
        "Branding and positioning review",
        "Personalized recommendations to improve your content",
        "A detailed written report sent to your email",
      ],
      ctaText: "Get Audited",
      ctaRoute: "/course-auth?course=content-audit",
    },
  ];

  const comingSoon = [
    {
      title: "Monetize Your Audience",
      desc: "Turn followers into customers. Pricing, funnels, and passive income.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "The Freelance Blueprint",
      desc: "Land high-ticket clients, negotiate rates, and build a six-figure freelance career.",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-4 6v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2z",
    },
  ];

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

        {/* ═══════════════════════════════════════
            TUTOR PROFILE SECTION
            ═══════════════════════════════════════ */}
        <div className={`mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(26,54,43,0.06)] border border-white/60 p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Tutor Image */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-[#94BD0A]/20 shadow-lg">
                  <img
                    src={TutorImage}
                    alt="Joses Frank-Ndubishi"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#94BD0A] flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Tutor Info */}
              <div className="text-center md:text-left flex-1">
                <div className="text-xs font-bold tracking-widest uppercase text-[#94BD0A] mb-1">Featured Tutor</div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A362B] mb-1">Joses Frank-Ndubishi</h2>
                <p className="text-sm text-[#1A362B]/50 font-medium mb-3">Content Creator & Digital Entrepreneur</p>
                <p className="text-[#1A362B]/60 text-sm md:text-base leading-relaxed max-w-xl">
                  Joses has built multiple successful content channels and helped dozens of creators turn their passion into profit. Her practical, no-fluff approach gets results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            COURSES SECTION
            ═══════════════════════════════════════ */}
        <div className="space-y-12">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div
                className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(26,54,43,0.06),0_2px_8px_rgba(26,54,43,0.04)] border border-white/60 overflow-hidden transition-all duration-500 hover:shadow-[0_12px_60px_rgba(148,189,10,0.12),0_4px_12px_rgba(26,54,43,0.06)] hover:border-[#94BD0A]/20 hover:-translate-y-1"
              >
                <div className="h-1.5 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

                <div className="p-6 sm:p-8 md:p-10 space-y-8">
                  
                  {/* Course Image */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#1A362B]/5 group-hover:ring-[#94BD0A]/15 transition-all duration-500">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-105 min-h-[280px] sm:min-h-[400px] md:min-h-[480px]"
                      loading="eager"
                      decoding="async"
                    />
                    
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

                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#94BD0A]/20 px-3 py-1.5 rounded-full shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
                      <span className="text-xs font-bold text-[#1A362B] uppercase tracking-wide">{course.badge}</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="space-y-5">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A362B] leading-tight">
                      {course.title}
                    </h2>

                    <p className="text-[#1A362B]/60 text-base sm:text-lg md:text-xl leading-relaxed">
                      {course.description}
                    </p>

                    {/* Tutor mini card inside course */}
                    <div className="flex items-center gap-3 p-4 bg-[#94BD0A]/5 border border-[#94BD0A]/10 rounded-xl">
                      <img
                        src={course.tutor.image}
                        alt={course.tutor.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#94BD0A]/20"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#1A362B]">{course.tutor.name}</div>
                        <div className="text-xs text-[#1A362B]/50">{course.tutor.title}</div>
                      </div>
                    </div>

                    {/* Course 1: Coaching Add-on */}
                    {course.coaching && (
                      <div className="bg-[#FCE67A]/10 border border-[#FCE67A]/20 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[#FCE67A]/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#1A362B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-[#1A362B]">{course.coaching.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="bg-[#94BD0A] text-white px-4 py-2 rounded-xl">
                            <span className="text-xs uppercase tracking-wide font-semibold opacity-80">Early Bird</span>
                            <div className="text-xl font-extrabold">{course.coaching.earlyBird}</div>
                          </div>
                          <div className="bg-white/60 border border-[#1A362B]/10 px-4 py-2 rounded-xl">
                            <span className="text-xs uppercase tracking-wide font-semibold text-[#1A362B]/40">Regular</span>
                            <div className="text-xl font-extrabold text-[#1A362B]">{course.coaching.regular}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-[#1A362B]/70">What's included:</p>
                          {course.coaching.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-sm text-[#1A362B]/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Course 2: Audit Features */}
                    {course.features && course.price && (
                      <div className="bg-[#94BD0A]/5 border border-[#94BD0A]/10 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/10 flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                              </svg>
                            </div>
                            <h3 className="text-lg font-bold text-[#1A362B]">What's included:</h3>
                          </div>
                          <div className="bg-[#94BD0A] text-white px-4 py-2 rounded-xl">
                            <span className="text-xs uppercase tracking-wide font-semibold opacity-80">Price</span>
                            <div className="text-xl font-extrabold">{course.price}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {course.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-sm text-[#1A362B]/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(course.ctaRoute)}
                    className="group/btn w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1A362B] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:bg-[#152b22] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    {course.ctaText}
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            COMING SOON SECTION
            ═══════════════════════════════════════ */}
        <div className={`mt-16 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-[#1A362B]/40 uppercase tracking-widest">Coming Soon</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {comingSoon.map((course) => (
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