import React from 'react';
import { Link } from 'react-router-dom';
import profilePic1 from "../assets/images/Profile_pics/1.jpg";
import profilePic2 from "../assets/images/Profile_pics/2.jpg";
import profilePic3 from "../assets/images/Profile_pics/3.jpg";
import Navbar from './Notifications/Navbar';

const applicantsData = [
  {
    "name": "Prachi Shirsale",
    "course": "MCA Management",
    "image": profilePic1
  },
  {
    "name": "Rahul Sharma",
    "course": "MBA Marketing",
    "image": profilePic2
  },
  {
    "name": "Anjali Verma",
    "course": "B.Tech Computer Science",
    "image": profilePic3
  }
];

function Applicants() {
  return (
    
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
 
        <Navbar pageName="Applicants" />
   
      <h2 className="text-2xl font-semibold mb-6">Applicants</h2>

      <div className="w-full bg-white rounded shadow-md">
        {applicantsData.map((applicant, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 last:border-b-0 w-full"
          >
            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                {/* Displaying the profile image */}
                <img
                  src={applicant.image}
                  alt={applicant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{applicant.name}</h3>
                <p className="text-gray-500">{applicant.course}</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
            <Link to={`/recruiters/applicantsProfile/${index + 1}`}>
  <button className="bg-[#5F9D08] text-white px-4 py-2 rounded text-sm sm:text-base">
    Profile
  </button>
</Link>

              <button className="bg-[#5F9D08] text-white px-4 py-1 rounded font-semibold">
                Resume
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applicants;
