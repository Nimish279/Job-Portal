import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Search from '../assets/images/search00.png';
import Notifications from '../assets/images/notifications00.png';
import JobCard from './components/JobCard';

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        
        const response = await fetch("http://localhost:8000/api/recruiters/myJobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // make sure to include this if you're dealing with cookies
          body: JSON.stringify({response: response.data.jobs}),
        });
        console.log(response.data);
        
        // if (error) {
        //   console.error('Error fetching job listings:', error.message);
        //   setError('Failed to load job listings. Please try again later.');
        // } else {
        //   setJobs();
        // }
      } catch (err) {
        console.error('Unexpected error:', err.message);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  

  return (
    <div className="h-screen flex bg-gray-100 flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-[#5F9D08] text-white p-4 flex flex-wrap justify-between items-center w-full">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
          <img src={Search} alt="Search Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 p-2 rounded text-gray-700"
          />
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <Link to="/notifications">
            <img src={Notifications} alt="Notifications Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          </Link>
          <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8"></div>
          <Link to="/recruiter-profile">
          <span className="text-sm sm:text-base">{userName || 'Loading...'}</span> 
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 bg-gray-100">
          <h2 className="text-lg sm:text-2xl font-semibold mb-2">All Jobs</h2>
          <h3 className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4">Active Jobs</h3>

          {loading ? (
            <div className="text-center">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : jobs.length === 0 ? (
            <p>No active jobs found.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.job_id}
                  jobTitle={job.job_role}
                  jobType={job.job_type}
                  experience={job.experience}
                  location={job.location}
                  salaryRange={job.salary_range}
                  jobDescription={job.job_description}
                  skills={job.skills}
                  qualifications={job.qualifications}
                  eligibilityCriteria={job.eligibility_criteria}
                  status={job.status}
                  opened={job.created_at}
                  actionButtonText="View Applicants"
                  secondaryButtonText="Close Job"
                  actionButtonLink={`/job-details/${job.job_id}`}
                  onSecondaryButtonClick={() => console.log(`Closing job ${job.job_id}`)}
                  statusText={job.status === 1 ? 'Active' : 'Inactive'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPage;
