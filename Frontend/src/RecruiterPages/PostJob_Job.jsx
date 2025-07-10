import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Notifications/Navbar";
import { motion } from "framer-motion";
import useRecruiterStore from "../store/recruiterStore";
import Sidebar from "../components/SideBar_Recr";
import { FiMenu } from "react-icons/fi";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

  return (
    <motion.div
      className="flex flex-col items-center bg-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Navbar pageName="Post Job" />

      <div className="flex flex-col lg:flex-row w-full">
        {/* Hamburger for mobile */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        {/* Sidebar for large screens */}
        <div className="hidden lg:block mt-6 ml-4">
          <Sidebar isOpen={true} isMobile={false} />
        </div>

        {/* Sidebar for small screens */}
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isMobile
          />
        )}

        <div className="flex-1 mt-6 mx-auto px-2 sm:px-4 w-full">
          <motion.h2
            className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            Post {jobType}
          </motion.h2>

          <motion.div
            className="w-full bg-white p-4 sm:p-6 rounded shadow-md"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Tabs */}
            <motion.div className="flex border-b-2 mb-4 sm:mb-6">
              <motion.div
                className={`flex-1 ${jobType === 'Job' ? 'bg-[#5F9D08]' : 'hover:bg-gray-100'} rounded-t-md transition-colors duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/recruiters/postJob"
                  onClick={() => setJobType('Job')}
                  className={`block w-full py-3 text-center font-semibold ${jobType === 'Job' ? 'text-white' : 'text-gray-600'}`}
                >
                  Job
                </Link>
              </motion.div>
              <motion.div
                className={`flex-1 ${jobType === 'Internship' ? 'bg-[#5F9D08]' : 'hover:bg-gray-100'} rounded-t-md transition-colors duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/recruiters/postInternship"
                  onClick={() => setJobType('Internship')}
                  className={`block w-full py-3 text-center font-semibold ${jobType === 'Internship' ? 'text-white' : 'text-gray-600'}`}
                >
                  Internship
                </Link>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Job Role */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Job Role</label>
                <input
                  type="text"
                  ref={jobRoleRef}
                  placeholder="e.g., Software Developer"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Experience */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Experience (Years)</label>
                <input
                  type="number"
                  ref={experienceRef}
                  placeholder="e.g., 2"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* CTC */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">CTC (in LPA)</label>
                <input
                  type="number"
                  ref={ctcRef}
                  placeholder="e.g., 10"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Skills */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Skills Required</label>
                <input
                  type="text"
                  ref={skillsRequiredRef}
                  placeholder="e.g., Java, React"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Qualifications */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Qualifications</label>
                <input
                  type="text"
                  ref={qualificationsRef}
                  placeholder="e.g., B.Tech in CS"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Eligibility Criteria */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Eligibility Criteria</label>
                <input
                  type="text"
                  ref={eligibilityCriteriaRef}
                  placeholder="Eligibility Criteria"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Documents Required */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Documents Required</label>
                <input
                  type="text"
                  ref={requiredDocumentsRef}
                  placeholder="e.g., Resume"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Job Type Radio */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Job Type</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {['Full-Time', 'Part-Time'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="jobType"
                        className="accent-[#5F9D08]"
                        checked={selectedJobType === type}
                        onChange={() => setSelectedJobType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Location */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Location</label>
                <input
                  type="text"
                  ref={locationsRef}
                  placeholder="e.g., Remote, Pune"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </motion.div>

              {/* Description */}
              <motion.div variants={formFieldVariants}>
                <label className="block text-gray-700 font-bold">Job Description</label>
                <textarea
                  ref={jobDescriptionRef}
                  placeholder="Short job description"
                  className="w-full p-2 border border-gray-300 rounded h-28 resize-none"
                />
              </motion.div>

              {/* Submit */}
              <motion.div
                className="flex justify-center mt-6"
                variants={formFieldVariants}
              >
                <motion.button
                  type="submit"
                  className="py-2 px-6 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4f8d07] w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  Post Job
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default PostJob_Job;



