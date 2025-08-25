import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        We respect your privacy and are committed to protecting your personal
        data. This policy explains how we collect, use, and safeguard your
        information while using our Job Portal.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">🔐 Data We Collect</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Account details (name, email, password)</li>
        <li>Profile information (resume, skills, work experience)</li>
        <li>Job applications and hiring workflow status</li>
        <li>Recruiter company details</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">📊 How We Use Your Data</h2>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>To provide job recommendations</li>
        <li>To keep candidates updated about application status (Accepted/Rejected)</li>
        <li>To enable recruiters to manage hiring workflows</li>
        <li>To improve platform security & performance</li>
      </ul>

      <p className="text-gray-600 mb-6">
        We never sell your personal data. Your information is used strictly for
        enhancing your experience on our platform.
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

export default PrivacyPolicy;
