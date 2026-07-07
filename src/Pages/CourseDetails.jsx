import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageTemp from "../assets/nikhill.jpeg";

function CourseDetails() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const course = {
    title: "The Bu$iness of Content Creation",
    description:
      "Turn your creativity into a paycheck. Learn how to build a personal brand, grow an engaged audience, and monetize your content across platforms, from sponsorships and affiliate deals to selling your own products. This isn't just about posting. It's about building a business around what you love to create.",
    tutor: "Joses Frank-Ndubisi",
    duration: "4 Weeks",
    price: "₦45,000",
    skillLevel: "Beginner to Intermediate",
    category: "Content Creation & Digital Entrepreneurship",
    language: "English",
    startDate: "Rolling Enrollment",
    certificate: "Yes – Shareable Certificate of Completion",
    image: ImageTemp,
  };

  const whatYoullLearn = [
    "Build a Strategy that actually works",
    "Film videos that look clean, professional & cohesive",
    "Script & edit faster with a workflow that saves you hours",
    "Post smarter and grow your page",
    "Never run out of ideas again & build your content pillars",
  ];

  const whoThisIsFor = [
    "Aspiring content creators",
    "Digital entrepreneurs",
    "Business owners",
    "Social media influencers",
    "UGC creators",
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
      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        {/* Hero / Header Section */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-[#94BD0A]/10 border border-[#94BD0A]/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#1A362B]/70">
              Live Course
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1A362B] tracking-tight leading-tight">
            {course.title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[#1A362B]/50 max-w-3xl mx-auto leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Column */}
          <div className="space-y-8">
            {/* Course Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-[#1A362B]/5 group">
              <img
                src={course.image}
                alt={`${course.title} – Course Preview`}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A362B]/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Floating price badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-[#94BD0A]/20 px-5 py-2.5 rounded-2xl shadow-lg">
                <div className="text-xs text-[#1A362B]/40 uppercase tracking-wide font-semibold">Course Fee</div>
                <div className="text-2xl font-extrabold text-[#1A362B]">{course.price}</div>
              </div>
            </div>

            {/* Quick Stats / Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#94BD0A]/10 border border-[#94BD0A]/20 text-[#1A362B] rounded-xl text-sm font-semibold">
                <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Beginner Friendly
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FCE67A]/15 border border-[#FCE67A]/30 text-[#1A362B] rounded-xl text-sm font-semibold">
                <svg className="w-4 h-4 text-[#FCE67A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Certificate Included
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-[#1A362B]/10 text-[#1A362B] rounded-xl text-sm font-semibold">
                <svg className="w-4 h-4 text-[#1A362B]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#1A362B]/8 p-6 md:p-8">
              <h3 className="text-lg font-bold text-[#1A362B] mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                What You'll Learn
              </h3>
              <div className="space-y-3">
                {whatYoullLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 rounded-full bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#94BD0A]/20 transition-colors">
                      <svg className="w-3 h-3 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#1A362B]/70 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who This Is For */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#1A362B]/8 p-6 md:p-8">
              <h3 className="text-lg font-bold text-[#1A362B] mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FCE67A]/15 border border-[#FCE67A]/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1A362B]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Who This Is For
              </h3>
              <div className="flex flex-wrap gap-2">
                {whoThisIsFor.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A362B]/5 border border-[#1A362B]/10 rounded-xl text-sm font-medium text-[#1A362B]/70 hover:bg-[#94BD0A]/10 hover:border-[#94BD0A]/20 hover:text-[#1A362B] transition-all duration-200 cursor-default"
                  >
                    <svg className="w-3.5 h-3.5 text-[#94BD0A]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Details + CTA */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(26,54,43,0.06)] border border-white/60 p-8 md:p-10 lg:p-12 space-y-8 relative overflow-hidden h-fit lg:sticky lg:top-8">
            {/* Shimmer top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A362B] border-b border-[#94BD0A]/20 pb-4">
                Course Details
              </h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Tutor</dt>
                  <dd className="text-base font-bold text-[#1A362B] flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#94BD0A]/10 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {course.tutor}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Duration</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Skill Level</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.skillLevel}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Category</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Language</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.language}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Start Date</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.startDate}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Certificate</dt>
                  <dd className="text-base font-bold text-[#1A362B] flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.certificate}
                  </dd>
                </div>
              </dl>
            </div>

            {/* CTA Section */}
            <div className="pt-6 border-t border-[#1A362B]/5">
              <button
                onClick={() => navigate("/payment-success")}
                className="group/btn w-full py-4 px-8 rounded-2xl text-lg font-bold shadow-[0_4px_20px_rgba(26,54,43,0.2)] bg-[#1A362B] text-white hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
              >
                Pay with Paystack
                <svg
                  className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <div className="flex items-center justify-center gap-2 mt-4">
                <svg className="w-4 h-4 text-[#94BD0A]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-sm text-[#1A362B]/30 font-medium">
                  Secure payment • Instant access after confirmation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

export default CourseDetails;