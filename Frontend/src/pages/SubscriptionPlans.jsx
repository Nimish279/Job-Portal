import React from "react";

const plans = [
  {
    title: "Bronze",
    price: "₹99",
    features: [
      "Access to basic job postings",
      "Monthly newsletter",
      "Limited recruiter insights",
    ],
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-500",
  },
  {
    title: "Silver",
    price: "₹199",
    features: [
      "All Bronze features",
      "Unlimited job applications",
      "Access to premium companies",
      "Priority customer support",
    ],
    bg: "bg-yellow-200",
    text: "text-yellow-800",
    border: "border-yellow-600",
  },
  {
    title: "Gold",
    price: "₹399",
    features: [
      "All Gold features",
      "1-on-1 mentorship",
      "Resume review & feedback",
      "Exclusive webinars & events",
    ],
    bg: "bg-yellow-300",
    text: "text-yellow-900",
    border: "border-yellow-700",
  },
];

const SubscriptionPlans = () => {
  return (
    <div className="py-16 px-4 md:px-12 bg-white">
      <h2 className="text-4xl font-bold text-center mb-10">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-md p-6 border-t-4 ${plan.bg} ${plan.border}`}
          >
            <h3 className={`text-2xl font-semibold mb-2 ${plan.text}`}>{plan.title}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}/month</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-700">• {feature}</li>
              ))}
            </ul>
            <button className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
