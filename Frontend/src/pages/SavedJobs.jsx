import React from 'react';
import Navbar from '../components/Header/Navbar';  // Ensure you have a Navbar component
import JobCard from '../components/JobCard';  // Import the existing JobCard component
import saved from '../data/saved.json';  // This file will contain your saved job data

const SavedJobs = () => {
  return (
    <div className='bg-gray-100 min-h-screen pt-16'>
      {/* Navbar */}
      <Navbar pageName="Saved Jobs" />

      {/* Saved Jobs List */}
      <div className="   mx-4 md:mx-8 lg:ml-8 lg:mr-30">
        {/* Job Cards */}
        <div className="flex flex-col space-y-4 sm:pt-6"> {/* Added sm:pt-6 to add padding on small screens */}
          {saved.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
