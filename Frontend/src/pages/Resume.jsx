import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UserNavbar from '../components/Header/UserNavbar';
import Sidebar from '../components/SideBar';
import { FiMenu } from 'react-icons/fi';
import NavSearchBar from '../components/Header/NavSearchBar';
import axios from 'axios'; // Make sure this is at the top if not already

const Resume = () => {
  const [pdfs, setPdfs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPdf, setNewPdf] = useState({ fileName: '', file: null });
  const [showDropdownIndex, setShowDropdownIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  // Handle showing the modal
  const toggleModal = () => setShowModal(!showModal);

  // Handle file input changes
  const handleFileChange = (e) => {  //file size restriciton and docs pdf only allowed (tushar-feature)
  const file = e.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/msword",               // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
  ];

  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.type)) {
    alert("Invalid file type. Only PDF, DOC, or DOCX files are allowed.");
    return;
  }

  if (file.size > maxSize) {
    alert("File size exceeds 2MB. Please upload a smaller file.");
    return;
  }

  setNewPdf({ ...newPdf, file });
};


  // Handle file name change
  const handleNameChange = (e) => {
    setNewPdf({ ...newPdf, fileName: e.target.value });
  };

  // Upload PDF
  // Download and View PDF - By Wafiya Shaikh this is old code store resume on local storage re-correct by mukund
  // const handleUpload = () => {
  //   if (newPdf.file && newPdf.fileName) {
  //     const url = URL.createObjectURL(newPdf.file);
  //     const pdfData = {
  //       fileName: newPdf.fileName,
  //       file: newPdf.file,
  //       url,
  //     }
  //     setPdfs([...pdfs, pdfData]);
  //     setNewPdf({ fileName: '', file: null });
  //     toggleModal();
  //   }
  // };

const backend_url = import.meta.env.VITE_BACKEND_URL
const handleUpload = async () => {
  if (newPdf.file) {
    try {
      const formData = new FormData();
      formData.append("resume", newPdf.file);

      await axios.post(backend_url+"/upload/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true // ✅ Required for cookie-based auth
      });

      // Optional: Add response to local list (assuming server returns file info)
      const uploadedPdf = {
        fileName: newPdf.fileName,
        file: newPdf.file,
        url: URL.createObjectURL(newPdf.file)
      };
      setPdfs([...pdfs, uploadedPdf]);

      setNewPdf({ fileName: '', file: null });
      toggleModal();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload resume. Please try again.");
    }
  }
};
useEffect(() => {
  const fetchResumes = async () => {   //Fetching resume as soon as the page opens (By Tushar)
    try {
      const response = await axios.get(backend_url+"/upload/resume", {
        withCredentials: true,
      });

      const fetchedResumes = response.data.resumes.map(r => ({
        fileName: r.fileName,
        url: r.fileUrl,
        publicId: r.publicId,
      }));

      setPdfs(fetchedResumes);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    }
  };

  fetchResumes();
},[pdfs]);






  // // Delete PDF
  // const handleDelete = (index) => {
  //   const updatedPdfs = [...pdfs];
  //   updatedPdfs.splice(index, 1);
  //   setPdfs(updatedPdfs);
  //   setShowDropdownIndex(null); // Close dropdown after deletion
  // };


const handleDelete = async (index) => {
  const resumeToDelete = pdfs[index];
  const publicId = resumeToDelete.publicId;

  if (!publicId) {
    console.warn("No publicId found.");
    return;
  }

  try {
    await axios.delete(`${backend_url}/upload/resume/${encodeURIComponent(publicId)}`, {
      withCredentials: true,
    });

    setPdfs(prev => prev.filter((_, i) => i !== index));
    setShowDropdownIndex(null);
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete resume");
  }
};


  // Toggle Dropdown
  const toggleDropdown = (index) => {
    setShowDropdownIndex(showDropdownIndex === index ? null : index);
  };
  useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const isMobile = window.innerWidth < 768;

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Navbar */}
      <NavSearchBar
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        showHamburger={true}
      />
      <div className='flex flex-row min-h-screen'>
      
    

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
      
      <motion.div 
        className="w-full mx-6 mt-6 p-4 lg:ml-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        {/* Title and Add New Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-[#5F9D08] pl-3">My Resume</h2>
            <p className="text-gray-600 mt-2 pl-4">Manage your resume documents for job applications</p>
          </motion.div>
          
          <motion.button
            onClick={toggleModal}
            className="flex items-center bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-white px-5 py-2.5 rounded-lg mt-4 md:mt-0 font-medium shadow-sm hover:shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Resume
          </motion.button>
        </div>

      {/* PDF List */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {pdfs.length > 0 ? (
          pdfs.map((pdfItem, index) => (
            <motion.div 
              key={index} 
              className="relative p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center">
                <div className="bg-green-50 p-3 rounded-lg mr-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#5F9D08]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 truncate max-w-[150px]">{pdfItem.fileName}</p>
                  <p className="text-xs text-gray-500 mt-1">PDF Document</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <a 
                href = {pdfItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5F9D08] text-sm font-medium hover:underline flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </a>
                {/*Updated logic for viewing the pdf - Wafiya Shaikh */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              
              <AnimatePresence>
                {showDropdownIndex === index && (
                  <motion.div 
                    className="absolute right-2 top-16 bg-white border rounded-lg shadow-lg z-10 py-1 w-32"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={pdfItem.url}
                      download={pdfItem.fileName}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(index)}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#5F9D08]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No resumes uploaded yet</h3>
            <p className="text-gray-600 mb-6">Upload your resume to apply for jobs more quickly</p>
            <motion.button
              onClick={toggleModal}
              className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Upload Resume
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Modal for Upload */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            onClick={toggleModal}
          >
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Upload Resume</h3>
                <button 
                  onClick={toggleModal}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                  <input
                    type="text"
                    placeholder="Enter a name for your resume"
                    value={newPdf.fileName}
                    onChange={handleNameChange}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F9D08] focus:border-transparent transition-all duration-200"
                  />
                </div> */}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select PDF File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#5F9D08] transition-colors duration-200">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600">
                        {newPdf.file ? newPdf.file.name : 'Click to select or drag and drop your PDF file'}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">PDF files only, max 5MB</p>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  onClick={toggleModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  onClick={handleUpload}
                  className="bg-gradient-to-r from-[#5F9D08] to-[#4A8B07] text-white px-5 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!newPdf.file}
                >
                  Upload Resume
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
      </div>
    </div>
  );
};

export default Resume;
