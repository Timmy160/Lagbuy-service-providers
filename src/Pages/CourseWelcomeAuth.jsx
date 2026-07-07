import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CourseWelcomeAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

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
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-5 py-10 md:py-0">
      {/* ═══════════════════════════════════════
          WARM SMOKY WHITE BACKGROUND
          ═══════════════════════════════════════ */}
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/8 blur-[100px]" />
        <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/10 blur-[90px]" />
        <div className="absolute -bottom-[15%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-[#1A362B]/5 blur-[80px]" />
      </div>

      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-20 left-[8%] w-3 h-3 rounded-full bg-[#94BD0A]/20 animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-32 right-[12%] w-2 h-2 rounded-full bg-[#FCE67A]/30 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />

      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A362B 1px, transparent 1px), linear-gradient(90deg, #1A362B 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#94BD0A]/30 to-transparent pointer-events-none" />

      {/* ═══════════════════════════════════════
          MAIN CARD
          ═══════════════════════════════════════ */}
      <div 
        ref={cardRef}
        className={`relative w-full max-w-5xl grid md:grid-cols-2 rounded-3xl shadow-[0_8px_60px_rgba(26,54,43,0.08)] border border-white/60 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* LEFT – Brand / Welcome Panel */}
        <div className="bg-gradient-to-br from-[#1A362B] to-[#152b22] text-white p-8 md:p-12 flex flex-col justify-center space-y-6 md:space-y-8 relative overflow-hidden">
          {/* Subtle glow on left panel */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#94BD0A]/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#94BD0A]/10 blur-[60px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-[#94BD0A]/15 border border-[#94BD0A]/30 backdrop-blur-sm px-4 py-1.5 rounded-full mb-2">
              <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#94BD0A]">
                LagBuy Academy
              </span>
            </div>
          </div>

          <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            Learn. Build.<br />
            <span className="text-[#94BD0A]">Earn.</span>
          </h1>

          <p className="relative text-base md:text-lg text-white/70 leading-relaxed max-w-sm">
            Join learners turning creativity into income through high-value digital skills.
          </p>

          <div className="relative pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/15 border border-[#94BD0A]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-white/60">Expert-led video lessons</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/15 border border-[#94BD0A]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-white/60">Community WhatsApp group</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/15 border border-[#94BD0A]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-white/60">Certificate on completion</span>
            </div>
          </div>

          <div className="relative pt-6 border-t border-white/10">
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold">
              LagBuy — Live It. Love It.
            </p>
          </div>
        </div>

        {/* RIGHT – Auth Form Panel */}
        <div className="p-8 md:p-12 lg:p-16 bg-white/70 backdrop-blur-xl relative">
          {/* Shimmer top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 md:mb-10 bg-[#F5F5F0] p-1.5 rounded-xl">
            <button
              onClick={() => setMode("login")}
              className={`
                flex-1 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300
                ${
                  mode === "login"
                    ? "bg-[#1A362B] text-white shadow-md"
                    : "text-[#1A362B]/60 hover:bg-white/50 hover:text-[#1A362B]"
                }
              `}
            >
              Sign In
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`
                flex-1 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300
                ${
                  mode === "signup"
                    ? "bg-[#94BD0A] text-[#1A362B] shadow-md"
                    : "text-[#1A362B]/60 hover:bg-white/50 hover:text-[#1A362B]"
                }
              `}
            >
              Create Account
            </button>
          </div>

          {/* Form Content */}
          {mode === "login" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A362B] mb-2">
                  Welcome back 👋
                </h2>
                <p className="text-[#1A362B]/50 text-sm md:text-base">
                  Enter your credentials to continue learning
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#1A362B]/20 text-[#94BD0A] focus:ring-[#94BD0A]/30" />
                    <span className="text-sm text-[#1A362B]/50">Remember me</span>
                  </label>
                  <button className="text-sm text-[#94BD0A] font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button
                  onClick={() => navigate("/course-details")}
                  className="w-full bg-[#1A362B] text-white py-3.5 rounded-xl font-bold shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {mode === "signup" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1A362B] mb-2">
                  Get started today 🚀
                </h2>
                <p className="text-[#1A362B]/50 text-sm md:text-base">
                  Create your account in 60 seconds
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Joses Frank-Ndubisi"
                    className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A362B]/70 mb-1.5">
                      Confirm
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 bg-white/80 border border-[#1A362B]/10 rounded-xl text-[#1A362B] placeholder-[#1A362B]/25 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/40 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate("/course-details")}
                  className="w-full bg-[#94BD0A] text-[#1A362B] py-3.5 rounded-xl font-bold shadow-[0_4px_20px_rgba(148,189,10,0.3)] hover:bg-[#84a909] hover:shadow-[0_8px_30px_rgba(148,189,10,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-[#1A362B]/40 pt-6 mt-6 border-t border-[#1A362B]/5">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#94BD0A] font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[#1A362B] font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
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

export default CourseWelcomeAuth;