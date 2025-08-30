// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate,useLocation } from 'react-router-dom';
// // import jobData from '../components/jobData.json';
// // import savedJobsData from '../data/saved.json';
// import UserNavbar from '../components/Header/UserNavbar';
// import amazonLogo from '../assets/images/amazon-logo.svg';
// import pdfIcon from '../assets/images/pdf00.png';
// import { motion, AnimatePresence } from 'framer-motion';
// import JobApplicationForm from '../components/JobApplicationForm';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NavSearchBar from '../components/Header/NavSearchBar';
// import Sidebar from '../components/SideBar';
// import useUserStore from '../store/userStore';
// const JobPage = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const loc=useLocation();
  
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [activeSection, setActiveSection] = useState('description');
//   const [showApplicationForm, setShowApplicationForm] = useState(false);
//   const [isApplied, setIsApplied] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const [resumeFile, setResumeFile] = useState(null);
//   // const [resumeName, setResumeName] = useState('');
//   // const [isSubmitting, setIsSubmitting] = useState(false);
//   // const [coverLetter, setCoverLetter] = useState('');
//   // const [formErrors, setFormErrors] = useState({});
//   // const [applicationStatus, setApplicationStatus] = useState('');
//   // const [isSaved, setIsSaved] = useState(false);
//  const applyjob = useUserStore((state) => state.applyJob);
//   // === NEW API FETCHING LOGIC ===
//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(`http://localhost:8000/api/jobs/${id}`);
//         if (!response.ok) {
//           throw new Error('Job not found');
//         }
//         const data = await response.json();
//         setJob(data);
//       } catch (err) {
//         console.error("Error fetching job details:", err);
//         setError("Job not found");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchJobDetails();
//   }, [id]);


//   // ============================
//   // Callbacks and Handlers (keep before conditional returns to follow Rules of Hooks)
//   // ============================
//   const handleSectionChange = useCallback((section) => {
//     setActiveSection(section);
//   }, []);

//   const handleApplyNow = useCallback(() => {
//     setShowApplicationForm(true);
//   }, []);

//   const handleCloseApplication = useCallback(() => {
//     setShowApplicationForm(false);
//   }, []);

//   const handleApplicationSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Basic form validation
//     const errors = {};
//     if (!resumeFile) errors.resume = 'Please upload your resume';
//     if (!coverLetter.trim()) errors.coverLetter = 'Please write a cover letter';

//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // On success
//       setIsApplied(true);
//       setShowApplicationForm(false);
//       setApplicationStatus('submitted');
//       toast.success('Application submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting application:', error);
//       toast.error('Failed to submit application. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   }, [resumeFile, coverLetter]);

//   const handleResumeChange = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setResumeFile(file);
//       setResumeName(file.name);
//       setFormErrors(prev => ({ ...prev, resume: '' }));
//     }
//   }, []);

//   const handleSaveJob = useCallback(() => {
//     setIsSaved(prev => !prev);
//     toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully!');
//   }, [isSaved]);

//   const handleSubmitApplication = async(formData) => {
//     // In a real app, you would send this data to your backend
//     await applyjob(loc.pathname.split('/').pop());
//     console.log('Application submitted:', { jobId: job?.id, ...formData });

//     toast.success('Application submitted successfully!', {
//       position: 'top-center',
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//     });

//     setShowApplicationForm(false);
//     setIsApplied(true);
//   };


//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5F9D08] mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading job details...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error || !job) {
//     const isSavedJobError = id && id.startsWith('savedJob');
    
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
//         <div className="text-center max-w-md w-full p-8 bg-white rounded-xl shadow-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             {isSavedJobError ? 'Saved Job Not Found' : 'Job Not Found'}
//           </h2>
//           <p className="text-gray-600 mb-6">
//             {isSavedJobError 
//               ? "This saved job might have been removed or is no longer available."
//               : "The job you're looking for might have been removed or is no longer available."
//             }
//           </p>
//           <button
//             onClick={() => navigate('/users/dashboard')}
//             className="mt-6 px-6 py-2 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4A8B07] transition-colors"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }


//   if (!job) {
//     return <div className="flex items-center justify-center h-screen">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-700">Job not found</h2>
//         <button 
//           onClick={() => navigate('/jobs')} 
//           className="mt-4 px-4 py-2 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4A8B07] transition-colors"
//         >
//           Browse Jobs
//         </button>
//       </div>
//     </div>;
//   }

//   const workflowSteps = [
//     "Application",
//     "Resume Shortlisting",
//     "Written Test",
//     "HR Interview",
//     "Offer"
//   ];
//   //do we also need to take workflowsteps from database or it will be hardcoded and this steps colors will change according to tests status

//   return (
//     <div className="flex min-h-screen pt-10 bg-gray-50">
//       <NavSearchBar
//         toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
//         showHamburger={true}
//       />  

//         {/* Sidebar for large screens */}
//         <div className="hidden lg:block mt-20 fixed top-0 left-0 min-h-screen">
//           <Sidebar isOpen={true} isMobile={false} />
//         </div>

//         {/* Sidebar for small screens (AnimatePresence handles mount/unmount) */}
//         <AnimatePresence>
//           {isSidebarOpen && (
//             <Sidebar
//               isOpen={isSidebarOpen}
//               onClose={() => setIsSidebarOpen(false)}
//               isMobile
//             />
//           )}
//         </AnimatePresence>

//       <motion.div 
//         className="flex flex-col w-full p-6 bg-transparent lg:ml-64"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="border-t border-gray-300 mb-4"></div>
//         <motion.div
//         initial={{ opacity:0 }}
//         animate={{ opacity:1}}
//         transition={{ duration: 0.4}}

//         className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 mb-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">

//   {/* Company Logo */}
//   <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm">
//     <img src={amazonLogo} alt={`${job.company} Logo`} className="w-16 h-16 object-contain" />
//   </div>

//   {/* Job Info */}
//   <div className="flex-grow flex flex-col gap-1">
//     <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{job.title}</h2>
//     <p className="text-[#5F9D08] font-medium text-base sm:text-lg">{job.company}</p>

//     {/* Job Meta */}
//     <div className="flex flex-wrap items-center gap-4 mt-2">
//       {/* Location */}
//       <span className="inline-flex items-center text-sm text-gray-600">
//         <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//         </svg>
//         {job.location}
//       </span>

//       {/* Type */}
//       <span className="inline-flex items-center text-sm text-gray-600">
//         <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
//         </svg>
//         {job.type}
//       </span>

//       {/* Salary */}
//       {job.salary && (
//         <span className="inline-flex items-center text-sm text-gray-600">
//           <svg className="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           {job.salary}
//         </span>
//       )}

//       {/* Deadline */}
//       {job.deadline && (
//         <span className="inline-flex items-center text-sm text-gray-600">
//           <svg className="w-4 h-4 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//           </svg>
//           Apply by {new Date(job.deadline).toLocaleDateString()}
//         </span>
//       )}
//     </div>
//   </div>

//   {/* Apply Button */}
//   <motion.button
//     onClick={handleApplyNow}
//     disabled={isApplied}
//     className={`w-full md:w-auto mt-4 md:mt-0 px-6 py-3 text-sm font-medium text-white rounded-lg transition-colors hover:shadow-lg ${
//       isApplied
//         ? 'bg-gray-400 cursor-not-allowed'
//         : 'bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] hover:from-[#4A8B07] hover:to-[#3A7A00]'
//     }`}
//     whileHover={!isApplied ? { scale: 1.05 } : {}}
//     whileTap={!isApplied ? { scale: 0.95 } : {}}
//   >
//     {isApplied ? 'Applied ✓' : 'Apply Now'}
//   </motion.button>
// </motion.div>


//         <motion.div 
//         initial={{y:20, opacity:0 }}
//         animate={{y:0, opacity:1}}
//         transition={{ duration: 0.5,ease:'easeInOut' }}
//         className="flex justify-between mb-2 bg-white rounded-lg shadow-sm p-2">
//           <span 
//             onClick={() => handleSectionChange('description')} 
//             className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'description' ? 'bg-[#5F9D08] text-white font-medium' : 'hover:bg-green-50 hover:text-[#5F9D08]'}`}
//           >
//             Job Description
//           </span>
//           <span 
//             onClick={() => handleSectionChange('workflow')} 
//             className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'workflow' ? 'bg-[#5F9D08] text-white font-medium' : 'hover:bg-green-50 hover:text-[#5F9D08]'}`}
//           >
//             Hiring Workflow
//           </span>
//           <span 
//             onClick={() => handleSectionChange('eligibility')} 
//             className={`cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${activeSection === 'eligibility' ? 'bg-[#5F9D08] text-white font-medium' : 'hover:bg-green-50 hover:text-[#5F9D08]'}`}
//           >
//             Eligibility Criteria
//           </span>
//         </motion.div>
//         <div className="mb-4"></div>

//         {activeSection === 'description' && (
//           <motion.div 
//             className="bg-white p-6 rounded-xl shadow-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Job Overview</h3>
//             <div className="mt-4 bg-gray-50 p-4 rounded-lg">
//               <div className="flex flex-wrap md:flex-nowrap mb-2">
//                 <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Job Role:</div>
//                 <div className="w-full md:w-2/3 text-gray-800">{job.jobRole}</div>
//               </div>
//               <div className="flex flex-wrap md:flex-nowrap mb-2">
//                 <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Skills Required:</div>
//                 <div className="w-full md:w-2/3 text-gray-800">
//                   {job.skillsRequired.split(',').map((skill, index) => (
//                     <span key={index} className="inline-block bg-green-100 text-[#589207] px-2 py-1 rounded-full text-xs mr-2 mb-2">
//                       {skill.trim()}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex flex-wrap md:flex-nowrap">
//                 <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Job Profile CTC:</div>
//                 <div className="w-full md:w-2/3 text-gray-800 font-medium">{job.ctc}</div>
//               </div>
//             </div>
            
//             <h3 className="mt-6 font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Job Description</h3>
//             <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed">
//               {job.description.split('\n').map((line, index) => (
//                 <p key={index} className="mb-2">{line}</p>
//               ))}
//             </div>
            
//             <div className="mt-6">
//               <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Attached Documents</h3>
//               <div className="mt-4 flex items-center">
//                 <a 
//                   href="/path/to/your/document.pdf" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="flex items-center bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300"
//                 >
//                   <img src={pdfIcon} alt="PDF Icon" className="w-10 h-10" />
//                   <span className="ml-3 text-gray-700 hover:text-[#5F9D08]">Job Description Document</span>
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {activeSection === 'workflow' && (
//           <motion.div 
//             className="bg-white p-6 rounded-xl shadow-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Hiring Workflow</h3>
//             <div className="mt-6 px-4">
//               <div className="relative">
//                 {/* Connecting line */}
//                 <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>
                
//                 {/* Steps */}
//                 {workflowSteps.map((step, index) => (
//                   <div key={index} className="relative z-10 flex items-center mb-8">
//                     <div className="flex-1 flex justify-end pr-4 md:pr-12">
//                       <div className="text-right">
//                         <h4 className="font-medium text-gray-800">{step}</h4>
//                         <p className="text-sm text-gray-500">Step {index + 1}</p>
//                       </div>
//                     </div>
//                     <div 
//                       className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md z-10 ${job.status > index ? 'bg-[#5F9D08] text-white' : 'bg-white border-2 border-gray-300 text-gray-500'}`}
//                     >
//                       {job.status > index ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       ) : (
//                         <span>{index + 1}</span>
//                       )}
//                     </div>
//                     <div className="flex-1 pl-4 md:pl-12">
//                       <div className={`text-sm ${job.status > index ? 'text-[#5F9D08]' : 'text-gray-500'}`}>
//                         {job.status > index ? 'Completed' : job.status === index ? 'In Progress' : 'Pending'}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {activeSection === 'eligibility' && (
//           <motion.div 
//             className="bg-white p-6 rounded-xl shadow-sm"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Eligibility Criteria</h3>
//             <div className="mt-4 bg-gray-50 p-5 rounded-lg">
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800">Education</h4>
//                     <p className="text-gray-600 text-sm mt-1">Bachelor's degree in Computer Science, Information Technology, or related field</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800">Experience</h4>
//                     <p className="text-gray-600 text-sm mt-1">Minimum 2 years of experience in a similar role</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800">Skills</h4>
//                     <p className="text-gray-600 text-sm mt-1">Proficiency in required technical skills as mentioned in the job description</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-[#5F9D08] rounded-full p-1 mr-3 mt-1">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800">Other Requirements</h4>
//                     <p className="text-gray-600 text-sm mt-1">Excellent communication skills, problem-solving abilities, and team collaboration</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Application Form Modal */}
//         <AnimatePresence>
//           {showApplicationForm && (
//             <JobApplicationForm 
//               job={job} 
//               onClose={handleCloseApplication} 
//               onSubmit={handleSubmitApplication}
//             />
//           )}
//         </AnimatePresence>
        
//         {/* Toast Notifications */}
//         <ToastContainer />
//       </motion.div>
//     </div>
//   );
// };

// export default JobPage;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import UserNavbar from '../components/Header/UserNavbar';
import amazonLogo from '../assets/images/amazon-logo.svg';
import pdfIcon from '../assets/images/pdf00.png';
import { motion, AnimatePresence } from 'framer-motion';
import JobApplicationForm from '../components/JobApplicationForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavSearchBar from '../components/Header/NavSearchBar';
import Sidebar from '../components/SideBar';
import useUserStore from '../store/userStore';

const JobPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loc = useLocation();

  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [activeSection, setActiveSection] = useState('description');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const applyjob = useUserStore((state) => state.applyJob);
const backend_url = import.meta.env.VITE_BACKEND_URL
  // === NEW API FETCHING LOGIC ===
  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backend_url}/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Job not found");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobDetails();
  }, [id]);

  // ============================
  // Callbacks and Handlers (kept here as they are independent)
  // ============================
  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
  }, []);

  const handleApplyNow = useCallback(() => {
    setShowApplicationForm(true);
  }, []);

  const handleCloseApplication = useCallback(() => {
    setShowApplicationForm(false);
  }, []);

  const handleSubmitApplication = async (formData) => {
    // In a real app, you would send this data to your backend
    await applyjob(loc.pathname.split('/').pop());
    console.log('Application submitted:', { jobId: job?.id, ...formData });

    toast.success('Application submitted successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setShowApplicationForm(false);
    setIsApplied(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#5F9D08] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center max-w-md w-full p-8 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for might have been removed or is no longer available.</p>
          <button
            onClick={() => navigate('/users/dashboard')}
            className="mt-6 px-6 py-2 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4A8B07] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const workflowSteps = [
    "Application",
    "Resume Shortlisting",
    "Written Test",
    "HR Interview",
    "Offer"
  ];
  
  // The rest of the JSX remains the same
  return (
    <div className="flex min-h-screen pt-10 bg-gray-50">
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

      <motion.div
        className="flex flex-col w-full p-6 bg-transparent lg:ml-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="border-t border-gray-300 mb-4"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 mb-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Company Logo */}
          <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm">
            <img src={amazonLogo} alt={`${job.company} Logo`} className="w-16 h-16 object-contain" />
          </div>

          {/* Job Info */}
          <div className="flex-grow flex flex-col gap-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{job.jobRole}</h2>
            <p className="text-[#5F9D08] font-medium text-base sm:text-lg">{job.recruiter?.companyName || job.recruiter?.email}</p>

            {/* Job Meta */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              {/* Location */}
              <span className="inline-flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>

              {/* Type */}
              <span className="inline-flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M12 18h.01" />
                </svg>
                {job.jobType}
              </span>

              {/* CTC */}
              <span className="inline-flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {job.ctc} LPA
              </span>

            </div>
          </div>

          {/* Apply Button */}
          <motion.button
            onClick={handleApplyNow}
            disabled={isApplied}
            className={`w-full md:w-auto mt-4 md:mt-0 px-6 py-3 text-sm font-medium text-white rounded-lg transition-colors hover:shadow-lg ${
              isApplied
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] hover:from-[#4A8B07] hover:to-[#3A7A00]'
            }`}
            whileHover={!isApplied ? { scale: 1.05 } : {}}
            whileTap={!isApplied ? { scale: 0.95 } : {}}
          >
            {isApplied ? 'Applied ✓' : 'Apply Now'}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex justify-between mb-2 bg-white rounded-lg shadow-sm p-2"
        >
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
        </motion.div>
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
                    <span key={index} className="inline-block bg-green-100 text-[#589207] px-2 py-1 rounded-full text-xs mr-2 mb-2">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="w-full md:w-1/3 font-medium text-gray-700 mb-1 md:mb-0">Job Profile CTC:</div>
                <div className="w-full md:w-2/3 text-gray-800 font-medium">{job.ctc} LPA</div>
              </div>
            </div>

            <h3 className="mt-6 font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Job Description</h3>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-gray-700 leading-relaxed">
              {job.jobDescription?.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-xl text-gray-800 border-l-4 border-[#5F9D08] pl-3">Attached Documents</h3>
              <div className="mt-4 flex items-center">
                <a
                  href={job.link || '#'}
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
                    <p className="text-gray-600 text-sm mt-1">{job.qualifications}</p>
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
                    <p className="text-gray-600 text-sm mt-1">{job.experience}</p>
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
                    <p className="text-gray-600 text-sm mt-1">{job.eligibilityCriteria}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Application Form Modal */}
        <AnimatePresence>
          {showApplicationForm && (
            <JobApplicationForm
              job={job}
              onClose={handleCloseApplication}
              onSubmit={handleSubmitApplication}
            />
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default JobPage;