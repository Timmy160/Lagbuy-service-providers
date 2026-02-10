import React from "react";

function LagBuyCourseMVP() {
  const courses = [
    {
      title: "Vendor Success Blueprint",
      description:
        "Learn how to sell fast on LagBuy, attract buyers, and manage orders like a pro.",
      price: "₦5,000",
    },
    {
      title: "Rider Earnings Masterclass",
      description:
        "Understand delivery strategies, route optimization, and how riders maximize income.",
      price: "₦3,000",
    },
    {
      title: "Buyer Smart Shopping Guide",
      description:
        "Learn how to find trusted vendors, get better deals, and shop safely on LagBuy.",
      price: "₦2,000",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A362B]">
          LagBuy Academy
        </h1>
        <p className="text-gray-600 mt-2">
          Learn how to earn, sell, and grow using LagBuy.
        </p>
      </div>

      {/* Course Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-[#1A362B] mb-2">
              {course.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              {course.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-[#94BD0A]">
                {course.price}
              </span>

              <button className="bg-[#1A362B] text-white px-4 py-2 rounded-xl hover:bg-opacity-90 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto mt-16 bg-[#FCE67A] p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-bold text-[#1A362B] mb-2">
          Start learning. Start earning.
        </h3>
        <p className="text-gray-700 mb-4">
          Join hundreds of buyers, riders, and vendors already growing with LagBuy.
        </p>

        <button className="bg-[#1A362B] text-white px-6 py-3 rounded-xl font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LagBuyCourseMVP;
