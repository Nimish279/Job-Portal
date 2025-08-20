import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import useUserStore from '../store/userStore.js';

// Mock data for development when API fails
// const MOCK_JOBS = [
//   {
//     id: 1,
//     title: 'Senior Frontend Developer',
//     company: 'Tech Corp Inc.',
//     location: 'Mumbai, India',
//     type: 'Full-time',
//     salary: '₹15L - ₹25L',
//     posted: '2 days ago',
//     description: 'We are looking for an experienced frontend developer to join our team.'
//   },
//   {
//     id: 2,
//     title: 'Backend Engineer',
//     company: 'Data Systems Ltd',
//     location: 'Bangalore, India',
//     type: 'Full-time',
//     salary: '₹18L - ₹30L',
//     posted: '1 week ago',
//     description: 'Join our backend team to build scalable APIs and services.'
//   },
//   {
//     id: 3,
//     title: 'UI/UX Designer',
//     company: 'Creative Minds',
//     location: 'Remote',
//     type: 'Contract',
//     salary: '₹10L - ₹18L',
//     posted: '3 days ago',
//     description: 'Looking for a creative UI/UX designer to revamp our product interfaces.'
//   },
//   {
//     id: 4,
//     title: 'DevOps Engineer',
//     company: 'Cloud Solutions',
//     location: 'Pune, India',
//     type: 'Full-time',
//     salary: '₹20L - ₹35L',
//     posted: '5 days ago',
//     description: 'Help us build and maintain our cloud infrastructure and CI/CD pipelines.'
//   },
//   {
//     id: 5,
//     title: 'Product Manager',
//     company: 'InnovateX',
//     location: 'Delhi, India',
//     type: 'Full-time',
//     salary: '₹25L - ₹40L',
//     posted: '1 day ago',
//     description: 'Lead product development and work with cross-functional teams to deliver great products.'
//   }
// ];

const JobCards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getJobs } = useUserStore();
  const jobs = useUserStore(state => state.jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getJobs(); // now returns {success, data}
        if (!result.success) {
          console.log('API failed, using mock data as fallback');
          useUserStore.setState({ jobs: MOCK_JOBS });
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        useUserStore.setState({ jobs: MOCK_JOBS });
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [getJobs]);

  if (loading) {
    return (
      <div className="p-4 md:p-0 md:-pl-4 sm:-mt-2 md:pt-20 md:mx-8 lg:ml-8 lg:mr-30">
        <h2 className="text-2xl md:text-base sm:pb-8 text-black font-bold text-left md:pt-8 lg:pb-6 md:pb-2">
          Latest Jobs
        </h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-0 md:-pl-4 sm:-mt-8 md:pt-20 md:mx-8 lg:ml-8 lg:mr-30">
        <h2 className="text-2xl md:text-base sm:pb-8 text-black font-bold text-left md:pt-8 lg:pb-6 md:pb-2">
          Latest Jobs
        </h2>
        <div className="text-red-500 p-4 bg-red-50 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10">
      <h2 className="text-2xl font-bold text-black mb-6">
        Latest Jobs
      </h2>

      <div className="flex flex-col space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">
            No jobs available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCards;
