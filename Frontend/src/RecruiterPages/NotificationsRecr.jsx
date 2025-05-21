import React from 'react';
import notifications from './RecruiterData/notificationsData.json';
import Navbar from './Notifications/Navbar';

export default function NotificationsRecr() {
  return (
    <div className="w-full bg-gray-100 p-4 min-h-screen">
    <div className="fixed top-0 left-0 w-full z-50">
        <Navbar pageName="Notifications" />
      </div>
      <div className=" mt-12 space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 shadow rounded-md w-full"
          >
            <span className="text-gray-800 text-sm sm:text-base">
              {notification.message}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-0">
              {notification.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
