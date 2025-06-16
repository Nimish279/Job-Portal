import React, { useState, useEffect } from 'react';
import UserNavbar from '../components/Header/UserNavbar';
import jobsData from '../data/jobsData.json'; // Import the jobs data from JSON
import { motion } from 'framer-motion'; // Import framer-motion for animations

const JobRecommendations = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Track screen width

  // Update screen width on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth); // Update state on resize
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="md:px-5 lg:px-6 font-sans bg-gray-50 min-h-screen">
      {/* Header Component */}
      <UserNavbar pageName="Job Recs" />

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] p-3 mt-14 rounded-lg shadow-md z-5 relative">
        <div className="font-bold text-white text-lg mr-4">Filter By</div>

        {/* Hamburger Button for small screens */}
        <button
          className="lg:hidden text-white text-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>

        {/* Filter Dropdowns for small and large screens */}
        <div className={`lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:flex-row flex-col transition-all duration-300 ease-in-out`}>
          {/* Location Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 mr-5 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded-lg flex justify-between items-center hover:bg-[#4A8B07] transition duration-300 shadow-sm hover:shadow-md">
              Location <span className="ml-2 transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>
            <div className="absolute bg-white shadow-xl z-50 mt-1 rounded-lg w-40 hidden group-hover:block transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100">
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-t-lg">Bangalore</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150">Pune</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-b-lg">Mumbai</a>
            </div>
          </div>

          {/* Skills Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 mr-5 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded-lg flex justify-between items-center hover:bg-[#4A8B07] transition duration-300 shadow-sm hover:shadow-md">
              Skills <span className="ml-2 transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>
            <div className="absolute bg-white shadow-xl z-50 mt-1 rounded-lg w-40 hidden group-hover:block transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100">
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-t-lg">React</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150">Node.js</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-b-lg">Java</a>
            </div>
          </div>

          {/* Domains Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 mr-5 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded-lg flex justify-between items-center hover:bg-[#4A8B07] transition duration-300 shadow-sm hover:shadow-md">
              Domains <span className="ml-2 transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>
            <div className="absolute bg-white shadow-xl z-50 mt-1 rounded-lg w-40 hidden group-hover:block transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100">
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-t-lg">IT</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150">HR</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-b-lg">Graphic Design</a>
            </div>
          </div>

          {/* Salary Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded-lg flex justify-between items-center hover:bg-[#4A8B07] transition duration-300 shadow-sm hover:shadow-md">
              Salary <span className="ml-2 transition-transform duration-300 group-hover:rotate-180">▼</span>
            </button>
            <div className="absolute bg-white shadow-xl z-50 mt-1 rounded-lg w-40 hidden group-hover:block transition-all duration-300 ease-in-out transform origin-top scale-95 group-hover:scale-100">
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-t-lg">40,000 LPA</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150">60,000 LPA</a>
              <a href="#" className="block p-2 hover:bg-green-50 hover:text-[#5F9D08] transition duration-150 rounded-b-lg">80,000 LPA</a>
            </div>
          </div>
        </div>
      </div>

      {/* Job list */}
      <div className="lg:mt-6 md:mt-6 mt-4 px-2 relative z-0">
        {jobsData.map((job, index) => (
          <motion.div 
            key={index} 
            className="relative bg-white lg:p-5 p-3 rounded-xl shadow-md mb-4 md:mx-4 lg:mx-4 mx-2 hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center">
              <div className="bg-green-50 p-2 rounded-full mr-3 hidden md:block">
                <div className="w-10 h-10 flex items-center justify-center text-[#5F9D08] font-bold text-xl">
                  {job.company.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="m-0 text-sm lg:text-lg font-semibold text-gray-800">{job.jobTitle}</h3>
                <p className="text-xs lg:text-md font-medium text-[#5F9D08]">{job.company}</p>
                <p className="text-gray-600 text-xs lg:text-sm mt-1">
                  {screenWidth < 768 ? (
                    <>
                      <span className="inline-flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>{job.experience}</span> | 
                      <span className="inline-flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mx-1"></span>{job.jobType}</span> | 
                      <span className="text-[#5F9D08] cursor-pointer font-medium"> . . .</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>{job.experience}</span> | 
                      <span className="inline-flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mx-1"></span>{job.jobType}</span> | 
                      <span className="inline-flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mx-1"></span>{job.salary}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="absolute top-2 lg:top-3 right-16 lg:right-28 pr-4 text-gray-500 text-xs lg:text-sm font-medium">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#5F9D08]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Posted {job.timeAgo}
              </span>
            </div>
            <div className="absolute top-2 lg:top-3 right-2 lg:right-10 text-gray-600 text-xs lg:text-sm space-x-2">
              <label className="flex items-center cursor-pointer hover:text-[#5F9D08] transition-colors duration-200">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-[#5F9D08] rounded border-gray-300 focus:ring-[#5F9D08] mr-1" /> 
                <span>Save Job</span>
              </label>
            </div>
            <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 flex items-center">
              <button className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-xs lg:text-md md:text-sm text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 mr-3 font-medium">
                Apply Now
              </button>
              <button className="bg-white text-[#5F9D08] border-2 text-xs lg:text-md md:text-sm border-[#5F9D08] px-4 py-1.5 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium">
                Know More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
