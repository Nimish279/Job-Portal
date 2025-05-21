import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Notifications/Navbar';

function PostJob_Internship() {
  const [jobType, setJobType] = useState('Internship');
  const [internshipRole, setInternshipRole] = useState('');
  const [stipendAmount, setStipendAmount] = useState('');
  const [stipendType, setStipendType] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [internshipDuration, setInternshipDuration] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [location, setLocation] = useState('');
  const [eligibilityCriteria, setEligibilityCriteria] = useState('');
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const internshipData = {
        jobType, // should be 'Internship'
        internshipRole,
        stipendType,
        stipendAmount,
        skillsRequired,
        internshipDuration,
        internshipType,
        location,
        eligibilityCriteria
      };

    const response = await fetch("http://localhost:8000/api/recruiters/postInternship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(internshipData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Internship posted successfully!");
      resetForm();
    } else {
      console.error("Server error:", data.message);
      alert("Failed to post internship. Check the console for details.");
    }
  } catch (error) {
    console.error("Error submitting internship:", error);
    alert("Something went wrong while posting the internship.");
  }
};

const resetForm = () => {
  setInternshipRole("");
  setStipendAmount("");
  setStipendType("");
  setSkillsRequired("");
  setInternshipDuration("");
  setInternshipType("");
  setLocation("");
  setEligibilityCriteria([]);
};
  
  return (
    <div className="flex flex-col items-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      <Navbar pageName="Post Internship" />
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Post {jobType}</h2>

      <div className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded shadow-md">
        <div className="flex border-b-2 mb-4 sm:mb-6">
          <Link
            to="/recruiters/postJob"
            onClick={() => setJobType('Job')}
            className={`flex-1 py-2 text-center font-semibold ${jobType === 'Job' ? 'bg-[#5F9D08] text-white' : 'text-gray-500'}`}
          >
            Job
          </Link>
          <button
            onClick={() => setJobType('Internship')}
            className={`flex-1 py-2 text-center font-semibold ${jobType === 'Internship' ? 'bg-[#5F9D08] text-white' : 'text-gray-500'}`}
          >
            Internship
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Internship Role */}
          <div>
            <label className="block text-gray-700 font-bold">Internship Role</label>
            <input
              type="text"
              value={internshipRole}
              onChange={(e) => setInternshipRole(e.target.value)}
              placeholder="e.g., Software Developer"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Stipend */}
          <div>
            <label className="block text-gray-700 font-bold">Stipend</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stipendType"
                  value="Fixed"
                  onChange={() => setStipendType('Fixed')}
                  className="mr-2"
                />{' '}
                Fixed
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stipendType"
                  value="Performance Based"
                  onChange={() => setStipendType('Performance Based')}
                  className="mr-2"
                />{' '}
                Performance Based
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stipendType"
                  value="Unpaid"
                  onChange={() => setStipendType('Unpaid')}
                  className="mr-2"
                />{' '}
                Unpaid
              </label>
            </div>
            <div className="mt-2">
              <input
                type="number"
                value={stipendAmount}
                onChange={(e) => setStipendAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-gray-700 font-bold">Skills Required</label>
            <input
              type="text"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              placeholder="e.g., Java, SQL, DSA"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Internship Type */}
          <div>
            <label className="block text-gray-700 font-bold">Internship Type</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="internshipType"
                  value="Full-Time"
                  onChange={() => setInternshipType('Full-Time')}
                  className="mr-2"
                />{' '}
                Full-Time
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="internshipType"
                  value="Part-Time"
                  onChange={() => setInternshipType('Part-Time')}
                  className="mr-2"
                />{' '}
                Part-Time
              </label>
            </div>
          </div>

          {/* Internship Duration */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold">Internship Duration</label>
              <input
                type="text"
                value={internshipDuration}
                onChange={(e) => setInternshipDuration(e.target.value)}
                placeholder="e.g., 3"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <span className="text-gray-500">months</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-bold">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Remote, Pune"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Eligibility Criteria */}
          <div>
            <label className="block text-gray-700 font-bold">Eligibility Criteria</label>
            <textarea
              value={eligibilityCriteria}
              onChange={(e) => setEligibilityCriteria(e.target.value)}
              placeholder="Enter eligibility criteria separated by commas"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="py-2 px-6 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4f8d07] w-full sm:w-auto"
            >
              Post Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob_Internship;
