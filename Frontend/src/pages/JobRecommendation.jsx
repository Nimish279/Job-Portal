import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import NavSearchBar from '../components/Header/NavSearchBar';
import Sidebar from '../components/SideBar';
import jobsData from '../data/jobsData.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JobRecommendations = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem('savedJobs');
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();
  const isMobile = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaveJob = (job) => {
    const normalizedJob = {
      ...job,
      title: job.jobTitle,
    };
    const isSaved = savedJobs.some((saved) => saved.id === job.id);
    const updatedJobs = isSaved
      ? savedJobs.filter((saved) => saved.id !== job.id)
      : [...savedJobs, normalizedJob];

    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));

    // ✅ Show toast notification
    if (isSaved) {
      toast.info('Removed from saved jobs');
    } else {
      toast.success('Job saved successfully!');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
      <NavSearchBar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        showHamburger={true}
      />

      {!isMobile && (
        <div className="hidden lg:block fixed top-20 left-0 z-30">
          <Sidebar isOpen={true} isMobile={false} />
        </div>
      )}

      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isMobile={true}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 pt-24 lg:pl-64 px-4 md:px-8">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">
            Job Recommendations
          </h1>
          <p className="text-gray-600 mt-2 pl-4">
            Here are some job recommendations based on your skills and experience.
          </p>
        </motion.div>

        <motion.div
          className="lg:mt-6 md:mt-6 mt-4 relative z-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {jobsData.map((job, index) => {
            const isJobSaved = savedJobs.some((saved) => saved.id === job.id);
            return (
              <motion.div
                key={job.id}
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
                    <h3 className="m-0 text-sm lg:text-lg font-semibold text-gray-800">
                      {job.jobTitle}
                    </h3>
                    <p className="text-xs lg:text-md font-medium text-[#5F9D08]">
                      {job.company}
                    </p>
                    <p className="text-gray-600 text-xs lg:text-sm mt-1">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        {job.experience}
                      </span>{' '}
                      |{' '}
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mx-1"></span>
                        {job.jobType}
                      </span>{' '}
                      |{' '}
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mx-1"></span>
                        {job.salary}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="absolute top-2 lg:top-3 right-16 lg:right-28 pr-4 text-gray-500 text-xs lg:text-sm font-medium">
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-[#5F9D08]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Posted {job.timeAgo}
                  </span>
                </div>

                <div className="absolute top-2 lg:top-3 right-2 lg:right-10 text-gray-600 text-xs lg:text-sm space-x-2">
                  <label className="flex items-center cursor-pointer hover:text-[#5F9D08] transition-colors duration-200">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-[#5F9D08] rounded border-gray-300 focus:ring-[#5F9D08] mr-1"
                      checked={isJobSaved}
                      onChange={() => handleSaveJob(job)}
                    />
                    <span>Save Job</span>
                  </label>
                </div>

                <div className="absolute bottom-2 lg:bottom-4 right-2 lg:right-4 flex items-center">
                  <button
                    onClick={() => navigate(`/users/apply/${job.id}`)}
                    className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-xs lg:text-md md:text-sm text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all duration-300 mr-3 font-medium"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => navigate(`/users/job/${job.id}`)}
                    className="bg-white text-[#5F9D08] border-2 text-xs lg:text-md md:text-sm border-[#5F9D08] px-4 py-1.5 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium"
                  >
                    Know More
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ✅ Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default JobRecommendations;