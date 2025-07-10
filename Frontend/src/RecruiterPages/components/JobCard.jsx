import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const JobCard = ({
  jobTitle,
  location,
  salaryRange,
  jobDescription,
  skills,
  eligibilityCriteria,
  opened,
  status,
  actionButtonText,
  secondaryButtonText,
  actionButtonLink,
  onSecondaryButtonClick,
  statusText,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: { duration: 0.3 },
      }}
      className="bg-white p-6 rounded-lg shadow-md flex flex-col lg:flex-row justify-between gap-6 w-full"
    >
      {/* Left Section */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{jobTitle}</h3>
          <div className="flex gap-2 mt-1 sm:mt-0">
            <Link to="/accepted-applicants">
              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                Accepted
              </span>
            </Link>
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
              Rejected
            </span>
          </div>
        </div>

        {/* Job Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-500">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Salary</p>
            <p className="font-semibold">{salaryRange}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Skills</p>
            <p className="font-semibold">{skills}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Eligibility</p>
            <p className="font-semibold">{eligibilityCriteria}</p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <p className="font-medium text-gray-500">Job Description</p>
            <p className="font-semibold">{jobDescription}</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-between items-start sm:items-end text-sm gap-3 w-full sm:w-auto">
        <p className="text-gray-500 text-xs">
          Made Active: {new Date(opened).toLocaleDateString()}
        </p>
        <div className="flex flex-wrap gap-2">
          {actionButtonLink && (
            <Link to={actionButtonLink}>
              <button className="bg-[#5F9D08] hover:bg-[#4b7b06] text-white px-4 py-2 rounded-md transition-colors text-xs sm:text-sm">
                {actionButtonText}
              </button>
            </Link>
          )}
          {secondaryButtonText && (
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-xs sm:text-sm transition"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
