import { Recruiter } from "../models/Recruiter.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Job } from "../models/Job.js";
import { Internship } from "../models/Internship.js";

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
      // sameSite: "None", for deployment only
      sameSite: "Strict",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour but in cookie form
    });
    res.status(200).json({
      recruiter:{
        id: recruiter._id,
        email: recruiter.email,
        companyName: recruiter.companyName,
 
      },
      success: true, message: "Login successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerRecruiter = async (req, res) => {
  try {
    const { email, phone, password, companyName } = req.body;
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Recruiter already exists' });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'PAN or GST document is required' });
    }

    
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
      message: 'Recruiter registered successfully',
      recruiter: {
        id: newRecruiter._id,
        email: newRecruiter.email,
        companyName: newRecruiter.companyName,
        status: newRecruiter.status,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error during registration', error });
  }
};

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

export const postJob = async (req, res) => {
  try {
    const {
      hiringWorkflow,
      jobRole,
      ctc,
      experience,
      requiredDocuments,
      qualifications,
      eligibilityCriteria,
      skillsRequired,
      jobDescription,
      jobType,
      location,
    } = req.body;
    //Testing Purposes postman
    //     const attachedDocs=req.body.attachedDocs.map(file=>({
    //     fileName:file.originalName,
    //     fileType:file.mimeType,
    //     fileSize:file.size,
    //     url:`uploads/${file.originalName}`,
    //     uploadedAt: new Date()
    //   }))

    //   const attachedDocs=req.files.map(file=>({
    //     fileName:file.originalName,
    //     fileType:file.mimeType,
    //     fileSize:file.size,
    //     url:`uploads/${file.originalName}`,
    //     uploadedAt: new Date()
    //   }))

    const recruiter = req.recruiter;
    const newJob = await Job.create({
      recruiter: recruiter._id,
      hiringWorkflow,
      jobRole,
      ctc,
      experience,
      requiredDocuments,
      qualifications,
      eligibilityCriteria,
      skillsRequired,
      jobDescription,
      jobType,
      location,
    });
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const seeCandidates = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) return res.status(500).json({ message: "No jobId mentioned" });
    const candidates = await Job.findById(jobId).populate("candidates");
    console.log(candidates);
    if (candidates.length==0) {
      res.status(203).json({ message: "No Candidates Yet", candidates: [] });
    }
    res.status(200).json({ success: true, candidates });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const {
      hiringWorkflow,
      jobRole,
      ctc,
      requiredDocuments,
      eligibilityCriteria,
      skillsRequired,
      jobDescription,
      location,
    } = req.body;
    const job = await Job.findById(jobId);
    if (job === null) {
      return res.status(500).json({ error: "Job not Found" });
    }

    if (jobRole) job.jobRole = jobRole;
    if (ctc) job.ctc = ctc;
    if (requiredDocuments) job.requiredDocuments = requiredDocuments;
    if (eligibilityCriteria) job.eligibilityCriteria = eligibilityCriteria;
    if (skillsRequired) job.skillsRequired = skillsRequired;
    if (jobDescription) job.jobDescription = jobDescription;
    if (hiringWorkflow) {
      job.hiringWorkflow =
        typeof hiringWorkflow === "string"
          ? JSON.parse(hiringWorkflow)
          : hiringWorkflow;
    }
    if (location) job.location = location;

    const updatedJob = await job.save();

    return res.status(200).json({ success: true, job: updatedJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const postInternship = async (req, res) => {
  try {
    const {
      internshipRole,
      stipendAmount,
      stipendType,
      skillsRequired,
      internshipDuration,
      internshipType,
      location,
      eligibilityCriteria,
    } = req.body;

    const recruiter = req.recruiter;

    const newInternship = await Internship.create({
      recruiter: recruiter._id,
      internshipRole,
      stipendAmount,
      stipendType,
      skillsRequired,
      internshipDuration,
      internshipType,
      location,
      eligibilityCriteria,
    });

    res
      .status(201)
      .json({
        message: "Internship created successfully",
        internship: newInternship,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);

    res
      .status(200)
      .json({
        message: "Job Posting Deleted Successfully",
        job,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const updateJobDocs = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    const attachedDocs = req.files.map((files) => ({
      fileName: files.originalName,
      fileSize: files.size,
      fileType: files.mimeType,
      url: `upload/${files.originalName}`,
    }));
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const myJobs = async (req, res) => {
  try {
    const recruiter = req.recruiter;
    const jobs = await Job.find({ recruiter: recruiter._id });
    if (jobs.length === 0) {
      res.status(203).json({ message: "No Jobs Posted by you", jobs: [] });
    }
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
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