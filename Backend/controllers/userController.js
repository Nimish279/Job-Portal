import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Job } from "../models/Job.js";
import { Internship } from "../models/Internship.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour but in cookie form
    });
    console.log('User login successful');
    res.status(200).json({
      success: true,
      message: "User login successful",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const editProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     console.log(user);
//     const fields = ({ name, github, degree, university, email, city, about } =
//       req.body);
//     const updatedFields = [
//       "name",
//       "github",
//       "degree",
//       "city",
//       "university",
//       "email",
//       "about",
//     ];
//     console.log(req.body.github);

//     updatedFields.forEach((field) => {
//       if (req.body[field]) {
//         user[field] = req.body[field];
//       }
//     });

//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "User profile edited successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//     console.log(error);
//   }
// };

// export const editProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const updatedFields = [
//       "name",
//       "github",
//       "degree",
//       "university",
//       "email",
//       "city",
//       "about",
//       "skills",
//       "experience", // Added experience field
//     ];

//     updatedFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         user[field] = req.body[field];
//       }
//     });

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "User profile edited successfully",
//     });
//   } catch (error) {
//     console.log("Edit profile error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

export const editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fieldsToUpdate = [
      "name",
      "github",
      "degree",
      "city",
      "university",
      "email",
      "about",
      "skills",
      "experience",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated", experience: user.experience });
  } catch (error) {
    console.error("Edit Profile Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const userlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiter', 'companyName');
    if (jobs.length === 0) {
      return res.status(203).json({ message: "No Active jobs" });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

import { Notification } from "../models/Notification.js";

export const applyToJobs = async (req, res) => {
  try {
    // Debug logs — helpful while developing locally
    console.log("=== APPLY TO JOB REQUEST ===");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    // Support several possible keys that frontend may send
    const jobId = req.body?.jobId || req.body?.id || req.body?.job_id;
    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required in the request body." });
    }

    // Find job and populate recruiter for notification
    const job = await Job.findById(jobId).populate('recruiter');
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.status === "closed")
      return res.status(403).json({ message: "Job Opening is closed" });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check duplicate (handle ObjectId comparisons)
    const alreadyApplied = job.candidates.some(
      (id) => id.toString() === user._id.toString()
    );
    if (alreadyApplied)
      return res.status(403).json({ message: "Already applied to this job" });

    // Push user into candidates and user.appliedJobs (original app behaviour)
    job.candidates.push(user._id);
    user.appliedJobs.push(job._id);

    // Optional: store resume path locally (if multer configured to save local files).
    // We don't modify your schema — we just log and include the path in response for debugging.
    let resumeInfo = null;
    if (req.file) {
      resumeInfo = {
        originalname: req.file.originalname,
        filename: req.file.filename || null,
        path: req.file.path || null,
        mimetype: req.file.mimetype || null,
        size: req.file.size || null,
      };
      console.log("Resume uploaded:", resumeInfo);
      // If you want to store resume path in DB, add a field to your schema and save it.
    }

    await job.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    // Send notification to recruiter
    if (job.recruiter && job.recruiter._id) {
      await Notification.create({
        recipient: job.recruiter._id,
        recipientModel: "Recruiter",
        sender: user._id,
        senderModel: "User",
        type: "job_applied",
        message: `${user.name} applied for your job: ${job.title}`,
        job: job._id,
      });
    }

    return res.status(200).json({
      message: "Applied To Job successfully",
      resume: resumeInfo,
    });
  } catch (error) {
    console.error("ApplyToJobs Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("appliedJobs");
    console.log(user?.appliedJobs);
    if (user.appliedJobs.length === 0 || !user) {
      return res.status(203).json({
        success: false,
        message: "You haven't applied to any jobs yet.",
        appliedJobs: [],
      });
    }

    return res
      .status(200)
      .json({ success: true, appliedJobs: user.appliedJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = req.user;
//     res.status(200).json({
//       success: true,
//       user: {
//         name: user.name,
//         email: user.email,
//         id: user._id,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        degree: user.degree,
        city: user.city,
        university: user.university,
        github: user.github,
        about: user.about,
        skills: user.skills,
        experience: user.experience,
      },
    });
  } catch (err) {
    res.status(500).json({ message: unauthenticated });
  }
};

export const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id; // from protect middleware

    await User.findByIdAndUpdate(userId, {
      $pull: { savedJobs: jobId }
    });

    res.json({ success: true, message: "Job removed from saved jobs" });
  } catch (error) {
    console.error("Error removing saved job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getInternships = async (req, res) => {
  try {
    // Populate the recruiter field to get companyName
    const internships = await Internship.find()
      .populate("recruiter", "companyName"); // Only fetch companyName from recruiter

    if (internships.length === 0) {
      return res.status(203).json({ message: "No active internships" });
    }

    return res.status(200).json({ success: true, internships });
  } catch (error) {
    console.error("Get internships error:", error);
    res.status(500).json({ error: error.message });
  }
};
// ✅ Get internship by ID
export const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate(
      "recruiter",
      "companyName email"
    );
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    res.json(internship);
  } catch (err) {
    res.status(500).json({ message: "Error fetching internship", error: err.message });
  }
};

// ✅ Get internship workflow (if you want a separate workflow endpoint like jobs)
export const getInternshipWorkflow = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    res.json({
      workflowSteps: internship.workflowSteps || [
        "Application Submitted",
        "Resume Shortlisting",
        "Interview",
        "Offer",
      ],
      status: internship.status,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching workflow", error: err.message });
  }
};
export const applyToInternships = async (req, res) => {
    try {
        // We expect the frontend to send the ID of the internship
        const { internshipId } = req.body; 
        
        // 1. Find the Internship and populate the Recruiter for notification
        const internship = await Internship.findById(internshipId).populate('recruiter');
        if (!internship) return res.status(404).json({ message: "Internship not found" });

        // 2. Check if the internship is open
        if (internship.status === "closed")
            return res.status(403).json({ message: "Internship opening is closed" });

        // Get the authenticated user object
        const user = req.user; 
        
        // 3. Check for duplicate application on the Internship model
        const alreadyApplied = internship.candidates.includes(user._id);
        if (alreadyApplied)
            return res.status(403).json({ message: "Already applied to this internship" });

        // 4. Perform the Application Update (Mongoose)
        
        // Add user to the internship's candidates list
        internship.candidates.push(user._id);
        await internship.save({ validateBeforeSave: false });

        /* CRUCIAL ASSUMPTION: The User model needs an 'appliedInternships' array. 
        If it exists, uncomment the lines below.
        
        // Add internship to the user's applied internships list
        await User.findByIdAndUpdate(user._id, {
            $push: { appliedInternships: internship._id }
        }, { new: true, runValidators: true });
        */

        // 5. 🔔 Send notification to recruiter
        await Notification.create({
            recipient: internship.recruiter._id,
            recipientModel: "Recruiter",
            sender: user._id,
            senderModel: "User",
            type: "internship_applied",
            message: `${user.name} applied for your internship: ${internship.internshipRole}`,
            internship: internship._id,
        });

        res.status(200).json({ success: true, message: "Applied to Internship successfully" });
    } catch (error) {
        console.error("Apply to Internship Error:", error);
        res.status(500).json({ success: false, error: error.message, message: "Server error during application" });
    }
};