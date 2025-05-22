import React, { useState } from 'react';
import { FaBell, FaUser, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import useUserStore from '../../store/userStore.js';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Get user data from the store
  const user = useUserStore(state => state.user);
  
  // Default name if user data is not available
  const userName = user?.name || 'User';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <ul className="flex space-x-6 items-center">
        <li>
        <Link to="/notification">
          <FaBell className="text-2xl cursor-pointer hover:text-gray-300" />
        </Link>
        </li>
        <li>
          <FaUser className="text-2xl cursor-pointer hover:text-gray-300" />
        </li>
        <li className="relative">
          <button onClick={toggleDropdown} className="flex text-xl items-center text-white font-bold text-gray-900">
            {userName} <FaCaretDown className="ml-1" />
          </button>
          {dropdownOpen && (
            <ul className="absolute right-full mt-2 w-48 bg-white text-black shadow-lg rounded-md z-10">
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
          )}
        </li>
      </ul>
    </div>
  );
};

export default Profile;
