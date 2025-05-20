import React from 'react';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 p-2 font-sans bg-white">
      {/* Top bar with profile and notification */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="bg-[#5F9D08] p-1 rounded-lg text-white text-lg">Notifications</h2>
        </div>
        <div className="flex items-center">
          <i className="text-[#5F9D08] text-2xl mr-2">🔔</i>
          <div className="flex items-center">
            <img
              src="profile-pic-url"
              alt="profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-base">Prachi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

