import React from "react";
import { 
  FaCheck, 
  FaTrophy, 
  FaBookOpen, 
  FaChartLine, 
  FaShieldAlt 
} from "react-icons/fa";

const pricingPlans = [
  {
    name: "90 Days Pro",
    price: "$53",
    priceType: "/month",
    totalPrice: "$159",
    discount: "Save 33%",
    description: "Comprehensive NCLEX Preparation",
    features: [
      "800+ Medical Practice Questions",
      "NextGen NCLEX Style Questions",
      "NCLEX Readiness Assessments",
      "NCLEX Review Lecture Series",
      "900+ Medical Study Guides",
    ],
    mostPopular: true,
    icon: FaTrophy,
    color: "from-[#1a80b6] to-[#2196f3]"
  },
  {
    name: "60 Days Accelerate",
    price: "$60",
    priceType: "/month",
    totalPrice: "$119",
    discount: "Save 25%",
    description: "Focused NCLEX Preparation",
    features: [
      "800+ Medical Practice Questions",
      "NextGen NCLEX Style Questions",
      "NCLEX Readiness Assessments",
      "NCLEX Review Lecture Series",
    ],
    icon: FaChartLine,
    color: "from-[#fb3467] to-[#ff6b6b]"
  },
  {
    name: "Monthly Flex",
    price: "$79",
    priceType: "/month",
    totalPrice: "$79",
    discount: "No Discount",
    description: "Flexible Monthly Access",
    features: [
      "800+ Medical Practice Questions",
      "NextGen NCLEX Style Questions",
      "NCLEX Readiness Assessments",
    ],
    icon: FaBookOpen,
    color: "from-[#4caf50] to-[#81c784]"
  }
];

export default function PricingPage() {
  return (
    <div className="bg-gray-50 w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a80b6] to-[#2196f3] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
        </div>

        <div className="w-full px-4 text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Affordable Medical Education
          </h1>
          <p className="mt-4 text-xl mb-10 text-white/90 max-w-3xl mx-auto">
            Unlock your medical career potential with flexible, comprehensive NCLEX preparation plans
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored study plans designed to accelerate your medical exam preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name} 
                className={`bg-gradient-to-br ${plan.color} rounded-2xl p-8 text-white 
                  transform transition duration-300 hover:scale-105 
                  ${plan.mostPopular ? 'shadow-2xl border-4 border-white' : 'shadow-lg'}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    <plan.icon className="text-4xl" />
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  {plan.mostPopular && (
                    <span className="bg-white text-[#1a80b6] px-3 py-1 rounded-full text-xs font-bold">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <p className="text-5xl font-extrabold">
                    {plan.price}
                    <span className="text-xl font-normal">{plan.priceType}</span>
                  </p>
                  <p className="text-sm text-white/80 mt-2">
                    Total: {plan.totalPrice} | {plan.discount}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <FaCheck className="text-white/80" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-[#1a80b6] font-bold 
                  py-3 rounded-full hover:bg-opacity-90 transition duration-300">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-gray-100 py-16">
        <div className="w-full px-4 text-center">
          <div className="flex justify-center mb-8">
            <FaShieldAlt className="text-6xl text-[#1a80b6]" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Your Success is Our Promise
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            100% satisfaction guaranteed. If our resources don't help you pass, 
            we'll refund your investment and provide personalized study support.
          </p>
          <button className="bg-[#1a80b6] text-white font-bold 
            px-10 py-4 rounded-full hover:bg-[#2196f3] transition duration-300">
            Learn More About Our Guarantee
          </button>
        </div>
      </section>
    </div>
  );
}
