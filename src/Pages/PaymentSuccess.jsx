import React from "react";

function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#1A362B]/4 relative overflow-hidden flex items-center justify-center px-5 py-10">
      {/* Subtle background accents – consistent with previous pages */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#94BD0A_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#FCE67A_0%,transparent_45%)]" />
      </div>

      <div className="relative max-w-lg w-full">
        <div
          className={`
            bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl 
            border border-gray-100/60 overflow-hidden
            transition-all duration-300 hover:shadow-3xl
          `}
        >
          {/* Top success accent bar */}
          <div className="h-2.5 bg-gradient-to-r from-[#94BD0A] via-[#FCE67A] to-[#94BD0A]" />

          <div className="p-8 md:p-10 lg:p-12 text-center space-y-8">
            {/* Success Icon / Emoji with subtle animation */}
            <div className="text-7xl md:text-8xl animate-bounce-slow">🎉</div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A362B] tracking-tight">
                Payment Successful!
              </h2>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Thank you for enrolling in the Digital Product Masterclass.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <p className="text-base md:text-lg text-gray-600">
                Next step: Join the WhatsApp community below and upload your payment receipt so we can verify and add you to the main class group.
              </p>

              <a
                href="https://wa.me/234000000000?text=Hi%20LagBuy%20Academy%2C%20I%20just%20enrolled%20in%20the%20Digital%20Product%20Masterclass%20and%20made%20payment.%20Here%27s%20my%20receipt%3A"
                target="_blank"
                rel="noreferrer"
                className={`
                  block w-full py-4 px-8 rounded-xl text-lg font-bold
                  bg-[#1A362B] text-white shadow-lg
                  hover:bg-[#1A362B]/95 hover:shadow-xl
                  active:scale-[0.98]
                  transition-all duration-200 flex items-center justify-center gap-3
                `}
              >
                Join WhatsApp Community
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>

              <p className="text-sm md:text-base text-gray-500 font-medium">
                Our team will verify your payment and add you to the main class group within 24 hours.
              </p>

              <p className="text-sm text-gray-600 italic pt-4">
                Keep your receipt handy — you'll need it when you join the group.
              </p>
            </div>
          </div>
        </div>

        {/* Small footer note */}
        <p className="text-center mt-8 text-sm text-gray-600">
          LagBuy Academy • Building real income skills together
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;