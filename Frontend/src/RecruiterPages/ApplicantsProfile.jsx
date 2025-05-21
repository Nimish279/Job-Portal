import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Static image imports
import photo1 from '../assets/images/Profile_pics/1.jpg';
import photo2 from '../assets/images/Profile_pics/2.jpg';
import photo3 from '../assets/images/Profile_pics/3.jpg';
import AmazonLogo from '../assets/images/AmazonLogo.png';
import { FaGraduationCap, FaUniversity, FaEnvelope, FaLocationArrow, FaGithub } from 'react-icons/fa'; // FA icons for degree, university, email, location, github

const ApplicantsProfile = () => {
  const { id } = useParams();  // Get applicant ID from the URL parameter
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Map of photos based on the applicant ID
    const photos = {
      '1': photo1,
      '2': photo2,
      '3': photo3,
    };

    // Fetch the applicant profile based on the id
    const fetchedProfile = {
      photo: photo1|| photos[id], // Default to photo1 if no match
      name: id === '1' ? 'Prachi Shirsale' : id === '2' ? 'Sakshi Kulkarni' : 'Rohini Deshmukh',
      degree: 'MCA Management',
      university: 'MIT University',
      email: 'example@domain.com',
      location: 'Pune, Maharashtra',
      github: 'https://github.com/username',
      about: 'This is an about section for the applicant.',
      skills: ['JavaScript', 'React', 'Node.js'],
      experiences: [
        { company: 'Company A', role: 'Developer', duration: '2 years' },
        { company: 'Company B', role: 'Intern', duration: '1 year' },
      ],
    };
    
    setProfile(fetchedProfile);  // Update state with the fetched profile data
  }, [id]);  // Re-fetch the data when the id changes

  // If profile data is not available yet, show a loading state or a placeholder
  if (!profile) {
    return <div>Loading...</div>;
  }

  const { photo, name, degree, university, email, location, github, about, skills, experiences } = profile;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen p-8 bg-gray-100">
      {/* Left Section */}
      <div className="md:w-2/3 p-6 bg-white rounded-md shadow-lg mb-8 md:mb-0 md:mr-6">
        <div className="mb-4 text-xl font-bold text-center">Profile</div>

        {/* About Section */}
        <div className="mb-8">
          <div className="font-semibold">About</div>
          <p className="text-gray-700 mt-2">{about}</p>
        </div>

        {/* Top Skills Section */}
        <div className="mb-8">
          <div className="font-semibold">Top Skills</div>
          <div className="flex mt-2 space-x-4 flex-wrap">
            {skills.map((skill) => (
              <div key={skill} className="px-4 py-2 bg-gray-300 rounded-md mb-2">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <div className="font-semibold">Experience</div>
          <div className="space-y-4 mt-2">
            {experiences.map((exp, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-200 rounded-md">
                <img
                  src={AmazonLogo}
                  alt={`${exp.company} Logo`}
                  className="w-10 h-10 mr-4"
                />
                <div>
                  <p className="font-bold">{`${exp.company} | ${exp.role}`}</p>
                  <p>{exp.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/3 p-6 bg-white rounded-md shadow-lg flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <img
            src={photo}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          <p className="mt-2 font-bold">{name}</p>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FaGraduationCap className="w-6 h-6" />
            <p className="ml-3">{degree}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaUniversity className="w-6 h-6" />
            <p className="ml-3">{university}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="w-6 h-6" />
            <p className="ml-3">{email}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaLocationArrow className="w-6 h-6" />
            <p className="ml-3">{location}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaGithub className="w-6 h-6" />
            <p className="ml-3">{github}</p>
          </div>
        </div>

        {/* Next Round Details Section */}
        <div className="mb-4">
          <p className="mb-2">Next Round Details</p>
          <textarea
            placeholder="Enter details"
            className="w-full p-2 border rounded-md"
            rows="4"
          />
        </div>

        {/* Notify Button */}
        <button className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-md">Notify</button>

        {/* Reject Button */}
        <button className="w-full mt-auto px-4 py-2 bg-red-600 text-white rounded-md">Reject</button>
      </div>
    </div>
  );
};

export default ApplicantsProfile;
