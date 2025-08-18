// C:\Users\Lenovo\Downloads\feature\Job-Portal\Frontend\src\pages\NotificationsPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import NavSearchBar from "../components/Header/NavSearchBar";
import Sidebar from "../components/SideBar";

import amazonLogo from "../assets/images/amazon-logo.svg";
import googleLogo from "../assets/images/Email00.png";
import appleLogo from "../assets/images/AppleLogo.jpg";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      companyLogo: amazonLogo,
      text: "Amazon has posted a new opening for a Software Developer position.",
      timeAgo: "1 hr ago",
    },
    {
      id: 2,
      companyLogo: googleLogo,
      text: "Google has shortlisted your application for the next round.",
      timeAgo: "2 hrs ago",
    },
    {
      id: 3,
      companyLogo: appleLogo,
      text: "Apple invites you to apply for their Senior Engineer position.",
      timeAgo: "3 hrs ago",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMobile = windowWidth < 768;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Uncomment and use real API call if needed
        // const response = await axios.get('http://localhost:8000/api/users/notifications', { withCredentials: true });
        // setNotifications(response.data.notifications);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load notifications");
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row relative">
      {/* Top Navigation */}
      <NavSearchBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Hamburger for mobile */}
      
        {/* <div className="p-4 mt-6 fixed top-5 left-4 z-50 lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] focus:outline-none cursor-pointer"
          >
            <FiMenu />
          </button>
        </div> */}

      {/* Mobile Navigation */}
      <NavSearchBar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        showHamburger={true}
      />  

      {/* Sidebar for large screens */}
      {!isMobile && (
        <div className="hidden lg:block fixed top-20 left-0 z-30">
          <Sidebar isOpen={true} isMobile={false} />
        </div>
      )}

      {/* Sidebar for mobile with animation */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isMobile
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 pt-24 transition-all duration-300 px-4 md:px-8 ${
          !isMobile ? "lg:pl-64" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-12">
            <div className="border-b pb-4 mb-4 border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-800">
                Notifications
              </h1>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Loading notifications...
              </div>
            ) : notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={notification.companyLogo}
                        alt="Company Logo"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-gray-800 text-sm sm:text-base">
                          {notification.text}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {notification.timeAgo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No notifications yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;