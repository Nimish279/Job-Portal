import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import recruiterData from '../RecruiterData/recruiterProfile.json';
import Navbar from '../Notifications/Navbar';
import CompanyProfileForm from './CompanyProfileForm';
import AmazonLogo from '../../assets/images/AmazonLogo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
      setEmail(user.email);
      setLinkedin(user.linkedin);
      setJobTitle(user.designation);
      setPhone(user.phone);
      setCompanyName(user.company_name);
      setWebsite(user.website);
      setAddress(user.address);
      setIndustryType(user.industry_type);  
      setcompany_name(user.company_name);  
      const logoFromDB = user.logo_url;
      setlogo_url(logoFromDB);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen"
    >
      <Navbar pageName="Company Profile" />

      {/* Sidebar + Hamburger */}
      <div className="flex">
        {/* Mobile Hamburger */}
        <div className="lg:hidden absolute top-16 left-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08]"
          >
            <FiMenu />
          </button>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block mt-6 ml-4">
          <Sidebar isOpen={true} isMobile={false} />
        </div>

        {/* Animated Sidebar for Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile
            />
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:pl-8 mt-20 lg:mt-6">
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
              className="w-full lg:w-1/3 bg-white rounded-md shadow-md p-6 h-fit sticky top-24"
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

              <div className="space-y-2 text-sm text-gray-600">
                <p className="hover:underline cursor-pointer">Change Password</p>
                <Link to="/update-recruiter" className="block hover:underline">Update Recruiter</Link>
                <Link to="/recruiters/logout" className="block hover:underline">Sign Out</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Small reusable component to reduce repetition
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
