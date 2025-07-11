import React, { useState, useEffect } from 'react';
import UserNavbar from '../components/Header/UserNavbar';
import jobsData from '../data/jobsData.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ✅ for routing

const JobRecommendations = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // ✅ initialize navigation

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="md:px-5 lg:px-6 font-sans bg-gray-50 min-h-screen pt-16">
      {/* Header */}
      <UserNavbar pageName="Job Recs" />

      {/* Filters - currently hidden */}
      <div className="hidden">{/* ... filters code ... */}</div>

      {/* Job list */}
      <div className="lg:mt-6 md:mt-6 mt-4 px-2 relative z-0">
        {jobsData.map((job, index) => (
          <motion.div
            key={job.id} // ✅ use job.id for key
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
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>{job.experience}
                      </span> | 
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mx-1"></span>{job.jobType}
                      </span> | 
                      <span className="text-[#5F9D08] cursor-pointer font-medium"> . . .</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>{job.experience}
                      </span> | 
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mx-1"></span>{job.jobType}
                      </span> | 
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mx-1"></span>{job.salary}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Posted time */}
            <div className="absolute top-2 lg:top-3 right-16 lg:right-28 pr-4 text-gray-500 text-xs lg:text-sm font-medium">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#5F9D08]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Posted {job.timeAgo}
              </span>
            </div>

            {/* Save checkbox */}
            <div className="absolute top-2 lg:top-3 right-2 lg:right-10 text-gray-600 text-xs lg:text-sm space-x-2">
              <label className="flex items-center cursor-pointer hover:text-[#5F9D08] transition-colors duration-200">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-[#5F9D08] rounded border-gray-300 focus:ring-[#5F9D08] mr-1" /> 
                <span>Save Job</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 flex items-center">
              <button
                onClick={() => navigate(`/users/apply/${job.id}`)} // ✅ Apply Now
                className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-xs lg:text-md md:text-sm text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 mr-3 font-medium"
              >
                Apply Now
              </button>
              <button
                onClick={() => navigate(`/users/job/${job.id}`)} // ✅ Know More
                className="bg-white text-[#5F9D08] border-2 text-xs lg:text-md md:text-sm border-[#5F9D08] px-4 py-1.5 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium"
              >
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
