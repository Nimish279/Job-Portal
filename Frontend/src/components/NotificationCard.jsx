// C:\Users\Lenovo\Downloads\feature\Job-Portal\Frontend\src\components\NotificationCard.jsx
import React from 'react';

  const NotificationCard = ({ companyLogo, notificationText, timeAgo }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg w-full">
        <img src={companyLogo} alt="Company Logo" className="w-14 h-14 rounded-full" />
        <div className="flex-1">
          <p className="text-gray-800 font-medium">{notificationText}</p>
          <p className="text-gray-500 text-sm">{timeAgo}</p>
        </div>
      </div>
    );
  };

  export default NotificationCard;

