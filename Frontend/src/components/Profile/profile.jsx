import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const baseUrl = 'https://jiritjodeyvvqzitfzob.supabase.co/rest/v1/users';

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppcml0am9kZXl2dnF6aXRmem9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzMTQ4MjUsImV4cCI6MjA0Mzg5MDgyNX0.NFFy4q56gslTtwXYABh6D6X3utsRG9NqelnPTl0Q9D8',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          // console.log("Fetched data:", data); // Log data to inspect structure

          if (data && data.length > 0) {
            setName(data[0].name); // Ensure 'name' is the correct property name in your Supabase table
          } else {
            console.error('User data is empty or undefined');
          }
        } else {
          console.error('Failed to fetch user data', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

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
            {name || 'User'} <FaCaretDown className="ml-1" />
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
