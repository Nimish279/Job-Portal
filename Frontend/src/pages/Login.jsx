import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // make sure to include this if you're dealing with cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful!");

        // Optionally store token in localStorage if not using HttpOnly cookie
        // localStorage.setItem("token", data.token);

        navigate("/users/dashboard");
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center">
      <div className="relative flex w-full max-w-7xl mt-24 mb-24 lg:mr-96">
        <div className="w-full bg-white rounded-lg shadow-lg min-h-[600px] flex">
          <div className="hidden lg:flex w-1/6 bg-[#5F9D08] text-white items-center justify-center h-full">
            {/* Placeholder */}
          </div>
          <div className="w-full lg:w-5/6 p-8">
            <h2 className="text-2xl font-bold text-[#5F9D08] mb-6 text-center">Login</h2>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
                className="w-full bg-[#5F9D08] text-white p-2 rounded hover:bg-[#0041b3] transition duration-300"
              >
                Login
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-700">
                Don't have an account?{' '}
                <Link to="/users/register" className="text-[#5F9D08] font-semibold hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
