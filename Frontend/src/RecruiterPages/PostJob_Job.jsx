import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Notifications/Navbar";

function PostJob_Job() {
  const [jobType, setJobType] = useState("Job");
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [ctc, setCtc] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [locations, setLocations] = useState([""]);
  const [eligibilityCriteria, setEligibilityCriteria] = useState([""]);
  const [qualifications, setQualifications] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState("");


  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const jobData = {
      jobType: selectedJobType,
      jobRole,
      experience,
      ctc,
      skillsRequired,
      jobDescription,
      location: locations,
      eligibilityCriteria,
      qualifications,
      requiredDocuments
    };

    const response = await fetch("http://localhost:8000/api/recruiters/postJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Job posted successfully!");
      resetForm();
    } else {
      console.error("Server error:", data.message);
      alert("Failed to post job. Check the console for details.");
    }
  } catch (error) {
    console.error("Error submitting job:", error);
    alert("Something went wrong while posting the job.");
  }
};

  const resetForm = () => {
    setJobRole("");
    setExperience("");
    setCtc("");
    setSkillsRequired("");
    setJobDescription("");
    setLocations([""]);
    setEligibilityCriteria([""]);
    setQualifications("");
    setSelectedJobType("");
    setRequiredDocuments("");
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <Navbar pageName="Post Job" />
      <h2 className="text-2xl font-semibold mb-6">Post Job</h2>

      <div className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
        <div className="flex border-b-2 mb-4 sm:mb-6">
          <Link
            to="/recruiters/postJob"
            onClick={() => setJobType("Job")}
            className={`flex-1 py-2 text-center font-semibold ${
              jobType === "Job" ? "bg-[#5F9D08] text-white" : "text-gray-500"
            }`}
          >
            Job
          </Link>
          <Link
            to="/recruiters/postInternship"
            onClick={() => setJobType("Internship")}
            className={`flex-1 py-2 text-center font-semibold ${
              jobType === "Internship" ? "bg-[#5F9D08] text-white" : "text-gray-500"
            }`}
          >
            Internship
          </Link>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
            <label className="block text-gray-700 font-bold">Job Role</label>
            <input
              type="text"
              placeholder="e.g., Software Developer"
              className="w-full p-2 border border-gray-300 rounded"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Experience</label>
            <input
              type="number"
              placeholder="Years of experience"
              className="w-full p-2 border border-gray-300 rounded"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Job Profile CTC (in LPA)</label>
            <input
              type="number"
              placeholder="LPA"
              className="w-full p-2 border border-gray-300 rounded"
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Skills Required</label>
            <input
              type="text"
              placeholder="e.g., Java, SQL"
              className="w-full p-2 border border-gray-300 rounded"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Qualifications</label>
            <input
              type="text"
              placeholder="e.g., Bachelor's Degree in Computer Science"
              className="w-full p-2 border border-gray-300 rounded"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Eligibility Criteria</label>
              <input
                type="text"
                value={eligibilityCriteria}
                placeholder="Eligibility Criteria"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onChange={(e) => setEligibilityCriteria(e.target.value)}
              />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Documents Required</label>
              <input
                type="text"
                value={requiredDocuments}
                placeholder="Resume"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onChange={(e) => setRequiredDocuments(e.target.value)}
              />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Job Type</label>
            <div className="flex flex-wrap space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  className="mr-2"
                  checked={selectedJobType === "Full-Time"}
                  onChange={() => setSelectedJobType("Full-Time")}
                />
                Full-Time
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  className="mr-2"
                  checked={selectedJobType === "Part-Time"}
                  onChange={() => setSelectedJobType("Part-Time")}
                />
                Part-Time
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Location</label>
              <input
                type="text"
                value={locations}
                placeholder="Location"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onChange={(e) => setLocations(e.target.value)}
              />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Job Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded h-24"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>          
          {/* <div>
            <label className="block text-gray-700 font-bold">Attached Documents</label>
            <input type="file" multiple onChange={handleFileUpload} />
          </div> */}

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded mt-6"
          >
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob_Job;
