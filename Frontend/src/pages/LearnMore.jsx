import React from "react";
import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Learn More About Our Platform
        </h1>
        <p className="text-gray-600 mb-6">
          Our platform connects talented job seekers with top recruiters. 
          Whether you are looking for your dream job or searching for the right 
          candidate, we provide tools and resources to make the process seamless.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Features
        </h2>
        <ul className="list-disc pl-5 text-gray-600 mb-6">
          <li>Smart job matching with AI recommendations</li>
          <li>Recruiter dashboards with analytics</li>
          <li>Profile builder for candidates</li>
          <li>Real-time notifications & updates</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Why Choose Us?
        </h2>
        <p className="text-gray-600 mb-6">
          We make hiring and job searching easier, faster, and more effective. 
          Our focus is on creating meaningful connections that help both recruiters 
          and job seekers succeed.
        </p>

        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/users/register"
            className="px-6 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#43a047] transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
