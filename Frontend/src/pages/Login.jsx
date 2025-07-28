import React, { useRef,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserStore from "../store/userStore.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login, loading } = useUserStore();
  const[showPassword, setShowPassword] = useState(false);
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const result = await login({
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   });

  //   if (result.success) {
  //     navigate("/users/dashboard");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  const email = emailRef.current.value.trim();
  const password = passwordRef.current.value;

  // Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  // Password length check
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return;
  }

  // Proceed to login if validations pass
  const result = await login({ email, password });

  if (result.success) {
    navigate("/users/dashboard");
  } else {
    toast.error(result.message || "Login failed");
  }
};


  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-200 to-gray-50 justify-center items-center">
      {/* <div className="relative flex w-full max-w-7xl"> */}
      <div className="relative flex flex-col lg:flex-row w-[90%] max-w-7xl mx-auto">
        {/* <div className="w-[80%] mx-auto bg-white border-2-gray rounded shadow-xl min-h-[600px] flex items-center justify-center"> */}
        <div className="flex flex-col lg:flex-row w-[90%] mx-auto bg-white border-2-gray rounded shadow-xl min-h-[600px] justify-start">
          {/* <div className="hidden lg:flex w-1/6 bg-[#5F9D08] text-white items-center justify-center h-full"> */}
          {/* <div className="hidden lg:flex lg:w-1/5 w-full bg-[#5F9D08] text-white items-center justify-center lg:h-full py-6 lg:py-0"> */}
          <div className="lg:w-1/5 w-full bg-[#5F9D08] text-white flex items-center justify-center py-6 lg:py-0">
            <div className="text-center w-full px-4 py-2 md:py-0">
              <h3 className="text-xl font-semibold mb-0 md:mb-4">Welcome Back</h3>
              <p className="text-sm text-gray-100 hidden md:block">Find your dream job today</p>
            </div>
          </div>
          <div className="w-full lg:w-5/6 p-10 max-w-md mx-auto space-y-6 flex flex-col justify-center">
            {/* <h2 className="text-3xl font-bold text-[#5F9D08] mb-8 text-center">Login</h2> */}
            <h2 className="text-3xl font-bold text-[#5F9D08] mb-8 text-center transform transition-all duration-500 opacity-100 scale-100 hover:scale-105">
              Login
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">
                  Email
                </label>
                <input
                  type="email"
                  ref={emailRef}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                  required
                />
              </div>
              <div className="mb-6 w-full">
                <label className="block text-gray-700 mb-2 text-left">
                  Password
                </label>
                <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                  required
                />
                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                  >
                                    {showPassword ?  <FaEye />:<FaEyeSlash /> }
                                  </span>
                                  </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#5F9D08] text-white py-3 px-4 rounded-lg hover:bg-gradient-to-r from-[#5F9D08] to-[#4a7c06] transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/users/register"
                  className="text-[#5F9D08] font-semibold hover:underline hover:text-[#00b398] transition-colors"
                >
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
