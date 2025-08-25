import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Support</h1>
      <p className="text-gray-600 leading-relaxed mb-4">
        Need help with your job search or recruitment process? Our support team
        is here to assist you with any issues related to accounts, job postings,
        or applications.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">📩 Contact Us</h2>
      <ul className="list-disc list-inside text-gray-600 mb-4">
        <li>Email: support@jobportal.com</li>
        <li>Phone: +91 98765 43210</li>
        <li>Live Chat: Available 9 AM – 9 PM</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-700 mb-2">❓ Common Issues</h2>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        <li>Can’t log in or facing registration errors</li>
        <li>Application status (Accepted/Rejected) not updating</li>
        <li>Job recommendations not showing correctly</li>
        <li>Recruiters unable to update hiring workflow</li>
        <li>Notifications not being delivered</li>
      </ul>

      <p className="mt-4 text-gray-600 mb-6">
        If your issue isn’t listed here, please reach out via email or chat.
        Our team usually responds within 24 hours.
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

export default Support;
