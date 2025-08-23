import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home } from "lucide-react"; // Using a home icon

const plans = [
  {
    name: "Bronze",
    price: "₹99 / month",
    features: [
      "Post up to 5 jobs per month",
      "Access 20 candidate resumes",
      "Basic candidate search",
      "Email support",
    ],
  },
  {
    name: "Silver",
    price: "₹199 / month",
    features: [
      "Post up to 15 jobs per month",
      "Access 75 candidate resumes",
      "Advanced candidate search & filters",
      "Priority email support",
      "Company branding on job posts",
    ],
    popular: true,
  },
  {
    name: "Gold",
    price: "₹399 / month",
    features: [
      "Post up to 50 jobs per month",
      "Access 200 candidate resumes",
      "Full candidate search with filters",
      "24/7 priority support",
      "Featured job posts",
      "Company logo on listings",
    ],
  },
];

const SubscriptionPlans = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center">
      {/* Left-aligned Home Icon */}
      <div className="w-full max-w-6xl mb-8 flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center p-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
        >
          <Home className="w-6 h-6 text-blue-600" />
        </Link>
      </div>
      {/* Subscription plans */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Recruiter Plans</h1>
      <p className="text-gray-600 mb-12 text-center max-w-2xl">
        Choose the subscription plan that best fits your hiring needs. Scale your recruitment with access to more job postings, resume downloads, and premium support.
      </p>
      
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl shadow-md border p-8 flex flex-col ${
              plan.popular ? "border-blue-600 shadow-lg scale-105" : "border-gray-200"
            } bg-white transition-transform hover:scale-105`}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
            
            <ul className="flex-1 mb-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button
              className={`w-full py-3 rounded-xl font-medium transition ${
                plan.popular
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
