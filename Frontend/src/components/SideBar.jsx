import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaBookmark, FaStar   , FaComment, FaHourglassHalf, FaFileAlt, FaBriefcase } from 'react-icons/fa';

const SideBar = ({ isOpen, onClose }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <>
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`}
          onClick={onClose}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-[#5F9D08] text-white p-4 shadow-lg transform ${
              isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out z-50`}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="space-y-4">
                          {/* for small devices */}

              <li className="flex items-center pt-16 p-1 hover:bg-gray-700 text-md">
                <Link to="/users/saved-jobs" className="flex items-center">
                  <FaBookmark className="mr-2" /> Saved Jobs
                </Link>
              </li>
              <li className="flex items-center  p-1 hover:bg-gray-700 text-md">
                <Link to="/users/job-recommendations" className="flex items-center">
                  <FaStar     className="mr-2" />Job Recommendations
                </Link>
              </li>
             
              <li className="flex items-center p-1 hover:bg-gray-700 text-md">
              <Link to="/users/resume" className="flex items-center">
                  <FaFileAlt     className="mr-2" />Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isMobile && (
        <div
          className={`fixed left-0 w-52 lg:w-72 h-auto md:h-[670px] bg-[#5F9D08] text-white mt-16 md:mt-20 p-4 rounded-tr-2xl shadow-lg transition-all duration-300 ease-in-out z-10`}
        >
          <ul className="space-y-4">
                                    {/* for large devices */}

            <li className="flex items-center lg:p-2 hover:bg-gray-700 text-md lg:text-xl md:text-sm">
              <Link to="/users/saved-jobs" className="flex items-center">
                <FaBookmark className="mr-2" /> Saved Jobs
              </Link>
            </li>
            <li className="flex items-center  lg:p-2 hover:bg-gray-700 text-md lg:text-xl md:text-sm">
                <Link to="/users/job-recommendations" className="flex items-center">
                  <FaStar     className="mr-2" /> Job Recommendations
                </Link>
              </li>
          
            <li className="flex items-center lg:p-2 hover:bg-gray-700 text-md lg:text-xl md:text-sm">
              <Link to="/users/resume" className="flex items-center">
                <FaFileAlt className="mr-2" />Resume
              </Link>
            </li>
            
          </ul>
        </div>
      )}
    </>
  );
};

export default SideBar;
