import React from 'react';
import JobCard from './JobCard';
// import jobData from './jobData.json';

const JobCards = () => {
  return (
<div className="p-4 md:p-0 md:-pl-4 sm:-mt-8 md:pt-20 md:mx-8 lg:ml-8 lg:mr-30">
<h2 className="text-2xl md:text-base sm:pb-8 text-black font-bold text-left md:pt-8 lg:pb-6 md:pb-2">Latest Jobs</h2>
      <div className="flex flex-col space-y-4">
        {/* {jobData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))} */}
      </div>
    </div>
  );
};

export default JobCards;
