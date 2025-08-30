import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaHome, FaCaretDown } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileGreen = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(backend_url + '/recruiters/getProfile', {
          withCredentials: true,
        });
        const recruiter = response.data.recruiter;
        setUserName(recruiter.companyName);
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
          <Link to="/recruiters/jobs/active">
            <FaHome className="text-2xl cursor-pointer hover:text-gray-300" style={{ color: '#5F9D08' }} />
          </Link>
        </li>
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center text-lg font-bold text-black hover:text-[#5F9D08] space-x-2"
          >
            <span className="truncate w-20">{userName || 'Loading...'}</span>
            <FaCaretDown className="text-lg" style={{ color: '#5F9D08' }} />
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-[200]">
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