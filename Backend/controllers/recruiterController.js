  import { Recruiter } from "../models/Recruiter.js";
  import bcrypt from "bcryptjs";
  import jwt from "jsonwebtoken";
  import { Job } from "../models/Job.js";
  import { Internship } from "../models/Internship.js";

  // LOGIN RECRUITER
  export const loginRecruiter = async (req, res) => {
    const { email, password } = req.body;
    try {
      const recruiter = await Recruiter.findOne({ email });
      if (!recruiter)
        return res.status(404).json({ message: "Recruiter not found" });

      const isMatch = await bcrypt.compare(password, recruiter.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
      });

      res.status(200).json({
        recruiter: {
          id: recruiter._id,
          email: recruiter.email,
          companyName: recruiter.companyName,
        },
        success: true,
        message: "Login successfully",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // REGISTER RECRUITER
  export const registerRecruiter = async (req, res) => {
    try {
      const { email, phone, password, companyName } = req.body;
      const existingRecruiter = await Recruiter.findOne({ email });
      if (existingRecruiter)
        return res.status(400).json({ message: "Recruiter already exists" });

      if (!req.file || !req.file.path)
        return res
          .status(400)
          .json({ message: "PAN or GST document is required" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newRecruiter = new Recruiter({
        email,
        phone,
        password: hashedPassword,
        companyName,
        companyPanCardOrGstFile: req.file.path,
      });

      await newRecruiter.save();

      res.status(201).json({
        success: true,
        message: "Recruiter registered successfully",
        recruiter: {
          id: newRecruiter._id,
          email: newRecruiter.email,
          companyName: newRecruiter.companyName,
          status: newRecruiter.status,
        },
      });
    } catch (error) {
      console.error("Register Error:", error);
      res
        .status(500)
        .json({ message: "Server error during registration", error });
    }
  };

  // GET RECRUITER PROFILE
  export const getProfile = async (req, res) => {
    try {
      const recruiter = req.recruiter;
      res
        .status(200)
        .json({ recruiter, message: "Recruiter Profile Fetched Successfully" });
    } catch (error) {
      console.error("Error fetching ", error);
      res.status(500).json({ message: "Server error while fetching profile" });
    }
  };

  // RECRUITER LOGOUT
  export const recruiterLogout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 1 * 60 * 60 * 1000, // 1 hour but in cookie form
      });
      res.status(200).json({ message: "Logout Sucessfull" });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  };

  // POST JOB
  export const postJob = async (req, res) => {
    try {
      const recruiter = req.recruiter;
      const newJob = await Job.create({
        recruiter: recruiter._id,
        ...req.body,
      });
      res.status(201).json({ message: "Job created successfully", job: newJob });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error);
    }
  };

  // SEE CANDIDATES
  export const seeCandidates = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'candidates',
      select: 'name degree photo email', // select the fields you need
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ candidates: job.candidates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


  // UPDATE JOB
  export const updateJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId);
      if (!job) return res.status(404).json({ message: "Job not found" });

      Object.assign(job, req.body);

      const updatedJob = await job.save();
      res.status(200).json({ success: true, job: updatedJob });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // POST INTERNSHIP
  export const postInternship = async (req, res) => {
    try {
      const recruiter = req.recruiter;
      const newInternship = await Internship.create({
        recruiter: recruiter._id,
        ...req.body,
      });
      res
        .status(201)
        .json({ message: "Internship created successfully", internship: newInternship });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // DELETE JOB
  export const deleteJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findByIdAndDelete(jobId);
      res
        .status(200)
        .json({ message: "Job Posting Deleted Successfully", job, success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update recruiter profile
  export const updateRecruiterProfile = async (req, res) => {
  try {
    if (!req.recruiter) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updates = { ...req.body };
    if (req.file) {
      updates.companyPanCardOrGstFile = req.file.path;
    }

    const updatedRecruiter = await Recruiter.findByIdAndUpdate(
      req.recruiter._id, // 🔑 only update the logged-in recruiter
      updates,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      recruiter: updatedRecruiter,
      message: "Recruiter profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating recruiter profile:", error);
    res.status(500).json({ success: false, message: "Server error updating profile" });
  }
};

  // ✅ Get recruiter profile by ID
  export const getRecruiterProfile = async (req, res) => {
    try {
      const recruiter = await Recruiter.findById(req.params.id);
      if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });
      res.json(recruiter);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // MY JOBS
  export const myJobs = async (req, res) => {
    try {
      const recruiter = req.recruiter;
      const jobs = await Job.find({ recruiter: recruiter._id });
      if (jobs.length === 0) {
        return res.status(203).json({ message: "No Jobs Posted by you", jobs: [] });
      }
      return res.status(200).json({ success: true, jobs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// GET CURRENT RECRUITER
export const getCurrentRecruiter = async (req, res) => {
  try {
    const recruiter = req.recruiter;
    res.status(200).json({
      success: true,
      recruiter: {
        name: recruiter.companyName,
        email: recruiter.email,
        id: recruiter._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: unauthenticated });
  }
};

export const closeJob = async (req, res) => {
  try {
    // Find job by ID & recruiter (ownership check)
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.recruiter._id },
      { status: "closed" },
      { new: true, runValidators: false } // validation skip
    );

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }

    res.status(200).json({
      success: true,
      message: "Job closed successfully",
      job,
    });
  } catch (error) {
    console.error("❌ Error in closeJob:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const openJob = async (req, res) => {
  //   try {
  //     const jobId = req.params.id;
  //     const job = await Job.findById(jobId);
  //     job.status = "open";
  //     await job.save();
  //     res.status(200).json({ success: true, job });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //     console.log(error);
  //   }
  // };
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Recruiter owner check
    if (
      !req.recruiter ||
      job.recruiter.toString() !== req.recruiter._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to open this job" });
    }

    job.status = "open";
    await job.save({ validateModifiedOnly: true });

    res
      .status(200)
      .json({ success: true, message: "Job opened successfully", job });
  } catch (error) {
    console.error("❌ Error in openJob:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

  // Get all jobs posted by a recruiter
  export const getRecruiterJobs = async (req, res) => {
    try {
      const recruiterId = req.user.id; // recruiter logged in
      const jobs = await Job.find({ recruiter: recruiterId }).sort({ createdAt: -1 });

      res.status(200).json({jobs});
    } catch (error) {
      console.error("Error fetching recruiter jobs:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Get all jobs (for seekers to view)
  export const getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find()
        .populate("recruiter", "companyName recruiterName email") // show recruiter details if needed
        .sort({ createdAt: -1 });

    res.status(200).json({ success: true, jobs });
    } catch (error) {
      console.error("Error fetching all jobs:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  export const getRecruiterInternships = async (req, res) => {
  try {
    const recruiterId = req.recruiter._id;
    const internships = await Internship.find({ recruiter: recruiterId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ internships });
  } catch (error) {
    console.error("Error fetching recruiter internships:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("recruiter", "companyName recruiterName email"); // ✅ populate recruiter details

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.status(200).json(job);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Invalid job ID format." });
    }
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
// GET all internships posted by logged-in recruiter



// CLOSE INTERNSHIP
export const closeInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.recruiter._id }, // check ownership
      { status: "closed" },
      { new: true, runValidators: false }
    );

    if (!internship) {
      return res.status(404).json({ message: "Internship not found or not authorized" });
    }

    res.status(200).json({
      success: true,
      message: "Internship closed successfully",
      internship,
    });
  } catch (error) {
    console.error("❌ Error in closeInternship:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// OPEN INTERNSHIP
export const openInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.recruiter._id }, // ownership check
      { status: "open" },
      { new: true }
    );

    if (!internship) {
      return res.status(404).json({ message: "Internship not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Internship opened successfully",
      internship,
    });
  } catch (error) {
    console.error("❌ Error opening internship:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE INTERNSHIP
export const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.recruiter._id,
    });

    if (!internship) {
      return res.status(404).json({ message: "Internship not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting internship:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


