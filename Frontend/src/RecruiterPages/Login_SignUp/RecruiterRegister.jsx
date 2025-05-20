import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../../assets/images/logo.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = 'http://localhost:8000/api/recruiters/register';

const RecruiterRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        recruiterName: '',
        jobTitle: '',
        email: '',
        phone: '',
        alternateContact: '',
        linkedIn: '',
        password: '',
        companyName: '',
        website: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        industryType: '',
        registrationNumber: '',
        companyPanCardNumber: ''
    });
    
    // const [companyLogo, setCompanyLogo] = useState(null);
    // const [companyPanCarFile, setCompanyPanCardFile] = useState(null);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const form = new FormData();
          
          for (const key in formData) {
            form.append(key, formData[key]);
          }
          // form.append('companyLogo', companyLogo);
          // form.append('companyPanCardFile', companyPanCardFile);
    
          const res = await fetch(baseUrl, {
            method: 'POST',
            body: form
          });
    
          const data = await res.json();
          // console.log(data);
          if (res.ok) {
            toast.success('Recruiter registered successfully!');
            navigate('/recruiter/dashboard');
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
            <h3 className="text-3xl text-[#5F9D08] font-semibold mb-4">Sign Up</h3>

            <div className="relative flex flex-col w-full max-w-2xl mx-6 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-[#5F9D08] mb-6">Recruiter Registration</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
              {[
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
                { label: 'Company PAN Number', name: 'companyPanCardNumber' },
              ].map(({ label, name, type = 'text' }, i) => (
                <div key={i} className="mb-4 w-full">
                  <label className="block text-gray-700 mb-2 text-left">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                    
                  />
                </div>
              ))}

              {/* File Inputs */}
              {/* <div className="mb-4 w-full">
                <label className="block text-gray-700 mb-2 text-left">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setCompanyLogo)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                  
                />
              </div> */}

              {/* <div className="mb-6 w-full">
                <label className="block text-gray-700 mb-2 text-left">Company PAN Card File</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFileChange(e, setCompanyPanCardFile)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5F9D08]"
                  
                />
              </div> */}

              <button
                type="submit"
                className="w-full bg-[#5F9D08] text-white p-2 rounded-[20px] hover:bg-[#0041b3] transition duration-300"
              >
                Register
              </button>
            </form>
                
                 {/* "Already Registered? Login" Link */}
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