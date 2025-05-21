import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobData from '../components/jobData.json';
import Navbar from '../components/Header/Navbar';
import amazonLogo from '../assets/images/amazon-logo.svg';
import pdfIcon from '../assets/images/pdf00.png';

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
    <div className="flex min-h-screen pt-10 bg-gray-100">
      <Navbar pageName={"Job Page"}/>

      <div className="flex flex-col w-full p-6 bg-transparent">
        <div className="border-t border-gray-400 mb-4"></div>
        <div className="flex items-center mb-2">
          <img src={amazonLogo} alt="Amazon Logo" className="w-10 h-10 mr-2 rounded-lg object-cover" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-gray-900">{job.company} | {job.location} | {job.type}</p>
          </div>
          <a 
            href={job.link} 
            className="mt-2 ml-auto block text-sm text-white bg-[#5F9D08] px-3 py-1.5 rounded-full hover:bg-gray-600"
          >
            Apply Now
          </a>
        </div>

        <div className="flex justify-between mb-2">
          <span onClick={() => handleSectionChange('description')} className="cursor-pointer hover:text-[#5F9D08] ml-10">Job Description</span>
          <span onClick={() => handleSectionChange('workflow')} className="cursor-pointer hover:text-[#5F9D08]">Hiring Workflow</span>
          <span onClick={() => handleSectionChange('eligibility')} className="cursor-pointer hover:text-[#5F9D08] mr-10">Eligibility Criteria</span>
        </div>

        <div className="flex justify-start mb-4">
          {activeSection === 'description' && (
            <div className="border-t border-[#5F9D08] h-2 w-1/3" />
          )}
          {activeSection === 'workflow' && (
            <div className="border-t border-[#5F9D08] h-2 w-1/3" />
          )}
          {activeSection === 'eligibility' && (
            <div className="border-t border-[#5F9D08] h-2 w-1/3" />
          )}
        </div>

        {activeSection === 'description' && (
          <div>
            <p className="font-bold">Job Overview</p>
            <p className="text-sm mt-2 pl-4"><span className="text-gray-800">Job Role:</span> {job.jobRole}</p>
            <p className="text-sm pl-4"><span className="text-gray-800">Skills Required:</span> {job.skillsRequired}</p>
            <p className="text-sm pl-4"><span className="text-gray-800">Job Profile CTC:</span> {job.ctc}</p>
            <p className="mt-2 font-bold">Job Description:</p>
            <p className="text-sm mt-2 pl-4">
              {job.description.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
            <div className="mt-2">
              <p className="mt-4 font-bold">Attached Documents:</p>
              <p className="text-sm pl-4">
                <a href="/path/to/your/document.pdf" target="_blank" rel="noopener noreferrer">
                  <img src={pdfIcon} alt="PDF Icon" className="w-10 h-10 inline" />
                </a>
              </p>
            </div>
          </div>
        )}

        {activeSection === 'workflow' && (
          <div>
            <p className="mt-4 font-bold">Hiring Workflow:</p>
            <div className="flex space-x-4 mt-4">
              {workflowSteps.map((step, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-full ${job.status > index ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'eligibility' && (
          <div>
            <p className="mt-4 font-bold">Eligibility Criteria:</p>
            <p className="text-sm pl-4">Details about the eligibility criteria will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPage;
