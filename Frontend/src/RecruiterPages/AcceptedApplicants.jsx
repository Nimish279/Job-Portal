import React from 'react';
import { Link } from 'react-router-dom';
import photo1 from '../assets/images/Profile_pics/1.jpg';
import photo2 from '../assets/images/Profile_pics/2.jpg';
import photo3 from '../assets/images/Profile_pics/3.jpg';
import Navbar from './Notifications/Navbar';

const applicants = [
  { id: 1, name: "Prachi Shirsale", course: "MCA Management", photo: photo1 },
  { id: 2, name: "Sakshi Kulkarni", course: "MCA Management", photo: photo2 },
  { id: 3, name: "Rohini Deshmukh", course: "MCA Management", photo: photo3 },
];

const AcceptedApplicants = () => {
  return (
    <div className="p-8">
      
      <Navbar pageName="Accepted Applicants" />

      <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">Accepted Applicants</h2>
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded shadow-md border border-gray-200"
          >
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-300">
                <img
                  src={applicant.photo}
                  alt={`${applicant.name}'s Profile`}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{applicant.name}</h3>
                <p className="text-gray-500">{applicant.course}</p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <Link to={`/applicants-profile/${applicant.id}`}>
                <button className="bg-[#5F9D08] text-white px-4 py-2 rounded text-sm sm:text-base">
                  Profile
                </button>
              </Link>
              <button className="bg-[#5F9D08] text-white px-4 py-2 rounded text-sm sm:text-base">
                Resume
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcceptedApplicants;
