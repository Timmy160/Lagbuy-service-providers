// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const userInitial = (user?.displayName || user?.email || "?").charAt(0).toUpperCase();
  const userName = user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "User";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#1A362B]/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="text-xl font-extrabold text-[#1A362B]">
            LagBuy
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/academy" className="text-sm font-semibold text-[#1A362B]/60 hover:text-[#1A362B] transition">
              Academy
            </Link>
            <Link to="/course-details" className="text-sm font-semibold text-[#1A362B]/60 hover:text-[#1A362B] transition">
              Courses
            </Link>
          </div>

          {/* Right Side - Auth */}
          <div className="flex items-center gap-4">
            {user ? (
              /* Logged In - Avatar Dropdown */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#1A362B]/5 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{userInitial}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-[#1A362B]">{userName}</span>
                  <svg className={`w-4 h-4 text-[#1A362B]/40 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(26,54,43,0.12)] border border-[#1A362B]/5 overflow-hidden">
                      <div className="p-4 border-b border-[#1A362B]/5">
                        <p className="text-sm font-bold text-[#1A362B]">{user.displayName || "Student"}</p>
                        <p className="text-xs text-[#1A362B]/40 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/course-details"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[#1A362B]/70 hover:bg-[#94BD0A]/10 hover:text-[#1A362B] transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          My Courses
                        </Link>
                        <Link
                          to="/logout"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* Not Logged In */
              <Link
                to="/course-auth"
                className="px-5 py-2.5 bg-[#1A362B] text-white text-sm font-bold rounded-xl hover:bg-[#152b22] transition"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;