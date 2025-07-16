import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};


const JobCard = ({ job }) => {
  return (
    <div className="rounded-xl p-5 shadow-md bg-white transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="flex items-start">
        <div className="bg-green-50 p-3 rounded-full mr-4 hidden md:flex items-center justify-center">
          <div className="w-10 h-10 flex items-center justify-center text-[#5F9D08] font-bold text-xl">
            {job.company ? job.company.charAt(0) : '?'}
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">{job.title || 'Untitled Position'}</h2>
          <p className="text-[#5F9D08] font-medium">{job.company || 'Unknown Company'}</p>
          
          <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
            <span className="inline-flex items-center mr-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
              {job.location || 'Location not specified'}
            </span>
            {job.jobRole && (
              <span className="inline-flex items-center mr-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                {job.jobRole}
              </span>
            )}
            {job.ctc && (
              <span className="inline-flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                {job.ctc}
              </span>
            )}
          </div>
          
          {job.skillsRequired && (
            <div className="mt-3">
              <p className="text-sm text-gray-700 font-medium mb-1">Skills Required:</p>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.split(',').map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {job.posted && `Posted: ${formatDate(job.posted)}`}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to={`/users/job/${job.id || job._id || 'undefined'}`} 
                className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-white px-4 py-2 rounded-lg inline-block font-medium hover:shadow-md transition-all duration-300"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
