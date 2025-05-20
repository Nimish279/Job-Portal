import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import jobsData from '../data/jobsData.json'; // Import the jobs data from JSON

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
    <div className="md:px-5 lg:px-6 font-sans">
      {/* Header Component */}
      <Navbar pageName="Job Recs" />

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center bg-[#5F9D08] p-2 mt-14">
        <div className="font-bold text-white text-lg mr-4">Filter By</div>

        {/* Hamburger Button for small screens */}
        <button
          className="lg:hidden text-white text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>

        {/* Filter Dropdowns for small and large screens */}
        <div className={`lg:flex ${isMenuOpen ? 'flex' : 'hidden'} lg:flex-row flex-col`}>
          {/* Location Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 mr-5 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded flex justify-between items-center hover:bg-[#4A8B07] transition duration-150">
              Location <span className="ml-2">▼</span>
            </button>
            <div className="absolute bg-white shadow-lg z-10 mt-1 rounded w-40 hidden group-hover:block">
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">Bangalore</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">Pune</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">Mumbai</a>
            </div>
          </div>

          {/* Skills Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 mr-5 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded flex justify-between items-center hover:bg-[#4A8B07] transition duration-150">
              Skills <span className="ml-2">▼</span>
            </button>
            <div className="absolute bg-white shadow-lg z-10 mt-1 rounded w-40 hidden group-hover:block">
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">React</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">Node.js</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">Java</a>
            </div>
          </div>

          {/* Domains Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 mr-5 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded flex justify-between items-center hover:bg-[#4A8B07] transition duration-150">
              Domains <span className="ml-2">▼</span>
            </button>
            <div className="absolute bg-white shadow-lg z-10 mt-1 rounded w-40 hidden group-hover:block">
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">IT</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">HR</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">Graphic Design</a>
            </div>
          </div>

          {/* Salary Dropdown */}
          <div className="relative flex-grow mb-2 lg:mb-0 group">
            <button className="w-full bg-[#5F9D08] text-white p-2 rounded flex justify-between items-center hover:bg-[#4A8B07] transition duration-150">
              Salary <span className="ml-2">▼</span>
            </button>
            <div className="absolute bg-white shadow-lg z-10 mt-1 rounded w-40 hidden group-hover:block">
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">40,000 LPA</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">60,000 LPA</a>
              <a href="#" className="block p-2 hover:bg-gray-300 transition duration-150">80,000 LPA</a>
            </div>
          </div>
        </div>
      </div>

      {/* Job list */}
      <div className="lg:mt-5 md:mt-5 mt-2">
        {jobsData.map((job, index) => (
          <div key={index} className="relative bg-gray-100 lg:p-4 p-2 rounded-lg shadow-md mb-2 md:mx-4 lg:mx-4 mx-2 hover:shadow-lg transition duration-150">
            <div className="flex items-center">
              <div>
                <h3 className="m-0 text-sm lg:text-lg">{job.jobTitle}</h3>
                <p className="text-xs lg:text-md">{job.company}</p>
                <p className="text-gray-600 text-xs lg:text-">
                  {screenWidth < 768 ? (
                    <>
                      {job.experience} | {job.jobType} | <span className="text-[#5F9D08] cursor-pointer"> . . .</span>
                    </>
                  ) : (
                    <>
                      {job.experience} | {job.jobType} | {job.salary}
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="absolute top-1 lg:top-2 right-16 lg:right-28 pr-4 text-gray-400 text-xs lg:text-sm">Posted {job.timeAgo}</div>
            <div className="absolute top-1 lg:top-2 right-2 lg:right-10 text-gray-400 text-xs lg:text-sm space-x-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1" /> Save Job
              </label>
            </div>
            <div className="absolute bottom-1 lg:bottom-4 right-1 lg:right-4 flex items-center">
              <button className="bg-[#5F9D08] text-xs lg:text-md md:text-sm text-white px-3 py-1 rounded hover:bg-[#4A8B07] transition duration-150 mr-2">Apply Now</button>
              <button className="bg-white text-[#5F9D08] border-2 text-xs lg:text-md md:text-sm border-[#5F9D08] px-3 py-1 rounded hover:bg-gray-200 transition duration-150">Know More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;
