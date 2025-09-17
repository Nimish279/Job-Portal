// src/components/SideBar_Recr.jsx
import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // ✅ use NavLink
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const SideBar = ({ isOpen, onClose, isMobile }) => {
  const sidebarRef = useRef(null);

  // Detect clicks outside the sidebar (on mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
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
          <NavLink
            to="/users/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606] 
              ${isActive ? 'bg-[#4e8606]' : ''}`
            }
          >
            <i className="fas fa-chart-line text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">DashBoard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users/saved-jobs"
            className={({ isActive }) =>
              `flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606] 
              ${isActive ? 'bg-[#4e8606]' : ''}`
            }
          >
            <i className="fa-regular fa-font-awesome text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">Saved Jobs</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users/job-recommendations"
            className={({ isActive }) =>
              `flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606] 
              ${isActive ? 'bg-[#4e8606]' : ''}`
            }
          >
            <i className="fa-solid fa-briefcase text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">Job Recommendations</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users/resume"
            className={({ isActive }) =>
              `flex items-center space-x-2 py-2 px-1 rounded-xl hover:bg-[#4e8606] 
              ${isActive ? 'bg-[#4e8606]' : ''}`
            }
          >
            <i className="fas fa-file-alt text-white text-base text-xl"></i>
            <span className="text-sm sm:text-base">Resume</span>
          </NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default SideBar;
