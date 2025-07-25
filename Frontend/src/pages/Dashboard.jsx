import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavSearchBar from '../components/Header/NavSearchBar';
import Sidebar from '../components/SideBar';
import JobCards from '../components/JobCards';
import AppliedJobs from '../components/AppliedJobs';
import useUserStore from '../store/userStore.js';
import {motion,AnimatePresence} from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const getAppliedJobs=useUserStore(state=>state.getAppliedJobs)
  const appliedJobs=useUserStore(state=>state.appliedJobs)
  // Check if user is logged in
  useEffect(() => {
    // If no user is found after a short delay, redirect to login
    // const timer = setTimeout(() => {
    //   if (!user) {
    //     navigate('/users/login');
    //   } else {
        setIsLoading(false);
      
    }, 500); // Small delay to allow store to initialize

  //   return () => clearTimeout(timer);
  // }, [user, navigate]);

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
      {/* <NavSearchBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
      {/* <div className="lg:hidden p-4 mt-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] cursor-pointer"
          >
            <FiMenu />
          </button>
        </div> */}
        <NavSearchBar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        showHamburger={true}
      />  

        {/* Sidebar for large screens */}
        <div className="hidden lg:block mt-20 fixed top-0 left-0 min-h-screen">
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
      <div className="flex flex-1 flex-col md:flex-row md:mt-20 lg:ml-64">
      
        
        <div className="flex-1 pl-4 mt-20 md:mt-5 ">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!</h1>
            <p className="text-gray-600">Find your perfect job match from our listings.</p>
          </div>
          <JobCards />
        </div>
        <div className="md:w-1/4 ">
          <AppliedJobs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
