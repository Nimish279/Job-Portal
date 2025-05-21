import Navbar from '../components/Header/Navbar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiMail, FiMapPin, FiGithub, FiBriefcase, FiUser, FiLock, FiLogOut } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 h-24 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                      {profilePhoto ? (
                        <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-500 text-2xl font-medium">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="profilePhotoInput"
                      className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
                      title="Change photo"
                    >
                      <FiEdit className="text-gray-700" />
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
                <h2 className="text-xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-green-600 font-medium">{profileData.degree}</p>
                <p className="text-gray-600 text-sm mt-1">{profileData.university}</p>
                
                <div className="mt-6 space-y-3 text-left">
                  <div className="flex items-center text-gray-600">
                    <FiMail className="mr-3 text-green-600" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-3 text-green-600" />
                    <span className="text-sm">{profileData.city}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiGithub className="mr-3 text-green-600" />
                    <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                      github.com/{profileData.github}
                    </a>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 mt-6">
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                    <FaGlobe size={20} />
                  </a>
                </div>

                <hr className="my-6 border-gray-200" />
                
                {/* Navigation */}
                <nav className="space-y-2">
                  <Link 
                    to="/users/edit-profile"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <FiUser className="mr-3 text-green-600" />
                    <span>Edit Profile</span>
                  </Link>
                  <button className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 rounded-lg transition-colors">
                    <FiLock className="mr-3 text-green-600" />
                    <span>Change Password</span>
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <FiLogOut className="mr-3" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">About Me</h2>
                <button className="text-green-600 hover:text-green-700">
                  <FiEdit />
                </button>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {profileData.about || "I'm a passionate professional with expertise in various technologies and a strong drive to create meaningful solutions. I enjoy tackling complex problems and continuously learning new skills to stay ahead in the ever-evolving tech landscape."}
              </p>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                <button className="text-green-600 hover:text-green-700">
                  <FiEdit />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
                      <span>{skill}</span>
                      <button 
                        onClick={() => handleEditSkill(index)}
                        className="ml-1.5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiEdit size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {editSkill.index !== null && (
                <div className="flex items-center mt-3">
                  <input
                    type="text"
                    value={editSkill.value}
                    onChange={(e) => setEditSkill({ ...editSkill, value: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Edit skill"
                    autoFocus
                  />
                  <button
                    onClick={handleSkillSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              )}

              <button className="mt-3 text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                <span className="mr-1">+</span> Add Skill
              </button>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Experience</h2>
                <button className="text-green-600 hover:text-green-700">
                  <FiEdit />
                </button>
              </div>
              
              <div className="space-y-6">
                {profileData.experience ? (
                  <p className="text-gray-600">{profileData.experience}</p>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No experience added yet</p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Add Experience
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
