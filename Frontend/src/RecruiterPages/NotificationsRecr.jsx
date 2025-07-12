import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/SideBar_Recr';
import Navbar from './Notifications/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';

export default function NotificationsRecr() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // In a real app, you would fetch notifications from your API
        // const response = await axios.get('http://localhost:8000/api/recruiters/notifications', {
        //   withCredentials: true,
        // });
        // setNotifications(response.data.notifications);
        
        // For now, using mock data
        const mockNotifications = [
          {
            message: "10 new Employees Applied for Software Developer Job Posting.",
            time: "1 hr ago"
          },
          {
            message: "5 new Employees Applied for Project Manager Job Posting.",
            time: "2 hrs ago"
          },
          {
            message: "20 new Employees Applied for Data Scientist Job Posting.",
            time: "3 hrs ago"
          },
          {
            message: "15 new Employees Applied for UI/UX Designer Job Posting.",
            time: "4 hrs ago"
          },
          {
            message: "8 new Employees Applied for QA Engineer Job Posting.",
            time: "5 hrs ago"
          }
        ];
        
        setNotifications(mockNotifications);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load notifications");
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col gap-10">
      {/* Navbar always on top */}
      <Navbar pageName="Notifications" />

      {/* Main Content Area Below Navbar */}
      <div className="flex flex-col lg:flex-row relative">
        {/* Mobile Hamburger (inside content, below navbar) */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        {/* Sidebar for large screens */}
        <div className="hidden lg:block mt-6 ml-4">
          <Sidebar isOpen={true} isMobile={false} />
        </div>

        {/* Sidebar for small screens (AnimatePresence handles mount/unmount) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile
            />
          )}
        </AnimatePresence>

        {/* Main Notification Content */}
        <main className="flex-1 px-4 md:px-6 mt-4 lg:mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
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
