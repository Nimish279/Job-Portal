import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    university: '',
    email: '',
    city: '',
    github: '',
    about: ''
  });

  // Load saved profile data on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    setFormData(prev => ({
      name: savedProfile.name || '',
      degree: savedProfile.degree || '',
      university: savedProfile.university || '',
      email: savedProfile.email || '',
      city: savedProfile.city || '',
      github: savedProfile.github || '',
      about: savedProfile.about || ''
    }));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to local storage
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    const updatedProfile = { ...savedProfile, ...formData };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    // Navigate back to profile
    navigate('/users/profile');
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20 sm:py-20">
      <div className="bg-white border border-[#808080] rounded-lg shadow-md p-4 sm:p-6 w-full sm:w-3/4 lg:w-1/2 max-w-xl">
        <h2 className="text-center text-lg sm:text-xl font-bold mb-4">Edit Profile</h2>

        {/* Fields with input on the same line */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            value={formData.degree}
            onChange={handleChange}
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="university">University:</label>
          <input
            type="text"
            id="university"
            value={formData.university}
            onChange={handleChange}
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="email">Email:</label>
          <input
            
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="github">GitHub:</label>
          <input
            type="text"
            id="github"
            value={formData.github}
            onChange={handleChange}
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label className="block text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0" htmlFor="about">About:</label>
          <textarea
            id="about"
            rows="4"
            value={formData.about}
            onChange={handleChange}
            className="border border-[#808080] rounded w-full sm:w-3/4 p-2 font-bold"
          />
        </div>

        <button 
          type="button" 
          onClick={handleSubmit}
          className="bg-[#5F9D08] text-white rounded-full py-2 w-full hover:bg-green-700 transition-colors"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
