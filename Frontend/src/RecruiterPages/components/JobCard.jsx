import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <h3 className="font-semibold text-base sm:text-lg">{jobTitle}</h3>
          <Link to="/accepted-applicants">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                Accepted
            </span>
          </Link>
          <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
              Rejected
          </span>
        </div>

        {/* Detailed Information */}
        <div className="mt-4 text-gray-700 text-sm space-y-2">
          <div className="flex flex-wrap mt-4 space-y-2 sm:space-y-0 sm:space-x-8">
            
            <div className="text-center">
              <p>Location</p>
              <p className="text-gray-700 font-semibold">{location}</p>
            </div>
            <div className="text-center">
              <p>Salary</p>
              <p className="text-gray-700 font-semibold">{salaryRange}</p>
            </div>
            <div className="text-center">
              <p>Skills</p>
              <p className="text-gray-700 font-semibold">{skills}</p>
            </div>
            <div className="text-center">
              <p>Eligibility Criteria</p>
              <p className="text-gray-700 font-semibold">{eligibilityCriteria}</p>
            </div><div className="text-center">
              <p>Job Description</p>
              <p className="text-gray-700 font-semibold">{jobDescription}</p>
            </div>
          </div>
          {/* <p><strong>Job Description</strong> {jobDescription}</p>
          <p><strong></strong> {skills}</p>
          <p><strong>Qualifications:</strong> {qualifications}</p>
          <p><strong>Eligibility Criteria:</strong> {eligibilityCriteria}</p> */}
          {/* <p><strong>Status:</strong> {status === 1 ? 'Active' : 'Inactive'}</p> */}
        </div>
      </div>

      <div className="text-left sm:text-right mt-4 sm:mt-0">
      <p className="text-xs sm:text-sm text-gray-500">
        Made Active {new Date(opened).toLocaleDateString()}
      </p>
      <div className="flex flex-wrap sm:space-x-2 mt-2">
          {actionButtonLink && (
            <Link to={actionButtonLink}>
              <button className="bg-[#5F9D08] text-white px-4 py-2 rounded text-xs sm:text-sm">
                {actionButtonText}
              </button>
            </Link>
          )}
          {secondaryButtonText && (
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-xs sm:text-sm mt-2 sm:mt-0"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
