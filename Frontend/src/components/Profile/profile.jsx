import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUser, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import useUserStore from '../../store/userStore.js';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Get user data from the store
  const user = useUserStore(state => state.user);
  
  // Default name if user data is not available
  const userName = user?.name || 'User';
  
  // Reference for the dropdown container
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

  return (
    <div>
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/users/notifications">
            <FaBell className="text-2xl cursor-pointer hover:text-gray-300" />
          </Link>
        </li>
        <li>
          <FaUser className="text-2xl cursor-pointer hover:text-gray-300" />
        </li>
        <li className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="flex text-xl items-center font-bold text-black hover:text-[#5F9D08]">
            {userName} <FaCaretDown className="ml-1" />
          </button>
          {dropdownOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-[400]" style={{ pointerEvents: 'none' }}>
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-[999] shadow-xl" style={{ pointerEvents: 'auto', position: 'fixed', top: '60px', right: '20px' }}>
                {/* Use Link to navigate to the profile page */}
                <li>
                  <Link 
                    to="/users/profile"  // Navigate to profile page
                    className="block px-4 py-2 hover:bg-gray-200"
                    style={{ color: '#5F9D08' }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/users/editProfile"  // Navigate to the profile page
                    className="block px-4 py-2 hover:bg-gray-200" 
                    style={{ color: '#5F9D08' }}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/users/logout"  // Navigate to the profile page
                    className="block px-4 py-2 hover:bg-gray-200" 
                    style={{ color: '#5F9D08' }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Profile;
