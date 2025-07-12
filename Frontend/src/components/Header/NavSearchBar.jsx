import React from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import ProfileDropdown from '../profile/profile';

const NavSearchBar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-[#5F9D08] fixed top-0 left-0 w-full p-2 flex justify-between items-center text-white z-50">
      <div className="flex items-center space-x-4">
        {/* <button className="md:hidden text-xl" onClick={toggleSidebar}>
          <FaBars />
        </button> */}
        <div className="hidden md:flex items-center space-x-2">
          <FaSearch className="text-xl md:text-2xl" />
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md bg-gray-100 text-black w-32 sm:w-48 md:w-64 lg:w-80"
          />
        </div>
      </div>

      {/* Search icon on the right side for smaller screens */}
      <div className="flex items-center space-x-4">
        <button className="md:hidden p-2 rounded-full">
          <FaSearch />
        </button>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default NavSearchBar;
