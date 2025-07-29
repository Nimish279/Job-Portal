import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useRecruiterStore from '../../store/recruiterStore';
import Logo from '../../assets/images/logo.jpg';

const RecruiterRegister = () => {
  const navigate = useNavigate();
  const { register } = useRecruiterStore();

  const formRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;

    const formData = {
      recruiterName: form.recruiterName.value,
      jobTitle: form.jobTitle.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      alternateContact: form.alternateContact.value,
      linkedIn: form.linkedIn.value,
      companyName: form.companyName.value,
      website: form.website.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      postalCode: form.postalCode.value,
      industryType: form.industryType.value,
      registrationNumber: form.registrationNumber.value,
      companyPanCardNumber: form.companyPanCardNumber.value,
    };

    if (!formData.recruiterName || !formData.email || !formData.password) {
      toast.error("Please fill all required fields.");
      return;
    }

    const result = await register(formData);
    if (result?.success) {
      navigate('/recruiters/jobs/active');
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  const fields = [
    { label: 'Recruiter Name', name: 'recruiterName' },
    { label: 'Job Title', name: 'jobTitle' },
    { label: 'Phone', name: 'phone' },
    { label: 'Alternate Contact', name: 'alternateContact' },
    { label: 'LinkedIn', name: 'linkedIn' },
    { label: 'Company Name', name: 'companyName' },
    { label: 'Website', name: 'website' },
    { label: 'Street', name: 'street' },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
    { label: 'Postal Code', name: 'postalCode' },
    { label: 'Industry Type', name: 'industryType' },
    { label: 'Registration Number', name: 'registrationNumber' },
    { label: 'Company PAN Number', name: 'companyPanCardNumber' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-200 to-gray-50 justify-center items-center px-4 py-16 ">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 bg-[#5F9D08] text-white flex flex-col justify-center items-center py-8">
          
          <h3 className="text-xl font-semibold">Company Panel</h3>
          <p className="text-sm text-gray-200 text-center mt-2 px-4">Start hiring the right candidates now.</p>
        </div>

        {/* Right Form Section */}
        <div className="w-full lg:w-3/4 p-8">
          <h2 className="text-3xl font-bold text-[#5F9D08] mb-6 text-center">Company Registration</h2>

          <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Company Email</label>
              <input
                type="email"
                name="email"
                required
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
              />
            </div>

            {/* Password with eye icon */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Other fields */}
            {fields.map(({ label, name, type = 'text' }, i) => (
              <div key={i} className="flex flex-col">
                <label className="text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  required
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                />
              </div>
            ))}

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-[#5F9D08] text-white py-3 rounded-lg hover:bg-gradient-to-r from-[#5F9D08] to-[#4a7c06] transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
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
