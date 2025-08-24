import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

const formatDate = date => date ? dayjs(date).format('DD MMM YYYY') : '';

const JobCard = ({ job, currentUserAppliedJobs = [] }) => {
  const hasApplied = currentUserAppliedJobs.includes(job._id);
  const canApply = job.status === 'open' && !hasApplied;

  return (
    <div className="rounded-xl p-5 shadow-md bg-white transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="flex items-start">
        <div className="bg-green-50 p-3 rounded-full mr-4 hidden md:flex items-center justify-center">
          <div className="w-10 h-10 flex items-center justify-center text-[#5F9D08] font-bold text-xl">
            {job.recruiter?.companyName?.charAt(0) || job.jobRole?.charAt(0) || '?'}
          </div>
        </div>

        <div className="flex-1">
          {/* Job Title */}
          <h2 className="text-lg md:text-xl font-bold text-gray-800">
            {job.jobRole }
          </h2>

          {/* Company Name */}
          <p className="text-[#5F9D08] font-medium">{job.recruiter?.companyName ? job.recruiter?.companyName : "Unknown Company"}</p>

          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
            <span className="inline-flex items-center mr-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
              {job.location}
            </span>
            {job.ctc && (
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                {job.ctc} LPA
              </span>
            )}
          </div>

          {job.skillsRequired && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 font-medium mb-1">Skills Required:</p>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.split(',').map((skill, i) => (
                  <span key={i} className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{skill.trim()}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">{job.posted && `Posted: ${formatDate(job.posted)}`}</div>

            {canApply ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={`/users/job/${job._id}`}
                  className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-white px-4 py-2 rounded-lg inline-block font-medium hover:shadow-md transition-all duration-300"
                >
                  Apply Now
                </Link>
              </motion.div>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-not-allowed"
              >
                {hasApplied ? 'Already Applied' : 'Closed'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
