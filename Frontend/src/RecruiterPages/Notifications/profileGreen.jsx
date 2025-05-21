import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaCaretDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileGreen = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recruiters/getProfile', {
          withCredentials: true,
        });
        const recruiter = response.data.recruiter;
        setUserName(recruiter.recruiterName);
      } catch (error) {
        toast.error("Failed to fetch recruiter details");
        console.error("Error fetching recruiter:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center">
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/recruiters/notifications">
            <FaBell className="text-2xl cursor-pointer hover:text-gray-300" style={{ color: '#5F9D08' }} />
          </Link>
        </li>
        <li>
          <FaUser className="text-2xl cursor-pointer hover:text-gray-300" style={{ color: '#5F9D08' }} />
        </li>
        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-lg font-bold text-black hover:text-[#5F9D08] space-x-2"
          >
            <span className="truncate w-20">{userName || 'Loading...'}</span>
            <FaCaretDown className="text-lg" style={{ color: '#5F9D08' }} />
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-10">
              {location.pathname !== '/recruiters/getProfile' && (
                <li>
                  <Link
                    to="/recruiters/getProfile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    style={{ color: '#5F9D08' }}
                  >
                    Profile
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/recruiters/logout"
                  className="block px-4 py-2 hover:bg-gray-200"
                  style={{ color: '#5F9D08' }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ProfileGreen;