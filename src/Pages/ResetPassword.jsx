import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validCode, setValidCode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const oobCode = searchParams.get("oobCode");

  // Verify the reset code when page loads
  useEffect(() => {
    async function verifyCode() {
      if (!oobCode) {
        setVerifying(false);
        return;
      }
      try {
        await verifyPasswordResetCode(auth, oobCode);
        setValidCode(true);
      } catch (err) {
        setError("This reset link has expired or is invalid. Please request a new one.");
      } finally {
        setVerifying(false);
      }
    }
    verifyCode();
  }, [oobCode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setMessage("Password reset successful! Redirecting to login...");
      setPassword("");
      setConfirmPassword("");
      // Auto-redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/course-auth");
      }, 3000);
    } catch (err) {
      setError("Something went wrong. Please request a new reset link.");
    } finally {
      setLoading(false);
    }
  }

  // Loading state while verifying code
  if (verifying) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#94BD0A] mx-auto mb-4"></div>
          <p className="text-[#1A362B]/50 text-sm font-medium">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

  // Invalid or missing code
  if (!validCode || !oobCode) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A362B] mb-2">Link Expired</h2>
          <p className="text-[#1A362B]/50 mb-8">{error || "This password reset link is invalid or has expired."}</p>
          <button
            onClick={() => navigate("/course-auth")}
            className="px-8 py-3 bg-[#1A362B] text-white font-bold rounded-2xl hover:bg-[#152b22] transition"
          >
            Go to Log In
          </button>
        </div>
      </div>
    );
  }

  // Success state
  if (message && !error) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#94BD0A]/10 mb-6">
            <svg className="w-8 h-8 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A362B] mb-2">Password Updated!</h2>
          <p className="text-[#1A362B]/50 mb-2">{message}</p>
          <p className="text-sm text-[#1A362B]/30">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Main reset form
  return (
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/6 blur-[120px]" />
        <div className="absolute top-[40%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/8 blur-[100px]" />
        <div className="absolute -bottom-[10%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-[#1A362B]/4 blur-[90px]" />
      </div>
      <div className="absolute top-24 left-[12%] w-3 h-3 rounded-full bg-[#94BD0A]/20 animate-bounce" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-40 right-[18%] w-2 h-2 rounded-full bg-[#FCE67A]/25 animate-bounce" style={{ animationDuration: '9s', animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] shadow-[0_8px_30px_rgba(148,189,10,0.3)] mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A362B] tracking-tight">LagBuy Academy</h1>
          <p className="text-sm text-[#1A362B]/40 mt-1">Learn. Create. Monetize.</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(26,54,43,0.08)] border border-white/60 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
          
          <div className="p-8 md:p-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FCE67A]/20 mb-4">
                <svg className="w-6 h-6 text-[#1A362B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#1A362B]">Create New Password</h2>
              <p className="text-sm text-[#1A362B]/40 mt-1">Enter a strong password for your account</p>
            </div>

            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">
                  New Password
                </label>
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
                <p className="text-xs text-[#1A362B]/30 mt-2 ml-1">Minimum 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">
                  Confirm Password
                </label>
                <div className={`relative rounded-xl border-2 transition-all duration-200 ${
                  focusedField === 'confirm' ? 'border-[#94BD0A] shadow-[0_0_0_4px_rgba(148,189,10,0.1)]' : 'border-[#1A362B]/10'
                }`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A362B]/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirm')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-[#1A362B] text-sm font-medium placeholder-[#1A362B]/20 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-8 rounded-2xl text-sm font-bold bg-[#1A362B] text-white shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Resetting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset Password
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
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
      `}</style>
    </div>
  );
}

export default ResetPassword;