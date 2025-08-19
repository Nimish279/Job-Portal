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
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
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
    if (!jobId) return res.status(500).json({ message: "No jobId mentioned" });

    const candidates = await Job.findById(jobId).populate("candidates");
    if (!candidates) {
      return res.status(203).json({ message: "No Candidates Yet", candidates: [] });
    }
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    const recruiter = await Recruiter.findById(req.user.id); // assuming auth middleware sets req.user

    if (!recruiter) {
      return res.status(404).json({ success: false, message: "Recruiter not found" });
    }

    // Update only the fields that exist in body
    const updatableFields = [
      "phone",
      "companyName",
      "companyPanCardOrGstFile",
      "yearEstablished",
      "headquarters",
      "industry",
      "cinNumber",
      "linkedinUrl",
      "achievements",
      "culture",
      "mission",
      "contact1",
      "contact2",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        recruiter[field] = req.body[field];
      }
    });

    await recruiter.save();

    res.json({
      success: true,
      message: "Recruiter profile updated successfully",
      recruiter,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ message: "Unauthenticated" });
  }
};

// Get all jobs posted by a recruiter
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id; // recruiter logged in
    const jobs = await Job.find({ recruiter: recruiterId }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching recruiter jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all jobs (for seekers to view)
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "companyName") // show recruiter details if needed
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};
