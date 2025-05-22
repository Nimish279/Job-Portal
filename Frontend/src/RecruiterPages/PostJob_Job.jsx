import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Notifications/Navbar";
import { motion } from "framer-motion";
import useRecruiterStore from "../store/recruiterStore";

function PostJob_Job() {
  const jobRoleRef = useRef();
  const experienceRef = useRef();
  const ctcRef = useRef();
  const skillsRequiredRef = useRef();
  const jobDescriptionRef = useRef();
  const locationsRef = useRef();
  const eligibilityCriteriaRef = useRef();
  const qualificationsRef = useRef();
  const requiredDocumentsRef = useRef();

  const [selectedJobType, setSelectedJobType] = useState("Full-Time");
  const [jobType, setJobType] = useState("Job");

  const { postJob } = useRecruiterStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      jobType: selectedJobType,
      jobRole: jobRoleRef.current.value,
      experience: experienceRef.current.value,
      ctc: ctcRef.current.value,
      skillsRequired: skillsRequiredRef.current.value,
      jobDescription: jobDescriptionRef.current.value,
      location: locationsRef.current.value,
      eligibilityCriteria: eligibilityCriteriaRef.current.value,
      qualifications: qualificationsRef.current.value,
      requiredDocuments: requiredDocumentsRef.current.value,
    };

    const result = await postJob(jobData);
    if (result.success) {
      e.target.reset(); // clears the form
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <Navbar pageName="Post Job" />
      <motion.h2 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-semibold mb-6">Post Job</motion.h2>

      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-3xl bg-white p-6 rounded shadow-md">
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

        <motion.form 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.5 }}
          onSubmit={handleSubmit} 
          className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">Job Role</label>
            <input
              type="text"
              ref={jobRoleRef}
              placeholder="e.g., Software Developer"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Experience</label>
            <input
              type="number"
              ref={experienceRef}
              placeholder="Years of experience"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Job Profile CTC (in LPA)</label>
            <input
              type="number"
              ref={ctcRef}
              placeholder="LPA"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Skills Required</label>
            <input
              type="text"
              ref={skillsRequiredRef}
              placeholder="e.g., Java, SQL"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Qualifications</label>
            <input
              type="text"
              ref={qualificationsRef}
              placeholder="e.g., Bachelor's Degree in Computer Science"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Eligibility Criteria</label>
            <input
              type="text"
              ref={eligibilityCriteriaRef}
              placeholder="Eligibility Criteria"
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Documents Required</label>
            <input
              type="text"
              ref={requiredDocumentsRef}
              placeholder="Resume"
              className="w-full p-2 mt-2 border border-gray-300 rounded"
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
              ref={locationsRef}
              placeholder="Location"
              className="w-full p-2 mt-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold">Job Description</label>
            <textarea
              ref={jobDescriptionRef}
              className="w-full p-2 border border-gray-300 rounded h-24"
            ></textarea>
          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="py-2 px-6 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4f8d07] w-full sm:w-auto"
            >
              Post Job
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default PostJob_Job;
