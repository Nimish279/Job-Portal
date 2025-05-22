import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import profilePic1 from "../assets/images/Profile_pics/1.jpg";
import profilePic2 from "../assets/images/Profile_pics/2.jpg";
import profilePic3 from "../assets/images/Profile_pics/3.jpg";
import Navbar from './Notifications/Navbar';

const applicantsData = [
  {
    "name": "Prachi Shirsale",
    "course": "MCA Management",
    "image": profilePic1
  },
  {
    "name": "Rahul Sharma",
    "course": "MBA Marketing",
    "image": profilePic2
  },
  {
    "name": "Anjali Verma",
    "course": "B.Tech Computer Science",
    "image": profilePic3
  }
];

function Applicants() {
  // Animation variants
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

  return (
    
    <motion.div 
      className="flex flex-col items-center p-8 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
 
        <Navbar pageName="Applicants" />
   
      <motion.h2 
        className="text-2xl font-semibold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Applicants
      </motion.h2>

      <motion.div 
        className="w-full bg-white rounded shadow-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {applicantsData.map((applicant, index) => (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0 w-full"
            variants={itemVariants}
            whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
          >
            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                {/* Displaying the profile image */}
                <img
                  src={applicant.image}
                  alt={applicant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{applicant.name}</h3>
                <p className="text-gray-500">{applicant.course}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
            <Link to={`/recruiters/applicantsProfile/${index + 1}`}>
              <motion.button 
                className="bg-[#5F9D08] text-white px-4 py-2 rounded text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Profile
              </motion.button>
            </Link>

              <motion.button 
                className="bg-[#5F9D08] text-white px-4 py-1 rounded font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Applicants;
