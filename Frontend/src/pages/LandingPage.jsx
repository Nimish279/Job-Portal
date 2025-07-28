import React from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

const JobPortalHome = () => {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-[#5F9D08] tracking-tight">
          Job<span className="text-gray-800">Portal</span>
        </Link>
        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="text-gray-600 hover:text-[#5F9D08] transition duration-200">Home</Link>
          <Link to="/users/login" className="text-gray-600 hover:text-[#5F9D08] transition duration-200">Login</Link>
          <Link to="/users/register" className="text-gray-600 hover:text-[#5F9D08] transition duration-200">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 bg-gradient-to-r from-[#eaf9d4] to-[#f9fef3]">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
            Find Your <span className="text-[#5F9D08]">Dream Job</span> Today!
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Connecting Talent with Opportunity – Your Gateway to Career Success.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/users/login">
              <button className="bg-[#5F9D08] hover:bg-[#4a7c06] text-white px-8 py-3 rounded-full text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg">
                Search Jobs
              </button>
            </Link>
            <Link to="/about">
              <button className="border border-[#5F9D08] text-[#5F9D08] hover:bg-[#5F9D08] hover:text-white px-8 py-3 rounded-full text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white text-center py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Good Life Begins With a Great Company
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Elevate your career with companies that value talent, growth, and innovation.
          Discover opportunities that align with your goals and unlock your full potential.
        </p>
        <Link to="/users/register">
          <button className="bg-[#5F9D08] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#417305] transition-all duration-300 shadow hover:shadow-md">
            Join Now
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/team" className="hover:underline">Our Team</Link></li>
              <li><Link to="/partners" className="hover:underline">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>Technology</li>
              <li>Tourism</li>
              <li>Construction</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Newsletter</h4>
            <p className="mb-4 text-gray-400 leading-relaxed">
              Subscribe to get the latest job alerts, career tips, and updates.
            </p>
             <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col w-full max-w-md"
          >
            {/* Input with Icon */}
            <div className="flex items-center border border-gray-200 rounded-full px-3 py-2">
              <FiMail className="text-gray-400 text-lg mr-2" />
              <input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1 text-sm text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
              />
            </div>

            {/* Subscribe Button Below */}
            <button
              type="submit"
              className="mt-4 bg-[#5F9D08] hover:bg-[#417305] text-white text-sm font-semibold px-5 py-2 rounded-full transition-all"
            >
              Subscribe
            </button>
          </form>
          </div>
        </div>
        <div className="text-center mt-10 text-xs text-gray-500">
          © 2025 Job Portal &nbsp;|&nbsp;
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link> &nbsp;|&nbsp;
          <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
        </div>
      </footer>
    </div>
  );
};

export default JobPortalHome;
