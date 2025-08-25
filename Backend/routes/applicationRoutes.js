import express from "express";
import { CandidateApplication } from "../models/CandidateApplication.js";

const router = express.Router();

// Apply for a job
router.post("/apply", async (req, res) => {
  try {
    const { jobId, candidateId } = req.body;

    // prevent duplicate applications
    const existing = await CandidateApplication.findOne({ job: jobId, candidate: candidateId });
    if (existing) return res.status(400).json({ message: "Already applied" });

    const application = new CandidateApplication({
      job: jobId,
      candidate: candidateId,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted", application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update status (Accept/Reject)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const application = await CandidateApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("candidate job");

    res.json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get applications for a job
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await CandidateApplication.find({ job: req.params.jobId })
      .populate("candidate", "name email")
      .populate("job", "title company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
