import React from 'react';
import Navbar from '../components/Header/Navbar';
import NotificationCard from '../components/NotificationCard';
import amazonLogo from '../assets/images/amazon-logo.svg';
import googleLogo from '../assets/images/Email00.png';
import appleLogo from '../assets/images/AppleLogo.jpg';
// import facebookLogo from '../assets/images/facebook.png';
// import netflixLogo from '../assets/images/netflix.png';

const NotificationsPage = () => {
  const notifications = [
    { 
      id: 1, 
      companyLogo: amazonLogo, 
      text: 'Amazon has posted a new opening for a Software Developer position.', 
      timeAgo: '1 hr ago' 
    },
    { 
      id: 2, 
      companyLogo: googleLogo, 
      text: 'Google has shortlisted your application for the next round.', 
      timeAgo: '2 hrs ago' 
    },
    { 
      id: 3, 
      companyLogo: googleLogo, // Using googleLogo as a placeholder for Apple
      text: 'Apple invites you to apply for their Senior Engineer position.', 
      timeAgo: '3 hrs ago' 
    },
    // Add additional notifications if needed
  ];

  return (
    <div className="bg-gray-100 min-h-screen relative">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar pageName="Notifications" />
      </div>
      
      <div className="max-w-6xl mx-auto p-6 pt-24 z-40 relative">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard 
              key={notification.id}
              companyLogo={notification.companyLogo}
              notificationText={notification.text}
              timeAgo={notification.timeAgo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
