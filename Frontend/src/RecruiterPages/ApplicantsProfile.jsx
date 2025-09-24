import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  FaGraduationCap,
  FaUniversity,
  FaEnvelope,
  FaLocationArrow,
  FaGithub,
  FaFilePdf,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../components/SideBar_Recr";
import Notifications from "../assets/images/notifications00.png";
import DefaultProfile from "../assets/images/Profile_pics/1.jpg";
import userStore from "../store/userStore";
import ProfileImage from '../assets/images/Profile_pics/1.jpg';

const ApplicantsProfile = () => {
  const { jobId, applicantId } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Guest');
  
  // const user = userStore((state) => state.user);
  // const fetchedUser = userStore((state) => state.fetchedUser);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roundDetails, setRoundDetails] = useState("");

  const isMobile = screenWidth < 768;
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // Resize listener
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch applicant
  useEffect(() => {
    // if (fetchedUser && !user) {
    //   toast.warn("Please login to access applicant details.");
    //   navigate("/recruiters/login");
    //   return;
    // }
  fetchProfile();
    const fetchApplicant = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/recruiters/jobs/${jobId}/candidate/${applicantId}`,
          { withCredentials: true }
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching applicant:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch applicant profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (applicantId) fetchApplicant();
  }, [applicantId, jobId, navigate]);

  const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backend_url}/recruiters/getProfile`, { withCredentials: true });
        setUserName(res.data.recruiter?.companyName || 'Guest');
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to fetch recruiter details');
        setUserName('Guest');
      }
    };

  // Notify (shortlist) applicant
  const handleNotify = async () => {
    try {
      const res = await axios.put(
        `${backend_url}/applications/job/${jobId}/candidate/${applicantId}/status`,
        {
          status: "Accepted",
          message:
            roundDetails || "You have been shortlisted for the next round.",
        },
        { withCredentials: true }
      );

      setProfile((prev) => ({ ...prev, status: res.data.status || "Accepted" }));
      toast.success("Applicant notified successfully!");
    } catch (err) {
      console.error("Error notifying applicant:", err);
      toast.error(err.response?.data?.message || "Failed to notify applicant");
    }
  };

  // Reject applicant
  const handleReject = async () => {
    try {
      const res = await axios.put(
        `${backend_url}/applications/job/${jobId}/candidate/${applicantId}/status`,
        {
          status: "Rejected",
          message:
            "We regret to inform you that your application was not selected.",
        },
        { withCredentials: true }
      );

      setProfile((prev) => ({ ...prev, status: res.data.status || "Rejected" }));
      toast.success("Applicant rejected successfully!");
    } catch (err) {
      console.error("Error rejecting applicant:", err);
      toast.error(err.response?.data?.message || "Failed to reject applicant");
    }
  };

  // UI States
  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!profile)
    return <div className="p-8 text-center">No profile data found.</div>;

  // Destructure profile
  const {
    profilePhoto,
    name = "N/A",
    degree = "N/A",
    university = "N/A",
    email = "N/A",
    city = "N/A",
    github = "",
    about = "N/A",
    skills = [],
    experience = "N/A",
    resume = [],
    status = "Pending",
  } = profile;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-100 min-h-screen flex flex-col"
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar */}
      <motion.div className="bg-[#5F9D08] sticky top-0 left-0 text-white p-4 flex flex-wrap justify-between items-center w-full">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">logo</div>
              <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                <Link to="/recruiters/notifications">
                  <img src={Notifications} alt="Notifications Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
                </Link>
                <Link to="/recruiters/getProfile" className="flex flex-row items-center gap-2">
                  <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
                    <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
                  </div>
                  <span className="text-sm sm:text-base">{userName}</span>
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
        <div className="flex-1 p-4 mt-6 lg:ml-64">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Applicant Info (Left Section) */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-2/3 bg-white rounded-md shadow-md p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profilePhoto || DefaultProfile}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border"
                />
                <div>
                  <h2 className="text-xl font-bold">{name}</h2>
                  <p
                    className={`px-3 py-1 rounded-md text-sm inline-block mt-1 ${
                      status === "Accepted"
                        ? "bg-green-200 text-green-700"
                        : status === "Rejected"
                        ? "bg-red-200 text-red-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {status}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-700 mb-4">{about}</p>

              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-200 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <p className="text-gray-700 mb-4">{experience}</p>

              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <ul>
                {resume.length > 0 ? (
                  resume.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <FaFilePdf className="text-red-600" />
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {doc.fileName}
                      </a>
                    </li>
                  ))
                ) : (
                  <p>No resume uploaded.</p>
                )}
              </ul>
            </motion.div>

            {/* Details + Actions (Right Section) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/3 bg-white rounded-md shadow-md p-6 h-fit"
            >
              <div className="space-y-3 mb-6 text-sm text-gray-800">
                <InfoRow icon={<FaGraduationCap />} value={degree} />
                <InfoRow icon={<FaUniversity />} value={university} />
                <InfoRow icon={<FaEnvelope />} value={email} />
                <InfoRow icon={<FaLocationArrow />} value={city} />
                {github && (
                  <InfoRow
                    icon={<FaGithub />}
                    value={
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {github}
                      </a>
                    }
                  />
                )}
              </div>

              <textarea
                placeholder="Enter next round details"
                value={roundDetails}
                onChange={(e) => setRoundDetails(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
                rows="3"
              />

              <button
                onClick={handleNotify}
                className="w-full mb-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Notify
              </button>
              <button
                onClick={handleReject}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reject
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoRow = ({ icon, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>{value}</span>
  </div>
);

export default ApplicantsProfile;
