import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

// Toast Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000); // Extended to 6s for longer messages
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-[#94BD0A]" : type === "info" ? "bg-blue-500" : "bg-red-500";
  const icon = type === "success" ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ) : type === "info" ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-start gap-3 ${bgColor} text-white px-5 py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.15)] animate-[slideIn_0.4s_ease-out] max-w-sm`}>
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <p className="text-sm font-semibold leading-relaxed">{message}</p>
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100 transition flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

export default function CourseWelcomeAuth() {
  const { user, signup, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Redirect after login/signup
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || "/course-details";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  function getFriendlyError(errorCode) {
    const errors = {
      "auth/invalid-credential": "Invalid email or password. Please try again.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect password.",
      "auth/email-already-in-use": "An account with this email already exists.",
      "auth/weak-password": "Password must be at least 6 characters.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
      "auth/network-request-failed": "Network error. Check your connection.",
    };
    return errors[errorCode] || "Something went wrong. Please try again.";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        setToast({ message: "Welcome back! Redirecting...", type: "success" });
      } else {
        await signup(email, password, displayName);
        setToast({ message: "Account created! Welcome to LagBuy Academy.", type: "success" });
      }
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (err) {
      setToast({ message: getFriendlyError(err.code), type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setToast({ 
        message: "Password reset link sent! Check your inbox and spam/junk folder.", 
        type: "success" 
      });
      setEmail("");
      setTimeout(() => {
        setIsForgotPassword(false);
      }, 3000);
    } catch (err) {
      setToast({ message: getFriendlyError(err.code), type: "error" });
    } finally {
      setLoading(false);
    }
  }

  // ─── FORGOT PASSWORD VIEW ───
  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/6 blur-[120px]" />
          <div className="absolute top-[40%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/8 blur-[100px]" />
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] shadow-[0_8px_30px_rgba(148,189,10,0.3)] mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-[#1A362B] tracking-tight">LagBuy Academy</h1>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(26,54,43,0.08)] border border-white/60 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
            
            <div className="p-8 md:p-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FCE67A]/20 mb-4">
                  <svg className="w-6 h-6 text-[#1A362B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1A362B]">Reset Your Password</h2>
                <p className="text-sm text-[#1A362B]/40 mt-1">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">
                    Email Address
                  </label>
                  <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                    focusedField === 'reset-email' ? 'border-[#94BD0A] shadow-[0_0_0_4px_rgba(148,189,10,0.1)]' : 'border-[#1A362B]/10'
                  }`}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A362B]/20">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('reset-email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#1A362B] text-sm font-medium placeholder-[#1A362B]/20 outline-none"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 rounded-2xl text-sm font-bold bg-[#1A362B] text-white shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsForgotPassword(false);
                    setToast(null);
                  }}
                  className="text-sm text-[#1A362B]/40 hover:text-[#1A362B]/70 font-medium transition flex items-center justify-center gap-1 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Log In
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
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
          @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ─── LOGIN / SIGNUP VIEW ───
  return (
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/6 blur-[120px]" />
        <div className="absolute top-[40%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/8 blur-[100px]" />
        <div className="absolute -bottom-[10%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-[#1A362B]/4 blur-[90px]" />
      </div>
      <div className="absolute top-24 left-[12%] w-3 h-3 rounded-full bg-[#94BD0A]/20 animate-bounce" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-40 right-[18%] w-2 h-2 rounded-full bg-[#FCE67A]/25 animate-bounce" style={{ animationDuration: '9s', animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-[8%] w-4 h-4 rounded-full bg-[#94BD0A]/10 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] shadow-[0_8px_30px_rgba(148,189,10,0.3)] mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A362B] tracking-tight">LagBuy Academy</h1>
          <p className="text-sm text-[#1A362B]/40 mt-1">Learn. Create. Monetize.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(26,54,43,0.08)] border border-white/60 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

          <div className="p-8 md:p-10">
            <div className="flex bg-[#F5F5F0] rounded-2xl p-1 mb-8">
              <button
                onClick={() => { setIsLogin(true); setToast(null); }}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isLogin
                    ? "bg-[#1A362B] text-white shadow-md"
                    : "text-[#1A362B]/40 hover:text-[#1A362B]/70"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => { setIsLogin(false); setToast(null); }}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  !isLogin
                    ? "bg-[#1A362B] text-white shadow-md"
                    : "text-[#1A362B]/40 hover:text-[#1A362B]/70"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#1A362B]">
                {isLogin ? "Welcome Back" : "Create Your Account"}
              </h2>
              <p className="text-sm text-[#1A362B]/40 mt-1">
                {isLogin ? "Continue your learning journey" : "Start building your brand today"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className={`transition-all duration-500 ${!isLogin ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">
                  Full Name
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focusedField === 'name' ? 'border-[#94BD0A] shadow-[0_0_0_4px_rgba(148,189,10,0.1)]' : 'border-[#1A362B]/10'
                }`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A362B]/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#1A362B] text-sm font-medium placeholder-[#1A362B]/20 outline-none"
                    placeholder="Timilehin Ojo"
                    required={!isLogin}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">
                  Email Address
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focusedField === 'email' ? 'border-[#94BD0A] shadow-[0_0_0_4px_rgba(148,189,10,0.1)]' : 'border-[#1A362B]/10'
                }`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A362B]/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#1A362B] text-sm font-medium placeholder-[#1A362B]/20 outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40">
                    Password
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        setToast(null);
                        setPassword("");
                      }}
                      className="text-xs font-semibold text-[#94BD0A] hover:text-[#7a9d08] transition"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focusedField === 'password' ? 'border-[#94BD0A] shadow-[0_0_0_4px_rgba(148,189,10,0.1)]' : 'border-[#1A362B]/10'
                }`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A362B]/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-3.5 bg-transparent text-[#1A362B] text-sm font-medium placeholder-[#1A362B]/20 outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A362B]/30 hover:text-[#1A362B]/60 transition"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-[#1A362B]/30 mt-2 ml-1">Minimum 6 characters</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-8 rounded-2xl text-sm font-bold bg-[#1A362B] text-white shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {isLogin ? "Logging in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isLogin ? "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" : "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"} />
                    </svg>
                    {isLogin ? "Log In" : "Create Account"}
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#1A362B]/10" />
              <span className="text-xs font-medium text-[#1A362B]/30 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-[#1A362B]/10" />
            </div>

            <p className="text-center text-sm text-[#1A362B]/50">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setToast(null);
                  setEmail("");
                  setPassword("");
                  setDisplayName("");
                }}
                className="text-[#94BD0A] hover:text-[#7a9d08] font-bold hover:underline transition"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
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
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}