import React from 'react';
import { motion } from 'framer-motion';

const CompanyProfileForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Form Fields */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Year Established</label>
          <input type="text" className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Headquarters Location</label>
          <input type="text" className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Industry/Sector</label>
          <input type="text" className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">CIN Number</label>
          <input type="text" className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">LinkedIn Company URL</label>
          <input type="url" className="w-full p-2 border-2 border-gray-200 rounded-md" />
        </div>
      </motion.div>

      {/* Text Areas */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-4 space-y-4"
      >
        <div>
          <label className="font-semibold">Company Achievements and Awards</label>
          <textarea className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md" rows="3"></textarea>
        </div>

        <div>
          <label className="font-semibold">Company Culture</label>
          <textarea className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md" rows="3"></textarea>
        </div>

        <div>
          <label className="font-semibold">Mission and Vision</label>
          <textarea className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md" rows="3"></textarea>
        </div>
      </motion.div>

      {/* Key Contacts */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-4 space-y-4"
      >
        <div className="font-semibold">Key Contacts</div>
        <input type="text" className="w-full p-2 border-2 border-gray-200 rounded-md mb-2" placeholder="Contact 1" />
        <input type="text" className="w-full p-2 border-2 border-gray-200 rounded-md" placeholder="Contact 2" />
      </motion.div>

      {/* File Upload */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-4"
      >
        <label className="block font-semibold mb-2">Upload PAN or GST Certificate</label>
        <div className="flex items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-white text-black px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, JPG, PNG</p>
      </motion.div>

      {/* Save Button */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 text-white rounded-md"
          style={{ backgroundColor: "#5F9D08" }}
        >
          Save
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default CompanyProfileForm;
