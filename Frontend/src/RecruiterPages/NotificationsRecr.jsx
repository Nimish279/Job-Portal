import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Search from '../assets/images/search00.png';
import NotificationsIcon from '../assets/images/notifications00.png';
import ProfileImage from '../assets/images/Profile_pics/1.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import AmazonLogo from '../assets/images/AmazonLogo.png';
import { FaHome } from 'react-icons/fa';

export default function NotificationsRecr() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 768;
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const mockNotifications = [
          { message: "10 new Employees Applied for Software Developer Job Posting.", time: "1 hr ago" },
          { message: "5 new Employees Applied for Project Manager Job Posting.", time: "2 hrs ago" },
          { message: "20 new Employees Applied for Data Scientist Job Posting.", time: "3 hrs ago" },
          { message: "15 new Employees Applied for UI/UX Designer Job Posting.", time: "4 hrs ago" },
          { message: "8 new Employees Applied for QA Engineer Job Posting.", time: "5 hrs ago" }
        ];
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load notifications");
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/recruiters/getProfile', {
          withCredentials: true
        });
        setUserName(res.data.recruiter.companyName);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchNotifications();
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#5F9D08] text-white p-4 flex flex-wrap justify-between items-center w-full shadow-md"
      >
        {/* Left: Home button */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <Link to="/recruiters/jobs/active">
                      <img src={AmazonLogo} alt="Amazon Logo" className="w-8 h-8" />
                    </Link>
        </div>

        {/* Right: Search + Notifications + Profile */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 p-2 rounded bg-white text-gray-700"
          />
          <img src={Search} alt="Search Icon" className="w-8 h-8" />
          {/* <Link to="/recruiters/notifications">
            <img src={NotificationsIcon} alt="Notifications" className="w-8 h-8" />
          </Link> */}
          <Link to="/recruiters/jobs/active">
                                <FaHome className="text-2xl w-8 h-8  cursor-pointer hover:text-gray-300" />
                              </Link>
          <Link to="/recruiters/getProfile" className="flex items-center gap-2">
            <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
              <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
            </div>
            <span className="text-sm sm:text-base">{userName || 'Loading...'}</span>
          </Link>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar toggle for mobile */}
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

        {/* Sidebar for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile={true}
            />
          )}
        </AnimatePresence>

        {/* Notifications List */}
        <main className="flex-1 px-4 md:px-6 mt-4 lg:mt-6 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
                <span className="text-gray-500 text-sm">
                  {notifications.length} total
                </span>
              </div>

              {loading ? (
                <div className="p-8 text-center text-gray-500">Loading notifications...</div>
              ) : notifications.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <p className="text-gray-800 text-sm sm:text-base">
                        {notification.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">No notifications yet</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
