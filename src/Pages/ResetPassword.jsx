import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const oobCode = searchParams.get("oobCode"); // Firebase gives you this in the URL

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
      setMessage("Password reset successful! You can now log in.");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Invalid or expired reset link. Please request a new one.");
    } finally {
      setLoading(false);
    }
  }

  if (!oobCode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1A362B]">Invalid Reset Link</h2>
          <p className="text-[#1A362B]/50 mt-2">Please request a new password reset.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 p-8 md:p-10">
          <div className="h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] rounded-full mb-8" />
          
          <h2 className="text-2xl font-bold text-[#1A362B] text-center mb-2">Create New Password</h2>
          <p className="text-sm text-[#1A362B]/40 text-center mb-6">Enter your new password below</p>

          {message && (
            <div className="mb-4 p-3 bg-[#94BD0A]/10 border border-[#94BD0A]/20 text-[#1A362B] rounded-xl text-sm font-medium text-center">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#1A362B]/10 text-[#1A362B] text-sm font-medium focus:border-[#94BD0A] focus:shadow-[0_0_0_4px_rgba(148,189,10,0.1)] outline-none transition"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-[#1A362B]/10 text-[#1A362B] text-sm font-medium focus:border-[#94BD0A] focus:shadow-[0_0_0_4px_rgba(148,189,10,0.1)] outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-sm font-bold bg-[#1A362B] text-white hover:bg-[#152b22] transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
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