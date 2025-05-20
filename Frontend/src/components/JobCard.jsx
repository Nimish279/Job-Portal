import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 md:p-2 shadow-md bg-white transition hover:shadow-lg">
      <h2 className="lg:text-xl md:text-sm font-bold">{job.title}</h2>
      <p className="text-gray-600 lg:text-xl md:text-sm">{job.company}</p>
      <p className="text-gray-500  lg:text-xlmd:text-sm">{job.location}</p>
      <p className="mt-2 lg:text-xl md:text-sm"><strong>Role:</strong> {job.jobRole}</p>
      <p className="text-gray-600 lg:text-xl md:text-sm"><strong>Skills Required:</strong> {job.skillsRequired}</p>
      <p className="text-gray-600 lg:text-xl md:text-sm"><strong>CTC:</strong> {job.ctc}</p>
      <Link to={`/job/${job.id}`} className="text-blue-500 hover:underline lg:mt-4 block">
        Apply Now
      </Link>
    </div>
  );
};

export default JobCard;
