import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Notifications from '../assets/images/notifications00.png';
import JobCard from './components/JobCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import ProfileImage from '../assets/images/Profile_pics/1.jpg';

function AllJobs_ClosedJobs() {
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingInternships, setLoadingInternships] = useState(true);
  const [errorJobs, setErrorJobs] = useState(null);
  const [errorInternships, setErrorInternships] = useState(null);
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 768;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch Closed Jobs
  const fetchJobs = async () => {
    setLoadingJobs(true);
    setErrorJobs(null);
    try {
      const response = await axios.get(`${backend_url}/recruiters/myJobs`, { withCredentials: true });
      const closedJobs = response.data.jobs.filter(job => job.status === 'closed');
      setJobs(closedJobs);
    } catch (error) {
      toast.error("Failed to fetch closed jobs");
      setErrorJobs("Failed to fetch closed jobs");
      console.error(error);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch Closed Internships
  const fetchInternships = async () => {
    setLoadingInternships(true);
    setErrorInternships(null);
    try {
      const response = await axios.get(`${backend_url}/recruiters/myInternships`, { withCredentials: true });
      const closedInternships = response.data.internships.filter(i => i.status === 'closed');
      setInternships(closedInternships);
    } catch (error) {
      toast.error("Failed to fetch closed internships");
      setErrorInternships("Failed to fetch closed internships");
      console.error(error);
    } finally {
      setLoadingInternships(false);
    }
  };

  // Fetch Recruiter Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backend_url}/recruiters/getProfile`, { withCredentials: true });
        setUserName(res.data.recruiter?.companyName || 'Guest');
      } catch (error) {
        toast.error("Failed to fetch recruiter details");
        console.error(error);
        setUserName('Guest');
      }
    };
    fetchProfile();
    fetchJobs();
    fetchInternships();
  }, []);

  // Job Actions
  const handleOpenJob = async (jobId) => {
    try {
      const res = await axios.post(`${backend_url}/api/recruiters/openJob/${jobId}`, {}, { withCredentials: true });
      if (res.data.success) {
        fetchJobs();
        toast.success("Job opened successfully");
      }
    } catch (error) {
      toast.error("Failed to open job");
      console.error(error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${backend_url}/recruiters/deleteJob/${jobId}`, { withCredentials: true });
      fetchJobs();
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error("Failed to delete job");
      console.error(error);
    }
  };

  // Internship Actions
  const handleOpenInternship = async (id) => {
    try {
      const res = await axios.post(`${backend_url}/recruiters/openInternship/${id}`, {}, { withCredentials: true });
      if (res.data.success) {
        fetchInternships();
        toast.success("Internship opened successfully");
      }
    } catch (error) {
      toast.error("Failed to open internship");
      console.error(error);
    }
  };

  const handleDeleteInternship = async (id) => {
    try {
      await axios.delete(`${backend_url}/recruiters/deleteInternship/${id}`, { withCredentials: true });
      fetchInternships();
      toast.success("Internship deleted successfully");
    } catch (error) {
      toast.error("Failed to delete internship");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 flex-col">
      {/* Top Navigation Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#5F9D08] text-white p-4 flex flex-wrap justify-between items-center w-full"
      >
        <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto"></div>
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <Link to="/recruiters/notifications">
            <img src={Notifications} alt="Notifications Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          </Link>
          <Link to="/recruiters/getProfile" className='flex flex-row items-center gap-2'>
            <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
              <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
            </div>
            <span className="text-sm sm:text-base">{userName || 'Loading...'}</span>
          </Link>
        </div>
      </motion.div>

      <div className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="lg:hidden p-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-3xl text-[#5F9D08] cursor-pointer">
            <FiMenu />
          </button>
        </div>
        {!isMobile && (
          <div className="hidden lg:block fixed top-20 left-0 z-30">
            <Sidebar isOpen={true} isMobile={false} />
          </div>
        )}
        <AnimatePresence>
          {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isMobile={true} />}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div className="flex-1 p-4 bg-gray-100 lg:ml-64 justify-center">
          <motion.h2 className="text-lg sm:text-2xl font-semibold mb-2">All Closed Jobs & Internships</motion.h2>

          {/* Closed Jobs */}
          <motion.h3 className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4">Closed Jobs</motion.h3>
          {loadingJobs ? (
            <p>Loading jobs...</p>
          ) : errorJobs ? (
            <p className="text-red-500">{errorJobs}</p>
          ) : jobs.length === 0 ? (
            <p>No closed jobs found.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
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
                  actionButtonText="Open Job"
                  secondaryButtonText="Delete Job"
                  actionButtonLink={() => handleOpenJob(job._id)}
                  onSecondaryButtonClick={() => handleDeleteJob(job._id)}
                  statusText="Closed"
                />
              ))}
            </div>
          )}

          {/* Closed Internships */}
          <motion.h3 className="text-base sm:text-xl font-semibold text-[#5F9D08] mt-6 mb-4">Closed Internships</motion.h3>
          {loadingInternships ? (
            <p>Loading internships...</p>
          ) : errorInternships ? (
            <p className="text-red-500">{errorInternships}</p>
          ) : internships.length === 0 ? (
            <p>No closed internships found.</p>
          ) : (
            <div className="space-y-4">
              {internships.map(i => (
                <JobCard
                  key={i._id}
                  jobTitle={i.internshipRole}
                  location={i.location}
                  salaryRange={`${i.stipendType || ''} ${i.stipendAmount || ''}`}
                  jobDescription={i.internshipDescription || 'No description'}
                  skills={i.skillsRequired}
                  eligibilityCriteria={i.eligibilityCriteria}
                  status={i.status}
                  opened={i.createdAt}
                  actionButtonText="Open Internship"
                  secondaryButtonText="Delete Internship"
                  actionButtonLink={() => handleOpenInternship(i._id)}
                  onSecondaryButtonClick={() => handleDeleteInternship(i._id)}
                  statusText="Closed"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}

export default AllJobs_ClosedJobs;
