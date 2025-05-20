// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import ActiveJobs from '../images/ActiveJob00.png';
import ClosedJobs from '../images/ClosedJob00.png';
import PostJobs from '../images/PostAJob00.png';

const SideBar_Recr = () => {
  return (
    <div className="bg-[#5F9D08] text-white w-64 p-4 rounded-tr-lg rounded-bl-lg mt-4">
      <ul className="space-y-4">
        <li className="flex items-center space-x-2">
          <Link to="/jobs/active" className="flex items-center space-x-2">
            <img src={ActiveJobs} alt="Active Jobs Icon" className="w-6 h-6" />
            <span className="text-sm sm:text-base">Active Jobs</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <Link to="/jobs/closed" className="flex items-center space-x-2">
            <img src={ClosedJobs} alt="Closed Jobs Icon" className="w-6 h-6" />
            <span className="text-sm sm:text-base">Closed Jobs</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <Link to="/post-jobs" className="flex items-center space-x-2">
            <img src={PostJobs} alt="Post Job Icon" className="w-6 h-6" />
            <span className="text-sm sm:text-base">Post a Job</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar_Recr;