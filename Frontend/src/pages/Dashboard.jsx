import React, { useState } from 'react';
import NavSearchBar from '../../components/Header/NavSearchBar';
import SideBar from '../../components/SideBar';
import JobCards from '../../components/JobCards';
import AppliedJobs from '../../components/AppliedJobs';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      <NavSearchBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-1 flex-col md:flex-row mt-16 md:mt-0">
        <div className="flex-1">
          <JobCards />
        </div>
        <AppliedJobs />
      </div>
    </div>
  );
};

export default Dashboard;
