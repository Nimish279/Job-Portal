import React, { useState } from 'react';
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
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

function Applicants() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar pageName="Applicants" />

      {/* Main Section with Sidebar + Content */}
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

        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block mt-6 ml-4">
          <Sidebar isOpen={true} isMobile={false} />
        </div>

        {/* Sidebar (Mobile) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile
            />
          )}
        </AnimatePresence>

        {/* Main Applicants Content */}
        <main className="flex-1 p-4 md:p-6 mt-4 lg:mt-6">
          <motion.div
            className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2
              className="text-2xl font-semibold text-gray-800 mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              Applicants List
            </motion.h2>

            <div className="space-y-4">
              {applicantsData.map((applicant, index) => (
                <motion.div
  key={index}
  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow transition-all duration-300"
  variants={itemVariants}
>
  {/* Applicant Info */}
  <div className="flex items-center gap-4">
    <img
      src={applicant.image}
      alt={applicant.name}
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-300"
    />
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{applicant.name}</h3>
      <p className="text-sm text-gray-500">{applicant.course}</p>
    </div>
  </div>

  {/* Action Buttons */}
  <div className="flex flex-row gap-3 sm:gap-4 mt-4 sm:mt-0 self-start sm:self-center">
    <Link to={`/recruiters/applicantsProfile/${index + 1}`}>
      <motion.button
        className="bg-[#5F9D08] hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Profile
      </motion.button>
    </Link>

    <motion.button
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium w-auto"
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
