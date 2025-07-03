import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from '../store/userStore.js';


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
    const { login, loading } = useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    
    if(result.success){
      navigate('/users/dashboard')
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 justify-center items-center">
      <div className="relative flex w-full max-w-7xl">
          <div className="w-full bg-white rounded-2xl shadow-xl min-h-[600px] flex items-center justify-center">
          <div className="hidden lg:flex w-1/6 bg-[#5F9D08] text-white items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Welcome Back</h3>
              <p className="text-sm text-gray-300">Find your dream job today</p>
            </div>
          </div>
          <div className="w-full lg:w-5/6 p-10 max-w-md mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-[#5F9D08] mb-8 text-center">Login</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">Email</label>
                <input
                  type="email"
                  ref={emailRef}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                  required
                />
              </div>
              <div className="mb-6 w-full">
                <label className="block text-gray-700 mb-2 text-left">Password</label>
                <input
                  type="password"
                  ref={passwordRef}
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

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/users/register" className="text-[#5F9D08] font-semibold hover:underline hover:text-[#0041b3] transition-colors">
                  Register
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

export default Login;
