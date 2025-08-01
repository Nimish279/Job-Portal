import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

import Sidebar from '../components/SideBar_Recr';
import Navbar from './Notifications/Navbar';

import profilePic1 from "../assets/images/Profile_pics/1.jpg";
import profilePic2 from "../assets/images/Profile_pics/2.jpg";
import profilePic3 from "../assets/images/Profile_pics/3.jpg";

const applicantsData = [
  { name: "Prachi Shirsale", course: "MCA Management", image: profilePic1 },
  { name: "Rahul Sharma", course: "MBA Marketing", image: profilePic2 },
  { name: "Anjali Verma", course: "B.Tech Computer Science", image: profilePic3 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeOut",
      duration: 0.5,
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120 }
  }
};

function Applicants() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar pageName="Applicants" />

      <div className="flex flex-col lg:flex-row relative">
        {/* Hamburger Button (Mobile) */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        {/* Static Sidebar */}
        {!isMobile && (
          <div className="hidden lg:block fixed top-20 left-0 z-30">
            <Sidebar isOpen={true} isMobile={false} />
          </div>
        )}

        {/* Animated Sidebar for Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile={true}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 mt-4 lg:mt-6 lg:ml-60">
          <motion.div
            className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl font-bold text-green-700 mb-6 text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              Applicants List
            </motion.h2>

            <div className="space-y-5">
              {applicantsData.map((applicant, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.015 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50 hover:shadow transition-all duration-300"
                >
                  {/* Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dotted border-gray-300 p-1">
                      <img
                        src={applicant.image}
                        alt={applicant.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{applicant.name}</h3>
                      <p className="text-sm text-gray-500">{applicant.course}</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                    <Link to={`/recruiters/applicantsProfile/${index + 1}`}>
                      <motion.button
                        className="bg-[#5F9D08] hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Profile
                      </motion.button>
                    </Link>
                    <motion.button
                      className="border border-[#5F9D08] text-[#5F9D08] hover:bg-[#f0fdf4] px-5 py-2 rounded-md text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Resume
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Applicants;
