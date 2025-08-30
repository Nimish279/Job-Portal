import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CompanyProfileForm = () => {
  const [formData, setFormData] = useState({
    yearEstablished: '',
    headquarters: '',
    industry: '',
    cinNumber: '',
    linkedin: '',
    achievements: '',
    culture: '',
    mission: '',
    contact1: '',
    contact2: '',
  });
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const [file, setFile] = useState(null);
  const [recruiter, setRecruiter] = useState(null);

  // ✅ Detect edit mode based on localStorage
  const [isEditing, setIsEditing] = useState(true);

  // ✅ Load recruiter from localStorage or backend
  const fetchRecruiterData = async () => {
    try {
      const res = await axios.get(backend_url+"/recruiters/getProfile", {
        withCredentials: true,
      });
      if (res.data?.recruiter) {
        setRecruiter(res.data.recruiter);
        setFormData(prev => ({ ...prev, ...res.data.recruiter }));
        setIsEditing(false); // show view mode if recruiter exists
      } else {
        setIsEditing(true); // new recruiter → show edit mode
      }
    } catch (err) {
      console.error("Failed to fetch recruiter data:", err);
      setIsEditing(true);
    }
  };

  fetchRecruiterData();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      // Append form data
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== '') data.append(key, formData[key]);
      });

      // Append recruiter existing details if available
      if (recruiter) {
        if (recruiter.email) data.append('email', recruiter.email);
        if (recruiter.phone) data.append('phone', recruiter.phone);
        if (recruiter.companyName) data.append('companyName', recruiter.companyName);
      }

      // Append file if uploaded
      if (file) data.append('companyPanCardOrGstFile', file);

      const res = await axios.put(
        `${backend_url}/recruiters/update`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      console.log('Profile updated:', res.data);
      setRecruiter(res.data.recruiter);

      // ✅ Update localStorage
      // localStorage.setItem("recruiterProfile", JSON.stringify(res.data.recruiter));

      alert('Company profile saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error.response || error);
      alert('Failed to save profile.');
    }
  };

  // ✅ View Mode
  if (!isEditing && recruiter) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6 p-6 border rounded-lg shadow">
        <h2 className="text-2xl font-bold">{recruiter.companyName}</h2>
        <p><strong>Email:</strong> {recruiter.email}</p>
        <p><strong>Phone:</strong> {recruiter.phone}</p>
        <p><strong>Year Established:</strong> {recruiter.yearEstablished}</p>
        <p><strong>Headquarters:</strong> {recruiter.headquarters}</p>
        <p><strong>Industry:</strong> {recruiter.industry}</p>
        <p><strong>CIN Number:</strong> {recruiter.cinNumber}</p>
        <p><strong>LinkedIn:</strong> {recruiter.linkedin}</p>
        <p><strong>Achievements:</strong> {recruiter.achievements}</p>
        <p><strong>Culture:</strong> {recruiter.culture}</p>
        <p><strong>Mission:</strong> {recruiter.mission}</p>
        <p><strong>Contacts:</strong> {recruiter.contact1}, {recruiter.contact2}</p>

        <motion.button
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Edit Profile
        </motion.button>
      </motion.div>
    );
  }

  // ✅ Edit Mode (form)
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Form Fields */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Year Established</label>
          <input type="text" name="yearEstablished" value={formData.yearEstablished} onChange={handleChange} className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Headquarters Location</label>
          <input type="text" name="headquarters" value={formData.headquarters} onChange={handleChange} className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Industry/Sector</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">CIN Number</label>
          <input type="text" name="cinNumber" value={formData.cinNumber} onChange={handleChange} className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">LinkedIn Company URL</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          />
        </div>
      </motion.div>

      {/* Text Areas */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-4 space-y-4">
        <div>
          <label className="font-semibold">Company Achievements and Awards</label>
          <textarea name="achievements" value={formData.achievements} onChange={handleChange} className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md" rows="3"></textarea>
        </div>

        <div>
          <label className="font-semibold">Company Culture</label>
          <textarea name="culture" value={formData.culture} onChange={handleChange} className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md" rows="3"></textarea>
        </div>

        <div>
          <label className="font-semibold">Mission and Vision</label>
          <textarea name="mission" value={formData.mission} onChange={handleChange} className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md" rows="3"></textarea>
        </div>
      </motion.div>

      {/* Key Contacts */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-4 space-y-4">
        <div className="font-semibold">Key Contacts</div>
        <input type="text" name="contact1" value={formData.contact1} onChange={handleChange} className="w-full p-2 border-2 border-gray-200 rounded-md mb-2" placeholder="Contact 1" />
        <input type="text" name="contact2" value={formData.contact2} onChange={handleChange} className="w-full p-2 border-2 border-gray-200 rounded-md" placeholder="Contact 2" />
      </motion.div>

      {/* Save Button */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }} className="mt-4">
        <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full py-2 text-white rounded-md" style={{ backgroundColor: "#5F9D08" }}>
          Save
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default CompanyProfileForm;
