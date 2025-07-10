import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import recruiterData from '../RecruiterData/recruiterProfile.json';
import Navbar from '../Notifications/Navbar';
import CompanyProfileForm from './CompanyProfileForm';
import AmazonLogo from '../../assets/images/AmazonLogo.png';
import { motion } from 'framer-motion';

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
      className="flex flex-col lg:flex-row p-4 lg:p-8 bg-gray-100 min-h-screen"
    >
      <Navbar pageName="Company Profile" />

      {/* Left Section */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-2/3 p-4 lg:p-6 bg-white rounded-md shadow-lg mb-4 mt-10 lg:mt-4 lg:mb-0 lg:mr-6"
      >
        <div className="flex items-center mb-4">
          <img
            src={AmazonLogo}
            alt="Amazon Logo"
            className="w-12 h-12 mr-4"
          />
          <div>
            <h2 className="text-lg lg:text-xl font-bold">{"Amazon" || 'Loading...'}</h2>
            {website && (
              <a href="https://www.amazon.com" className="text-blue-500">
                {website}
              </a>
            )}
          </div>
        </div>

        <div className="text-lg font-semibold mb-4">About Us</div>

        {/* Form Fields */}
        <CompanyProfileForm />
      </motion.div>

      {/* Right Section (Recruiter Profile) */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full lg:w-1/3 p-4 lg:p-6 bg-white rounded-md shadow-lg h-auto lg:h-[500px] flex flex-col items-center sticky top-0 lg:mt-4 lg:mt-0"
      >
        <div className="text-lg lg:text-xl font-bold mb-4">Recruiter Profile</div>

        <div className="space-y-2 w-full">
          {userName && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Name:</span>
              <span className="text-gray-700">{userName}</span>
            </div>
          )}
          {email && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Email:</span>
              <span className="text-gray-700">{email}</span>
            </div>
          )}
          {designation && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Job Title:</span>
              <span className="text-gray-700">{designation}</span>
            </div>
          )}
          {linkedin && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">LinkedIn:</span>
              <span className="text-gray-700">{linkedin}</span>
            </div>
          )}
          {phone && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Phone:</span>
              <span className="text-gray-700">{phone}</span>
            </div>
          )}
          {companyName && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Company Name:</span>
              <span className="text-gray-700">{companyName}</span>
            </div>
          )}
          {website && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Website:</span>
              <a href={website} className="text-blue-500">{website}</a>
            </div>
          )}
          {address && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Address:</span>
              <span className="text-gray-700">{address}</span>
            </div>
          )}
          {industryType && (
            <div className="flex w-full">
              <span className="font-semibold mr-1">Industry Type:</span>
              <span className="text-gray-700">{industryType}</span>
            </div>
          )}
        </div>

        {/* Horizontal Line */}
        <div className="w-full h-px bg-gray-300 my-4"></div>

        {/* Clickable Text Options */}
        <div className="mt-4 space-y-2 text-gray-500 cursor-pointer text-left w-full">
          <Link to="/recruiters/change-password">
            <p className="hover:underline">Change Password</p>
          </Link>
          <Link to="/update-recruiter">
            <p className="hover:underline">Update Recruiter</p>
          </Link>
          <Link to="/recruiters/logout">
            <p className="hover:underline">Sign Out</p>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RecruiterProfile;
