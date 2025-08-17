import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRecruiterStore from '../../store/recruiterStore.js'
const RecruiterLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useRecruiterStore();
  
    const handleSubmit = async (e) => {  // jisne bhi phele likha tha bhai recruiterStore bhi dekh liya kr
      e.preventDefault();
      if (password.length < 6) {
          toast.error("Password must be at least 6 characters.");
          return;
        }

      const result = await login({ email, password });
      
        if (result.success) {
          navigate("/recruiters/jobs/active");
        } else {
          toast.error(result.message || "Login failed");
        }  
      
    };
  
    return (
      <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 justify-center items-center">
        <div className="relative flex w-full max-w-7xl">
          <div className="w-full bg-white rounded-2xl shadow-xl min-h-[600px] flex items-center justify-center">
            <div className="hidden lg:flex w-1/4 bg-[#5F9D08] text-white items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Welcome Back</h3>
                <p className="text-sm text-gray-300">Manage your job postings</p>
              </div>
            </div>
            <div className="w-full lg:w-3/4 p-10 max-w-md mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-[#5F9D08] mb-8 text-center">Recruiter Login</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 mb-2 text-left">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                    required
                  />
                </div>
                <div className="mb-6 w-full">
                  <label className="block text-gray-700 mb-2 text-left">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#5F9D08] text-white py-3 px-4 rounded-lg hover:bg-[#0041b3] transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Login
                </button>
              </form>

              {/* Links for Registration and Forgot Password */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/recruiters/register" className="text-[#5F9D08] font-semibold hover:underline hover:text-[#0041b3] transition-colors">
                    Register
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <Link to="/recruiters/change-password" className="text-[#5F9D08] font-semibold hover:underline hover:text-[#0041b3] transition-colors">
                    Forgot Password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" theme="colored" />
      </div>
    );
};

export default RecruiterLogin