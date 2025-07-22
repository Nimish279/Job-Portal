import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaSave } from 'react-icons/fa';
import { motion,AnimatePresence } from 'framer-motion';
import NavSearchBar from '../components/Header/NavSearchBar';
import Sidebar from '../components/SideBar';
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    setFormData({
      name: savedProfile.name || '',
      degree: savedProfile.degree || '',
      university: savedProfile.university || '',
      email: savedProfile.email || '',
      city: savedProfile.city || '',
      github: savedProfile.github || '',
      about: savedProfile.about || ''
    });
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
    const savedProfile = JSON.parse(localStorage.getItem('profileData')) || {};
    const updatedProfile = { ...savedProfile, ...formData };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    navigate('/users/profile');
  };

  return (
    <div className="flex min-h-screen">
      <NavSearchBar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        showHamburger={true}
      />  

        {/* Sidebar for large screens */}
        <div className="hidden lg:block mt-20 fixed top-0 left-0 min-h-screen">
          <Sidebar isOpen={true} isMobile={false} />
        </div>

        {/* Sidebar for small screens (AnimatePresence handles mount/unmount) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile
            />
          )}
        </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-gray-200 rounded-2xl p-10 sm:p-10 w-full lg:ml-64"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#5F9D08] flex justify-center items-center gap-2">
            <FaUserEdit /> Edit Your Profile
          </h2>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src="https://ui-avatars.com/api/?name=User"
            alt="Avatar"
            className="w-20 h-20 rounded-full border-4 border-[#5F9D08]"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { id: 'name', label: 'Name' },
            { id: 'degree', label: 'Degree' },
            { id: 'university', label: 'University' },
            { id: 'email', label: 'Email' },
            { id: 'city', label: 'City' },
            { id: 'github', label: 'GitHub' }
          ].map(field => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-gray-700 font-medium mb-1">
                {field.label}
              </label>
              <input
                type="text"
                id={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F9D08] transition"
              />
            </div>
          ))}

          {/* About (Full width) */}
          <div className="sm:col-span-2">
            <label htmlFor="about" className="block text-gray-700 font-medium mb-1">
              About
            </label>
            <textarea
              id="about"
              rows="4"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5F9D08] transition"
            />
          </div>

          {/* Submit button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#5F9D08] hover:bg-[#4e7c07] text-white py-3 rounded-full font-bold transition-colors flex items-center justify-center gap-2"
            >
              <FaSave /> Update Profile
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;