// import React from 'react';
// import { FaSearch, FaBars } from 'react-icons/fa';
// import ProfileDropdown from '../profile/profile';

// const NavSearchBar = ({ toggleSidebar }) => {
//   return (
//     <nav className="bg-[#5F9D08] fixed top-0 left-0 w-full p-2 flex justify-between items-center text-white z-50">
//       <div className="flex items-center space-x-4">
//         {/* <button className="md:hidden text-xl" onClick={toggleSidebar}>
//           <FaBars />
//         </button> */}
//         <div className="hidden md:flex items-center space-x-2">
//           <FaSearch className="text-xl md:text-2xl" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="p-2 rounded-md bg-gray-100 text-black w-32 sm:w-48 md:w-64 lg:w-80"
//           />
//         </div>
//       </div>

//       {/* Search icon on the right side for smaller screens */}
//       <div className="flex items-center space-x-4">
//         <button className="md:hidden p-2 rounded-full">
//           <FaSearch />
//         </button>
//         <ProfileDropdown />
//       </div>
//     </nav>
//   );
// };

// export default NavSearchBar;



import React from 'react';
import { FaSearch, FaBars } from 'react-icons/fa';
import ProfileDropdown from '../profile/profile';


const NavSearchBar = ({ toggleSidebar, showHamburger = false }) => {
  return (
    <nav className="bg-[#5F9D08] sticky top-0 left-0 w-full p-4 flex justify-between items-center text-white z-50">
      
      <div className="flex items-center space-x-4">
        {/* ✅ Hamburger only if prop is true */}
        {showHamburger && (
          <button
            className="block lg:hidden text-2xl"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        )}
       <div>logo</div>
        {/* Search input for md+ */}
        
      </div>

      {/* Profile and search icon for small */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md bg-gray-100 text-black w-32 sm:w-48 md:w-64 lg:w-80"
          />
          <FaSearch className="text-xl" />
        </div>
        <button className="md:hidden p-2 rounded-full">
          <FaSearch />
        </button>
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default NavSearchBar;
