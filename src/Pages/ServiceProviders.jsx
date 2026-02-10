import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceProviders() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0); // auto-open the first one (Academy)

  const providers = [
    {
      title: "LagBuy Academy",
      description:
        "Master high-income digital skills with verified tutors. From beginner to pro, build real-world income streams.",
      buttonText: "View Courses",
      path: "/academy",
      isActive: true,
    },
    {
      title: "LagBuy Rentals",
      description: "Find and list quality short-term & long-term rentals in Lagos and beyond. Coming soon.",
      buttonText: "Coming Soon",
      isActive: false,
    },
    {
      title: "LagBuy Jobs",
      description: "Connect talent with opportunities. Post jobs or find your next role. Coming soon.",
      buttonText: "Coming Soon",
      isActive: false,
    },
    // Add more later...
  ];

  return (
    <div className="min-h-screen bg-[#1A362B]/4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#94BD0A_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#FCE67A_0%,transparent_45%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A362B] tracking-tight drop-shadow-sm">
            Service Providers
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover the growing ecosystem of services on LagBuy
          </p>
        </div>

        <div className="space-y-4">
          {providers.map((provider, index) => (
            <div
              key={provider.title}
              className={`
                bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/40 
                overflow-hidden transition-all duration-300
                ${openIndex === index ? "ring-2 ring-[#94BD0A]/40" : ""}
              `}
            >
              {/* Header / Trigger */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 md:px-8 py-5 flex items-center justify-between text-left group"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#1A362B] group-hover:text-[#1A362B]/90 transition-colors">
                    {provider.title}
                  </h2>
                  {openIndex !== index && (
                    <p className="mt-1 text-gray-600 text-sm md:text-base line-clamp-1">
                      {provider.description}
                    </p>
                  )}
                </div>

                <svg
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Content (visible when open) */}
              {openIndex === index && (
                <div className="px-6 md:px-8 pb-7 pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed mb-6">{provider.description}</p>

                  {provider.isActive ? (
                    <button
                      onClick={() => navigate(provider.path)}
                      className={`
                        inline-flex items-center gap-2.5
                        bg-[#1A362B] text-white px-7 py-3.5 rounded-xl 
                        font-semibold shadow-md
                        hover:bg-[#1A362B]/92 hover:shadow-lg
                        active:scale-[0.98] transition-all duration-200
                      `}
                    >
                      {provider.buttonText}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2.5 bg-gray-400 text-white px-7 py-3.5 rounded-xl font-semibold cursor-not-allowed"
                    >
                      {provider.buttonText}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}