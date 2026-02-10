import React from "react";
import { useNavigate } from "react-router-dom";
import ImageTemp from "../assets/nikhill.jpeg"; // fixed import typo

function CourseDetails() {
  const navigate = useNavigate();

  // Sample course data – you can replace with real props/state later
  const course = {
    title: "Digital Product Masterclass",
    description:
      "Learn how to build, package, and sell profitable digital products from scratch, ebooks, templates, courses, printables, Notion setups, and more. Turn your knowledge into passive income streams.",
    tutor: "Tutor Name",
    duration: "4 Weeks",
    price: "₦45,000",
    skillLevel: "Beginner to Intermediate",
    category: "Digital Products & Entrepreneurship",
    language: "English",
    startDate: "March 10, 2026",
    certificate: "Yes – Shareable Certificate of Completion",
    image: ImageTemp,
  };

  return (
    <div className="min-h-screen bg-[#1A362B]/4 relative overflow-hidden">
      {/* Subtle background texture – consistent across pages */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#94BD0A_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#FCE67A_0%,transparent_45%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-20">
        {/* Hero / Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1A362B] tracking-tight drop-shadow-sm">
            {course.title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left – Image + Highlights */}
          <div className="space-y-8">
            {/* Course Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50 group">
              <img
                src={course.image}
                alt={`${course.title} – Course Preview`}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            </div>

            {/* Quick Stats / Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center px-4 py-2 bg-[#94BD0A]/20 text-[#1A362B] rounded-full text-sm font-medium">
                Beginner Friendly
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-[#FCE67A]/30 text-[#1A362B] rounded-full text-sm font-medium">
                Certificate Included
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-gray-200/80 text-gray-800 rounded-full text-sm font-medium">
                4 Weeks
              </span>
            </div>
          </div>

          {/* Right – Details + CTA */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/60 p-8 md:p-10 lg:p-12 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#1A362B] border-b border-[#94BD0A]/30 pb-4">
                Course Details
              </h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 text-gray-800">
                <div>
                  <dt className="text-sm font-medium text-gray-600">Tutor</dt>
                  <dd className="mt-1 text-base font-semibold">{course.tutor}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Duration</dt>
                  <dd className="mt-1 text-base font-semibold">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Price</dt>
                  <dd className="mt-1 text-2xl font-bold text-[#1A362B]">{course.price}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Skill Level</dt>
                  <dd className="mt-1 text-base font-semibold">{course.skillLevel}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Category</dt>
                  <dd className="mt-1 text-base font-semibold">{course.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Language</dt>
                  <dd className="mt-1 text-base font-semibold">{course.language}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Start Date</dt>
                  <dd className="mt-1 text-base font-semibold">{course.startDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Certificate</dt>
                  <dd className="mt-1 text-base font-semibold">{course.certificate}</dd>
                </div>
              </dl>
            </div>

            {/* CTA Section */}
            <div className="pt-6 border-t border-gray-100">
              <button
                onClick={() => navigate("/payment-success")}
                className={`
                  w-full py-4 px-8 rounded-xl text-lg font-bold shadow-lg
                  bg-[#1A362B] text-white
                  hover:bg-[#1A362B]/95 hover:shadow-xl
                  active:scale-[0.98]
                  transition-all duration-200 flex items-center justify-center gap-3
                `}
              >
                Pay with Paystack
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <p className="text-center mt-4 text-sm text-gray-500">
                Secure payment • Instant access after confirmation
              </p>
            </div>
          </div>
        </div>

        {/* Optional Footer Teaser */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg italic">
            Ready to turn your knowledge into income? Start your journey today.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;