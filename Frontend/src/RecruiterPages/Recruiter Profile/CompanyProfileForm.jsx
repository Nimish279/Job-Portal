import React from 'react';

const CompanyProfileForm = () => {
  return (
    <div className="space-y-8">
      {/* Form Fields */}
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Year Established</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-200 rounded-md"
            placeholder=""
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Headquarters Location</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-200 rounded-md"
            placeholder=""
          />
        </div>

        <div className="flex items-center">
          <label className="w-1/4 font-semibold">Industry/Sector</label>
          <input
            type="text"
            className="w-full p-2 border-2 border-gray-200 rounded-md"
            placeholder=""
          />
        </div>
      </div>

      {/* Text Areas */}
      <div className="mt-4 space-y-4">
        <div>
          <label className="font-semibold">Company Achievements and Awards</label>
          <textarea
            className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Company Culture</label>
          <textarea
            className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Mission and Vision</label>
          <textarea
            className="w-full p-2 mt-2 border-2 border-gray-200 rounded-md"
            rows="3"
          ></textarea>
        </div>
      </div>

      {/* Key Contacts */}
      <div className="mt-4 space-y-4">
        <div className="font-semibold">Key Contacts</div>
        <input
          type="text"
          className="w-full p-2 border-2 border-gray-200 rounded-md mb-2"
          placeholder="Contact 1"
        />
        <input
          type="text"
          className="w-full p-2 border-2 border-gray-200 rounded-md"
          placeholder="Contact 2"
        />
      </div>

      {/* Save Button */}
      <div className="mt-4">
        <button
          className="w-full py-2 text-white rounded-md"
          style={{ backgroundColor: "#5F9D08" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CompanyProfileForm;
