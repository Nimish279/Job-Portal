import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        Our Job Portal is designed to make hiring simple, transparent, and
        efficient. Whether you are a job seeker or a recruiter, our platform
        brings you the tools you need to succeed.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">👩‍💼 For Job Seekers</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        We provide personalized job recommendations, application tracking, and
        notifications about your hiring status. With features like{" "}
        <span className="font-semibold">application accept/reject updates</span>{" "}
        and saved filters, you stay informed and never miss out on opportunities.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">🏢 For Recruiters</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Recruiters can manage applicants with ease using{" "}
        <span className="font-semibold">hiring workflows</span>, send instant
        updates, and organize candidates in one place. From reviewing profiles
        to shortlisting, accepting, or rejecting applicants — everything is
        streamlined.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">🚀 Our Mission</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        We believe in empowering careers and building meaningful professional
        connections. By combining smart recommendations with clear communication
        tools, we make the job search and recruitment journey easier for
        everyone.
      </p>

      {/* Back to Home */}
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </motion.div>
  );
};

export default About;
