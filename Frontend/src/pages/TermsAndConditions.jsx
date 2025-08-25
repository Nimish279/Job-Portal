import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
      <p className="text-gray-600 mb-4">
        By using our Job Portal, you agree to the following terms and
        conditions. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">👩‍💼 For Job Seekers</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>You must provide accurate information in your profile and resume.</li>
        <li>Do not share false job applications or misuse notifications.</li>
        <li>Respect recruiters’ decisions in the hiring workflow.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">🏢 For Recruiters</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Job postings must be genuine and follow applicable laws.</li>
        <li>Use the accept/reject feature responsibly.</li>
        <li>Do not misuse candidate data outside recruitment purposes.</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">⚖️ General Terms</h2>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>We may update features and workflows at any time.</li>
        <li>Users found violating rules may have their accounts suspended.</li>
        <li>We are not responsible for external job offers outside the portal.</li>
      </ul>

      <p className="text-gray-600 mb-6">
        By continuing to use the portal, you accept these terms. If you disagree,
        please discontinue use of the platform.
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

export default TermsAndConditions;
