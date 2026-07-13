import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Logout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // If not logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/course-auth", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home after logout
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleCancel = () => {
    // Go back to previous page
    navigate(-1);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden flex items-center justify-center px-5 py-10">
      {/* Background */}
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

      {/* Main Content */}
      <div className="relative max-w-md w-full z-20">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(26,54,43,0.08)] border border-white/60 overflow-hidden p-8 md:p-10 text-center space-y-8">
          
          {/* Shimmer top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

          {/* User Avatar */}
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-[#1A362B]/10 rounded-full blur-xl" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#1A362B] to-[#2d4a3e] flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {(user.displayName || user.email || "?").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A362B] tracking-tight">
              See You Soon, {user.displayName?.split(" ")[0] || user.email?.split("@")[0] || "there"}!
            </h2>
            <p className="text-[#1A362B]/50">
              Are you sure you want to log out of your account?
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-[#F5F5F0]/50 backdrop-blur-sm rounded-2xl border border-[#1A362B]/5 p-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#94BD0A]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1A362B]">{user.displayName || "Student"}</p>
                <p className="text-xs text-[#1A362B]/40">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full py-3.5 px-8 rounded-2xl text-base font-bold bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.2)] hover:bg-red-600 hover:shadow-[0_8px_30px_rgba(239,68,68,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Yes, Log Me Out
            </button>

            <button
              onClick={handleCancel}
              className="w-full py-3.5 px-8 rounded-2xl text-base font-semibold border-2 border-[#1A362B]/10 text-[#1A362B]/60 hover:border-[#1A362B]/20 hover:text-[#1A362B] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              No, Keep Me Logged In
            </button>
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

export default Logout;