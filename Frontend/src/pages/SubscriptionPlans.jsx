import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="flex justify-between items-center py-4 px-6 md:px-16">
          <div className="text-2xl font-bold text-[#4CAF50]">
            <Link to="/">JobPortal</Link>
          </div>
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium flex-1 justify-center">
            <li><Link to="/about" className="hover:text-[#4CAF50]">About</Link></li>
            <li><Link to="/subscription" className="hover:text-[#4CAF50]">Plans</Link></li>
            <li><Link to="/support" className="hover:text-[#4CAF50]">Support</Link></li>
          </ul>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/users/login" className="hover:text-[#4CAF50] font-medium">Login</Link>
            <Link to="/recruiters/register" className="bg-[#4CAF50] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#45a049] transition shadow-md">Post a Job</Link>
          </div>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden flex flex-col gap-1">
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
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
            className="absolute top-0 right-0 w-3/4 sm:w-1/4 bg-white shadow-2xl z-50 p-8 flex flex-col"
          >
            <button className="self-end text-2xl mb-6 text-gray-600 hover:text-[#4CAF50]" onClick={() => setIsMenuOpen(false)}>✕</button>
            <ul className="flex flex-col gap-6 text-lg font-medium text-gray-700">
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/subscription" onClick={() => setIsMenuOpen(false)}>Plans</Link></li>
              <li><Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link></li>
              <li><Link to="/users/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
              <li>
                <Link to="/recruiters/register" onClick={() => setIsMenuOpen(false)} className="bg-[#4CAF50] text-white px-4 py-2 rounded-md shadow hover:bg-[#45a049] transition">
                  Post a Job
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Plans Section */}
      <section className="py-20 px-6 md:px-16 text-center">
        <motion.h1 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Recruiter Subscription Plans
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Scale your hiring with plans designed to give recruiters the right tools & visibility.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`rounded-2xl p-8 shadow-xl transition ${plan.popular ? "border-2 border-[#4CAF50] bg-gradient-to-b from-green-50 to-white" : "border border-gray-200 bg-white"}`}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h2>
              <p className="text-3xl font-extrabold text-[#4CAF50] mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-6 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition ${plan.popular ? "bg-[#4CAF50] text-white hover:bg-[#45a049]" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}>
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
