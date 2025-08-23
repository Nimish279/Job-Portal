import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import landingImage from '../assets/images/landing_page.jpg';

function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar Section */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="flex justify-between items-center py-4 px-8 md:px-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#4CAF50]">JobPortal</div>

          {/* Links */}
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium flex-1 justify-center">
            {/* <li><Link to="/" className="hover:text-[#4CAF50]">Home</Link></li> */}
            <li><Link to="/about" className="hover:text-[#4CAF50]">About</Link></li>
            <li><Link to="/subscription" className="hover:text-[#4CAF50]">Plans</Link></li>
            <li><Link to="/support" className="hover:text-[#4CAF50]">Support</Link></li>
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link to="/users/login" className="hover:text-[#4CAF50] font-medium">
              Login
            </Link>

            {/* Register Dropdown (click-based) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="font-medium text-gray-700 hover:text-[#4CAF50] flex items-center"
              >
                Register ▾
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-40 z-50">
                  <li>
                    <Link
                      to="/users/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Job Seeker
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/recruiters/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Recruiter
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Highlighted CTA */}
            <Link
              to="/recruiters/register"
              className="hidden md:inline-block bg-[#4CAF50] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#45a049] transition"
            >
              Post a Job
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main>
        <section
          id="home"
          className="flex flex-col md:flex-row items-center justify-between py-24 px-5 min-h-[80vh] bg-gradient-to-b from-[#e0ffe0] to-[#c0f0c0] md:py-20 md:px-16"
        >
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl font-bold text-gray-800 mb-5 leading-tight">
              Find Your <span className="text-[#4CAF50]">Dream Job</span> Today!
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
              Connecting Talent with Opportunity – Your Gateway to Career Success.
            </p>
            <div className="flex flex-wrap gap-5 justify-center md:justify-start">
              <Link to="/users/register">
                <button className="py-3 px-6 rounded-md text-lg font-semibold bg-[#4CAF50] text-white hover:bg-[#45a049] transition-transform transform hover:-translate-y-0.5">
                  I’m a Job Seeker
                </button>
              </Link>
              <Link to="/recruiters/register">
                <button className="py-3 px-6 rounded-md text-lg font-semibold border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-transform transform hover:-translate-y-0.5">
                  I’m a Recruiter
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={landingImage}
              alt="Job Portal Illustration"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Company Info Section */}
        <section className="flex flex-col items-center text-center py-20 px-5 bg-white md:py-16 md:px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 max-w-2xl">
            Good Life Begins With a Great Company
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed">
            Elevate your career with companies that value talent, growth, and innovation. Discover opportunities that align with your goals and unlock your full potential.
          </p>

          {/* Learn More Button */}
          <Link to="/learn-more">
            <button className="py-3 px-6 rounded-md text-lg font-semibold bg-[#4CAF50] text-white hover:bg-[#45a049] transition-transform transform hover:-translate-y-0.5">
              Learn More
            </button>
          </Link>
        </section>
      </main>

      <div className="text-center py-4 bg-[#111e2d] text-gray-400 text-sm px-4">
        © 2025 Job Portal. |{' '}
        <a href="#privacy" className="hover:text-[#4CAF50]">Privacy Policy</a> |{' '}
        <a href="#terms-conditions" className="hover:text-[#4CAF50]">Terms & Conditions</a>
      </div>
    </>
  );
}

export default LandingPage;
