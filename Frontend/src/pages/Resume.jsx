import React, { useState } from 'react';


const Resume = () => {
  const [pdfs, setPdfs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPdf, setNewPdf] = useState({ fileName: '', file: null });
  const [showDropdownIndex, setShowDropdownIndex] = useState(null);

  // Handle showing the modal
  const toggleModal = () => setShowModal(!showModal);

  // Handle file input changes
  const handleFileChange = (e) => {
    setNewPdf({ ...newPdf, file: e.target.files[0] });
  };

  // Handle file name change
  const handleNameChange = (e) => {
    setNewPdf({ ...newPdf, fileName: e.target.value });
  };

  // Upload PDF
  const handleUpload = () => {
    if (newPdf.file && newPdf.fileName) {
      setPdfs([...pdfs, newPdf]);
      setNewPdf({ fileName: '', file: null });
      toggleModal();
    }
  };

  // Delete PDF
  const handleDelete = (index) => {
    const updatedPdfs = [...pdfs];
    updatedPdfs.splice(index, 1);
    setPdfs(updatedPdfs);
    setShowDropdownIndex(null); // Close dropdown after deletion
  };

  // Toggle Dropdown
  const toggleDropdown = (index) => {
    setShowDropdownIndex(showDropdownIndex === index ? null : index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen  ">
      {/* Title and Add New Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Resume</h2>
        <button
          onClick={toggleModal}
          className="flex items-center bg-[#5F9D08] text-white px-4 py-2 rounded-lg"
        >
          Add New <span className="ml-2">+</span>
        </button>
      </div>

      {/* PDF List */}
      <div className="grid grid-cols-2 gap-4">
        {pdfs.map((pdfItem, index) => ( // Renamed each item in map to pdfItem
          <div key={index} className="relative p-4 bg-white rounded-lg shadow">
            <div className="flex items-center">
              <span className="text-2xl mr-4">📄</span> {/* Replaced img with Unicode character */}
              <p className="truncate">{pdfItem.fileName}</p>
            </div>
            <button
              onClick={() => toggleDropdown(index)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ...
            </button>
            {showDropdownIndex === index && (
              <div className="absolute right-2 top-10 bg-white border rounded shadow-md">
                <button
                  onClick={() => handleDelete(index)}
                  className="block px-4 py-2 text-red-500 hover:bg-gray-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Upload */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Upload PDF</h3>
            <input
              type="text"
              placeholder="Enter file name"
              value={newPdf.fileName}
              onChange={handleNameChange}
              className="border p-2 w-full mb-4 rounded"
            />
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="border p-2 w-full mb-4 rounded"
            />
            <button
              onClick={handleUpload}
              className="bg-[#5F9D08] text-white px-4 py-2 rounded-lg"
            >
              Upload
            </button>
            <button
              onClick={toggleModal}
              className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
