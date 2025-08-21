// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:8000/api/jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setJob(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching job details:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) return <p className="p-5 text-center text-gray-500">Loading...</p>;
//   if (!job) return <p className="p-5 text-center text-red-500">Job not found</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
//       {/* Job Title */}
//       <h1 className="text-3xl font-extrabold text-gray-900">{job.jobRole}</h1>
//       <p className="text-lg text-green-700 font-medium mt-1">
//         {job.recruiter?.companyName || job.recruiter?.email}
//       </p>

//       {/* Job Meta Info */}
//       <div className="grid grid-cols-2 gap-4 mt-6 text-gray-700">
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <p className="font-semibold">📍 Location</p>
//           <p>{job.location}</p>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <p className="font-semibold">💰 CTC</p>
//           <p>{job.ctc} LPA</p>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <p className="font-semibold">🧑‍💼 Experience</p>
//           <p>{job.experience}</p>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg border">
//           <p className="font-semibold">🕒 Job Type</p>
//           <p>{job.jobType}</p>
//         </div>
//       </div>

//       {/* Job Description */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">📄 Job Description</h2>
//         <p className="text-gray-700 leading-relaxed">{job.jobDescription}</p>
//       </div>

//       {/* Eligibility & Qualifications */}
//       <div className="mt-6 grid grid-cols-2 gap-6">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">✅ Eligibility</h2>
//           <p className="text-gray-700 mt-1">{job.eligibilityCriteria}</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900">🎓 Qualifications</h2>
//           <p className="text-gray-700 mt-1">{job.qualifications}</p>
//         </div>
//       </div>

//       {/* Skills */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold text-gray-900">🛠 Skills Required</h2>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {job.skillsRequired.split(",").map((skill, i) => (
//             <span
//               key={i}
//               className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
//             >
//               {skill.trim()}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-8 flex justify-between">
//         <Link
//           to="/users/dashboard"
//           className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
//         >
//           ⬅ Back to Jobs
//         </Link>
//         <button
//           className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
//         >
//           🚀 Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;
