import express from "express";
import { Job } from "../models/Job.js";
import { protect, isRecruiter } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
 * Apply for a job
 * body: { jobId, candidateId 
 */
router.post("/apply", async (req, res) => {
  try {
    const { jobId, candidateId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const already = job.applicants?.some(
      (a) => a.candidate?.toString() === candidateId
    );
    if (already) return res.status(400).json({ message: "Already applied" });

    job.applicants.push({ candidate: candidateId });
    await job.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get all applications (applicants) for a job
 * GET /api/applications/job/:jobId
 */
// router.get("/job/:jobId", async (req, res) => {
//   try {
//     const job = await Job.findById(req.params.jobId)
//       .populate("applicants.candidate", "name email photo degree university location github about skills experiences");

//     if (!job) return res.status(404).json({ message: "Job not found" });
//     res.json(job.applicants || []);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// GET /api/applications/job/:jobId
router.get("/job/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate("candidates", "name email photo degree university location github about skills experiences");

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.json(job.candidates || []); // return array of users
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/**
 * Update a candidate's application status for a job
 * PUT /api/applications/job/:jobId/candidate/:candidateId/status
 * body: { status: "Accepted" | "Rejected", message?: string }
 */
router.put("/job/:jobId/candidate/:candidateId/status", protect, isRecruiter, async (req, res) => {
  try {
    const { status, message = "" } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.jobId, "applicants.candidate": req.params.candidateId },
      {
        $set: {
          "applicants.$.status": status,
          "applicants.$.note": message,
        },
      },
      { new: true }
    ).populate("applicants.candidate", "name email");

    if (!updatedJob) return res.status(404).json({ message: "Job or application not found" });

    const updated = updatedJob.applicants.find(
      (a) => a.candidate._id.toString() === req.params.candidateId
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
