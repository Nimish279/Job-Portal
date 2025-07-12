import UserNavbar from '../components/Header/UserNavbar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiEdit, FiMail, FiMapPin, FiGithub, FiBriefcase,
  FiUser, FiLock, FiLogOut
} from 'react-icons/fi';
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

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [editedSkills, setEditedSkills] = useState(profileData.skills);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editedAbout, setEditedAbout] = useState(profileData.about);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [editedExperience, setEditedExperience] = useState(profileData.experience);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    if (Object.keys(savedProfile).length > 0) {
      setProfileData(prev => ({
        ...prev,
        ...savedProfile,
        skills: savedProfile.skills || prev.skills,
        experience: savedProfile.experience || prev.experience,
        about: savedProfile.about || prev.about
      }));
      setEditedAbout(savedProfile.about || profileData.about);
      setEditedExperience(savedProfile.experience || profileData.experience);
    }
  }, []);
  
  const handlePhotoUpload = (e) => {
    setProfilePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSkillsEdit = () => {
    setIsEditingSkills(true);
    setEditedSkills(profileData.skills);
  };

  const handleSkillsSave = () => {
    setProfileData(prev => ({
      ...prev,
      skills: editedSkills
    }));
    localStorage.setItem('profileData', JSON.stringify({ ...profileData, skills: editedSkills }));
    setIsEditingSkills(false);
  };

  const handleAboutSave = () => {
    setProfileData(prev => ({...prev, about: editedAbout}));
    localStorage.setItem('profileData', JSON.stringify({ ...profileData, about: editedAbout}));
    setIsEditingAbout(false);
  };

  const handleExperienceSave = () => {
    setProfileData(prev => ({...prev, experience:editedExperience}));
    localStorage.setItem('profileData', JSON.stringify({ ...profileData, experience:editedExperience}));
    setIsEditingExperience(false);
  }
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-100 to-green-50 font-sans">
      <UserNavbar pageName="Profile" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <motion.div
            className="w-full lg:w-1/3 xl:w-1/4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] h-32 rounded-t-3xl relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-100 shadow-xl overflow-hidden hover:scale-105 transition">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-2xl text-[#5F9D08] font-bold">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <label htmlFor="profilePhotoInput" className="absolute bottom-1 right-0 p-2 bg-white rounded-full shadow hover:scale-110 cursor-pointer transition">
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

              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{profileData.name}</h2>
                <p className="text-[#5F9D08] font-medium text-sm">{profileData.degree}</p>
                <p className="text-gray-500 text-sm mt-1">{profileData.university}</p>

                <div className="mt-6 bg-gray-100 p-4 rounded-xl text-left space-y-4">
                  {[{
                    icon: <FiMail />, text: profileData.email
                  }, {
                    icon: <FiMapPin />, text: profileData.city
                  }, {
                    icon: <FiGithub />, text: `github.com/${profileData.github}`, link: `https://github.com/${profileData.github}`
                  }].map(({ icon, text, link }, i) => (
                    <a key={i} href={link || undefined} className="flex items-center space-x-3 text-gray-600 hover:text-[#5F9D08] transition" target="_blank" rel="noreferrer">
                      <div className="p-2 bg-white rounded-full shadow">
                        {icon}
                      </div>
                      <span className="text-sm font-medium break-all">{text}</span>
                    </a>
                  ))}
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                  {[FaLinkedin, FaTwitter, FaGlobe].map((Icon, i) => (
                    <a key={i} href="#" className="p-2 bg-white rounded-full shadow hover:bg-green-100 hover:text-[#5F9D08] transition">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>

                <hr className="my-6 border-gray-200" />

                <nav className="space-y-2">
                  {[{
                    to: '/users/edit-profile', icon: FiUser, text: 'Edit Profile'
                  }, {
                    to: '#', icon: FiLock, text: 'Change Password'
                  }].map(({ to, icon: Icon, text }, i) => (
                    <Link
                      key={i}
                      to={to}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-[#5F9D08] rounded-lg transition"
                    >
                      <Icon className="mr-2 text-[#5F9D08]" /> {text}
                    </Link>
                  ))}
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg transition">
                    <FiLogOut className="mr-2" /> Sign Out
                  </button>
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Main Section */}
          <motion.div
            className="flex-1"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >

            {/* About Section */}
            <Section 
            title="About Me" 
            icon={FiEdit}
            isEditing={isEditingAbout}
            onEdit={() =>{
              setIsEditingAbout(true);
              setEditedAbout(profileData.about);
            }}
            onSave={handleAboutSave}
            >
            {isEditingAbout ? (
              <textarea
              className="w-full p-2 border rounded text-gray-700"
              rows={4}
              value={editedAbout}
              onChange={(e) => setEditedAbout(e.target.value)}
              />
            ):(
              <p className="text-gray-700 leading-relaxed">
                {profileData.about}
              </p>
            )}
            </Section>

            {/* Skills Section with Edit on Card */}
            <Section
              title="Skills"
              icon={FiEdit}
              isEditing={isEditingSkills}
              onEdit={handleSkillsEdit}
              onSave={handleSkillsSave}
            >
              <div className="flex flex-wrap gap-3 mb-3">
                {isEditingSkills ? (
                  editedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-300"
                    >
                      <input
                        value={skill}
                        onChange={(e) => {
                          const updated = [...editedSkills];
                          updated[index] = e.target.value;
                          setEditedSkills(updated);
                        }}
                        className="bg-transparent text-sm focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = [...editedSkills];
                          updated.splice(index, 1);
                          setEditedSkills(updated);
                        }}
                        className="text-red-500 text-sm hover:text-red-700"
                        title="Remove skill"
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  profileData.skills.map((skill, i) => (
                    <span key={i} className="bg-green-100 text-[#5F9D08] px-3 py-1 rounded-full text-sm font-medium shadow">
                      {skill}
                    </span>
                  ))
                )}
              </div>

              {isEditingSkills && (
                <button
                  onClick={() => setEditedSkills([...editedSkills, ''])}
                  className="mt-2 text-sm text-[#5F9D08] hover:underline focus:outline-none"
                >
                  + Add Skill
                </button>
              )}
            </Section>

            {/* Experience Section */}
            <Section title="Experience" 
            icon={FiEdit}
            isEditing={isEditingExperience}
            onEdit={() => {
              setIsEditingExperience(true);
              setEditedExperience(profileData.experience);
            }}
            onSave={handleExperienceSave}
            >
              {isEditingExperience ? (
                <textarea
                className="w-full p-2 border rounded text-gray-700"
                rows={4}
                value={editedExperience}
                onChange={(e) => setEditedExperience(e.target.value)}
                />
              ) : (
              profileData.experience ? (
                <div className="bg-white border-l-4 border-[#5F9D08] p-4 rounded-lg shadow">
                  <p className="text-gray-700">{profileData.experience}</p>
                </div>
              ) : (
                <div className="text-gray-400">No experience added yet</div>
              )
              )}
            </Section>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, icon: Icon, children, isEditing, onEdit, onSave }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-[#5F9D08] pl-4">{title}</h2>
      {onEdit && (
        isEditing ? (
          <button onClick={onSave} className="text-white bg-[#5F9D08] hover:bg-green-700 px-3 py-1 rounded-full text-sm">
            Save
          </button>
        ) : (
          <button onClick={onEdit} className="text-[#5F9D08] hover:text-green-700 p-2 rounded-full hover:bg-green-100 transition">
            <Icon />
          </button>
        )
      )}
    </div>
    <div className="bg-gray-50 p-4 rounded-xl">
      {children}
    </div>
  </div>
);

export default Profile;