import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServiceProviders() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const providers = [
    {
      title: "LagBuy Academy",
      description:
        "Master high-income digital skills with verified tutors. From beginner to pro, build real-world income streams.",
      buttonText: "View Courses",
      path: "/academy",
      isActive: true,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.02 12.02 0 0121 12c0 3.03-1.13 5.8-3 7.9M12 14L5.84 10.58A12.02 12.02 0 003 12c0 3.03 1.13 5.8 3 7.9M12 14v7"
        />
      ),
    },
    {
      title: "LagBuy Rentals",
      description: "Find and list quality short-term & long-term rentals in Lagos and beyond. Coming soon.",
      buttonText: "Coming Soon",
      isActive: false,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 12l2-2m0 0l7-7 7 7m-9-7v10m9-8l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1m-6 0h6"
        />
      ),
    },
    {
      title: "LagBuy Jobs",
      description: "Connect talent with opportunities. Post jobs or find your next role. Coming soon.",
      buttonText: "Coming Soon",
      isActive: false,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m-4 6v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2H6a2 2 0 00-2 2z"
        />
      ),
    },
  ];

  const liveCount = providers.filter((p) => p.isActive).length;
  const comingCount = providers.length - liveCount;

  return (
    <div className="min-h-screen bg-[#1A362B] relative overflow-hidden">
      {/* ═══════════════════════════════════════
          CATCHY ORGANIC BACKGROUND LAYERS
          ═══════════════════════════════════════ */}
      
      {/* Layer 1: Large soft organic blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#94BD0A]/20 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-[#FCE67A]/15 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-[10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#94BD0A]/10 blur-[90px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Layer 2: Subtle mesh/noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 3: Floating organic shapes */}
      <svg className="absolute top-20 left-10 w-32 h-32 text-[#94BD0A]/20 animate-bounce" style={{ animationDuration: '6s' }} viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" />
      </svg>
      <svg className="absolute top-40 right-20 w-24 h-24 text-[#FCE67A]/20 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" />
      </svg>
      <svg className="absolute bottom-32 left-[15%] w-20 h-20 text-[#94BD0A]/15 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }} viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" />
      </svg>

      {/* Layer 4: Diagonal accent stripe */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-bl from-[#94BD0A]/10 via-transparent to-transparent pointer-events-none" />

      {/* Layer 5: Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FCE67A 1px, transparent 1px), linear-gradient(90deg, #FCE67A 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ═══════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════ */}
      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        
        {/* Hero Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#94BD0A]/20 border border-[#94BD0A]/40 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#94BD0A]">
              LagBuy Ecosystem
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Service<br className="sm:hidden" /> Providers
          </h1>
          
          <p className="mt-5 text-lg sm:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
            Discover the growing ecosystem of services built for you on LagBuy
          </p>
        </div>

        {/* Status Pills */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#94BD0A] animate-pulse shadow-[0_0_10px_#94BD0A]" />
            <span className="text-sm font-semibold text-white">{liveCount} live now</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FCE67A] shadow-[0_0_10px_#FCE67A]" />
            <span className="text-sm font-semibold text-white/60">{comingCount} launching soon</span>
          </div>
        </div>

        {/* Accordion Cards */}
        <div className="space-y-5">
          {providers.map((provider, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={provider.title}
                className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
                  isOpen
                    ? "bg-white/10 backdrop-blur-xl border border-[#94BD0A]/40 shadow-[0_0_40px_rgba(148,189,10,0.15)]"
                    : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20"
                } ${!provider.isActive ? "opacity-80" : ""}`}
              >
                {/* Card glow effect when open */}
                {isOpen && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#94BD0A]/5 via-transparent to-[#FCE67A]/5 pointer-events-none" />
                )}

                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="relative w-full px-6 md:px-8 py-6 flex items-center gap-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#94BD0A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A362B] rounded-3xl"
                >
                  {/* Icon with glow */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      provider.isActive 
                        ? "bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] shadow-[0_0_20px_rgba(148,189,10,0.3)]" 
                        : "bg-white/10"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${provider.isActive ? "text-[#1A362B]" : "text-white/40"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {provider.icon}
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        {provider.title}
                      </h2>
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                          provider.isActive
                            ? "bg-[#94BD0A]/20 text-[#94BD0A] border-[#94BD0A]/40"
                            : "bg-[#FCE67A]/10 text-[#FCE67A] border-[#FCE67A]/30"
                        }`}
                      >
                        {provider.isActive ? "Live" : "Soon"}
                      </span>
                    </div>
                    {!isOpen && (
                      <p className="mt-1.5 text-white/40 text-sm line-clamp-1">
                        {provider.description}
                      </p>
                    )}
                  </div>

                  {/* Animated chevron */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-[#94BD0A]/20 rotate-180" : "bg-white/5"
                  }`}>
                    <svg
                      className="w-5 h-5 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="relative px-6 md:px-8 pb-7 pt-2 pl-[5.5rem] md:pl-[6.5rem] border-t border-white/10">
                    <p className="text-white/60 leading-relaxed mb-6 text-base">{provider.description}</p>

                    {provider.isActive ? (
                      <button
                        onClick={() => navigate(provider.path)}
                        className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-[#94BD0A] to-[#7a9d08] text-[#1A362B] px-8 py-3.5 rounded-2xl font-bold text-base shadow-[0_0_30px_rgba(148,189,10,0.3)] hover:shadow-[0_0_40px_rgba(148,189,10,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCE67A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A362B]"
                      >
                        {provider.buttonText}
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2.5 bg-white/5 text-white/30 px-8 py-3.5 rounded-2xl font-bold cursor-not-allowed border border-white/5"
                      >
                        {provider.buttonText}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-white/20 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/20" />
            <span>LagBuy — Live It. Love It.</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}