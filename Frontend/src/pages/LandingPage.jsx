import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      {/* Navbar Section */}
      <header>
        <nav className="flex flex-col md:flex-row justify-between items-center py-5 px-12 bg-white shadow-sm md:px-5 md:py-4">
          <div className="text-2xl font-bold text-[#4CAF50]">JobPortal</div>
          <ul className="flex gap-8 list-none m-0 p-0 md:flex-row md:mt-0 mt-4">
            <li><a href="#home" className="text-gray-700 text-base font-medium hover:text-[#4CAF50] transition-colors">Home</a></li>
            <li><a href="/users/login" className="text-gray-700 text-base font-medium hover:text-[#4CAF50] transition-colors">Login</a></li>
            <li><a href="/users/register" className="text-gray-700 text-base font-medium hover:text-[#4CAF50] transition-colors">Register</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section id="home" className="flex flex-col justify-center items-center text-center py-24 px-5 min-h-[60vh] bg-gradient-to-b from-[#e0ffe0] to-[#c0f0c0] md:py-20 md:px-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-5 max-w-4xl leading-tight lg:text-4xl md:text-3xl sm:text-2xl">
            Find Your <span className="text-[#4CAF50]">Dream Job</span> Today!
          </h1>
          <p className="text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed lg:text-xl md:text-lg sm:text-base">
            Connecting Talent with Opportunity – Your Gateway to Career Success.
          </p>
          <div className="flex gap-5">
          <button className="py-4 px-8 rounded-md text-xl cursor-pointer transition-all duration-300 bg-[#4CAF50] text-white hover:bg-[#45a049] hover:-translate-y-0.5" >
            Search Jobs
          </button>
          <button className="py-4 px-8 rounded-md text-xl cursor-pointer transition-all duration-300 bg-transparent border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white hover:-translate-y-0.5">
            Learn More
          </button>
        </div>
        </section>

        {/* Company Info Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-5 bg-white md:py-16 md:px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-5 max-w-3xl lg:text-3xl md:text-2xl sm:text-xl">
            Good Life Begins With a Great Company
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed lg:text-lg md:text-base sm:text-sm">
            Elevate your career with companies that value talent, growth, and innovation. Discover opportunities that align with your goals and unlock your full potential.
          </p>
          <Link to="/recruiters/register">
          <button className="py-4 px-8 rounded-md text-xl cursor-pointer transition-all duration-300 bg-[#4CAF50] text-white hover:bg-[#45a049] hover:-translate-y-0.5">Join Now</button>
          </Link>
        </section>
      </main>

      {/* Footer Section */}
<footer className="bg-[#1a2a3a] text-white py-16 px-5">
  <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
    {/* Company */}
    <div>
      <h4 className="text-lg font-bold mb-5 text-[#4CAF50]">Company</h4>
      <ul className="space-y-2 text-gray-300 text-base">
        <li><a href="#about-us" className="hover:text-[#4CAF50]">About Us</a></li>
        <li><a href="#our-team" className="hover:text-[#4CAF50]">Our Team</a></li>
        <li><a href="#partners" className="hover:text-[#4CAF50]">Partners</a></li>
      </ul>
    </div>

    {/* Categories */}
    <div>
      <h4 className="text-lg font-bold mb-5 text-[#4CAF50]">Categories</h4>
      <ul className="space-y-2 text-gray-300 text-base">
        <li><a href="#technology" className="hover:text-[#4CAF50]">Technology</a></li>
        <li><a href="#tourism" className="hover:text-[#4CAF50]">Tourism</a></li>
        <li><a href="#construction" className="hover:text-[#4CAF50]">Construction</a></li>
      </ul>
    </div>

    {/* Support */}
    <div>
      <h4 className="text-lg font-bold mb-5 text-[#4CAF50]">Support</h4>
      <ul className="space-y-2 text-gray-300 text-base">
        <li><a href="#faqs" className="hover:text-[#4CAF50]">FAQs</a></li>
        <li><a href="#contact" className="hover:text-[#4CAF50]">Contact</a></li>
        <li><a href="#terms" className="hover:text-[#4CAF50]">Terms</a></li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h4 className="text-lg font-bold mb-5 text-[#4CAF50]">Newsletter</h4>
      <p className="text-gray-300 text-base mb-4">
        Subscribe to get the latest job alerts, career tips, and updates.
      </p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#41B84D] hover:bg-[#369D40] text-white font-semibold py-2 rounded-md transition-colors"
        >
          Subscribe now
        </button>
      </form>
    </div>
  </div>
</footer>

{/* Bottom Bar */}
<div className="text-center py-4 bg-[#111e2d] text-gray-400 text-sm px-4">
  © 2025 Job Portal. Designed by Figma.guru |{" "}
  <a href="#privacy" className="hover:text-[#4CAF50] transition-colors">Privacy Policy</a> |{" "}
  <a href="#terms-conditions" className="hover:text-[#4CAF50] transition-colors">Terms & Conditions</a>
</div>
    </>
  );
}

export default LandingPage;
