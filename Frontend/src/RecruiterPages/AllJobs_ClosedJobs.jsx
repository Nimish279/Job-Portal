import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Search from '../assets/images/search00.png';
import Notifications from '../assets/images/notifications00.png';
import JobCard from './components/JobCard';
import{ toast }from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import ProfileImage from '../assets/images/Profile_pics/1.jpg';

function AllJobs_ClosedJobs() {
   const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
     const isMobile = screenWidth < 768;
     useEffect(() => {
         const handleResize = () => setScreenWidth(window.innerWidth);
         window.addEventListener('resize', handleResize);
         return () => window.removeEventListener('resize', handleResize);
       }, []);

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
        
        setUserName(recruiter.companyName) //Company Nmae aayega modals me changes hai(By-tushar)
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
    <div className="h-screen flex bg-gray-100 flex-col">
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
                  <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
                </div>
                <Link to="/recruiters/getProfile">
                <span className="text-sm sm:text-base">{userName || 'Loading...'}</span> 
                </Link>
              </div>
            </motion.div>

      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        {/* Sidebar for large screens */}
         {!isMobile && (
        <div className="hidden lg:block fixed top-20 left-0 z-30">
          <Sidebar isOpen={true} isMobile={false} />
        </div>
      )}

      {/* Sidebar for mobile (animated) */}
      <AnimatePresence>
        { isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isMobile={true}
          />
        )}
      </AnimatePresence>

        {/* Main Content */}
        <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 p-4 bg-gray-100 lg:ml-64 justify-center">
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, }}
                    className="text-lg sm:text-2xl font-semibold mb-2">All Jobs</motion.h2>
                  <motion.h3 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4">Closed Jobs</motion.h3>

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
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AllJobs_ClosedJobs;