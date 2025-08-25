import mongoose from "mongoose";

const candidateApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Accepted", "Rejected"], 
    default: "Pending" 
  },
  appliedAt: { type: Date, default: Date.now }
});

export const CandidateApplication = mongoose.model(
  "CandidateApplication",
  candidateApplicationSchema
);