import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseWelcomeAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // login | signup

  return (
    <div className="min-h-screen bg-[#1A362B]/4 relative overflow-hidden flex items-center justify-center px-5 py-10 md:py-0">
      {/* Subtle background texture – matching previous pages */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,#94BD0A_0%,transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,#FCE67A_0%,transparent_40%)]" />
      </div>

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden">
        {/* LEFT – Brand / Welcome Panel */}
        <div className="bg-gradient-to-br from-[#1A362B] to-[#1A362B]/90 text-white p-8 md:p-12 flex flex-col justify-center space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2">
            <span className="bg-[#FCE67A] text-[#1A362B] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
              LagBuy Academy
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Learn. Build. Earn.
          </h1>

          <p className="text-base md:text-lg opacity-90 leading-relaxed">
            Join thousands of learners turning knowledge into income through high-value digital skills.
          </p>

          <div className="pt-4">
            <p className="text-sm opacity-80 italic">
              “The best investment is in yourself.” – Start today.
            </p>
          </div>
        </div>

        {/* RIGHT – Auth Form Panel */}
        <div className="p-8 md:p-12 lg:p-16 bg-white/70 backdrop-blur-sm">
          {/* Mode Toggle */}
          <div className="flex gap-3 mb-8 md:mb-10 bg-gray-100/80 p-1.5 rounded-xl">
            <button
              onClick={() => setMode("login")}
              className={`
                flex-1 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300
                ${
                  mode === "login"
                    ? "bg-[#1A362B] text-white shadow-md"
                    : "text-gray-700 hover:bg-white/50"
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
                    : "text-gray-700 hover:bg-white/50"
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
                <p className="text-gray-600 text-sm md:text-base">
                  Enter your credentials to continue learning
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                  />
                </div>

                <button
                  onClick={() => navigate("/course-details")}
                  className="w-full bg-[#1A362B] text-white py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#1A362B]/95 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
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
                <p className="text-gray-600 text-sm md:text-base">
                  Create your account in 60 seconds
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Timilehin"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Confirm
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/40 focus:border-[#94BD0A]/60 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate("/course-details")}
                  className="w-full bg-[#94BD0A] text-[#1A362B] py-3.5 rounded-xl font-semibold shadow-md hover:bg-[#94BD0A]/90 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 pt-4">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#94BD0A] font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[#1A362B] font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseWelcomeAuth;