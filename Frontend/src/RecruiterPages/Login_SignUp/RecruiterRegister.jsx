import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useRecruiterStore from '../../store/recruiterStore';

const RecruiterRegister = () => {
  const navigate = useNavigate();
  const { register } = useRecruiterStore();
  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);


  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    email: '',
    panCardOrGstFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleNext = () => {
  const { companyName, phone, password, confirmPassword } = formData;
  if (!companyName || !phone || !password || !confirmPassword) {
    toast.error("Please fill all required fields in Step 1.");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  console.log("📁 File selected:", formData.panCardOrGstFile);
  console.log("📎 Is File?", formData.panCardOrGstFile instanceof File);

  setStep(2);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, panCardOrGstFile } = formData;
  if (!email || !panCardOrGstFile) {
    toast.error("Please complete all fields in Step 2.");
    return;
  }

  const combinedFormData = new FormData();
  for (const key in formData) {
    if (key === "panCardOrGstFile") {
      combinedFormData.append("panCardOrGstFile", formData.panCardOrGstFile); // important
    } else {
      combinedFormData.append(key, formData[key]);
    }
  }
  console.log("file selected:", formData.panCardOrGstFile);
console.log("isFile?", formData.panCardOrGstFile instanceof File);

  const result = await register(combinedFormData);
  if (result?.success) {
    navigate("/recruiters/login");
  } else {
    toast.error(result?.message || "Registration failed");
  }
};



  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-200 to-gray-50 justify-center items-center px-4 py-16">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl min-h-[600px] bg-white shadow-xl rounded-lg overflow-hidden">
        
        
        <div className="lg:w-1/4 bg-[#5F9D08] text-white flex flex-col justify-center items-center py-8">
          <h3 className="text-xl font-semibold">Company Panel</h3>
          <p className="text-sm text-gray-200 mt-2 text-center px-4">Step {step} of 2</p>
        </div>

        
        <div className="w-full lg:w-3/4 p-10">
          <h2 className="text-2xl font-bold text-[#5F9D08] mb-6 text-center">Company Registration</h2>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 lg:px-32">

            {step === 1 && (
              <>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Company Name<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Phone<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Password<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="p-2 pr-10 border border-gray-300 rounded w-full"
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-gray-500 cursor-pointer">
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Confirm Password<span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="p-2 pr-10 border border-gray-300 rounded w-full"
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2 text-gray-500 cursor-pointer">
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                <button type="button" onClick={handleNext} className="bg-[#5F9D08] cursor-pointer text-white py-2 rounded hover:scale-105 transition-all duration-300 hover:bg-[#4e9d08]">Next</button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Email<span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 mb-1">Upload PAN Card or GST Document<span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    name="panCardOrGstFile"
                    onChange={handleChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="p-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>

                <div className="flex justify-between gap-20 mt-4">
                  <button type="button" onClick={() => setStep(1)} className="bg-gray-300 cursor-pointer text-black py-2 px-6 rounded hover:bg-gray-400 transition-all duration-300">Previous</button>
                  <button type="submit" className="bg-[#5F9D08] text-white cursor-pointer py-2 px-6 rounded hover:scale-105 transition-all duration-300 hover:bg-[#4e9d08] w-full">Register</button>
                </div>
              </>
            )}
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-700">
              Already have an account?{' '}
              <Link to="/recruiters/login" className="text-[#5F9D08] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default RecruiterRegister;