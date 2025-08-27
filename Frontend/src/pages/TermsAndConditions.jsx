import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sidebar Animations
  const sidebarVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="flex justify-between items-center py-4 px-6 md:px-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#4CAF50]">
            <Link to="/">JobPortal</Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium flex-1 justify-center">
            <li><Link to="/about" className="hover:text-[#4CAF50]">About</Link></li>
            <li><Link to="/subscription" className="hover:text-[#4CAF50]">Plans</Link></li>
            <li><Link to="/support" className="hover:text-[#4CAF50]">Support</Link></li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/users/login" className="hover:text-[#4CAF50] font-medium">Login</Link>
            <Link
              to="/recruiters/register"
              className="bg-[#4CAF50] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#45a049] transition shadow-md"
            >
              Post a Job
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden flex flex-col gap-1">
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="absolute top-0 right-0 w-3/4 sm:w-1/4 bg-white shadow-2xl z-50 p-8 flex flex-col"
          >
            <button
              className="self-end text-2xl mb-6 text-gray-600 hover:text-[#4CAF50]"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>
            <ul className="flex flex-col gap-6 text-lg font-medium text-gray-700">
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link to="/subscription" onClick={() => setIsMenuOpen(false)}>Plans</Link></li>
              <li><Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link></li>
              <li><Link to="/users/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
              <li>
                <Link
                  to="/recruiters/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#4CAF50] text-white px-4 py-2 rounded-md shadow hover:bg-[#45a049] transition"
                >
                  Post a Job
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Terms Content */}
      <motion.div
        className="max-w-4xl mx-auto p-10 mt-12 bg-white shadow-2xl rounded-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">📜 Terms & Conditions</h1>
        <p className="text-gray-600 mb-6 text-lg">
          By using our Job Portal, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md">
            <h2 className="text-xl font-semibold text-[#4CAF50] mb-3">👩‍💼 For Job Seekers</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate profile & resume details.</li>
              <li>Do not submit fake job applications.</li>
              <li>Respect recruiters’ workflow decisions.</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md">
            <h2 className="text-xl font-semibold text-[#4CAF50] mb-3">🏢 For Recruiters</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Post genuine jobs only.</li>
              <li>Use accept/reject responsibly.</li>
              <li>Do not misuse candidate data.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-[#4CAF50] mb-3">⚖️ General Terms</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>We may update features anytime.</li>
            <li>Violators may face account suspension.</li>
            <li>We are not responsible for external job offers.</li>
          </ul>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
          <Link
            to="/"
            className="inline-block bg-[#4CAF50] text-white px-6 py-3 rounded-lg shadow hover:bg-[#45a049] transition"
          >
            ⬅ Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default TermsAndConditions;
