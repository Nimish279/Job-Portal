import Navbar from '../RecruiterPages/Notifications/Navbar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiMail, FiMapPin, FiGithub, FiBriefcase, FiUser, FiLock, FiLogOut } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
// import Navbar from '../components/Header/UserNavbar'; // ya jahan bhi User Navbar ka path ho



const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Prachi Shirsale',
    degree: 'MCA (Management)',
    university: 'MIT World Peace University',
    email: 'prachishirsale@gmail.com',
    city: 'Pune, Maharashtra',
    github: 'PrachiShirsale30',
    about: 'This is a dummy text for the user\'s about section.',
    skills: ['Java', 'SQL', 'Data Structure'],
    profilePhoto: null,
    experience: 'Experience will be listed here.'
  });
  
  const [editSkill, setEditSkill] = useState({ index: null, value: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Load profile data from local storage on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    if (Object.keys(savedProfile).length > 0) {
      setProfileData(prev => ({
        ...prev,
        ...savedProfile,
        // Keep existing skills and experience if not in saved data
        skills: savedProfile.skills || prev.skills,
        experience: savedProfile.experience || prev.experience
      }));
    }
  }, []);

  // Handle skill edit
  const handleEditSkill = (index) => {
    setEditSkill({ index, value: profileData.skills[index] });
  };

  const handleSkillSave = () => {
    const updatedSkills = [...profileData.skills];
    updatedSkills[editSkill.index] = editSkill.value;
    setProfileData(prev => ({
      ...prev,
      skills: updatedSkills
    }));
    setEditSkill({ index: null, value: '' });
  };

  // Handle profile photo upload
  const handlePhotoUpload = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar pageName="Profile" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <motion.div 
            className="w-full lg:w-1/3 xl:w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] h-28 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-green-50 flex items-center justify-center">
                          <span className="text-[#5F9D08] text-2xl font-bold">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="profilePhotoInput"
                      className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-green-50 transition-all duration-300 hover:scale-110"
                      title="Change photo"
                    >
                      <FiEdit className="text-[#5F9D08]" />
                      <input
                        id="profilePhotoInput"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{profileData.name}</h2>
                <p className="text-[#5F9D08] font-medium">{profileData.degree}</p>
                <p className="text-gray-600 text-sm mt-1">{profileData.university}</p>
                
                <div className="mt-6 space-y-4 text-left bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 hover:text-[#5F9D08] transition-colors duration-300 group">
                    <div className="mr-3 p-2 bg-white rounded-full shadow-sm group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                      <FiMail className="text-[#5F9D08]" />
                    </div>
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700 hover:text-[#5F9D08] transition-colors duration-300 group">
                    <div className="mr-3 p-2 bg-white rounded-full shadow-sm group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                      <FiMapPin className="text-[#5F9D08]" />
                    </div>
                    <span className="text-sm">{profileData.city}</span>
                  </div>
                  <div className="flex items-center text-gray-700 hover:text-[#5F9D08] transition-colors duration-300 group">
                    <div className="mr-3 p-2 bg-white rounded-full shadow-sm group-hover:shadow-md group-hover:bg-green-50 transition-all duration-300">
                      <FiGithub className="text-[#5F9D08]" />
                    </div>
                    <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                      github.com/{profileData.github}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-5 mt-6">
                  <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-all duration-300">
                    <FaLinkedin size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-blue-50 text-gray-500 hover:text-blue-400 transition-all duration-300">
                    <FaTwitter size={18} />
                  </a>
                  <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-300">
                    <FaGlobe size={18} />
                  </a>
                </div>

                <hr className="my-6 border-gray-200" />
                
                {/* Navigation */}
                <nav className="space-y-3">
                  <Link 
                    to="/users/edit-profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:text-[#5F9D08] hover:bg-green-50 rounded-lg transition-all duration-300 hover:shadow-sm"
                  >
                    <FiUser className="mr-3 text-[#5F9D08]" />
                    <span>Edit Profile</span>
                  </Link>
                  <button className="w-full flex items-center px-4 py-3 text-gray-700 hover:text-[#5F9D08] hover:bg-green-50 rounded-lg transition-all duration-300 hover:shadow-sm">
                    <FiLock className="mr-3 text-[#5F9D08]" />
                    <span>Change Password</span>
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:shadow-sm mt-2">
                    <FiLogOut className="mr-3" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="flex-1"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">About Me</h2>
                <button className="text-[#5F9D08] hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition-all duration-300">
                  <FiEdit />
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {profileData.about || "I'm a passionate professional with expertise in various technologies and a strong drive to create meaningful solutions. I enjoy tackling complex problems and continuously learning new skills to stay ahead in the ever-evolving tech landscape."}
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">Skills</h2>
                <button className="text-[#5F9D08] hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition-all duration-300">
                  <FiEdit />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4 bg-gray-50 p-4 rounded-lg">
                {profileData.skills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-white border border-green-100 shadow-sm text-[#5F9D08] px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-green-50 transition-all duration-300">
                      <span>{skill}</span>
                      <button 
                        onClick={() => handleEditSkill(index)}
                        className="ml-2 text-[#5F9D08] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:shadow-sm p-1 rounded-full"
                      >
                        <FiEdit size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {editSkill.index !== null && (
                <motion.div 
                  className="flex items-center mt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    value={editSkill.value}
                    onChange={(e) => setEditSkill({ ...editSkill, value: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F9D08] focus:border-transparent"
                    placeholder="Edit skill"
                    autoFocus
                  />
                  <button
                    onClick={handleSkillSave}
                    className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] hover:shadow-md text-white px-4 py-2 rounded-r-lg transition-all duration-300"
                  >
                    Save
                  </button>
                </motion.div>
              )}

              <button className="mt-4 text-[#5F9D08] hover:text-green-700 text-sm font-medium flex items-center bg-white border border-green-200 px-3 py-2 rounded-lg hover:bg-green-50 transition-all duration-300 hover:shadow-sm">
                <span className="mr-1 font-bold">+</span> Add Skill
              </button>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">Experience</h2>
                <button className="text-[#5F9D08] hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition-all duration-300">
                  <FiEdit />
                </button>
              </div>
              
              <div className="space-y-6 bg-gray-50 p-4 rounded-lg">
                {profileData.experience ? (
                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#5F9D08]">
                    <p className="text-gray-700">{profileData.experience}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiBriefcase className="text-[#5F9D08] text-xl" />
                    </div>
                    <p className="text-gray-500 mb-4">No experience added yet</p>
                    <motion.button 
                      className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] hover:shadow-lg text-white px-5 py-2 rounded-lg transition-all duration-300 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add Experience
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
