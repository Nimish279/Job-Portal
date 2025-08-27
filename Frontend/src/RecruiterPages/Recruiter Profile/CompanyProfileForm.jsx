import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CompanyProfileForm = ({ onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    companyLocation: '',
    companyDescription: '',
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

  const [file, setFile] = useState(null);
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch company data once
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await axios.get(
          "https://job-portal-backend-swtv.onrender.com/api/recruiters/getProfile",
          { withCredentials: true }
        );

        if (res.data?.recruiter) {
          const c = res.data.recruiter;
          setCompany(c);
          setFormData({
            companyName: c.companyName || '',
            companyWebsite: c.companyWebsite || '',
            companyLocation: c.companyLocation || '',
            companyDescription: c.companyDescription || '',
            yearEstablished: c.yearEstablished || '',
            headquarters: c.headquarters || '',
            industry: c.industry || '',
            cinNumber: c.cinNumber || '',
            linkedin: c.linkedin || '',
            achievements: c.achievements || '',
            culture: c.culture || '',
            mission: c.mission || '',
            contact1: c.contact1 || '',
            contact2: c.contact2 || '',
          });
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      } catch (err) {
        console.error("Failed to fetch company data:", err);
        setIsEditing(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

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

      // Append all company fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== '') data.append(key, formData[key]);
      });

      // Append file if uploaded
      if (file) data.append('companyPanCardOrGstFile', file);

      const res = await axios.put(
        `https://job-portal-backend-swtv.onrender.com/api/recruiters/update`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      console.log('Company profile updated:', res.data);

      setCompany(res.data.recruiter);
      setFormData({
        companyName: res.data.recruiter.companyName || '',
        companyWebsite: res.data.recruiter.companyWebsite || '',
        companyLocation: res.data.recruiter.companyLocation || '',
        companyDescription: res.data.recruiter.companyDescription || '',
        yearEstablished: res.data.recruiter.yearEstablished || '',
        headquarters: res.data.recruiter.headquarters || '',
        industry: res.data.recruiter.industry || '',
        cinNumber: res.data.recruiter.cinNumber || '',
        linkedin: res.data.recruiter.linkedin || '',
        achievements: res.data.recruiter.achievements || '',
        culture: res.data.recruiter.culture || '',
        mission: res.data.recruiter.mission || '',
        contact1: res.data.recruiter.contact1 || '',
        contact2: res.data.recruiter.contact2 || '',
      });

      alert('Company profile saved successfully!');
      setIsEditing(false);

      if (onProfileUpdated) {
        onProfileUpdated(res.data.recruiter);
      }
    } catch (error) {
      console.error('Error updating company profile:', error.response || error);
      alert('Failed to save company profile.');
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-600">Loading company profile...</p>;
  }

  // ✅ View Mode
  if (!isEditing && company) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6 border rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold">{company.companyName}</h2>
        <p><strong>Website:</strong> {company.companyWebsite}</p>
        <p><strong>Location:</strong> {company.companyLocation}</p>
        <p><strong>Description:</strong> {company.companyDescription}</p>
        <p><strong>Year Established:</strong> {company.yearEstablished}</p>
        <p><strong>Headquarters:</strong> {company.headquarters}</p>
        <p><strong>Industry:</strong> {company.industry}</p>
        <p><strong>CIN Number:</strong> {company.cinNumber}</p>
        <p><strong>LinkedIn:</strong> {company.linkedin}</p>
        <p><strong>Achievements:</strong> {company.achievements}</p>
        <p><strong>Culture:</strong> {company.culture}</p>
        <p><strong>Mission:</strong> {company.mission}</p>
        <p><strong>Contacts:</strong> {company.contact1}, {company.contact2}</p>

        <motion.button
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Edit Company Profile
        </motion.button>
      </motion.div>
    );
  }
  // ✅ Edit Mode
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Example: Recruiter Name */}
      <div className="flex items-center">
        <label className="w-1/4 font-semibold">Recruiter Name</label>
        <input
          type="text"
          name="recruiterName"
          value={formData.recruiterName}
          onChange={handleChange}
          className="w-full p-2 border-2 border-gray-200 rounded-md"
        />
      </div>
      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Year Established</label>
          <input
            type="text"
            name="yearEstablished"
            value={formData.yearEstablished}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Headquarters Location</label>
          <input
            type="text"
            name="headquarters"
            value={formData.headquarters}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Industry/Sector</label>
          <input
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">CIN Number</label>
          <input
            type="text"
            name="cinNumber"
            value={formData.cinNumber}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-200 rounded-md"
          />
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
      </div>

      {/* Text Areas */}
      <div className="mt-4 space-y-4">
        <div>
          <label className="font-semibold">Company Achievements and Awards</label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Company Culture</label>
          <textarea
            name="culture"
            value={formData.culture}
            onChange={handleChange}
            className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Mission and Vision</label>
          <textarea
            name="mission"
            value={formData.mission}
            onChange={handleChange}
            className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md"
            rows="3"
          ></textarea>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="mt-4 space-y-4">
        <div className="font-semibold">Key Contacts</div>
        <input
          type="text"
          name="contact1"
          value={formData.contact1}
          onChange={handleChange}
          className="w-full p-2 border-2 border-gray-200 rounded-md mb-2"
          placeholder="Contact 1"
        />
        <input
          type="text"
          name="contact2"
          value={formData.contact2}
          onChange={handleChange}
          className="w-full p-2 border-2 border-gray-200 rounded-md"
          placeholder="Contact 2"
        />
      </div>

      {/* Save Button */}
      <div className="mt-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 text-white rounded-md"
          style={{ backgroundColor: "#5F9D08" }}
        >
          Save Company
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CompanyProfileForm;