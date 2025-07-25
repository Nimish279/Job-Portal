import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Profile from '../profile_temp/profile';

const UserNavbar = ({ pageName }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const location = useLocation();

  const showSearchBar = location.pathname.includes('applied-jobs') || location.pathname.includes('savedJobs');

  // Create a reference for the search bar
  const searchRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // Close search bar if clicked outside
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchInput(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleSearchInput = () => setShowSearchInput(!showSearchInput);

  return (
    <nav className="fixed top-0 left-0 w-full m-0 flex items-center text-white z-50">
      <div className="sm:text-1xl font-bold bg-[#5F9D08] text-[#E5E5E5] ml-2 py-2 pt-4 px-4 lg:-mt-4 md:-mt-4 rounded-b-lg flex-none">
        {pageName}
      </div>

      <div className="flex items-center w-full ml-6">
        {showSearchBar && (
          <>
            {isMobile ? (
              <>
                {showSearchInput ? (
                  <form
                    ref={searchRef}
                    onSubmit={handleSearchSubmit}
                    className="absolute top-full left-0 w-11/12 p-2 border-2 border-gray-300 rounded-full bg-white mx-4 mt-2"
                  >
                    <div className="flex items-center">
                      <FaSearch className="text-[#5F9D08] mr-3 text-xl" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by job title or company"
                        className="w-full px-3 py-2 text-gray-800 border-none outline-none rounded-full"
                      />
                    </div>
                  </form>
                ) : (
                  <button onClick={toggleSearchInput} className="ml-auto mr-4 flex items-center">
                    <FaSearch className="text-[#5F9D08] text-2xl" />
                  </button>
                )}
              </>
            ) : (
              <form
                ref={searchRef}
                onSubmit={handleSearchSubmit}
                className="flex items-center flex-grow p-2 border-2 mt-2 border-gray-300 rounded-full bg-white mx-4 mr-6"
              >
                <FaSearch className="text-[#5F9D08] mr-3 text-xl" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by job title or company"
                  className="w-full px-3 text-gray-800 border-none outline-none rounded-full"
                />
              </form>
            )}
          </>
        )}
      </div>

      {/* Profile icon */}
      <div className=" mr-4 p-2 rounded-b-lg flex items-center bg-[#5F9D08]">
        <Profile />
      </div>
    </nav>
  );
};

export default UserNavbar;
