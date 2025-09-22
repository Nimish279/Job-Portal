import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "Free",
    features: [
      "Post up to 2 jobs/internships per month",
      "Access up to 20 candidate resumes",
      "Limited access to candidate profiles",
      "Basic candidate search (limited filters)",
      "Messaging with candidates",
      "Standard customer support",
    ],
  },
  {
    name: "Bronze",
    price: "₹99 / month",
    features: [
      "Affordable plan for growing recruiters.",
      "Post up to 20 jobs/internships per month",
      "Unlimited access to candidate resumes",
      "Basic candidate search + access to resumes",
      "Email & Call support (11 AM – 6 PM)",
    ],
  },
  {
    name: "Silver",
    price: "₹199 / month",
    features: [
      "Best value for recruiters with regular hiring needs.",
      "Post up to 50 jobs/internships per month",
      "Unlimited access to candidate resumes",
      "Unlock candidate phone numbers",
      "Advanced candidate search & filters",
      "Email & Call support (11 AM – 6 PM)",
    ],
    popular: true,
  },
  {
    name: "Gold",
    price: "₹399 / month",
    features: [
      "Premium plan for serious hiring teams.",
      "Post up to 100 jobs/internships per month",
      "Unlimited access to candidate resumes",
      "Unlock candidate phone numbers",
      "Full candidate search with all filters",
      "24/7 priority support",
      "Money-back guarantee if no candidates are hired",
    ],
  },
];

const SubscriptionPlans = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <main className="bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center py-5 px-6 md:px-16">
          <div className="text-2xl font-extrabold text-green-600 tracking-wide">
            <Link to="/">JobPortal</Link>
          </div>
          <ul className="hidden md:flex gap-10 text-gray-700 font-medium flex-1 justify-center">
            <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-green-600 transition">About</Link></li>
            <li><Link to="/subscription" className="hover:text-green-600 transition">Plans</Link></li>
            <li><Link to="/support" className="hover:text-green-600 transition">Support</Link></li>
          </ul>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/users/login" className="hover:text-green-600 font-semibold transition">Login</Link>
            <Link to="/recruiters/register" className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition-shadow shadow-md">
              Post a Job
            </Link>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-gray-900 rounded-sm"></span>
            <span className="w-6 h-0.5 bg-gray-900 rounded-sm"></span>
            <span className="w-6 h-0.5 bg-gray-900 rounded-sm"></span>
          </button>
        </nav>
      </header>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="fixed top-0 right-0 bottom-0 w-3/4 sm:w-1/3 bg-white shadow-xl z-50 p-8 flex flex-col"
          >
            <button
              className="self-end text-3xl text-gray-700 hover:text-green-600 transition"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              &times;
            </button>
            <ul className="flex flex-col gap-8 text-lg font-semibold mt-10">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-green-600 transition">Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-green-600 transition">About</Link></li>
              <li><Link to="/subscription" onClick={() => setIsMenuOpen(false)} className="hover:text-green-600 transition">Plans</Link></li>
              <li><Link to="/support" onClick={() => setIsMenuOpen(false)} className="hover:text-green-600 transition">Support</Link></li>
              <li><Link to="/users/login" onClick={() => setIsMenuOpen(false)} className="hover:text-green-600 transition">Login</Link></li>
              <li>
                <Link to="/recruiters/register" onClick={() => setIsMenuOpen(false)} className="bg-green-600 text-white px-5 py-3 rounded-md shadow hover:bg-green-700 transition">
                  Post a Job
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Plans Section */}
      <section className="py-28 px-6 md:px-20 text-center bg-gray-50">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 max-w-3xl mx-auto mb-12 leading-tight"
        >
          Recruiter Subscription Plans
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-20 leading-relaxed">
          Scale your hiring with plans designed to give recruiters the right tools & visibility.
        </p>

        {/* 2x2 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.08, boxShadow: "0 10px 30px rgba(72, 187, 120, 0.3)" }}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.25 }}
              className={`bg-white rounded-3xl p-14 shadow-lg border transition-colors ${
                plan.popular
                  ? "border-green-600 bg-gradient-to-b from-green-50 via-white to-white"
                  : "border-gray-300"
              }`}
            >
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">{plan.name}</h2>
              <p className="text-5xl font-extrabold text-green-600 mb-12">{plan.price}</p>
              <ul className="space-y-6 mb-12 text-left text-gray-700 leading-relaxed text-lg">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="w-7 h-7 flex-shrink-0 text-green-500 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-5 rounded-full text-xl font-semibold transition-shadow duration-300 ${
                  plan.popular
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-2xl"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SubscriptionPlans;
