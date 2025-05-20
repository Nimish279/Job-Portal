import React from 'react';

const JobDetails = ({ job, onBackClick }) => {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-white transition hover:shadow-lg">
      <button
        onClick={onBackClick}
        className="text-blue-500 hover:underline mb-4"
      >
        Back to Job Listings
      </button>
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500">{job.location}</p>
      <p className="mt-4 text-lg">{job.description}</p>
      <p className="mt-4">Responsibilities:</p>
      <ul className="list-disc ml-6">
        {job.responsibilities.map((resp, index) => (
          <li key={index}>{resp}</li>
        ))}
      </ul>
      <p className="mt-4">Requirements:</p>
      <ul className="list-disc ml-6">
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      <a 
        href={job.link} 
        className="mt-6 inline-block text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Now
      </a>
    </div>
  );
};

export default JobDetails;
