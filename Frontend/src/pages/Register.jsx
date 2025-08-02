// import React, { useRef, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Logo from '../assets/images/logo.jpg';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import useUserStore from '../store/userStore.js'

// const Register = () => {
//     const navigate = useNavigate();
//     const nameRef=useRef()
//     const emailRef=useRef()
//     const passwordRef=useRef()
//     const confirmPasswordRef=useRef()
//     const { register } = useUserStore();
  

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const name=nameRef.current.value.trim()
//       const email=emailRef.current.value.trim()
//       const password=passwordRef.current.value.trim()
//       const confirmPassword=confirmPasswordRef.current.value.trim()
      
//     if (!name || !email || !password || !confirmPassword) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//       if (password !== confirmPassword) {
//         toast.error("Passwords don't match!");
//         return;
//       }
//       const result=await register({name,email,password})
//       if(result?.success){
//               navigate('/users/dashboard');
//       }
    
//     };
  
//     return (
// <div className="flex min-h-screen flex-col bg-gray-100">
//       <div className="w-full bg-[#5F9D08] text-white flex items-center justify-between p-4">
//         <div className="flex items-center">
//           <img src={Logo} alt="Job Search Logo" className="h-10 w-10 rounded-full" />
//         </div>
//         <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white text-center w-full">
//           Get Started With Your Job Search
//         </h2>
//       </div>

//       <div className="flex flex-col items-center justify-center mt-8">
//         <h3 className="text-3xl text-[#5F9D08] font-semibold mb-4">User Sign Up</h3>

//         <div className="relative flex flex-col w-full max-w-2xl mx-6 bg-white rounded-lg shadow-lg p-8">
//           <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2 text-left">Full Name</label>
//               <input
//                 type="text"
//                 ref={nameRef}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
//                 required
//               />
//             </div>
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2 text-left">Email</label>
//               <input
//                 type="email"
//                 ref={emailRef}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
//                 required
//               />
//             </div>
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2 text-left">Password</label>
//               <input
//                 type="password"
//                 ref={passwordRef}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
//                 required
//               />
//             </div>
//             <div className="mb-6 w-full">
//               <label className="block text-gray-700 mb-2 text-left">Confirm Password</label>
//               <input
//                 type="password"
//                 ref={confirmPasswordRef}
//                 className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#5F9D08] text-white p-2 rounded-[20px] hover:bg-[#0041b3] transition duration-300"
//             >
//               Register
//             </button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-700">
//               Already Registered?{' '}
//               <Link to="/users/login" className="text-[#5F9D08] font-semibold hover:underline">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//     );
// };

// export default Register









import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserStore from '../store/userStore.js';

const Register = () => {
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { register } = useUserStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (firstName.length < 3 || lastName.length < 3) {
      toast.error("Full name must be at least 3 characters long");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    const name=`${firstName} ${lastName}`
    console.log(name);
    const result = await register({ name, email, password });
    if (result?.success) {
      navigate('/users/login');
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-200 to-gray-50 justify-center items-center">
      <div className="relative flex flex-col lg:flex-row w-[90%] max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row w-[90%] mx-auto bg-white border-2-gray rounded shadow-xl min-h-[600px] justify-start">

          {/* Left green section */}
          <div className="lg:w-1/5 w-full bg-[#5F9D08] text-white flex items-center justify-center py-6 lg:py-0">
            <div className="text-center w-full px-4 py-2 md:py-0">
              <h3 className="text-xl font-semibold mb-0 md:mb-4">Join Us</h3>
              <p className="text-sm text-gray-100 hidden md:block">Start your career journey now</p>
            </div>
          </div>

          {/* Right form section */}
          <div className="w-full lg:w-5/6 p-10 max-w-md mx-auto space-y-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#5F9D08] mb-8 text-center transform transition-all duration-500 hover:scale-105">
              Sign Up
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">First Name</label>
                <input
                  type="text"
                  ref={firstNameRef}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                  required
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">Last Name</label>
                <input
                  type="text"
                  ref={lastNameRef}
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

              {/* Password Field with eye */}
              <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    ref={passwordRef}
                    className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
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

              {/* Confirm Password Field with eye */}
              <div className="mb-6 w-full">
                <label className="block text-gray-700 mb-2 text-left">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    ref={confirmPasswordRef}
                    className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                    required
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  >
                    {showConfirmPassword ? <FaEye />:<FaEyeSlash />}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5F9D08] text-white py-3 px-4 rounded-lg hover:bg-gradient-to-r from-[#5F9D08] to-[#4a7c06] transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Register
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/users/login" className="text-[#5F9D08] font-semibold hover:underline hover:text-[#00b398] transition-colors">
                  Login
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

export default Register;
