// ✅ Updated JobPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Search from '../assets/images/search00.png';
import ProfileImage from '../assets/images/Profile_pics/1.jpg';
import Notifications from '../assets/images/notifications00.png';
import JobCard from './components/JobCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activeTab, setActiveTab] = useState("jobs"); // ✅ new state for tab
  const isMobile = screenWidth < 768;
  const navigate = useNavigate();

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${backend_url}/recruiters/myJobs`, {
        withCredentials: true,
      });

      const recruiterAllJobs = response.data.jobs.filter(
        (job) => job.status === 'open' || job.status === 1
      );

      setJobs(recruiterAllJobs);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  // ✅ Fetch internships (⚡ fixed: no status filter)
  const fetchInternships = async () => {
    try {
      const response = await axios.get(`${backend_url}/recruiters/myInternships`, {
        withCredentials: true,
      });

      // backend internships don’t have status → just return all
      const recruiterAllInternships = response.data.internships;
      const afterfilterInternships= recruiterAllInternships.filter((i) => i.status === 'open');
      console.log(afterfilterInternships);
      setInternships(afterfilterInternships);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch internships');
      console.error('Error fetching internships:', error);
      setLoading(false);
    }
  };

  // ✅ Fetch recruiter profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${backend_url}/recruiters/getProfile`, {
        withCredentials: true,
      });
      setUserName(res.data.recruiter.companyName);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch recruiter details');
      console.error('Error fetching recruiter:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchInternships();
    fetchProfile();
  }, []);

  // ✅ Close job
  const handleCloseJob = async (jobId) => {
    try {
      await axios.post(`${backend_url}/recruiters/closeJob/${jobId}`, {}, { withCredentials: true });
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success('Job closed successfully');
    } catch (error) {
      toast.error('Failed to close job');
      console.error('Error closing job:', error);
    }
  };

  // ✅ Close internship
  const handleCloseInternship = async (internshipId) => {
    try {
      await axios.post(`${backend_url}/recruiters/closeInternship/${internshipId}`, {}, { withCredentials: true });
      setInternships((prev) => prev.filter((i) => i._id !== internshipId));
      toast.success('Internship closed successfully');
    } catch (error) {
      toast.error('Failed to close internship');
      console.error('Error closing internship:', error);
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/recruiters/applicants/${jobId}`);
  };

  const handleViewInternshipApplicants = (internshipId) => {
    navigate(`/recruiters/internshipApplicants/${internshipId}`);
  };

  // ✅ Normalize data so JobCard can be reused
  const normalize = (item, type) => ({
    jobTitle: item.jobRole || item.internshipRole,
    location: item.location,
    salaryRange:
      type === "job"
        ? item.ctc
        : `${item.stipendType || ""} ${item.stipendAmount || ""}`,
    description: item.jobDescription || item.internshipDescription || "Not provided",
    responsibilities: item.responsibilities || "Not provided",
    qualifications: item.eligibilityCriteria || "Not provided",
    workflow: item.hiringWorkflow || "Not specified",
    skills: item.skillsRequired,
    status: item.status || "active", // internships don’t have status, default active
    opened: item.createdAt, // ✅ fixed: use createdAt instead of created_at
    actionButtonText: "View Applicants",
    secondaryButtonText: type === "job" ? "Close Job" : "Close Internship",
    actionButtonLink: () =>
      type === "job"
        ? handleViewApplicants(item._id)
        : handleViewInternshipApplicants(item._id),
    onSecondaryButtonClick: () =>
      type === "job"
        ? handleCloseJob(item._id)
        : handleCloseInternship(item._id),
    statusText:
      item.status === 'open' || item.status === 1 || !item.status
        ? "Active"
        : "Inactive",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex bg-gray-100 flex-col"
    >
      {/* Top Navigation Bar */}
      <motion.div className="bg-[#5F9D08] sticky top-0 left-0 text-white p-4 flex flex-wrap justify-between items-center w-full">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto"></div>
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          {/* <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 p-2 rounded bg-white text-gray-700"
          />
          <img src={Search} alt="Search Icon" className="w-8 h-8" /> */}
          <Link to="/recruiters/notifications">
            <img src={Notifications} alt="Notifications Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
          </Link>

          <Link to="/recruiters/getProfile" className="flex flex-row items-center gap-2">
            <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
              <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
            </div>
            <span className="text-sm sm:text-base">{userName || 'Loading...'}</span>
          </Link>
        </div>
      </motion.div>

      <motion.div className="flex flex-1 flex-col sm:flex-row">
        {/* Sidebar Toggle */}
        <div className="lg:hidden p-4">
          <button onClick={() => setIsSidebarOpen(true)} className="text-3xl text-[#5F9D08] cursor-pointer">
            <FiMenu />
          </button>
        </div>

        {/* Sidebar */}
        {!isMobile && (
          <div className="hidden lg:block fixed top-20 left-0 z-30">
            <Sidebar isOpen={true} isMobile={false} />
          </div>
        )}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isMobile={true} />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div className="flex-1 p-4 bg-gray-100 lg:ml-64 justify-center">
          {/* ✅ Tabs */}
          <div className="flex space-x-6 border-b border-gray-300 mb-6">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`pb-2 ${activeTab === "jobs" ? "border-b-4 border-[#5F9D08] font-semibold" : "text-gray-500"}`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab("internships")}
              className={`pb-2 ${activeTab === "internships" ? "border-b-4 border-[#5F9D08] font-semibold" : "text-gray-500"}`}
            >
              Internships
            </button>
          </div>

          {/* ✅ Jobs Tab */}
          {activeTab === "jobs" && (
            <>
              <h2 className="text-lg sm:text-2xl font-semibold mb-2">All Jobs</h2>
              <h3 className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4">Active Jobs</h3>
              {loading ? (
                <div className="text-center"><p>Loading...</p></div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : jobs.length === 0 ? (
                <p>No active jobs found.</p>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => {
                    const normalized = normalize(job, "job");
                    return <JobCard key={job._id} {...normalized} activejob={true} />;
                  })}
                </div>
              )}
            </>
          )}

          {/* ✅ Internships Tab */}
          {activeTab === "internships" && (
            <>
              <h2 className="text-lg sm:text-2xl font-semibold mb-2">All Internships</h2>
              <h3 className="text-base sm:text-xl font-semibold text-[#5F9D08] mb-4">Active Internships</h3>
              {loading ? (
                <div className="text-center"><p>Loading...</p></div>
              ) : internships.length === 0 ? (
                <p>No active internships found.</p>
              ) : (
                <div className="space-y-4">
                  {internships.map((internship) => {
                    const normalized = normalize(internship, "internship");
                    return <JobCard key={internship._id} {...normalized} activejob={true} />;
                  })}
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
      <ToastContainer position="top-center" theme="colored" />
    </motion.div>
  );
}

export default JobPage;
