import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Notifications/Navbar';

function PostJob_Internship() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 80,
        damping: 12
      }
    }
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  const [jobType, setJobType] = useState('Internship');
  const [internshipRole, setInternshipRole] = useState('');
  const [stipendType, setStipendType] = useState('');
  const [stipendAmount, setStipendAmount] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [internshipDuration, setInternshipDuration] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [location, setLocation] = useState('');
  const [attachedDocument, setAttachedDocument] = useState(null);
  const [documentsUrl, setDocumentsUrl] = useState([]);
  const [eligibilityCriteria, setEligibilityCriteria] = useState([]);
  
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
  
    for (const file of files) {
      try {
        const { data, error } = await supabase.storage
          .from("job-documents")
          .upload(`documents/${file.name}`, file);
  
        if (error) throw new Error(`Error uploading file: ${error.message}`);
  
        const { data: publicData } = supabase.storage
          .from("job-documents")
          .getPublicUrl(`documents/${file.name}`);
  
        if (publicData?.publicUrl) {
          uploadedUrls.push(publicData.publicUrl);
        } else {
          throw new Error("Public URL generation failed");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  
    setDocumentsUrl((prevUrls) => [...prevUrls, ...uploadedUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert eligibilityCriteria to a string and documentsUrl to a string
    const eligibilityCriteriaString = eligibilityCriteria.join(", ");
    const documentsString = documentsUrl.join(", ");
  
    try {
      const { data, error } = await supabase.from("internship_documents").insert({
        internship_role: internshipRole,            // Role of the internship
        stipend_type: stipendType,                  // Stipend type (Fixed, Performance Based, or Unpaid)
        stipend_amount: stipendAmount,              // Stipend amount (if applicable)
        skills_required: skillsRequired,            // Skills required for the internship
        internship_type: internshipType,            // Full-Time or Part-Time internship
        internship_duration: internshipDuration,    // Duration of the internship in months
        location: location,                         // Location of the internship
        attached_documents_url: documentsString,    // URLs of uploaded documents
        eligibility_criteria: eligibilityCriteriaString // Eligibility criteria
      });
  
      if (error) throw error;  // Improved error handling
  
      alert("Internship posted successfully!");
      console.log("Data inserted successfully:", data);
    } catch (err) {
      console.error("Error inserting data:", err);  // Log the full error
      alert("Failed to post internship. Check the console for details.");
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center p-4 sm:p-8 bg-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Navbar pageName="Post Internship" />
      <motion.h2 
        className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
      >
        Post {jobType}
      </motion.h2>

      <motion.div 
        className="w-full max-w-3xl bg-white p-4 sm:p-6 rounded shadow-md"
        variants={slideUp}
      >
        <motion.div 
          className="flex border-b-2 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className={`flex-1 ${jobType === 'Job' ? 'bg-[#5F9D08]' : 'hover:bg-gray-100'} rounded-t-md transition-colors duration-300`}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/recruiters/postJob"
              onClick={() => setJobType('Job')}
              className={`block w-full py-3 text-center font-semibold ${jobType === 'Job' ? 'text-white' : 'text-gray-600'}`}
            >
              Job
            </Link>
          </motion.div>
          <motion.div 
            className={`flex-1 ${jobType === 'Internship' ? 'bg-[#5F9D08]' : 'hover:bg-gray-100'} rounded-t-md transition-colors duration-300`}
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => setJobType('Internship')}
              className={`w-full py-3 text-center font-semibold ${jobType === 'Internship' ? 'text-white' : 'text-gray-600'}`}
            >
              Internship
            </button>
          </motion.div>
        </motion.div>

        <motion.form 
          className="space-y-4" 
          onSubmit={handleSubmit}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Internship Role */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Internship Role</label>
            <motion.input
              type="text"
              value={internshipRole}
              onChange={(e) => setInternshipRole(e.target.value)}
              placeholder="e.g., Software Developer"
              className="w-full p-2 border border-gray-300 rounded"
              required
              whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 2px rgba(95, 157, 8, 0.2)' }}
            />
          </motion.div>

          {/* Stipend */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Stipend</label>
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                }
              }}
            >
              <motion.label 
                className="flex items-center"
                variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="radio"
                  name="stipendType"
                  value="Fixed"
                  onChange={() => setStipendType('Fixed')}
                  className="mr-2"
                />{' '}
                Fixed
              </motion.label>
              <motion.label 
                className="flex items-center"
                variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="radio"
                  name="stipendType"
                  value="Performance Based"
                  onChange={() => setStipendType('Performance Based')}
                  className="mr-2"
                />{' '}
                Performance Based
              </motion.label>
              <motion.label 
                className="flex items-center"
                variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="radio"
                  name="stipendType"
                  value="Unpaid"
                  onChange={() => setStipendType('Unpaid')}
                  className="mr-2"
                />{' '}
                Unpaid
              </motion.label>
            </motion.div>
            <motion.div 
              className="mt-2"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <motion.input
                type="number"
                value={stipendAmount}
                onChange={(e) => setStipendAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full p-2 border border-gray-300 rounded"
                required
                whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 2px rgba(95, 157, 8, 0.2)' }}
              />
            </motion.div>
          </motion.div>

          {/* Skills Required */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Skills Required</label>
            <motion.input
              type="text"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              placeholder="e.g., Java, SQL, DSA"
              className="w-full p-2 border border-gray-300 rounded"
              whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 2px rgba(95, 157, 8, 0.2)' }}
            />
          </motion.div>

          {/* Internship Type */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Internship Type</label>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                }
              }}
            >
              <motion.label 
                className="flex items-center"
                variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="radio"
                  name="internshipType"
                  value="Full-Time"
                  onChange={() => setInternshipType('Full-Time')}
                  className="mr-2"
                />{' '}
                Full-Time
              </motion.label>
              <motion.label 
                className="flex items-center"
                variants={{ hidden: { opacity: 0, x: -5 }, visible: { opacity: 1, x: 0 } }}
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="radio"
                  name="internshipType"
                  value="Part-Time"
                  onChange={() => setInternshipType('Part-Time')}
                  className="mr-2"
                />{' '}
                Part-Time
              </motion.label>
            </motion.div>
          </motion.div>

          {/* Internship Duration */}
          <motion.div className="flex items-center space-x-4" variants={formFieldVariants}>
            <motion.div className="flex-1">
              <label className="block text-gray-700 font-bold">Internship Duration</label>
              <motion.input
                type="text"
                value={internshipDuration}
                onChange={(e) => setInternshipDuration(e.target.value)}
                placeholder="e.g., 3"
                className="w-full p-2 border border-gray-300 rounded"
                required
                whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 2px rgba(95, 157, 8, 0.2)' }}
              />
              <motion.span 
                className="text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                months
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Location */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Location</label>
            <motion.input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Remote, Pune"
              className="w-full p-2 border border-gray-300 rounded"
              whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 2px rgba(95, 157, 8, 0.2)' }}
            />
          </motion.div>

          {/* Attach Document */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Attach Document</label>
            <motion.input
              type="file"
              onChange={handleFileUpload}
              className="w-full p-2 border border-gray-300 rounded"
              multiple
              whileHover={{ backgroundColor: '#f9fafb' }}
            />
          </motion.div>

          {/* Eligibility Criteria */}
          <motion.div variants={formFieldVariants}>
            <label className="block text-gray-700 font-bold">Eligibility Criteria</label>
            <motion.textarea
              value={eligibilityCriteria}
              onChange={(e) => setEligibilityCriteria(e.target.value.split(', '))}
              placeholder="Enter eligibility criteria separated by commas"
              className="w-full p-2 border border-gray-300 rounded"
              whileFocus={{ borderColor: '#5F9D08', boxShadow: '0 0 0 2px rgba(95, 157, 8, 0.2)' }}
            />
          </motion.div>

          <motion.div 
            className="flex justify-center mt-6"
            variants={formFieldVariants}
          >
            <motion.button
              type="submit"
              className="py-2 px-6 bg-[#5F9D08] text-white rounded-lg hover:bg-[#4f8d07] w-full sm:w-auto"
              whileHover={{ scale: 1.05, backgroundColor: '#4f8d07' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              Post Internship
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}

export default PostJob_Internship;
