import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/images/logo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = 'http://localhost:8000/api/users/register';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }
  
      try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success('User registered successfully!');
          navigate('/user/dashboard');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
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
                {[
                { label: 'Full Name', name: 'name', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
                ].map(({ label, name, type }) => (
                <div className="mb-4 w-full" key={name}>
                    <label className="block text-gray-700 mb-2 text-left">{label}</label>
                    <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                    />
                </div>
                ))}

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