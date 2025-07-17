// src/components/SideBar_Recr.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import ActiveJobs from '../assets/images/ActiveJob00.png';
import ClosedJobs from '../assets/images/ClosedJob00.png';
import PostJobs from '../assets/images/PostAJob00.png';

const SideBar = ({ isOpen, onClose, isMobile }) => {
  const sidebarRef = useRef(null);

  // Detect clicks outside the sidebar (on mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose(); // Close sidebar
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMobile, onClose]);

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-[#5F9D08] text-white w-54 min-h-[calc(100vh-5rem)] fixed lg:static top-20 left-0 p-4 z-50 rounded-r-lg shadow-lg flex flex-col`}
    >
      {/* Close/Hamburger button only on mobile */}
      {isMobile && (
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-white text-2xl cursor-pointer">
            <FiX />
          </button>
        </div>
      )}

      <ul className="space-y-1">
        <li>
          <Link to="/users/dashboard" className="flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606]">
            {/* <img src={PostJobs} alt="Internship Icon" className="w-6 h-6" /> */}
            <i className="fas fa-chart-line text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">DashBoard</span>
          </Link>
        </li>
        <li>
          <Link to="/users/saved-jobs" className="flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606]">
            {/* <img src={ActiveJobs} alt="Active Jobs Icon" className="w-6 h-6" /> */}
            <i className="fa-regular fa-font-awesome text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">Saved Jobs</span>
          </Link>
        </li>
        <li>
          <Link to="/users/job-recommendations" className="flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606]">
            {/* <img src={ClosedJobs} alt="Closed Jobs Icon" className="w-6 h-6" /> */}
            <i className="fa-solid fa-briefcase text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">Job Recommendations</span>
          </Link>
        </li>
        <li>
          <Link to="/users/resume" className="flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606]">
            {/* <img src={PostJobs} alt="Post Job Icon" className="w-6 h-6" /> */}
            <i className="fas fa-file-alt text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">Resume</span>
          </Link>
        </li>
        
      </ul>
    </motion.div>
  );
};

export default SideBar;
