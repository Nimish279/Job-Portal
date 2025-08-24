import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    noticePeriod: 'Immediate',
    coverLetter: '',
    resume: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      alert("Please upload your resume.");
      return;
    }

    setLoading(true);

    try {
      // Create FormData object for file upload
      const form = new FormData();
      form.append("jobId", id);
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("experience", formData.experience);
      form.append("currentCompany", formData.currentCompany);
      form.append("noticePeriod", formData.noticePeriod);
      form.append("coverLetter", formData.coverLetter);
      form.append("resume", formData.resume);

      const res = await fetch("http://localhost:8000/api/users/applyJob", {
        method: "PUT",
        credentials: "include", // include cookies for auth
        body: form, // multipart/form-data
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("Application submitted successfully!");
        console.log("Response:", data);
        navigate("/dashboard"); // Redirect to dashboard or applied jobs page
      } else {
        alert(`Failed to submit application: ${data.message}`);
        console.error("Error response:", data);
      }

    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Apply for Job #{id}</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                required
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="phone"
                required
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <select
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
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
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
