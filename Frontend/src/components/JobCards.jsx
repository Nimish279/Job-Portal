import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import useUserStore from '../store/userStore.js';

// Mock data fallback
const MOCK_JOBS = [
  {
    id: 1,
    jobRole: 'Senior Frontend Developer',
    company: 'Tech Corp Inc.',
    location: 'Mumbai, India',
    jobType: 'Full-time',
    ctc: '15-25',
    posted: new Date(),
    description: 'We are looking for an experienced frontend developer to join our team.',
  },
  {
    id: 2,
    jobRole: 'Backend Engineer',
    company: 'Data Systems Ltd',
    location: 'Bangalore, India',
    jobType: 'Full-time',
    ctc: '18-30',
    posted: new Date(),
    description: 'Join our backend team to build scalable APIs and services.',
  },
];

const JobCards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jobs = useUserStore(state => state.jobs);
  const appliedJobs = useUserStore(state => state.appliedJobs);
  const getJobs = useUserStore(state => state.getJobs);
  const getAppliedJobs = useUserStore(state => state.getAppliedJobs);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getJobs();
        if (!result.success) {
          console.warn('API failed, using mock jobs');
          useUserStore.setState({ jobs: MOCK_JOBS });
        } else {
          // Normalize company field for all jobs
          const normalizedJobs = result.data.map(job => ({
            ...job,
            company: job.company || job.recruiter?.companyName || job.recruiterName || 'Unknown Company',
          }));
          useUserStore.setState({ jobs: normalizedJobs });
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

  // Fetch applied jobs for the current user
  useEffect(() => {
    if (getAppliedJobs) getAppliedJobs();
  }, [getAppliedJobs]);

  if (loading) {
    return (
      <div className="px-4 pt-10 text-center">
        <h2 className="text-2xl font-bold text-black mb-4">Latest Jobs</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-10">
        <h2 className="text-2xl font-bold text-black mb-4">Latest Jobs</h2>
        <div className="text-red-500 p-4 bg-red-50 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-10">
      <h2 className="text-2xl font-bold text-black mb-6">Latest Jobs</h2>
      {jobs.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No jobs available at the moment.</div>
      ) : (
        <div className="flex flex-col space-y-4">
          {jobs.map(job => (
            <JobCard
              key={job._id || job.id}
              job={job}
              currentUserAppliedJobs={appliedJobs.map(j => j._id || j.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobCards;
