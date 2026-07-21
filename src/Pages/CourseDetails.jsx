 import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import TutorImage from "../assets/joslearn.jpeg";
import TutorImg2 from "../assets/josp2.jpeg";

function CourseDetails() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCourse, setActiveCourse] = useState("course1");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ─────────────────────────────────────────
  // COURSE DATA
  // ─────────────────────────────────────────
  const courses = {
    course1: {
      id: "course1",
      title: "The Bu$iness of Content Creation",
      description:
        "Turn your creativity into a paycheck. Learn how to build a personal brand, grow an engaged audience, and monetize your content across platforms, from sponsorships and affiliate deals to selling your own products. This isn't just about posting. It's about building a business around what you love to create.",
      tutor: "Joses Frank-Ndubishi",
      tutorEmail: "joses@lagbuy.com",
      duration: "1 Day",
      price: 15000,
      priceDisplay: "₦15,000",
      earlyBirdPrice: 10000,
      earlyBirdDisplay: "₦10,000",
      hasEarlyBird: true,
      skillLevel: "Beginner to Intermediate",
      category: "Content Creation & Digital Entrepreneurship",
      language: "English",
      startDate: "Rolling Enrollment",
      image: TutorImage,
      whatYoullLearn: [
        "Build a Strategy that actually works",
        "Film videos that look clean, professional & cohesive",
        "Script & edit faster with a workflow that saves you hours",
        "Post smarter and grow your page",
        "Never run out of ideas again & build your content pillars",
      ],
      whoThisIsFor: [
        "Aspiring content creators",
        "Digital entrepreneurs",
        "Business owners",
        "Social media influencers",
        "UGC creators",
      ],
    },
    course2: {
      id: "course2",
      title: "Content Audit",
      description:
        "A personalized review of your content to help you identify what's holding your growth back. Get expert feedback on your social media presence and actionable steps to improve.",
      tutor: "Joses Frank-Ndubishi",
      tutorEmail: "joses@lagbuy.com",
      duration: "3 Business Days",
      price: 5000,
      priceDisplay: "₦5,000",
      earlyBirdPrice: null,
      earlyBirdDisplay: null,
      hasEarlyBird: false,
      skillLevel: "All Levels",
      category: "Content Strategy & Optimization",
      language: "English",
      startDate: "Within 48 hours of purchase",
      image: TutorImg2,
      whatYoullLearn: [
        "In-depth review of your social media page",
        "Bio and profile optimization",
        "Content and storytelling feedback",
        "Branding and positioning review",
        "Personalized recommendations to improve your content",
        "A detailed written report sent to your email",
      ],
      whoThisIsFor: [
        "Content creators stuck at a growth plateau",
        "Business owners with underperforming pages",
        "Influencers wanting to level up their brand",
        "Anyone who wants expert eyes on their content",
      ],
    },
  };

  const course = courses[activeCourse];

  // ─────────────────────────────────────────
  // BOOKING CALENDAR LOGIC
  // ─────────────────────────────────────────

  const bookedDates = {
    "2026-07-21": { status: "booked", note: "Fully booked" },
    "2026-07-22": { status: "booked", note: "Fully booked" },
    "2026-07-23": { status: "booked", note: "Fully booked" },
    "2026-07-24": { status: "booked", note: "Fully booked" },
    "2026-07-25": { status: "booked", note: "Fully booked" },
    "2026-07-26": { status: "booked", note: "Fully booked" },
    "2026-07-27": { status: "booked", note: "Fully booked" },
    "2026-07-28": { status: "booked", note: "Fully booked" },
    "2026-07-29": { status: "booked", note: "Fully booked" },
    "2026-07-30": { status: "booked", note: "Fully booked" },
    "2026-07-31": { status: "booked", note: "Fully booked" },
    "2026-08-01": { status: "booked", note: "Fully booked" },
    "2026-08-02": { status: "booked", note: "Fully booked" },
    "2026-08-03": { status: "available", note: "Now accepting bookings" },
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isDateAvailable = (year, month, day) => {
    const dateKey = formatDateKey(year, month, day);
    const dateObj = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateObj < today) return false;
    if (bookedDates[dateKey]) return bookedDates[dateKey].status === "available";

    const bookedDateKeys = Object.keys(bookedDates).sort();
    if (bookedDateKeys.length > 0) {
      const lastBooked = new Date(bookedDateKeys[bookedDateKeys.length - 1]);
      if (dateObj > lastBooked) return true;
    }
    return true;
  };

  const getDateStatus = (year, month, day) => {
    const dateKey = formatDateKey(year, month, day);
    if (bookedDates[dateKey]) return bookedDates[dateKey];

    const dateObj = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateObj < today) return { status: "past", note: "Past date" };

    const bookedDateKeys = Object.keys(bookedDates).sort();
    if (bookedDateKeys.length > 0) {
      const lastBooked = new Date(bookedDateKeys[bookedDateKeys.length - 1]);
      if (dateObj > lastBooked) return { status: "available", note: "Available" };
    }
    return { status: "available", note: "Available" };
  };

  const handleDateSelect = (day) => {
    const dateKey = formatDateKey(currentYear, currentMonth, day);
    const status = getDateStatus(currentYear, currentMonth, day);

    if (status.status === "booked" || status.status === "past") return;

    setSelectedDate(dateKey);
    setSelectedTime("");
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) return;

    const paymentRef = localStorage.getItem("lastPaymentRef") || "N/A";
    const breakdown = JSON.parse(localStorage.getItem("paymentBreakdown") || "{}");
    const amountPaid = localStorage.getItem("paymentAmount") || "N/A";

    const bookingInfo = {
      course: course.title,
      studentName: user?.displayName || user?.email || "Guest",
      studentEmail: user?.email || "guest@lagbuy.com",
      date: selectedDate,
      time: selectedTime,
      paymentRef: paymentRef,
      amountPaid: amountPaid,
      breakdown: breakdown,
      bookedAt: new Date().toISOString(),
    };

    localStorage.setItem("lastBooking", JSON.stringify(bookingInfo));

    const existingBookings = JSON.parse(localStorage.getItem("tutorBookings") || "[]");
    existingBookings.push(bookingInfo);
    localStorage.setItem("tutorBookings", JSON.stringify(existingBookings));

    setBookingConfirmed(true);
    setBookingStep(3);
  };

  const resetBooking = () => {
    setShowBookingModal(false);
    setSelectedDate(null);
    setSelectedTime("");
    setBookingStep(1);
    setBookingConfirmed(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentYear, currentMonth, day);
      const status = getDateStatus(currentYear, currentMonth, day);
      const isSelected = selectedDate === dateKey;
      const isAvailable = status.status === "available";
      const isBooked = status.status === "booked";
      const isPast = status.status === "past";

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={!isAvailable}
          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center
            ${isSelected 
              ? "bg-[#94BD0A] text-white shadow-md" 
              : isAvailable 
                ? "bg-white/60 text-[#1A362B] hover:bg-[#94BD0A]/20 border border-[#1A362B]/10" 
                : isBooked
                  ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-100"
                  : "bg-gray-50 text-gray-300 cursor-not-allowed"
            }`}
          title={status.note}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // ─────────────────────────────────────────
  // PAYMENT LOGIC
  // ─────────────────────────────────────────
  function calculatePaystackAmount(basePrice) {
    const commissionRate = 0.05;
    const commission = Math.round(basePrice * commissionRate);
    const serviceFee = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
    const total = basePrice + commission + serviceFee;
    return {
      basePrice,
      commission,
      serviceFee,
      total,
      totalInKobo: total * 100,
    };
  }

  const handlePaystackPayment = (priceToCharge) => {
    if (!user) {
      navigate("/course-auth", { state: { from: { pathname: "/course-details" } } });
      return;
    }

    const breakdown = calculatePaystackAmount(priceToCharge);
    const paymentRef = "LAGBUY_" + Math.floor(Math.random() * 1000000000 + 1);

    localStorage.setItem("courseTitle", course.title);
    localStorage.setItem("courseTutor", course.tutor);
    localStorage.setItem("paymentAmount", breakdown.total);
    localStorage.setItem("paymentBreakdown", JSON.stringify(breakdown));
    localStorage.setItem("lastPaymentRef", paymentRef);

    const handler = window.PaystackPop.setup({
      key: "pk_test_e674e76c7eb6fe1ed79b4f52ff238932c43c6aa3",
      email: user?.email || "guest@lagbuy.com",
      amount: breakdown.totalInKobo,
      currency: "NGN",
      ref: paymentRef,
      metadata: {
        custom_fields: [
          { display_name: "Course", variable_name: "course", value: course.title },
          { display_name: "Student Name", variable_name: "student_name", value: user?.displayName || user?.email || "Guest" },
          { display_name: "Base Price", variable_name: "base_price", value: `₦${breakdown.basePrice.toLocaleString()}` },
          { display_name: "Commission (5%)", variable_name: "commission", value: `₦${breakdown.commission.toLocaleString()}` },
          { display_name: "Service Fee", variable_name: "service_fee", value: `₦${breakdown.serviceFee.toLocaleString()}` },
        ],
      },
      callback: function (response) {
        console.log("Payment successful. Reference: " + response.reference);
        setShowBookingModal(true);
        setBookingStep(1);
      },
      onClose: function () {
        console.log("Payment popup closed");
      },
    });
    handler.openIframe();
  };

  // WhatsApp link
  const whatsappLink = "https://wa.me/qr/REYDJILWSU7XP1";

  return (
    <div className="min-h-screen bg-[#FAFAF7] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF7] via-[#F5F5F0] to-[#F0EDE8] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[15%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#94BD0A]/8 blur-[100px]" />
        <div className="absolute top-[30%] -left-[15%] w-[50vw] h-[50vw] rounded-full bg-[#FCE67A]/10 blur-[90px]" />
        <div className="absolute -bottom-[10%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-[#1A362B]/5 blur-[80px]" />
        <div className="absolute top-[60%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-[#94BD0A]/5 blur-[70px]" />
      </div>
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-32 left-[10%] w-3 h-3 rounded-full bg-[#94BD0A]/20 animate-bounce" style={{ animationDuration: '6s' }} />
      <div className="absolute top-56 right-[15%] w-2 h-2 rounded-full bg-[#FCE67A]/30 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }} />
      <div className="absolute bottom-48 left-[25%] w-4 h-4 rounded-full bg-[#94BD0A]/15 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }} />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1A362B 1px, transparent 1px), linear-gradient(90deg, #1A362B 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#94BD0A]/30 to-transparent pointer-events-none" />

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1A362B]/40 backdrop-blur-sm" onClick={bookingConfirmed ? undefined : undefined} />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

            <div className="p-6 md:p-8">
              {/* Step 1: Welcome */}
              {bookingStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1A362B]">Payment Successful!</h2>
                    <p className="mt-2 text-[#1A362B]/50">Your spot is reserved. Now let's pick a date that works for you.</p>
                  </div>

                  <div className="bg-[#94BD0A]/5 border border-[#94BD0A]/15 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#94BD0A]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1A362B]">How it works</p>
                        <p className="text-xs text-[#1A362B]/50 mt-0.5">Pick your preferred date. The tutor will confirm within 24hrs.</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(2)}
                    className="w-full py-4 px-8 rounded-2xl text-lg font-bold shadow-[0_4px_20px_rgba(148,189,10,0.2)] bg-[#94BD0A] text-white hover:bg-[#7a9d08] hover:shadow-[0_8px_30px_rgba(148,189,10,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Pick a Date
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Step 2: Calendar + Time */}
              {bookingStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1A362B]">Select a Date</h2>
                    <button 
                      onClick={() => setBookingStep(1)}
                      className="text-sm text-[#1A362B]/40 hover:text-[#1A362B] transition-colors"
                    >
                      Back
                    </button>
                  </div>

                  <div className="bg-[#FAFAF7] rounded-2xl border border-[#1A362B]/8 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        onClick={() => {
                          if (currentMonth === 0) {
                            setCurrentMonth(11);
                            setCurrentYear(currentYear - 1);
                          } else {
                            setCurrentMonth(currentMonth - 1);
                          }
                        }}
                        className="w-8 h-8 rounded-lg bg-white border border-[#1A362B]/10 flex items-center justify-center hover:bg-[#94BD0A]/10 transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#1A362B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-sm font-bold text-[#1A362B]">{monthNames[currentMonth]} {currentYear}</span>
                      <button 
                        onClick={() => {
                          if (currentMonth === 11) {
                            setCurrentMonth(0);
                            setCurrentYear(currentYear + 1);
                          } else {
                            setCurrentMonth(currentMonth + 1);
                          }
                        }}
                        className="w-8 h-8 rounded-lg bg-white border border-[#1A362B]/10 flex items-center justify-center hover:bg-[#94BD0A]/10 transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#1A362B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                        <div key={d} className="w-10 h-8 flex items-center justify-center text-xs font-semibold text-[#1A362B]/40">{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#1A362B]/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-[#94BD0A]" />
                        <span className="text-xs text-[#1A362B]/50">Selected</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-white border border-[#1A362B]/10" />
                        <span className="text-xs text-[#1A362B]/50">Available</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-50 border border-red-100" />
                        <span className="text-xs text-[#1A362B]/50">Booked</span>
                      </div>
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="space-y-3 animate-[fadeIn_0.3s_ease-out]">
                      <h3 className="text-sm font-bold text-[#1A362B]">Select Time</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200
                              ${selectedTime === time
                                ? "bg-[#1A362B] text-white shadow-md"
                                : "bg-white border border-[#1A362B]/10 text-[#1A362B]/70 hover:bg-[#1A362B]/5"
                              }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleConfirmBooking}
                    disabled={!selectedDate || !selectedTime}
                    className={`w-full py-4 px-8 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3
                      ${selectedDate && selectedTime
                        ? "shadow-[0_4px_20px_rgba(26,54,43,0.2)] bg-[#1A362B] text-white hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                        : "bg-[#1A362B]/10 text-[#1A362B]/30 cursor-not-allowed"
                      }`}
                  >
                    Confirm Booking
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* ════════════════════════════════════════
                  STEP 3: CONFIRMATION + SCREENSHOT CTA
                  ════════════════════════════════════════ */}
              {bookingStep === 3 && bookingConfirmed && (
                <div className="space-y-6">
                  {/* Animated marquee banner — CAN'T MISS IT */}
                  <div className="relative overflow-hidden rounded-xl bg-[#1A362B] py-3 -mx-6 md:-mx-8 px-6 md:px-8">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                      <span className="text-sm font-black uppercase tracking-widest text-[#FCE67A]">
                        📸 SCREENSHOT THIS PAGE & SEND TO TUTOR'S DM
                      </span>
                      <span className="text-sm font-black uppercase tracking-widest text-white/40">•</span>
                      <span className="text-sm font-black uppercase tracking-widest text-[#94BD0A]">
                        📸 SCREENSHOT THIS PAGE & SEND TO TUTOR'S DM
                      </span>
                      <span className="text-sm font-black uppercase tracking-widest text-white/40">•</span>
                      <span className="text-sm font-black uppercase tracking-widest text-[#FCE67A]">
                        📸 SCREENSHOT THIS PAGE & SEND TO TUTOR'S DM
                      </span>
                      <span className="text-sm font-black uppercase tracking-widest text-white/40">•</span>
                      <span className="text-sm font-black uppercase tracking-widest text-[#94BD0A]">
                        📸 SCREENSHOT THIS PAGE & SEND TO TUTOR'S DM
                      </span>
                      <span className="text-sm font-black uppercase tracking-widest text-white/40">•</span>
                    </div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="relative inline-flex">
                      <div className="absolute inset-0 bg-[#94BD0A]/20 rounded-full blur-xl animate-pulse" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] flex items-center justify-center shadow-[0_0_30px_rgba(148,189,10,0.3)]">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1A362B]">Booking Confirmed!</h2>
                    <p className="text-[#1A362B]/50">Your session has been scheduled.</p>
                  </div>

                  {/* Receipt Card — Everything the tutor needs to see */}
                  <div className="bg-[#FAFAF7] rounded-2xl border-2 border-[#94BD0A]/30 p-5 text-left space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A]" />

                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1A362B]/10">
                      <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/10 flex items-center justify-center">
                        <span className="text-lg">🎓</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1A362B]/40">LagBuy Receipt</p>
                        <p className="text-xs text-[#1A362B]/30">{localStorage.getItem("lastPaymentRef") || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-[#1A362B]/40">Course</span>
                      <span className="text-sm font-bold text-[#1A362B] text-right max-w-[60%]">{course.title}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-[#1A362B]/40">Student</span>
                      <span className="text-sm font-bold text-[#1A362B]">{user?.displayName || user?.email?.split("@")[0] || "Guest"}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-[#1A362B]/40">Date</span>
                      <span className="text-sm font-bold text-[#94BD0A]">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-[#1A362B]/40">Time</span>
                      <span className="text-sm font-bold text-[#94BD0A]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-[#1A362B]/40">Tutor</span>
                      <span className="text-sm font-bold text-[#1A362B]">{course.tutor}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-sm text-[#1A362B]/40">Amount Paid</span>
                      <span className="text-sm font-black text-[#1A362B]">
                        ₦{Number(localStorage.getItem("paymentAmount") || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-3 border-t border-[#1A362B]/10 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#1A362B]/30">Payment Ref</span>
                        <span className="text-xs font-mono text-[#1A362B]/50">{localStorage.getItem("lastPaymentRef") || "N/A"}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-[#1A362B]/30">Booked At</span>
                        <span className="text-xs font-mono text-[#1A362B]/50">{new Date().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Flashing screenshot reminder */}
                  <div className="bg-[#FCE67A]/20 border-2 border-[#FCE67A]/40 rounded-2xl p-5 text-center animate-pulse">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl">📸</span>
                      <span className="text-lg font-black text-[#1A362B] uppercase tracking-wide">Screenshot This Now!</span>
                      <span className="text-2xl">📸</span>
                    </div>
                    <p className="text-sm font-bold text-[#1A362B]/70 leading-relaxed">
                      Send the screenshot above to the tutor on WhatsApp to complete your enrollment.
                      <br />
                      <span className="text-[#94BD0A]">The tutor will verify your payment & confirm your slot.</span>
                    </p>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="group block w-full py-4 px-8 rounded-2xl text-lg font-bold bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.2)] hover:bg-[#128C7E] hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Screenshot on WhatsApp
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>

                  <div className="bg-[#1A362B]/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-[#1A362B]/40">
                      Tutor will verify your payment within 24 hours and confirm your slot via DM.
                    </p>
                  </div>

                  <button
                    onClick={resetBooking}
                    className="w-full py-3 px-6 rounded-xl text-sm font-bold text-[#1A362B]/40 hover:text-[#1A362B]/60 hover:bg-[#1A362B]/5 transition-all duration-200"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">

        {/* Course Toggle Tabs */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex bg-white/60 backdrop-blur-sm rounded-2xl p-1.5 border border-[#1A362B]/10 shadow-sm">
            <button
              onClick={() => setActiveCourse("course1")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeCourse === "course1"
                  ? "bg-[#1A362B] text-white shadow-md"
                  : "text-[#1A362B]/60 hover:text-[#1A362B] hover:bg-[#1A362B]/5"
              }`}
            >
              Content Creation Course
            </button>
            <button
              onClick={() => setActiveCourse("course2")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeCourse === "course2"
                  ? "bg-[#1A362B] text-white shadow-md"
                  : "text-[#1A362B]/60 hover:text-[#1A362B] hover:bg-[#1A362B]/5"
              }`}
            >
              Content Audit
            </button>
          </div>
        </div>

        {/* Hero / Header Section */}
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-[#94BD0A]/10 border border-[#94BD0A]/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#1A362B]/70">
              {course.hasEarlyBird ? "Premium Course" : "Service"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1A362B] tracking-tight leading-tight">
            {course.title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[#1A362B]/50 max-w-3xl mx-auto leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Left Column */}
          <div className="space-y-8">
            {/* Course Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-[#1A362B]/5 group">
              <img
                src={course.image}
                alt={`${course.title} – Course Preview`}
                className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Quick Stats / Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#94BD0A]/10 border border-[#94BD0A]/20 text-[#1A362B] rounded-xl text-sm font-semibold">
                <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.skillLevel}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/60 border border-[#1A362B]/10 text-[#1A362B] rounded-xl text-sm font-semibold">
                <svg className="w-4 h-4 text-[#1A362B]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </span>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#1A362B]/8 p-6 md:p-8">
              <h3 className="text-lg font-bold text-[#1A362B] mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                {activeCourse === "course2" ? "What's Included" : "What You'll Learn"}
              </h3>
              <div className="space-y-3">
                {course.whatYoullLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="w-6 h-6 rounded-full bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#94BD0A]/20 transition-colors">
                      <svg className="w-3 h-3 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#1A362B]/70 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who This Is For */}
            <div className="bg-white/50 backdrop-blur-md rounded-2xl border border-[#1A362B]/8 p-6 md:p-8">
              <h3 className="text-lg font-bold text-[#1A362B] mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FCE67A]/15 border border-[#FCE67A]/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#1A362B]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                Who This Is For
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.whoThisIsFor.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A362B]/5 border border-[#1A362B]/10 rounded-xl text-sm font-medium text-[#1A362B]/70 hover:bg-[#94BD0A]/10 hover:border-[#94BD0A]/20 hover:text-[#1A362B] transition-all duration-200 cursor-default"
                  >
                    <svg className="w-3.5 h-3.5 text-[#94BD0A]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Details + CTA */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(26,54,43,0.06)] border border-white/60 p-8 md:p-10 lg:p-12 space-y-8 relative overflow-hidden h-fit lg:sticky lg:top-8">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A362B] border-b border-[#94BD0A]/20 pb-4">
                {activeCourse === "course2" ? "Service Details" : "Course Details"}
              </h2>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Tutor</dt>
                  <dd className="text-base font-bold text-[#1A362B] flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#94BD0A]/10 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-[#94BD0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {course.tutor}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Duration</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Skill Level</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.skillLevel}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Category</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">Language</dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.language}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#1A362B]/40 mb-1">
                    {activeCourse === "course2" ? "Delivery" : "Start Date"}
                  </dt>
                  <dd className="text-base font-bold text-[#1A362B]">{course.startDate}</dd>
                </div>
              </dl>
            </div>

            {/* Price Display */}
            <div className="bg-[#94BD0A]/5 border border-[#94BD0A]/15 rounded-2xl p-5 text-center space-y-3">
              {course.hasEarlyBird && (
                <div className="inline-flex items-center gap-2 bg-[#FCE67A]/20 border border-[#FCE67A]/30 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A362B]/70">Early Bird Offer</span>
                </div>
              )}

              <div className="space-y-1">
                {course.hasEarlyBird ? (
                  <>
                    <p className="text-3xl font-extrabold text-[#1A362B]">{course.earlyBirdDisplay}</p>
                    <p className="text-lg text-[#1A362B]/30 line-through">{course.priceDisplay}</p>
                  </>
                ) : (
                  <p className="text-4xl font-extrabold text-[#1A362B]">{course.priceDisplay}</p>
                )}
              </div>
              <p className="text-sm text-[#1A362B]/40">
                {activeCourse === "course2" ? "One-time fee • Detailed report delivered to email" : "One-time payment • Lifetime access"}
              </p>
            </div>

            {/* CTA Section */}
            <div className="pt-2 space-y-4">
              {course.hasEarlyBird ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handlePaystackPayment(course.earlyBirdPrice)}
                    className="group/btn w-full py-4 px-8 rounded-2xl text-lg font-bold shadow-[0_4px_20px_rgba(148,189,10,0.2)] bg-[#94BD0A] text-white hover:bg-[#7a9d08] hover:shadow-[0_8px_30px_rgba(148,189,10,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Get Early Bird — {course.earlyBirdDisplay}
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handlePaystackPayment(course.price)}
                  className="group/btn w-full py-4 px-8 rounded-2xl text-lg font-bold shadow-[0_4px_20px_rgba(26,54,43,0.2)] bg-[#1A362B] text-white hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Get Audit — {course.priceDisplay}
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}

              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-[#94BD0A]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-sm text-[#1A362B]/30 font-medium">
                  Secure payment powered by Paystack
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default CourseDetails;