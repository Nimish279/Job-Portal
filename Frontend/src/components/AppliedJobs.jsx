import React, { useEffect } from 'react';
import { Link, useActionData } from 'react-router-dom';
// import appliedJobsData from '../data/appliedJobs.json'; // Import applied jobs data
import useUserStore from '../store/userStore.js'
const AppliedJobs = () => {

  const {getAppliedJobs,appliedJobs}=useUserStore()


  useEffect(() => {
    getAppliedJobs()
  }, [getAppliedJobs]);
  return (
    <div className="hidden md:block sticky top-16 md:top-20 w-full lg:w-64 md:w-52 h-auto bg-white text-black lg:p-4 md:p-2 mt-16 md:mt-20 rounded-bl-2xl shadow-lg">
      <div className="bg-[#5F9D08] lg:p-4 md:p-2 rounded-bl-2xl">
        <h2 className="lg:text-2xl font-bold text-white">Applied Jobs</h2>
      </div>
      <ul className="lg:p-4 md:p-2 lg:space-y-2 md:space-y-1">
      {appliedJobs.length === 0 ? (
          <li className="text-gray-500 font-bold text-xl">You haven't applied to any jobs yet.</li>
        ) : (
          appliedJobs.map((job, index) => (
            <li
              key={job._id}
              className={`hover:bg-gray-900 text-sm text-black hover:text-white p-2 rounded ${
                index !== appliedJobs.length - 1 ? 'border-b' : ''
              }`}
            >
              <Link to={`/applied-jobs/${job._id}`}>
                {job.jobRole}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AppliedJobs;
