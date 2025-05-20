import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Notifications/Navbar";

function PostJob_Job() {
  const [jobType, setJobType] = useState("Job");
  const [jobRole, setJobRole] = useState("");
  const [experience, setExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [skills, setSkills] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [locations, setLocations] = useState([""]);
  const [eligibilityCriteria, setEligibilityCriteria] = useState([""]);
  const [qualifications, setQualifications] = useState("");
  const [documentsUrl, setDocumentsUrl] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  const handleEligibilityChange = (index, value) => {
    const updatedCriteria = [...eligibilityCriteria];
    updatedCriteria[index] = value;
    setEligibilityCriteria(updatedCriteria);
  };
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
    setIsUploading(true);
  
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("job-documents")
        .upload(`documents/${file.name}`, file);
  
      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        const { data: publicData } = supabase.storage
          .from("job-documents")
          .getPublicUrl(`documents/${file.name}`);
  
        if (publicData?.publicUrl) {
          uploadedUrls.push(publicData.publicUrl);
        }
      }
    }
  
    // Debugging log: Check if uploaded URLs are updated correctly
    console.log("Uploaded URLs:", uploadedUrls);
  
    setDocumentsUrl((prevUrls) => [...prevUrls, ...uploadedUrls]);
    setIsUploading(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      alert("Please wait until the documents are fully uploaded.");
      return;
    }

    if (documentsUrl.length === 0) {
      alert("Please upload at least one document.");
      return;
    }

    const eligibilityCriteriaString = eligibilityCriteria.join(", ");
    const locationsString = locations.join(", ");
    const documentsString = documentsUrl.join(", ");

    const { data, error } = await supabase.from("job_listing").insert({
      job_type: selectedJobType,
      job_role: jobRole,
      experience,
      location: locationsString,
      salary_range: salaryRange,
      job_description: jobDescription,
      skills,
      qualifications,
      eligibility_criteria: eligibilityCriteriaString,
      attached_documents_url: documentsString,
      status: 1,
    });

    if (error) {
      console.error("Error inserting data:", error.message);
      alert("Failed to post job. Check the console for details.");
    } else {
      console.log("Data inserted successfully:", data);
      alert("Job posted successfully!");
      resetForm();
    }
  };

  const resetForm = () => {
    setJobRole("");
    setExperience("");
    setSalaryRange("");
    setSkills("");
    setJobDescription("");
    setLocations([""]);
    setEligibilityCriteria([""]);
    setQualifications("");
    setDocumentsUrl([]);
    setSelectedJobType("");
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
              value={salaryRange}
              onChange={(e) => setSalaryRange(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Skills Required</label>
            <input
              type="text"
              placeholder="e.g., Java, SQL"
              className="w-full p-2 border border-gray-300 rounded"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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
            {eligibilityCriteria.map((criteria, index) => (
              <input
                key={index}
                type="text"
                value={criteria}
                placeholder="Eligibility Criteria"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onChange={(e) => handleEligibilityChange(index, e.target.value)}
              />
            ))}
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
            {locations.map((location, index) => (
              <input
                key={index}
                type="text"
                value={location}
                placeholder="Location"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                onChange={(e) => handleLocationChange(index, e.target.value)}
              />
            ))}
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Job Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded h-24"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>          <div>
            <label className="block text-gray-700 font-bold">Attached Documents</label>
            <input type="file" multiple onChange={handleFileUpload} />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded mt-6"
          >
            {isUploading ? "Uploading..." : "Submit Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJob_Job;
