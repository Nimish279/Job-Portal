import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from './Notifications/Navbar';
import AmazonLogo from '../assets/images/AmazonLogo.png';
import { FaGraduationCap, FaUniversity, FaEnvelope, FaLocationArrow, FaGithub } from 'react-icons/fa';

const ApplicantsProfile = () => {
  const { applicantId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/applicants/${applicantId}`,
          { withCredentials: true }
        );
        setProfile(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applicant data");
      } finally {
        setLoading(false);
      }
    };

    if (applicantId) fetchApplicant();
  }, [applicantId]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!profile) return null;

  // Safe destructuring with defaults
  const {
    photo = "",
    name = "N/A",
    degree = "N/A",
    university = "N/A",
    email = "N/A",
    location = "N/A",
    github = "",
    about = "N/A",
    skills = [],
    experiences = [],
  } = profile || {};

  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
  const slideIn = { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } } };
  const slideUp = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };

  return (
    <div>
      <Navbar pageName="Applicants Profile" />
      <motion.div
        className="flex flex-col md:flex-row w-full min-h-screen p-8 bg-gray-100"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Left Section */}
        <motion.div className="md:w-2/3 p-6 bg-white rounded-md shadow-lg mb-8 md:mb-0 md:mr-6" variants={slideIn}>
          <motion.div className="mb-4 text-xl font-bold text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            Profile
          </motion.div>

          {/* About */}
          <motion.div className="mb-8" variants={slideUp}>
            <motion.div className="font-semibold">About</motion.div>
            <motion.p className="text-gray-700 mt-2">{about}</motion.p>
          </motion.div>

          {/* Skills */}
          <motion.div className="mb-8" variants={slideUp}>
            <motion.div className="font-semibold">Top Skills</motion.div>
            <motion.div className="flex mt-2 space-x-4 flex-wrap" variants={staggerContainer} initial="hidden" animate="visible">
              {skills?.map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-gray-300 rounded-md mb-2"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } } }}
                  whileHover={{ scale: 1.05, backgroundColor: '#e5e7eb' }}
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Experience */}
          <motion.div variants={slideUp}>
            <motion.div className="font-semibold">Experience</motion.div>
            <motion.div className="space-y-4 mt-2" variants={staggerContainer} initial="hidden" animate="visible">
              {experiences?.map((exp, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-gray-200 rounded-md"
                  variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { delay: index * 0.2, type: 'spring', stiffness: 100 } } }}
                  whileHover={{ scale: 1.02, backgroundColor: '#e5e7eb' }}
                >
                  <motion.img src={AmazonLogo} alt={`${exp.company || "Company"} Logo`} className="w-10 h-10 mr-4" whileHover={{ rotate: 10 }} />
                  <div>
                    <motion.p className="font-bold">{`${exp.company || "Company"} | ${exp.role || "Role"}`}</motion.p>
                    <motion.p>{exp.duration || "Duration not provided"}</motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="md:w-1/3 p-6 bg-white rounded-md shadow-lg flex flex-col"
          variants={{ hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { delay: 0.3, type: 'spring', stiffness: 80, damping: 15 } } }}
        >
          <motion.div className="flex flex-col items-center mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}>
            <motion.img src={photo || AmazonLogo} alt="Profile" className="w-20 h-20 rounded-full" whileHover={{ scale: 1.1 }} />
            <motion.p className="mt-2 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              {name}
            </motion.p>
          </motion.div>

          {/* Contact */}
          <motion.div className="mb-6" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="flex items-center mb-2" variants={slideUp} whileHover={{ x: 5 }}>
              <FaGraduationCap className="w-6 h-6" />
              <motion.p className="ml-3">{degree}</motion.p>
            </motion.div>
            <motion.div className="flex items-center mb-2" variants={slideUp} whileHover={{ x: 5 }}>
              <FaUniversity className="w-6 h-6" />
              <motion.p className="ml-3">{university}</motion.p>
            </motion.div>
            <motion.div className="flex items-center mb-2" variants={slideUp} whileHover={{ x: 5 }}>
              <FaEnvelope className="w-6 h-6" />
              <motion.p className="ml-3">{email}</motion.p>
            </motion.div>
            <motion.div className="flex items-center mb-2" variants={slideUp} whileHover={{ x: 5 }}>
              <FaLocationArrow className="w-6 h-6" />
              <motion.p className="ml-3">{location}</motion.p>
            </motion.div>
            <motion.div className="flex items-center mb-2" variants={slideUp} whileHover={{ x: 5 }}>
              <FaGithub className="w-6 h-6" />
              <motion.p className="ml-3">{github}</motion.p>
            </motion.div>
          </motion.div>

          {/* Next Round */}
          <motion.div className="mb-4" variants={slideUp}>
            <motion.p className="mb-2">Next Round Details</motion.p>
            <motion.textarea
              placeholder="Enter details"
              className="w-full p-2 border rounded-md"
              rows="4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 3px rgba(95, 157, 8, 0.2)' }}
            />
          </motion.div>

          {/* Buttons */}
          <motion.button className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-md" whileHover={{ scale: 1.05, backgroundColor: '#4ade80' }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            Notify
          </motion.button>
          <motion.button className="w-full mt-auto px-4 py-2 bg-red-600 text-white rounded-md" whileHover={{ scale: 1.05, backgroundColor: '#f87171' }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            Reject
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ApplicantsProfile;
