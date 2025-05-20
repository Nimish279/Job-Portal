import Navbar from '../components/Header/Navbar';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

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
    <>
      <div className="flex flex-col lg:flex-row justify-center mt-10 items-start p-4 lg:p-6 lg:h-screen space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Your Profile Section */}
        <Navbar pageName="Profile" />

        <div className="w-full lg:w-7/12 bg-gray-100 p-4 lg:p-6 rounded-lg shadow-lg mb-4 lg:mb-0 mt-4">
          <h2 className="text-center text-2xl font-bold mb-6">Your Profile</h2>
          <div>
            <h3 className="text-xl font-semibold">About</h3>
            <p className="mt-2 mb-4 whitespace-pre-line">{profileData.about}</p>

            <h3 className="text-xl font-semibold">Top Skills</h3>
            <div className="flex flex-wrap space-x-2 mt-2 mb-6">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-200 p-2 rounded mt-2">
                  <span>{profileData.skills && profileData.skills[index] ? profileData.skills[index] : skill}</span>
                  <button onClick={() => handleEditSkill(index)} className="text-gray-600">
                  <span className="text-xl">✎</span>
                  </button>
                </div>
              ))}
            </div>
            {editSkill.index !== null && (
              <div className="mb-4">
                <input
                  type="text"
                  value={editSkill.value}
                  onChange={(e) => setEditSkill({ ...editSkill, value: e.target.value })}
                  className="border p-2 rounded mb-2 w-full lg:w-auto"
                />
                <button
                  onClick={handleSkillSave}
                  className="bg-[#5F9D08] text-white px-4 py-2 rounded-lg mt-2 lg:mt-0 lg:ml-3"
                >
                  Save
                </button>
              </div>
            )}
   
            <h3 className="text-xl font-semibold">Experience</h3>
            <div className="bg-gray-200 p-4 rounded-lg mb-4">
              <p>{profileData.experience}</p>
            </div>
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="w-full lg:w-3/12 bg-gray-100 p-4 lg:p-6 rounded-lg shadow-lg mt-4 lg:mt-0">
          <div className="flex flex-col items-center">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-4" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 mb-4"></div>
            )}
            <button
              onClick={() => document.getElementById('profilePhotoInput').click()}
              className="text-gray-600 mb-4"
            >
              <span className="text-xl">✎</span>
            </button>
            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />
            <h2 className="text-xl font-bold">{profileData.name}</h2>
          </div>

          <div className="mt-4 text-center lg:text-left">
            <p className="text-gray-700">
              <strong>{profileData.degree}</strong> <br />
              {profileData.university} <br />
              {profileData.email} <br />
              {profileData.city} <br />
              {profileData.github}
            </p>
            <hr className="my-4" />
            <ul className="text-gray-600 space-y-2 text-center lg:text-left">
              <li>
            <Link
            to="/users/edit-profile"
            className=" hover:underline"
          >    Edit Profile
            </Link>
            </li>
        
              <li>Change Password</li>
              <li>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
