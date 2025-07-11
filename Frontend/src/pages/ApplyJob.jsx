import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ApplyJob = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    noticePeriod: 'Immediate',
    coverLetter: '',
    resume: null, // <-- File input state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form submitted:", formData);
    alert('Application Submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Apply for Job #{id}</h2>

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
  );
};

export default ApplyJob;
