import React, { useState } from 'react';
import { FaBell, FaUser, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ProfileGreen = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <ul className="flex space-x-6 items-center">
        <li>
        <Link to="/notification">
          <FaBell className="text-2xl cursor-pointer hover:text-gray-300" style={{ color: '#5F9D08' }} />
        </Link>
        </li>
        <li>
          <FaUser className="text-2xl cursor-pointer hover:text-gray-300" style={{ color: '#5F9D08' }} />
        </li>
        <li className="relative">
          <button 
            onClick={toggleDropdown} 
            // className="flex text-lg items-center text-black font-bold hover:text-[#5F9D08]"
            className="flex text-lg items-center font-bold text-white hover:text-gray-300"
          >
            {/* Prachi <FaCaretDown className="ml-1" style={{ color: '#5F9D08' }} /> */}
            Prachi <FaCaretDown className="ml-1"/>
          </button>
          {dropdownOpen && (
            <ul className="absolute right-full mt-2 w-48 bg-white text-black shadow-lg rounded-md z-10">
              {/* Profile link */}
              <li>
                <Link 
                  to="/users/profile"  // Navigate to the profile page
                  className="block px-4 py-2 hover:bg-gray-200" 
                  style={{ color: '#5F9D08' }}
                >
                  Profile
                </Link>
              </li>
              <li>
              <Link 
                  to="/editProfile"  // Navigate to the profile page
                  className="block px-4 py-2 hover:bg-gray-200" 
                  style={{ color: '#5F9D08' }}
                >
                  Settings
                </Link>
              </li>
              <li>
              <Link 
                  to="/"  // Navigate to the profile page
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
