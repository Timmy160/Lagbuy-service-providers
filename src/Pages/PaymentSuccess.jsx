import React, { useState, useEffect } from "react";

function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
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

      {/* Confetti burst animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-[confetti_1s_ease-out_forwards]"
              style={{
                backgroundColor: i % 3 === 0 ? '#94BD0A' : i % 3 === 1 ? '#FCE67A' : '#1A362B',
                left: `${50 + (Math.random() - 0.5) * 60}%`,
                top: `${50 + (Math.random() - 0.5) * 40}%`,
                animationDelay: `${Math.random() * 0.3}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════
          MAIN CONTENT
          ═══════════════════════════════════════ */}
      <div className="relative max-w-lg w-full z-20">
        <div
          className={`
            bg-white/70 backdrop-blur-xl 
            rounded-3xl 
            shadow-[0_8px_60px_rgba(26,54,43,0.08)] 
            border border-white/60 
            overflow-hidden
            transition-all duration-500
            hover:shadow-[0_12px_80px_rgba(148,189,10,0.12)]
          `}
        >
          {/* Animated shimmer top bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

          <div className="p-8 md:p-10 lg:p-12 text-center space-y-8">
            {/* Success Icon with glow */}
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-[#94BD0A]/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#94BD0A] to-[#7a9d08] flex items-center justify-center shadow-[0_0_30px_rgba(148,189,10,0.3)]">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#94BD0A]/10 border border-[#94BD0A]/20 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#94BD0A] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#94BD0A]">Payment Confirmed</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A362B] tracking-tight">
                You're In! 🎉
              </h2>

              <p className="text-lg text-[#1A362B]/50 leading-relaxed">
                Welcome to <span className="font-bold text-[#1A362B]">The Bu$iness of Content Creation</span> with <span className="font-semibold text-[#1A362B]">Joses Frank-Ndubisi</span>.
              </p>
            </div>

            {/* Next Steps Card */}
            <div className="bg-[#F5F5F0]/50 backdrop-blur-sm rounded-2xl border border-[#1A362B]/5 p-6 text-left space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A362B]/40">Next Steps</h3>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#94BD0A]/10 border border-[#94BD0A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#94BD0A]">1</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A362B]">Join the WhatsApp Community</p>
                  <p className="text-xs text-[#1A362B]/40 mt-0.5">Click the button below to join the group</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FCE67A]/15 border border-[#FCE67A]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#1A362B]/60">2</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A362B]">Upload Your Receipt</p>
                  <p className="text-xs text-[#1A362B]/40 mt-0.5">Send your payment proof for verification</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A362B]/5 border border-[#1A362B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#1A362B]/30">3</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A362B]">Get Verified & Start Learning</p>
                  <p className="text-xs text-[#1A362B]/40 mt-0.5">We'll verify you and add you to the main class within 24 hours</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA — REAL GROUP LINK */}
            <a
              href="https://chat.whatsapp.com/BGuVUkd9LXMLI3MW7ais9V"
              target="_blank"
              rel="noreferrer"
              className="group block w-full py-4 px-8 rounded-2xl text-lg font-bold bg-[#1A362B] text-white shadow-[0_4px_20px_rgba(26,54,43,0.2)] hover:bg-[#152b22] hover:shadow-[0_8px_30px_rgba(26,54,43,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join WhatsApp Community
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <p className="text-sm text-[#1A362B]/30 font-medium">
              Keep your receipt handy — you'll need it when you join the group.
            </p>
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
        @keyframes confetti {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) rotate(${Math.random() * 720}deg) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default PaymentSuccess;