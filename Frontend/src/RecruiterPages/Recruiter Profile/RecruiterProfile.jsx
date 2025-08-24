import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recruiterData from '../RecruiterData/recruiterProfile.json';
import CompanyProfileForm from './CompanyProfileForm';
import AmazonLogo from '../../assets/images/AmazonLogo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { axiosInstance } from '../../utils/axiosInstance';
import Sidebar from '../../components/SideBar_Recr';
import Search from '../../assets/images/search00.png';
import Notifications from '../../assets/images/notifications00.png';
import ProfileImage from '../../assets/images/Profile_pics/1.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';

const RecruiterProfile = () => {
  const { recruiter } = recruiterData;
  const [logo_url, setlogo_url] = useState('');
  const [loading, setLoading] = useState(true);
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
  const [isEditing, setIsEditing] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 768;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProfile=async()=>{
      try {
        const res=await axios.get('https://job-portal-backend-swtv.onrender.com/api/recruiters/getProfile',{
          withCredentials:true
        })
        const recruiter=res.data.recruiter
        
        setUserName(recruiter.companyName) //Company Nmae aayega modals me changes hai(By-tushar)
        setLoading(false);
        // console.log(res.data.recruiter)
      } catch (error) {
         toast.error("Failed to fetch Recrutier Details");
        console.error("Error fetching recuriter:", error);
        setLoading(false);
      }
    }
    fetchProfile()
  }, []);

  useEffect(() => {
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
      setUserName(recruiter.companyName);
      setEmail(recruiter.email);
      setLinkedin(recruiter.linkedin);
      // setJobTitle(user.designation);
      // setPhone(user.phone);
      // setCompanyName(user.company_name);
      // setWebsite(user.website);
      // setAddress(user.address);
      // setIndustryType(user.industry_type);
      // setcompany_name(user.companyName);
      // setlogo_url(user.logo_url);
    
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen flex flex-col"
    >
      {/* Navbar (Same style as Closed Jobs page) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#5F9D08] text-white p-4 flex flex-wrap justify-between items-center w-full shadow-md"
      >
        {/* Left Section - Home Button */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <Link to="/recruiters/jobs/active">
            <img src={AmazonLogo} alt="Amazon Logo" className="w-8 h-8" />
          </Link>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          {/* <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 p-2 rounded bg-white text-gray-700"
          />
          <img src={Search} alt="Search Icon" className="w-8 h-8" /> */}
          <Link to="/recruiters/notifications">
            <img src={Notifications} alt="Notifications Icon" className="w-8 h-8" />
          </Link>
          {/* <Link to="/recruiters/getProfile" className="flex items-center gap-2">
            <div className="rounded-full bg-gray-300 w-6 h-6 sm:w-8 sm:h-8">
              <img src={ProfileImage} alt="" className="w-full h-full rounded-full" />
            </div>
            <span className="text-sm sm:text-base">{userName || 'Loading...'}</span>
          </Link> */}
          <Link to="/recruiters/jobs/active">
                      <FaHome className="text-2xl w-8 h-8  cursor-pointer hover:text-gray-300" />
                    </Link>
        </div>
      </motion.div>

      <div className="flex flex-1">
        {/* Mobile Sidebar Toggle */}
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

        {/* Sidebar for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile={true}
            />
          )}
        </AnimatePresence>

        {/* Main Profile Content */}
        <div className="flex-1 p-4 mt-6 lg:ml-64">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Company Info */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-2/3 bg-white rounded-md shadow-md p-6"
            >
              <div className="flex items-center mb-6">
                <img
                  src={logo_url || AmazonLogo}
                  alt="Company Logo"
                  className="w-12 h-12 mr-4 rounded-full border"
                />
                <div>
                  <h2 className="text-xl font-bold">{companyName || 'Company Name'}</h2>
                  {website && (
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      {website}
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <CompanyProfileForm />
            </motion.div>

            {/* Recruiter Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full lg:w-1/3 bg-white rounded-md shadow-md p-6 h-fit"
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
                <Link to="/recruiters/change-password" className="block hover:underline">
                  Change Password
                </Link>
                <Link to="/recruiters/updateRecruiter" className="block hover:underline">
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
      <a href={value} className="text-blue-500 hover:underline truncate">
        {value}
      </a>
    ) : (
      <span className="truncate">{value}</span>
    )}
  </div>
);

export default RecruiterProfile;
