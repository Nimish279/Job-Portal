import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import useUserStore from '../store/userStore.js';

const ApplyJob = ({ id, onClose }) => {
  const user = useUserStore((state) => state.user);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    coverLetter: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!formData.resume) {
      alert("Please attach your resume.");
      return;
    }

    try {
      // Upload the resume to Cloudinary
      const cloudData = new FormData();
      cloudData.append("file", formData.resume);
      cloudData.append("upload_preset", "resume"); // your Cloudinary unsigned upload preset
      cloudData.append("folder", "resumes");
      cloudData.append("resource_type", "raw"); // for PDF or DOCX files

      const res = await fetch("https://api.cloudinary.com/v1_1/dq2zghl4o/raw/upload", {
        method: "POST",
        body: cloudData,
      });

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Resume upload failed.");
      }

      const resumeUrl = data.secure_url;

      const applicationData = {
        ...formData,
        resume: resumeUrl,
        jobId: id,
      };

      await applyJob(applicationData);

      alert("Application Submitted!");
      if (onClose) onClose();
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    // <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:mt-15 md:mt-20 bg-white/20 backdrop-blur-lg rounded-2xl border border-black/30 shadow-xl">
          
      <h2 className="text-2xl font-bold mb-6">Apply for Job #{id}</h2>
=======
    console.log("Form submitted:", formData);
    alert('Application Submitted!');
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Apply for Job #{id}</h2>
>>>>>>> d8a7f4b6c610f19ed7b4fef6d6cf38d1cfa668f9

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="fullName" required placeholder="Full Name *" value={formData.fullName} onChange={handleChange} className="border p-2 rounded" />
              <input name="email" required placeholder="Email *" type="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
              <input name="phone" required placeholder="Phone *" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
              
              <select name="experience" required value={formData.experience} onChange={handleChange} className="border p-2 rounded">
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>

<<<<<<< HEAD
          <input
            name="currentCompany"
            placeholder="Current Company"
            value={formData.currentCompany}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Immediate">Immediate</option>
            <option value="15 Days">15 Days</option>
            <option value="1 Month">1 Month</option>
            <option value="2 Months">2 Months</option>
          </select>
        </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">
                Resume/CV *
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="block w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                PDF, DOC, DOCX (max 5MB)
              </p>
            </div>

            <div className="mt-4">
              <textarea
                name="coverLetter"
                rows="4"
                placeholder="Cover Letter (Optional)"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Submit Application
          </button>
        </div>
        </form>
      </div>
    
=======
              <input name="currentCompany" placeholder="Current Company" value={formData.currentCompany} onChange={handleChange} className="border p-2 rounded" />

              <select name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} className="border p-2 rounded">
                <option value="Immediate">Immediate</option>
                <option value="15 Days">15 Days</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Resume/CV *</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="block w-full border p-2 rounded"
              />
              <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</p>
            </div>

            <div className="mt-4">
              <textarea
                name="coverLetter"
                rows="4"
                placeholder="Cover Letter (Optional)"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button type="button" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Submit Application</button>
            </div>
          </form>
        </div>
      </div>
    </div>
>>>>>>> d8a7f4b6c610f19ed7b4fef6d6cf38d1cfa668f9
  );
};

export default ApplyJob;
