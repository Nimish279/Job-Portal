import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Static image imports
import photo1 from '../assets/images/Profile_pics/1.jpg';
import photo2 from '../assets/images/Profile_pics/2.jpg';
import photo3 from '../assets/images/Profile_pics/3.jpg';
import AmazonLogo from '../assets/images/AmazonLogo.png';
import { FaGraduationCap, FaUniversity, FaEnvelope, FaLocationArrow, FaGithub } from 'react-icons/fa'; // FA icons for degree, university, email, location, github

const ApplicantsProfile = () => {
  const { id } = useParams();  // Get applicant ID from the URL parameter
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Map of photos based on the applicant ID
    const photos = {
      '1': photo1,
      '2': photo2,
      '3': photo3,
    };

    // Fetch the applicant profile based on the id
    const fetchedProfile = {
      photo: photo1|| photos[id], // Default to photo1 if no match
      name: id === '1' ? 'Prachi Shirsale' : id === '2' ? 'Sakshi Kulkarni' : 'Rohini Deshmukh',
      degree: 'MCA Management',
      university: 'MIT University',
      email: 'example@domain.com',
      location: 'Pune, Maharashtra',
      github: 'https://github.com/username',
      about: 'This is an about section for the applicant.',
      skills: ['JavaScript', 'React', 'Node.js'],
      experiences: [
        { company: 'Company A', role: 'Developer', duration: '2 years' },
        { company: 'Company B', role: 'Intern', duration: '1 year' },
      ],
    };
    
    setProfile(fetchedProfile);  // Update state with the fetched profile data
  }, [id]);  // Re-fetch the data when the id changes

  // If profile data is not available yet, show a loading state or a placeholder
  if (!profile) {
    return <div>Loading...</div>;
  }

  const { photo, name, degree, university, email, location, github, about, skills, experiences } = profile;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100,
        damping: 15
      }
    }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 80,
        damping: 12
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row w-full min-h-screen p-8 bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Left Section */}
      <motion.div 
        className="md:w-2/3 p-6 bg-white rounded-md shadow-lg mb-8 md:mb-0 md:mr-6"
        variants={slideIn}>
        <motion.div 
          className="mb-4 text-xl font-bold text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Profile
        </motion.div>

        {/* About Section */}
        <motion.div 
          className="mb-8"
          variants={slideUp}
        >
          <motion.div className="font-semibold">About</motion.div>
          <motion.p className="text-gray-700 mt-2">{about}</motion.p>
        </motion.div>

        {/* Top Skills Section */}
        <motion.div 
          className="mb-8"
          variants={slideUp}
        >
          <motion.div className="font-semibold">Top Skills</motion.div>
          <motion.div 
            className="flex mt-2 space-x-4 flex-wrap"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {skills.map((skill, index) => (
              <motion.div 
                key={skill} 
                className="px-4 py-2 bg-gray-300 rounded-md mb-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#e5e7eb' }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          variants={slideUp}
        >
          <motion.div className="font-semibold">Experience</motion.div>
          <motion.div 
            className="space-y-4 mt-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="flex items-center p-4 bg-gray-200 rounded-md"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: index * 0.2,
                      type: 'spring',
                      stiffness: 100
                    }
                  }
                }}
                whileHover={{ scale: 1.02, backgroundColor: '#e5e7eb' }}
              >
                <motion.img
                  src={AmazonLogo}
                  alt={`${exp.company} Logo`}
                  className="w-10 h-10 mr-4"
                  whileHover={{ rotate: 10 }}
                />
                <div>
                  <motion.p className="font-bold">{`${exp.company} | ${exp.role}`}</motion.p>
                  <motion.p>{exp.duration}</motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div 
        className="md:w-1/3 p-6 bg-white rounded-md shadow-lg flex flex-col"
        variants={{
          hidden: { x: 50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { 
              delay: 0.3,
              type: 'spring',
              stiffness: 80,
              damping: 15
            }
          }
        }}>
        <motion.div 
          className="flex flex-col items-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
        >
          <motion.img
            src={photo}
            alt="Profile"
            className="w-20 h-20 rounded-full"
            whileHover={{ scale: 1.1 }}
          />
          <motion.p 
            className="mt-2 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {name}
          </motion.p>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="mb-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex items-center mb-2"
            variants={slideUp}
            whileHover={{ x: 5 }}
          >
            <FaGraduationCap className="w-6 h-6" />
            <motion.p className="ml-3">{degree}</motion.p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-2"
            variants={slideUp}
            whileHover={{ x: 5 }}
          >
            <FaUniversity className="w-6 h-6" />
            <motion.p className="ml-3">{university}</motion.p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-2"
            variants={slideUp}
            whileHover={{ x: 5 }}
          >
            <FaEnvelope className="w-6 h-6" />
            <motion.p className="ml-3">{email}</motion.p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-2"
            variants={slideUp}
            whileHover={{ x: 5 }}
          >
            <FaLocationArrow className="w-6 h-6" />
            <motion.p className="ml-3">{location}</motion.p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-2"
            variants={slideUp}
            whileHover={{ x: 5 }}
          >
            <FaGithub className="w-6 h-6" />
            <motion.p className="ml-3">{github}</motion.p>
          </motion.div>
        </motion.div>

        {/* Next Round Details Section */}
        <motion.div 
          className="mb-4"
          variants={slideUp}
        >
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

        {/* Notify Button */}
        <motion.button 
          className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-md"
          whileHover={{ scale: 1.05, backgroundColor: '#4ade80' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          Notify
        </motion.button>

        {/* Reject Button */}
        <motion.button 
          className="w-full mt-auto px-4 py-2 bg-red-600 text-white rounded-md"
          whileHover={{ scale: 1.05, backgroundColor: '#f87171' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Reject
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ApplicantsProfile;
