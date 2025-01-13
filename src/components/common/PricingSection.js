import React from "react";

const pricingPlans = [
  {
    name: "90 Days",
    price: "$53/mo",
    totalPrice: "$159",
    discount: "Save 33%",
    description: "One-time payment to unlock discounted price",
    features: [
      "800+ Medical Practice Questions",
      "NextGen NCLEX Style Questions in Every Format",
      "NCLEX Readiness Assessments",
      "NCLEX Review Lecture Series",
      "900+ Medical Study Guides & 1,200+ Videos",
    ],
    mostPopular: true,
  },
  {
    name: "60 Days",
    price: "$60/mo",
    totalPrice: "$119",
    discount: "Save 25%",
    description: "One-time payment to unlock discounted price",
    features: [
      "800+ Medical Practice Questions",
      "NextGen NCLEX Style Questions in Every Format",
      "NCLEX Readiness Assessments",
      "NCLEX Review Lecture Series",
    ],
  },
  {
    name: "Monthly",
    price: "$79/mo",
    totalPrice: "$79",
    discount: "No discount",
    description: "Monthly subscription",
    features: [
      "800+ Medical Practice Questions",
      "NextGen NCLEX Style Questions in Every Format",
      "NCLEX Readiness Assessments",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="py-12 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Cut Your Study Time by Up to 60% <br /> Join Tenapedia for NCLEX® Prep
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Pass the NCLEX with ease, using expertly designed study tools and
        features that prepare you for every medical exam.
      </p>

      <div className="flex flex-wrap justify-center mb-12">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`max-w-sm mx-4 mb-8 bg-white p-6 rounded-lg shadow-lg ${
              plan.mostPopular ? "border-4 border-indigo-600" : ""
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
            <p className="text-4xl font-bold my-4 text-indigo-600">
              {plan.price}
            </p>
            <p className="text-sm text-gray-600">{plan.totalPrice}</p>
            <p className="text-xs text-gray-500 my-2">{plan.discount}</p>
            <p className="text-sm text-gray-500 mb-6">{plan.description}</p>

            <ul className="text-gray-600 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2">
                  ✓ {feature}
                </li>
              ))}
            </ul>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500">
              Select Plan
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Trusted by Over 1,000,000 Medical Students
        </h3>
        <p className="text-gray-600 mb-6">
          Klarna flexible payment options available at checkout.
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="max-w-xl mx-4 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What Our Students Are Saying
          </h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              "After using Tenapedia, I passed the NCLEX® PN in just 85
              questions within 2 hours! Worth every penny!"
              <br />— Maria Padilla
            </p>
            <p className="text-gray-600">
              "I recently passed my NCLEX® RN! Thanks to Tenapedia, I finally
              understood all the electrolyte imbalances."
              <br />— Rianne Gee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
