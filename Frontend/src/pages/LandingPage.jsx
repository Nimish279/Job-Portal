import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AmazonLogo from '../assets/images/AmazonLogo.png';
import AppleLogo from '../assets/images/AppleLogo.jpg';
import TataLogo from '../assets/images/TataLogo.jpg';
import HpLogo from '../assets/images/HpLogo.jpg';
import NetworkOfConn from '../assets/images/NetworkOfConn.jpg';
import Logo from '../assets/images/logo.jpg';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-[#5F9D08] p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Job Search Logo" className="h-10 w-10 rounded-full" />
        </div>

        {/* Desktop Navbar Items (aligned to the right) */}
        <div className="hidden sm:flex items-center gap-6 ml-auto">
          <Link to="/users/login" className="text-white hover:underline">Find a job</Link>
          <Link to="/recruiters/login" className="text-white hover:underline">Hire Now</Link>
          {/* <Link to="/registration" className="text-white hover:underline">Sign-up</Link> */}
          <div className="flex items-center bg-white rounded-full p-2 w-60">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zm4.707 10.293a1 1 0 00-1.414-1.414L10 14.586l-3.293-3.293a1 1 0 00-1.414 1.414L8.586 16l-3.293 3.293a1 1 0 001.414 1.414L10 17.414l3.293-3.293a1 1 0 001.414-1.414L11.414 16l3.293-3.293z" clipRule="evenodd" />
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="ml-2 focus:outline-none w-full text-sm" 
            />
          </div>
        </div>

        {/* Hamburger Button for Mobile (only shown on small screens) */}
        <button 
          onClick={toggleMenu} 
          data-collapse-toggle="navbar-hamburger" 
          type="button" 
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
          aria-controls="navbar-hamburger" 
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#5F9D08] p-4 flex flex-col gap-4">
          <Link to="/login" className="text-white hover:underline">Find a job</Link>
          <Link to="/recruiters/login" className="text-white hover:underline">Hire Now</Link>
          {/* <Link to="/registration" className="text-white hover:underline">Sign-up</Link> */}
          <div className="flex items-center bg-white rounded-full p-2 w-full">
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zm4.707 10.293a1 1 0 00-1.414-1.414L10 14.586l-3.293-3.293a1 1 0 00-1.414 1.414L8.586 16l-3.293 3.293a1 1 0 001.414 1.414L10 17.414l3.293-3.293a1 1 0 001.414-1.414L11.414 16l3.293-3.293z" clipRule="evenodd" />
            </svg>
            <input 
              type="text" 
              placeholder="Search" 
              className="ml-2 focus:outline-none w-full text-sm" 
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="text-center p-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-16">Connecting Talent With Opportunity</h1>
        
        {/* Background Image */}
        <div 
          className="w-full h-[300px] sm:h-[400px] bg-cover bg-center mb-16" 
          style={{ backgroundImage: `url(${NetworkOfConn})` }}
        ></div>
        
        {/* Text Content */}
        <p className="mb-16">
          Welcome to [Your Portal Name], where we bridge the gap between exceptional talent and leading employers.
          Founded in [Year], our mission is to revolutionize the hiring process by providing a seamless, efficient, and user-friendly platform for both job seekers and recruiters.
        </p>

        {/* Top Companies */}
        <h2 className="text-2xl font-bold mb-12">Top Companies</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <img src={AmazonLogo} alt="Amazon" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
          <img src={TataLogo} alt="HP" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
          <img src={AppleLogo} alt="Tata" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
          <img src={HpLogo} alt="Apple" className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain" />
        </div>

        {/* Responsive Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to='/users/login' className="bg-[#5F9D08] text-white py-2 w-full sm:w-64 md:w-80 lg:w-96 rounded-full">
            Find a Job
          </Link>
          <Link to='/recruiters/login' className="bg-[#5F9D08] text-white py-2 w-full sm:w-64 md:w-80 lg:w-96 rounded-full">
            Post a Job
          </Link>
        </div> 
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* General Information */}
          <div>
            <h3 className="font-bold mb-2">General Information</h3>
            <ul>
              <li><a href="#" className="text-gray-600 hover:underline">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">FAQs</a></li>
            </ul>
          </div>
          {/* Policies and Legal */}
          <div>
            <h3 className="font-bold mb-2">Policies and Legal</h3>
            <ul>
              <li><a href="#" className="text-gray-600 hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div>
            <h3 className="font-bold mb-2">Social Media Links</h3>
            <ul>
              <li><a href="#" className="text-gray-600 hover:underline">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:underline">Twitter</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
