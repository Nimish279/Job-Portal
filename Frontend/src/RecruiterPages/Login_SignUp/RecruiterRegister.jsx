import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRecruiterStore from '../../store/recruiterStore';

const RecruiterRegister = () => {
  const navigate = useNavigate();
  const { register } = useRecruiterStore();

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = {
      recruiterName: form.recruiterName.value,
      jobTitle: form.jobTitle.value,
      email: form.email.value,
      phone: form.phone.value,
      alternateContact: form.alternateContact.value,
      linkedIn: form.linkedIn.value,
      password: form.password.value,
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

    const result = await register(formData);
    if (result?.success) {
      navigate('/recruiter/dashboard');
    }
  };

  const fields = [
    { label: 'Recruiter Name', name: 'recruiterName' },
    { label: 'Job Title', name: 'jobTitle' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phone' },
    { label: 'Alternate Contact', name: 'alternateContact' },
    { label: 'LinkedIn', name: 'linkedIn' },
    { label: 'Password', name: 'password', type: 'password' },
    { label: 'Company Name', name: 'companyName' },
    { label: 'Website', name: 'website' },
    { label: 'Street', name: 'street' },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
    { label: 'Postal Code', name: 'postalCode' },
    { label: 'Industry Type', name: 'industryType' },
    { label: 'Registration Number', name: 'registrationNumber' },
    { label: 'Company PAN Number', name: 'companyPanCardNumber' }
  ];

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
        <h3 className="text-3xl text-[#5F9D08] font-semibold mb-4">Sign Up</h3>

        <div className="relative flex flex-col w-full max-w-2xl mx-6 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#5F9D08] mb-6">Recruiter Registration</h2>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            {fields.map(({ label, name, type = 'text' }, i) => (
              <div key={i} className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">{label}</label>
                <input
                  type={type}
                  name={name}
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
              <Link to="/recruiters/login" className="text-[#5F9D08] font-semibold hover:underline">
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

export default RecruiterRegister;
