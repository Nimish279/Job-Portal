import express from "express";
import { Job } from "../models/Job.js";
import { protect, isRecruiter } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
 * Apply for a job
 * body: { jobId, candidateId 
 */
// Apply for a job
router.post("/apply", async (req, res) => {
  try {
    const { jobId, candidateId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.candidates.includes(candidateId)) {
      return res.status(400).json({ message: "Already applied" });
    }

    job.candidates.push(candidateId);
    await job.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all candidates for a job
router.get("/job/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
      .populate("candidates", "name email university degree github about skills");

    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job.candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update candidate status (basic, no per-candidate field)
router.put("/job/:jobId/candidate/:candidateId/status", protect, isRecruiter, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });
    if (!job.candidates.includes(req.params.candidateId))
      return res.status(404).json({ message: "Candidate not found in this job" });

    // You can store statuses separately or create a map if you need that later
    res.json({ message: `Candidate ${req.params.candidateId} marked as ${status}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
