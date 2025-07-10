import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/SideBar";
import NavSearchBar from "../components/Header/NavSearchBar";
import amazonLogo from "../assets/images/amazon-logo.svg";
import googleLogo from "../assets/images/Email00.png";
import appleLogo from "../assets/images/AppleLogo.jpg";
import axios from "axios";
import { toast } from "react-toastify";

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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // In a real app, you would fetch notifications from your API
        // const response = await axios.get('http://localhost:8000/api/users/notifications', {
        //   withCredentials: true,
        // });
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

  const isMobile = windowWidth < 768;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar
      <Sidebar activePage="notifications" /> */}

      {/* Sidebar */}
      {!isMobile ? (
        <Sidebar activePage="notifications" />
      ) : (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
      <div className={`flex-1 flex mt-15 flex-col overflow-hidden transition-all duration-300 ${!isMobile ? 'ml-52 md:ml-72' : ''}`}>

        {/* Top Navigation */}
        <NavSearchBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-12">
              <div className="p-4 border-b border-gray-200">
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
        </main>
      </div>
    </div>
  );
};

export default NotificationsPage;
