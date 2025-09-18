import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Search from '../assets/images/search00.png';
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

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // ----------------- JOBS -----------------
  const fetchJobs = async () => {
    try {
      const response = await axios.get(backend_url + '/recruiters/myJobs', {
        withCredentials: true,
      });
      const recruiterAllJobs = response.data.jobs.filter(
        (job) => job.status === 'closed'
      );
      setJobs(recruiterAllJobs);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleOpenJob = async (jobId) => {
    try {
      const res = await axios.post(
        `${backend_url}/recruiters/openJob/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchJobs();
        toast.success('Job Opened successfully');
      }
    } catch (error) {
      toast.error('Failed to open job');
      console.error('Error opening job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`${backend_url}/recruiters/deleteJob/${jobId}`, {
        withCredentials: true,
      });
      fetchJobs();
      toast.success('Job Deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job');
      console.error('Error deleting job:', error);
    }
  };

  // ----------------- INTERNSHIPS -----------------
  const fetchInternships = async () => {
    try {
      const response = await axios.get(
        backend_url + '/recruiters/myInternships',
        {
          withCredentials: true,
        }
      );
      const recruiterAllInternships = response.data.internships.filter(
        (internship) => internship.status === 'closed'
      );
      setInternships(recruiterAllInternships);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch internships');
      console.error('Error fetching internships:', error);
      setLoading(false);
    }
  };

  const handleOpenInternship = async (internshipId) => {
    try {
      const res = await axios.post(
        `${backend_url}/recruiters/openInternship/${internshipId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        fetchInternships();
        toast.success('Internship Opened successfully');
      }
    } catch (error) {
      toast.error('Failed to open internship');
      console.error('Error opening internship:', error);
    }
  };

  const handleDeleteInternship = async (internshipId) => {
    try {
      await axios.delete(
        `${backend_url}/recruiters/deleteInternship/${internshipId}`,
        {
          withCredentials: true,
        }
      );
      fetchInternships();
      toast.success('Internship Deleted successfully');
    } catch (error) {
      toast.error('Failed to delete internship');
      console.error('Error deleting internship:', error);
    }
  };

  // ----------------- PROFILE -----------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(backend_url + '/recruiters/getProfile', {
          withCredentials: true,
        });
        const recruiter = res.data.recruiter;
        setUserName(recruiter.companyName);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch Recrutier Details');
        console.error('Error fetching recruiter:', error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch data initially
  useEffect(() => {
    fetchJobs();
    fetchInternships();
  }, []);

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
            <img
              src={Notifications}
              alt="Notifications Icon"
              className="w-8 h-8 sm:w-10 sm:h-10"
            />
          </Link>
          <Link
            to="/recruiters/getProfile"
            className="flex flex-row items-center gap-2"
          >
            <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
              <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
            </div>
            <span className="text-sm sm:text-base">
              {userName || 'Loading...'}
            </span>
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

        {!isMobile && (
          <div className="hidden lg:block fixed top-20 left-0 z-30">
            <Sidebar isOpen={true} isMobile={false} />
          </div>
        )}

        <AnimatePresence>
          {isSidebarOpen && (
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
          className="flex-1 p-4 bg-gray-100 lg:ml-64 justify-center"
        >
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-2xl font-semibold mb-2"
          >
            All Jobs & Internships
          </motion.h2>

          {/* Closed Jobs */}
          <motion.h3
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4"
          >
            Closed Jobs
          </motion.h3>

          {loading ? (
            <div className="text-center">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : jobs.length === 0 ? (
            <p>No closed jobs found.</p>
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
                  actionButtonText="Open Job"
                  secondaryButtonText="Delete Job"
                  actionButtonLink={() => {
                    handleOpenJob(job._id);
                  }}
                  onSecondaryButtonClick={() => {
                    handleDeleteJob(job._id);
                  }}
                  statusText={job.status === 'active' ? 'Active' : 'Closed'}
                />
              ))}
            </div>
          )}

          {/* Closed Internships */}
          <motion.h3
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl font-semibold text-[#5F9D08] mt-6 mb-4"
          >
            Closed Internships
          </motion.h3>

          {loading ? (
            <div className="text-center">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
              <p>Loading...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : internships.length === 0 ? (
            <p>No closed internships found.</p>
          ) : (
            <div className="space-y-4">
              {internships.map((internship) => (
                <JobCard
                  key={internship._id}
                  jobTitle={internship.internshipRole}
                  location={internship.location}
                  salaryRange={internship.stipendAmount}
                  jobDescription={internship.internshipType}
                  skills={internship.skillsRequired}
                  eligibilityCriteria={internship.eligibilityCriteria}
                  status={internship.status}
                  opened={internship.created_at}
                  actionButtonText="Open Internship"
                  secondaryButtonText="Delete Internship"
                  actionButtonLink={() => {
                    handleOpenInternship(internship._id);
                  }}
                  onSecondaryButtonClick={() => {
                    handleDeleteInternship(internship._id);
                  }}
                  statusText={internship.status === 'active' ? 'Active' : 'Closed'}
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
