import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../store/userStore.js'

const Register = () => {
    const navigate = useNavigate();
    const nameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const confirmPasswordRef=useRef()
    const { register } = useUserStore();
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const name=nameRef.current.value.trim()
      const email=emailRef.current.value.trim()
      const password=passwordRef.current.value.trim()
      const confirmPassword=confirmPasswordRef.current.value.trim()
      
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

      if (password !== confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }
      const result=await register({name,email,password})
      if(result?.success){
              navigate('/users/dashboard');
      }
    
    };
  
    return (
<div className="flex min-h-screen flex-col bg-gray-100">
      <div className="w-full bg-[#5F9D08] text-white flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src={Logo} alt="Job Search Logo" className="h-10 w-10 rounded-full" />
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white text-center w-full">
          Get Started With Your Job Search
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <h3 className="text-3xl text-[#5F9D08] font-semibold mb-4">User Sign Up</h3>

        <div className="relative flex flex-col w-full max-w-2xl mx-6 bg-white rounded-lg shadow-lg p-8">
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2 text-left">Full Name</label>
              <input
                type="text"
                ref={nameRef}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2 text-left">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2 text-left">Password</label>
              <input
                type="password"
                ref={passwordRef}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                required
              />
            </div>
            <div className="mb-6 w-full">
              <label className="block text-gray-700 mb-2 text-left">Confirm Password</label>
              <input
                type="password"
                ref={confirmPasswordRef}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5F9D08] text-white p-2 rounded-[20px] hover:bg-[#0041b3] transition duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Already Registered?{' '}
              <Link to="/users/login" className="text-[#5F9D08] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    );
};

export default Register