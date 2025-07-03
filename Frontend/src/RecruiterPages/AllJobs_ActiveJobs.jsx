import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Search from '../assets/images/search00.png';
import Notifications from '../assets/images/notifications00.png';
import ProfileImage from '../assets/images/Profile_pics/1.jpg';
import JobCard from './components/JobCard';
import{ toast }from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';
function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');

   useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recruiters/myJobs', {
          withCredentials: true, // <-- THIS is required to send cookies
        });

        setJobs(response.data.jobs); // Adjust according to your API shape
        setLoading(false);
        // console.log(response.data.jobs)
      } catch (error) {
        toast.error("Failed to fetch jobs");
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  useEffect(() => {
    const fetchProfile=async()=>{
      try {
        const res=await axios.get('http://localhost:8000/api/recruiters/getProfile',{
          withCredentials:true
        })
        const recruiter=res.data.recruiter
        
        setUserName(recruiter.recruiterName)
        setLoading(false);
        // console.log(res.data.recruiter)
      } catch (error) {
         toast.error("Failed to fetch Recrutier Details");
        console.error("Error fetching recuriter:", error);
        setLoading(false);
      }
    }
    fetchProfile()
  }, []);
  

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex bg-gray-100 flex-col">
      {/* Top Navigation Bar */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#5F9D08] text-white p-4 flex flex-wrap justify-between items-center w-full">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
          <img src={Search} alt="Search Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 p-2 rounded bg-white text-gray-700"
          />
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <Link to="/recruiters/notifications">
            <img src={Notifications} alt="Notifications Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          </Link>
          <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
            <img src={ProfileImage} alt="" />
          </div>
          <Link to="/recruiters/getProfile">
          <span className="text-sm sm:text-base">{userName || 'Loading...'}</span> 
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex-1 p-4 bg-gray-100">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg sm:text-2xl font-semibold mb-2">All Jobs</motion.h2>
          <motion.h3 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4">Active Jobs</motion.h3>

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
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="space-y-4">
              {jobs.map((job, index) => (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 * index }}
                  key={job._id}
                >
                  <JobCard
                  key={job._id}
                  jobTitle={job.jobRole}
                  location={job.location}
                  salaryRange={job.ctc}
                  jobDescription={job.jobDescription}
                  skills={job.skillsRequired}
                  eligibilityCriteria={job.eligibilityCriteria}
                  status={job.status}
                  opened={job.created_at}
                  actionButtonText="View Applicants"
                  secondaryButtonText="Close Job"
                  actionButtonLink={`/recruiters/applicants`}
                  onSecondaryButtonClick={() => console.log(`Closing job ${job._id}`)}
                  statusText={job.status === 1 ? 'Active' : 'Inactive'}
                />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default JobPage;
