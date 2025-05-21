import React, { useRef, useState } from 'react';

const UpdateRecruiter = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4 lg:px-0">
      {/* Container for the form with extra top and bottom margin */}
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg my-8 sm:my-12 lg:my-16">

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">Update Recruiter</h2>

        {/* Form Fields */}
        <form>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block font-bold mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder=""
            />
          </div>

          {/* Job Title / Designation Field */}
          <div className="mb-4">
            <label className="block font-bold mb-1">Job Title / Designation</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder=""
            />
          </div>

          {/* LinkedIn Profile URL Field */}
          <div className="mb-4">
            <label className="block font-bold mb-1">LinkedIn Profile URL</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder=""
            />
          </div>

          {/* Alternate Contact Field */}
          <div className="mb-4">
            <label className="block font-bold mb-1">Alternate Contact</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Mobile No."
            />
          </div>

          {/* Upload ID Proof Button */}
          <div className="mb-4">
            <button
              type="button"
              className="w-full py-2 text-white rounded-md"
              style={{ backgroundColor: "#5F9D08" }}
              onClick={handleButtonClick}
            >
              Upload ID Proof
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {file && <p className="mt-2 text-sm text-gray-600">Selected file: {file.name}</p>}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mb-6 flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">
              I have read the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> and agree
            </span>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md"
            style={{ backgroundColor: "#5F9D08" }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecruiter;
