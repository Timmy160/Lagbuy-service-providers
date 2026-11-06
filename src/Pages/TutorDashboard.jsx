import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// ── Simple auth gate for tutor ──
const TUTOR_CREDENTIALS = {
  email: "joses@lagbuy.com",
  password: "lagbuy2026", // Change this before going live!
};

function TutorDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [copiedRef, setCopiedRef] = useState("");

  // Check auth on mount
  useEffect(() => {
    const auth = localStorage.getItem("tutorAuth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  // Load bookings
  useEffect(() => {
    if (!isAuthenticated) return;
    const stored = JSON.parse(localStorage.getItem("tutorBookings") || "[]");
    const normalized = stored.map((b, i) => ({
      ...b,
      id: b.id || `booking_${i}_${Date.now()}`,
      status: b.status || "pending",
      verifiedAt: b.verifiedAt || null,
      completedAt: b.completedAt || null,
      notes: b.notes || "",
    }));
    setBookings(normalized);
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === TUTOR_CREDENTIALS.email && loginForm.password === TUTOR_CREDENTIALS.password) {
      localStorage.setItem("tutorAuth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tutorAuth");
    setIsAuthenticated(false);
    setLoginForm({ email: "", password: "" });
  };

  const persistBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem("tutorBookings", JSON.stringify(updated));
  };

  const updateStatus = (id, newStatus) => {
    const updated = bookings.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          status: newStatus,
          verifiedAt: newStatus === "verified" ? new Date().toISOString() : b.verifiedAt,
          completedAt: newStatus === "completed" ? new Date().toISOString() : b.completedAt,
        };
      }
      return b;
    });
    persistBookings(updated);
  };

  const addNote = (id, note) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, notes: note } : b
    );
    persistBookings(updated);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedRef(id);
      setTimeout(() => setCopiedRef(""), 2000);
    });
  };

  // ── Stats ──
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const verified = bookings.filter((b) => b.status === "verified").length;
    const completed = bookings.filter((b) => b.status === "completed").length;
    const revenue = bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + (Number(b.amountPaid) || 0), 0);
    return { total, pending, verified, completed, revenue };
  }, [bookings]);

  // ── Filtered & Sorted ──
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (filterStatus !== "all") {
      result = result.filter((b) => b.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          (b.studentName || "").toLowerCase().includes(q) ||
          (b.course || "").toLowerCase().includes(q) ||
          (b.paymentRef || "").toLowerCase().includes(q) ||
          (b.date || "").includes(q)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.bookedAt || 0);
      const dateB = new Date(b.bookedAt || 0);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [bookings, filterStatus, searchQuery, sortBy]);

  const statusConfig = {
    pending: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Pending Verification" },
    verified: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Verified" },
    completed: { bg: "bg-[#94BD0A]/10", text: "text-[#7a9d08]", border: "border-[#94BD0A]/30", label: "Completed" },
    cancelled: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", label: "Cancelled" },
  };

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "₦0";
    return `₦${Number(amount).toLocaleString()}`;
  };

  // ════════════════════════════════════════
  // LOGIN SCREEN
  // ════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center px-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/8 blur-[100px]" />
          <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/10 blur-[90px]" />
        </div>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(26,54,43,0.08)] border border-white/60 p-8 md:p-12 w-full max-w-md">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] flex items-center justify-center mx-auto mb-4 shadow-md">
              <span className="text-white font-black text-2xl">L</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A362B]">Tutor Dashboard</h1>
            <p className="text-sm text-[#1A362B]/40 mt-1">LagBuy — Live It. Love It.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFAF7] border border-[#1A362B]/10 text-sm text-[#1A362B] placeholder:text-[#1A362B]/20 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/30 transition-all"
                placeholder="joses@lagbuy.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1A362B]/40 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAFAF7] border border-[#1A362B]/10 text-sm text-[#1A362B] placeholder:text-[#1A362B]/20 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/30 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <p className="text-sm font-semibold text-red-600">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl text-sm font-bold bg-[#1A362B] text-white hover:bg-[#152b22] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-md"
            >
              Sign In
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-[#1A362B]/40 hover:text-[#1A362B] hover:bg-[#1A362B]/5 transition-all"
          >
            ← Back to Website
          </button>
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

  // ════════════════════════════════════════
  // DASHBOARD (Authenticated)
  // ════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1A362B]">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#1A362B]/8 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">L</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1A362B] leading-tight">LagBuy Tutor</h1>
              <p className="text-xs text-[#1A362B]/40">Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#94BD0A]/10 rounded-full border border-[#94BD0A]/20">
              <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
              <span className="text-xs font-semibold text-[#94BD0A]">Live</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500/70 hover:text-red-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: stats.total, icon: "📚", color: "bg-[#1A362B]" },
            { label: "Pending", value: stats.pending, icon: "⏳", color: "bg-amber-500" },
            { label: "Verified", value: stats.verified, icon: "✅", color: "bg-emerald-500" },
            { label: "Revenue", value: formatCurrency(stats.revenue), icon: "💰", color: "bg-[#94BD0A]" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#1A362B]/8 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
              </div>
              <p className="text-2xl font-extrabold text-[#1A362B]">{stat.value}</p>
              <p className="text-xs font-medium text-[#1A362B]/40 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white rounded-2xl border border-[#1A362B]/8 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A362B]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, course, or payment ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#1A362B]/10 text-sm text-[#1A362B] placeholder:text-[#1A362B]/30 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 focus:border-[#94BD0A]/30 transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {[
                { key: "all", label: "All" },
                { key: "pending", label: "Pending" },
                { key: "verified", label: "Verified" },
                { key: "completed", label: "Completed" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200
                    ${filterStatus === f.key
                      ? "bg-[#1A362B] text-white shadow-md"
                      : "bg-[#FAFAF7] text-[#1A362B]/50 hover:bg-[#1A362B]/5 hover:text-[#1A362B]"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#1A362B]/10 text-sm text-[#1A362B] focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#1A362B]/8 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1A362B]/5 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#1A362B]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-lg font-bold text-[#1A362B]/30">No bookings found</p>
            <p className="text-sm text-[#1A362B]/20 mt-1">
              {searchQuery ? "Try a different search term" : "Bookings will appear here when students enroll"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking) => {
              const cfg = statusConfig[booking.status] || statusConfig.pending;
              const isCopied = copiedRef === booking.id;
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-[#1A362B]/8 p-5 shadow-sm hover:shadow-md hover:border-[#94BD0A]/20 transition-all duration-200 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Left: Student + Course */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#94BD0A]/20 to-[#FCE67A]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-[#1A362B]">
                            {(booking.studentName || "G").charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#1A362B] truncate">
                            {booking.studentName || "Guest"}
                          </p>
                          <p className="text-xs text-[#1A362B]/40 truncate">{booking.studentEmail || "No email"}</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-[#1A362B]/70 mt-2 truncate">
                        {booking.course}
                      </p>
                    </div>

                    {/* Middle: Date, Time, Amount, Ref */}
                    <div className="flex items-center gap-4 text-sm flex-wrap">
                      <div className="text-center">
                        <p className="text-xs text-[#1A362B]/30 font-medium uppercase tracking-wider">Date</p>
                        <p className="font-bold text-[#1A362B]">{booking.date || "—"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[#1A362B]/30 font-medium uppercase tracking-wider">Time</p>
                        <p className="font-bold text-[#1A362B]">{booking.time || "—"}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-[#1A362B]/30 font-medium uppercase tracking-wider">Amount</p>
                        <p className="font-bold text-[#94BD0A]">{formatCurrency(booking.amountPaid)}</p>
                      </div>
                      {/* Copy Payment Ref */}
                      <div className="text-center">
                        <p className="text-xs text-[#1A362B]/30 font-medium uppercase tracking-wider">Ref</p>
                        <button
                          onClick={() => copyToClipboard(booking.paymentRef, booking.id)}
                          className="flex items-center gap-1.5 font-mono text-xs text-[#1A362B]/50 hover:text-[#94BD0A] transition-colors bg-[#FAFAF7] px-2 py-1 rounded-lg border border-[#1A362B]/5 hover:border-[#94BD0A]/30"
                          title="Click to copy"
                        >
                          <span className="truncate max-w-[80px]">{booking.paymentRef}</span>
                          {isCopied ? (
                            <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right: Status + Actions */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                        {cfg.label}
                      </span>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {booking.status === "pending" && (
                          <button
                            onClick={() => updateStatus(booking.id, "verified")}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                            title="Mark as verified"
                          >
                            Verify
                          </button>
                        )}
                        {booking.status === "verified" && (
                          <button
                            onClick={() => updateStatus(booking.id, "completed")}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#94BD0A] text-white hover:bg-[#7a9d08] transition-colors"
                            title="Mark as completed"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowDetailModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1A362B]/5 text-[#1A362B]/60 hover:bg-[#1A362B]/10 hover:text-[#1A362B] transition-colors"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1A362B]/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A]" />

            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#94BD0A]/20 to-[#FCE67A]/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-black text-[#1A362B]">
                    {(selectedBooking.studentName || "G").charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1A362B]">{selectedBooking.studentName || "Guest"}</h2>
                <p className="text-sm text-[#1A362B]/40">{selectedBooking.studentEmail}</p>
              </div>

              <div className="bg-[#FAFAF7] rounded-2xl border border-[#1A362B]/8 p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A362B]/40">Course</span>
                  <span className="text-sm font-bold text-[#1A362B] text-right max-w-[60%]">{selectedBooking.course}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A362B]/40">Date</span>
                  <span className="text-sm font-bold text-[#94BD0A]">{selectedBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A362B]/40">Time</span>
                  <span className="text-sm font-bold text-[#94BD0A]">{selectedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A362B]/40">Amount</span>
                  <span className="text-sm font-black text-[#1A362B]">{formatCurrency(selectedBooking.amountPaid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#1A362B]/40">Payment Ref</span>
                  <button
                    onClick={() => copyToClipboard(selectedBooking.paymentRef, selectedBooking.id)}
                    className="flex items-center gap-1.5 font-mono text-xs text-[#1A362B]/50 hover:text-[#94BD0A] transition-colors bg-white px-2 py-1 rounded-lg border border-[#1A362B]/5 hover:border-[#94BD0A]/30"
                  >
                    <span>{selectedBooking.paymentRef}</span>
                    {copiedRef === selectedBooking.id ? (
                      <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#1A362B]/40">Booked At</span>
                  <span className="text-sm text-[#1A362B]/50">{formatDate(selectedBooking.bookedAt)}</span>
                </div>
                {selectedBooking.verifiedAt && (
                  <div className="flex justify-between">
                    <span className="text-sm text-[#1A362B]/40">Verified At</span>
                    <span className="text-sm text-emerald-600">{formatDate(selectedBooking.verifiedAt)}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1A362B]/40">Tutor Notes</label>
                <textarea
                  value={selectedBooking.notes || ""}
                  onChange={(e) => addNote(selectedBooking.id, e.target.value)}
                  placeholder="Add private notes about this student..."
                  className="w-full p-3 rounded-xl bg-[#FAFAF7] border border-[#1A362B]/10 text-sm text-[#1A362B] placeholder:text-[#1A362B]/20 focus:outline-none focus:ring-2 focus:ring-[#94BD0A]/30 resize-none"
                  rows={3}
                />
              </div>

              {/* Status Actions */}
              <div className="flex gap-3">
                {selectedBooking.status === "pending" && (
                  <button
                    onClick={() => {
                      updateStatus(selectedBooking.id, "verified");
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    Verify Payment
                  </button>
                )}
                {selectedBooking.status === "verified" && (
                  <button
                    onClick={() => {
                      updateStatus(selectedBooking.id, "completed");
                      setShowDetailModal(false);
                    }}
                    className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#94BD0A] text-white hover:bg-[#7a9d08] transition-colors"
                  >
                    Mark Completed
                  </button>
                )}
                {selectedBooking.status === "completed" && (
                  <div className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#94BD0A]/10 text-[#7a9d08] text-center border border-[#94BD0A]/20">
                    ✅ Session Completed
                  </div>
                )}
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-[#1A362B]/40 hover:text-[#1A362B] hover:bg-[#1A362B]/5 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TutorDashboard;