import React from 'react';
import Navbar from '../RecruiterPages/Notifications/Navbar';  // Updated Navbar import path
import JobCard from '../components/JobCard';  // Import the existing JobCard component
import saved from '../data/saved.json';  // This file will contain your saved job data
import { motion } from 'framer-motion';

const SavedJobs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen pt-16'>
      {/* Navbar */}
      <Navbar pageName="Saved Jobs" />

      {/* Header */}
      <motion.div 
        className="px-6 py-4 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">Saved Jobs</h1>
        <p className="text-gray-600 mt-2 pl-4">Jobs you've saved for later application</p>
      </motion.div>

      {/* Saved Jobs List */}
      <motion.div 
        className="mx-4 md:mx-8 lg:mx-auto max-w-5xl px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Job Cards */}
        <div className="flex flex-col space-y-4 sm:pt-6"> 
          {saved.length > 0 ? (
            saved.map((job, index) => (
              <motion.div 
                key={job.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <JobCard job={job} />
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5F9D08]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No saved jobs yet</h3>
              <p className="text-gray-600">Jobs you save will appear here for easy access</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SavedJobs;
