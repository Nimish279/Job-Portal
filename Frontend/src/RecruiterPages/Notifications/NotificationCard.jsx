//C:\Users\Lenovo\Downloads\feature\Job-Portal\Frontend\src\RecruiterPages\Notifications\NotificationCard.jsx
import React from "react";

const NotificationCard = ({ title, message, timeAgo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:bg-gray-50 transition-all duration-200">
      <h2 className="text-gray-900 font-semibold text-sm sm:text-base">{title}</h2>
      <p className="text-gray-700 text-sm mt-1">{message}</p>
      <p className="text-gray-500 text-xs mt-2">{timeAgo}</p>
    </div>
  );
};

export default NotificationCard;


