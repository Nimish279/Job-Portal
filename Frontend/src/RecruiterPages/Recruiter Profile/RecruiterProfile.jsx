import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import recruiterData from '../RecruiterData/recruiterProfile.json';
import Navbar from '../Notifications/Navbar';
import CompanyProfileForm from './CompanyProfileForm';
import AmazonLogo from '../../assets/images/AmazonLogo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { axiosInstance } from '../../utils/axiosInstance';
import Sidebar from '../../components/SideBar_Recr';

const RecruiterProfile = () => {
  const { recruiter } = recruiterData;
  const [logo_url, setlogo_url] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [designation, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [company_name, setcompany_name] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
       const isMobile = screenWidth < 768;
       useEffect(() => {
           const handleResize = () => setScreenWidth(window.innerWidth);
           window.addEventListener('resize', handleResize);
           return () => window.removeEventListener('resize', handleResize);
         }, []);

  useEffect(() => {
  const fetchRecruiterProfile = async () => {
    try {
      const { data } = await axiosInstance.get("/recruiters/getProfile");
      const recruiter = data.recruiter;

      setUserName(recruiter.name || "");
      setEmail(recruiter.email || "");
      setLinkedin(recruiter.linkedin || "");
      setJobTitle(recruiter.designation || "");
      setPhone(recruiter.phone || "");
      setCompanyName(recruiter.companyName || "");
      setWebsite(recruiter.website || "");
      setAddress(recruiter.address || "");
      setIndustryType(recruiter.industryType || "");
      setlogo_url(recruiter.logo_url || "");
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  fetchRecruiterProfile();
}, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen"
    >
      <Navbar pageName="Company Profile" />

      <div className="flex">
        {/* Mobile Hamburger */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08] cursor-pointer"
          >
            <FiMenu />
          </button>
        </div>

        {/* Sidebar for large screens */}
         {!isMobile && (
        <div className="hidden lg:block fixed top-20 left-0 z-30">
          <Sidebar isOpen={true} isMobile={false} />
        </div>
      )}

      {/* Sidebar for mobile (animated) */}
      <AnimatePresence>
        { isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            isMobile={true}
          />
        )}
      </AnimatePresence>

        {/* Page Content */}
        <div className="flex-1 p-4 mt-10 lg:ml-64">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Section - Company Info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-2/3 bg-white rounded-md shadow-md p-6"
            >
              <div className="flex items-center mb-6">
                <img src={AmazonLogo} alt="Amazon Logo" className="w-12 h-12 mr-4" />
                <div>
                  <h2 className="text-xl font-bold">Amazon</h2>
                  {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">
                      {website}
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <CompanyProfileForm />
            </motion.div>

            {/* Right Section - Recruiter Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-1/3 bg-white rounded-md shadow-md p-6 h-fit top-24"
            >
              <h3 className="text-xl font-bold mb-6 text-center">Recruiter Profile</h3>

              <div className="space-y-3 text-sm text-gray-800">
                {userName && <InfoRow label="Name" value={userName} />}
                {email && <InfoRow label="Email" value={email} />}
                {designation && <InfoRow label="Job Title" value={designation} />}
                {linkedin && <InfoRow label="LinkedIn" value={linkedin} />}
                {phone && <InfoRow label="Phone" value={phone} />}
                {companyName && <InfoRow label="Company" value={companyName} />}
                {website && <InfoRow label="Website" value={website} isLink />}
                {address && <InfoRow label="Address" value={address} />}
                {industryType && <InfoRow label="Industry" value={industryType} />}
              </div>

              <hr className="my-6 border-gray-300" />

              {/* ✅ UPDATED HERE */}
              <div className="space-y-2 text-sm text-gray-600">
                <Link to="/recruiters/change-password" className="block hover:underline">
                  Change Password
                </Link>
                <Link to="/update-recruiter" className="block hover:underline">
                  Update Recruiter
                </Link>
                <Link to="/recruiters/logout" className="block hover:underline">
                  Sign Out
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ label, value, isLink }) => (
  <div className="flex">
    <span className="font-medium w-32">{label}:</span>
    {isLink ? (
      <a href={value} className="text-blue-500 hover:underline truncate">{value}</a>
    ) : (
      <span className="truncate">{value}</span>
    )}
  </div>
);

export default RecruiterProfile;
