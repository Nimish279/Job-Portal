import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavSearchBar from '../components/Header/NavSearchBar';
import SideBar from '../components/SideBar';
import JobCards from '../components/JobCards';
import AppliedJobs from '../components/AppliedJobs';
import useUserStore from '../store/userStore.js';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  // Check if user is logged in
  useEffect(() => {
    // If no user is found after a short delay, redirect to login
    const timer = setTimeout(() => {
      if (!user) {
        navigate('/users/login');
      } else {
        setIsLoading(false);
      }
    }, 500); // Small delay to allow store to initialize

    return () => clearTimeout(timer);
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5F9D08] mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col md:flex-row">
      <NavSearchBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-1 flex-col md:flex-row mt-16 md:mt-20">
        {!isMobile && (
          <div className="w-52 lg:w-72"></div> /* Spacer to account for fixed sidebar width */
        )}
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
            <p className="text-gray-600">Find your perfect job match from our listings.</p>
          </div>
          <JobCards />
        </div>
        <div className="md:w-1/4 p-4 md:p-6 md:-mt-40">
          <AppliedJobs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
