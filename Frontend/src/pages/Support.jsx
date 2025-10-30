import React from "react";
import { motion,AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";


function SupportPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Motion variants
    const sidebarVariants = {
      hidden: { x: "100%",opacity: 0 },
      visible: { x: 0, transition: { duration: 0.4, ease: "easeInOut" }, opacity: 1 },
      exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } }
    };
  
    const fadeUp = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    };

  return (
    <main>
      {/* Hero Section */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="flex justify-between items-center py-4 px-8 md:px-16">
          <div className="text-2xl font-bold text-[#4CAF50]"><Link to="/" className="hover:text-[#4CAF50]">JobPortal</Link></div>

          <ul className="hidden md:flex gap-8 text-gray-700 font-medium flex-1 justify-center">
            <li><Link to="/" className="hover:text-[#4CAF50]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#4CAF50]">About</Link></li>
            <li><Link to="/subscription" className="hover:text-[#4CAF50]">Plans</Link></li>
            <li><Link to="/support" className="hover:text-[#4CAF50]">Support</Link></li>
          </ul>

          <div className="hidden md:flex items-center gap-4">
                      <Link to="/users/login" className="hover:text-[#4CAF50] font-medium">Login</Link>
                      <Link
                        to="/recruiters/register"
                        className="bg-[#4CAF50] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#45a049] transition shadow-md"
                      >
                        Post a Job
                      </Link>
                    </div>
          <button
            className="md:hidden flex flex-col gap-1 focus:outline-none"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="absolute top-0 right-0  min-w-1/4  bg-white rounded-xl shadow-2xl z-50 p-8 flex flex-col"
          >
            {/* Close Button */}
            <button
              className="self-end text-2xl mb-8 text-gray-600 hover:text-[#4CAF50]"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>

            {/* Nav Links */}
            <ul className="flex flex-col gap-6 text-lg font-medium text-gray-700">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
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
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#e0ffe0] to-[#c0f0c0] text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-lg mb-6"
        >
          We’re Here to <span className="text-[#4CAF50]">Help</span>
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Have questions or need assistance? Our support team is ready to guide you.
        </motion.p>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 text-center mb-16"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            { q: "How do I create an account?", a: "Simply click 'Register' on the homepage and choose whether you're a job seeker or recruiter." },
            { q: "Is posting jobs free?", a: "Recruiters can post jobs with our premium subscription plans. Job seekers can apply for free." },
            { q: "Can I track my applications?", a: "Yes, you can easily monitor applied jobs and their status from your dashboard." },
          ].map((faq, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold text-[#4CAF50] mb-3">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 mb-10"
        >
          Still Need Help?
        </motion.h2>
        <p className="text-lg text-gray-600 mb-12">
          Reach out to our support team — we’ll get back to you as soon as possible.
        </p>
        <form className="max-w-2xl mx-auto space-y-6">
          <input
            type="text"
            placeholder="Your Name" required
            className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#4CAF50]"
          />
          <input
            type="email" required
            placeholder="Your Email"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#4CAF50]"
          />
          <textarea
            placeholder="Your Message" required
            rows="5"
            className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#4CAF50]"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            className="px-8 py-4 bg-[#4CAF50] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#45a049] transition"
          >
            Send Message
          </motion.button>
        </form>
      </section>
    </main>
  );
}

export default SupportPage;
