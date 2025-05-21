import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobData from '../components/jobData.json';
import Navbar from '../RecruiterPages/Notifications/Navbar';
import amazonLogo from '../assets/images/amazon-logo.svg';
import pdfIcon from '../assets/images/pdf00.png';
import { motion } from 'framer-motion';

const JobPage = () => {
  const { id } = useParams();
  const job = jobData.find((job) => job.id === parseInt(id));
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState('description');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  if (!job) {
    return <div>Job not found.</div>;
  }

  const workflowSteps = [
    "Application",
    "Resume Shortlisting",
    "Written Test",
    "HR Interview",
    "Offer"
  ];

  return (
    <div className="flex min-h-screen pt-10 bg-gray-50">
      <Navbar pageName={"Job Page"}/>

      <motion.div 
        className="flex flex-col w-full p-6 bg-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-t border-gray-300 mb-4"></div>
        <div className="flex flex-wrap md:flex-nowrap items-center mb-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="bg-white p-2 rounded-lg shadow-sm mr-4 flex items-center justify-center">
            <img src={amazonLogo} alt="Amazon Logo" className="w-14 h-14 object-contain" />
          </div>
          <div className="flex flex-col flex-grow">
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-[#5F9D08] font-medium">{job.company}</p>
            <p className="text-gray-600 text-sm mt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>{job.location}</span> | 
              <span className="inline-flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mx-1"></span>{job.type}</span>
            </p>
          </div>
          <motion.a 
            href={job.link} 
            className="mt-2 md:mt-0 ml-auto block text-sm text-white bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] px-4 py-2 rounded-lg font-medium hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.a>
        </div>

        <div className="flex justify-between mb-2 bg-white rounded-lg shadow-sm p-2">
          <span 
            onClick={() => handleSectionChange('description')} 
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'description' ? 'bg-[#5F9D08] text-white font-medium' : 'hover:bg-green-50 hover:text-[#5F9D08]'}`}
          >
            Job Description
          </span>
          <span 
            onClick={() => handleSectionChange('workflow')} 
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'workflow' ? 'bg-[#5F9D08] text-white font-medium' : 'hover:bg-green-50 hover:text-[#5F9D08]'}`}
          >
            Hiring Workflow
          </span>
          <span 
            onClick={() => handleSectionChange('eligibility')} 
            className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'eligibility' ? 'bg-[#5F9D08] text-white font-medium' : 'hover:bg-green-50 hover:text-[#5F9D08]'}`}
          >
            Eligibility Criteria
          </span>
        </div>

        <div className="mb-4"></div>

        {activeSection === 'description' && (
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Job Overview</h3>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap md:flex-nowrap mb-2">
                <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Job Role:</div>
                <div className="w-full md:w-2/3 text-gray-800">{job.jobRole}</div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap mb-2">
                <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Skills Required:</div>
                <div className="w-full md:w-2/3 text-gray-800">
                  {job.skillsRequired.split(',').map((skill, index) => (
                    <span key={index} className="inline-block bg-green-100 text-[#5F9D08] px-2 py-1 rounded-full text-xs mr-2 mb-2">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Job Profile CTC:</div>
                <div className="w-full md:w-2/3 text-gray-800 font-medium">{job.ctc}</div>
              </div>
            </div>
            
            <h3 className="mt-6 font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Job Description</h3>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed">
              {job.description.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Attached Documents</h3>
              <div className="mt-4 flex items-center">
                <a 
                  href="/path/to/your/document.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300"
                >
                  <img src={pdfIcon} alt="PDF Icon" className="w-10 h-10" />
                  <span className="ml-3 text-gray-700 hover:text-[#5F9D08]">Job Description Document</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'workflow' && (
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Hiring Workflow</h3>
            <div className="mt-6 px-4">
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>
                
                {/* Steps */}
                {workflowSteps.map((step, index) => (
                  <div key={index} className="relative z-10 flex items-center mb-8">
                    <div className="flex-1 flex justify-end pr-4 md:pr-12">
                      <div className="text-right">
                        <h4 className="font-medium text-gray-800">{step}</h4>
                        <p className="text-sm text-gray-500">Step {index + 1}</p>
                      </div>
                    </div>
                    <div 
                      className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md z-10 ${job.status > index ? 'bg-[#5F9D08] text-white' : 'bg-white border-2 border-gray-300 text-gray-500'}`}
                    >
                      {job.status > index ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 pl-4 md:pl-12">
                      <div className={`text-sm ${job.status > index ? 'text-[#5F9D08]' : 'text-gray-500'}`}>
                        {job.status > index ? 'Completed' : job.status === index ? 'In Progress' : 'Pending'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'eligibility' && (
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Eligibility Criteria</h3>
            <div className="mt-4 bg-gray-50 p-5 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Education</h4>
                    <p className="text-gray-600 text-sm mt-1">Bachelor's degree in Computer Science, Information Technology, or related field</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Experience</h4>
                    <p className="text-gray-600 text-sm mt-1">Minimum 2 years of experience in a similar role</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Skills</h4>
                    <p className="text-gray-600 text-sm mt-1">Proficiency in required technical skills as mentioned in the job description</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Other Requirements</h4>
                    <p className="text-gray-600 text-sm mt-1">Excellent communication skills, problem-solving abilities, and team collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default JobPage;
