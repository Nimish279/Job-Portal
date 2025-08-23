import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "../components/SideBar";
import NavSearchBar from "../components/Header/NavSearchBar";
import JobCard from "../components/JobCard";

const SavedJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedJobs = localStorage.getItem("savedJobs");
    if (storedJobs) {
      setSavedJobs(JSON.parse(storedJobs));
    }
  }, []);

  const isMobile = windowWidth < 768;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // ✅ Remove single job
  const handleRemoveJob = (jobId) => {
    const updatedJobs = savedJobs.filter((job) => job._id !== jobId && job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  // ✅ Clear all jobs
  const handleClearAll = () => {
    setSavedJobs([]);
    localStorage.removeItem("savedJobs");
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

      <div className="flex-1 flex flex-col pt-24 lg:pl-64 px-4 md:px-8">
        <motion.div
          className="mb-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">
              Saved Jobs
            </h1>
            <p className="text-gray-600 mt-2 pl-4">
              Jobs you've saved for later application
            </p>
          </div>

          {savedJobs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
            >
              Clear All
            </button>
          )}
        </motion.div>

        <motion.div
          className="w-full max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col space-y-4 sm:pt-6">
            {savedJobs.length > 0 ? (
              savedJobs.map((job, index) => (
                <motion.div
                  key={job._id || job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="relative"
                >
                  <JobCard job={job} />

                  {/* ✅ Remove button on each job */}
                  <button
                    onClick={() => handleRemoveJob(job._id || job.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Remove
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center py-16 bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-[#5F9D08]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  No saved jobs yet
                </h3>
                <p className="text-gray-600">
                  Jobs you save will appear here for easy access
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SavedJobs;
