import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import Sidebar from "../components/SideBar_Recr";
import AmazonLogo from "../assets/images/AmazonLogo.png";
import Notifications from "../assets/images/notifications00.png";

const UpdateRecruiter = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    companyName: "",
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate=useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth < 768;
  
  // ✅ Handle resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
const backend_url = import.meta.env.VITE_BACKEND_URL
  // ✅ Fetch recruiter profile
  useEffect(() => {
    const fetchRecruiter = async () => {
      try {
        const res = await axios.get(
          backend_url+"/recruiters/getProfile",
          { withCredentials: true }
        );
        const recruiter = res.data.recruiter;
        setFormData({
          email: recruiter.email || "",
          phone: recruiter.phone || "",
          companyName: recruiter.companyName || "",
        });
        console.log(recruiter);
      } catch (error) {
        toast.error("Failed to load recruiter details");
      }
    };
    fetchRecruiter();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Submit update
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.email || !formData.phone || !formData.companyName) {
  //     return toast.error("Please fill all required fields");
  //   }

  //   try {
  //     const data = new FormData();
  //     data.append("email", formData.email);
  //     data.append("phone", formData.phone);
  //     data.append("companyName", formData.companyName);
  //     if (file) data.append("companyPanCardOrGstFile", file);

  //   try {
  //     const res=await axios.post(
  //       backend_url+"/recruiters/update",
  //       updateData,
  //       {
  //         withCredentials: true,
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );

  //     if(res.data.success){
  //       console.log(res.data.message)
  //       toast.success("Recruiter updated successfully!");
  //       navigate("/recruiters/getProfile");
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Update failed");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.email || !formData.phone || !formData.companyName) {
    return toast.error("Please fill all required fields");
  }

  try {
    const data = new FormData();
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("companyName", formData.companyName);
    if (file) data.append("companyPanCardOrGstFile", file);

    const res = await axios.post(
      backend_url + "/recruiters/update",
      data, // fixed here
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    if (res.data.success) {
      console.log(res.data.message);
      toast.success("Recruiter updated successfully!");
      navigate("/recruiters/getProfile");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  }
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen flex flex-col"
    >
      {/* Navbar */}
      <div className="bg-[#5F9D08] text-white p-4 flex flex-wrap justify-between items-center w-full shadow-md">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <Link to="/recruiters/jobs/active">
            <img src={AmazonLogo} alt="Amazon Logo" className="w-8 h-8" />
          </Link>
        </div>
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
          <Link to="/recruiters/notifications">
            <img
              src={Notifications}
              alt="Notifications"
              className="w-8 h-8"
            />
          </Link>
          <Link to="/recruiters/jobs/active">
            <FaHome className="text-2xl w-8 h-8 cursor-pointer hover:text-gray-300" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-3xl text-[#5F9D08]"
          >
            <FiMenu />
          </button>
        </div>

        {/* Sidebar Desktop */}
        {!isMobile && (
          <div className="hidden lg:block fixed top-20 left-0 z-30">
            <Sidebar isOpen={true} isMobile={false} />
          </div>
        )}

        {/* Sidebar Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isMobile={true}
            />
          )}
        </AnimatePresence>

        {/* Main Update Form */}
        <div className="flex-1 p-6 lg:ml-64">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#5F9D08]">
              Update Recruiter Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Recruiter Info */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Recruiter Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    label="Phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>

              {/* Company Info */}
              <section>
                <h3 className="text-lg font-semibold mb-4">Company Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="Company Name"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                  {/* ✅ Document Upload */}
                  <div>
                    <label className="block font-medium mb-1">Company PAN/GST Document</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5F9D08] focus:outline-none"
                    />
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full md:w-1/2 py-3 text-white font-semibold rounded-md"
                  style={{ backgroundColor: "#5F9D08" }}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </motion.div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5F9D08] focus:outline-none"
    />
  </div>
);

export default UpdateRecruiter;
