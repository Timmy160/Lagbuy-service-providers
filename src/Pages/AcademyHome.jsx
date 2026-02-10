import React from "react";
import { useNavigate } from "react-router-dom";
import ImageTemp from "../assets/nikhill.jpeg"; // assuming this is your tutor/course image

function AcademyHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A362B]/4 relative overflow-hidden">
      {/* Subtle background accents – consistent with previous pages */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#94BD0A_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#FCE67A_0%,transparent_45%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-20">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A362B] tracking-tight drop-shadow-sm">
            LagBuy Academy
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Unlock high-income digital skills with expert-led courses
          </p>
        </div>

        {/* Featured Course Card – Improved image clarity & presentation */}
        <div
          className={`
            group mx-auto max-w-3xl bg-white/95 backdrop-blur-sm 
            rounded-2xl shadow-xl border border-gray-200/40 
            overflow-hidden transition-all duration-300 
            hover:shadow-2xl hover:-translate-y-2 hover:border-[#94BD0A]/30
          `}
        >
          {/* Top accent bar */}
          <div className="h-2.5 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A]" />

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* Course Image – Enhanced clarity & sizing */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gray-200/50">
              <img
                src={ImageTemp}
                alt="Digital Product Masterclass – Tutor Nikhill"
                className={`
                  w-full h-auto object-cover 
                  transition-all duration-700 
                  group-hover:scale-105 group-hover:brightness-105
                  min-h-[280px] sm:min-h-[400px] md:min-h-[480px]
                `}
                // These help with clarity:
                // 1. Use loading="eager" if image is above the fold
                // 2. Consider adding width/height attributes if you know dimensions
                loading="eager"
                decoding="async"
              />
              {/* Optional subtle overlay gradient for better text contrast if needed later */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A362B] leading-tight">
                Digital Product Masterclass
              </h2>

              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
                Learn how to create, package, and sell profitable digital products, from ebooks and templates to online courses and print-on-demand assets.
              </p>

              <div className="flex items-center gap-4 text-gray-800">
                <div className="font-semibold">Tutor:</div>
                <div className="text-lg font-medium">Tutor Name</div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/course-auth")}
              className={`
                w-full sm:w-auto inline-flex items-center justify-center gap-3
                bg-[#1A362B] text-white px-8 py-4 rounded-xl 
                font-semibold text-lg shadow-lg
                hover:bg-[#1A362B]/92 hover:shadow-xl
                active:scale-[0.98] transition-all duration-200
              `}
            >
              View Course
              <svg
                className="w-6 h-6 opacity-90 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Teaser for future content */}
        <p className="text-center mt-12 text-gray-600 text-base md:text-lg italic">
          More powerful courses launching soon – stay tuned!
        </p>
      </div>
    </div>
  );
}

export default AcademyHome;