
import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  internshipRole: { type: String, required: true },
  stipendType: { type: String, enum: ["Fixed", "Performance Based", "Unpaid"], required: true },
  stipendAmount: { type: String },
  skillsRequired: { type: String },
  internshipType: { type: String, enum: ["Full-Time", "Part-Time"], required: true },
  internshipDuration: { type: String },
  location: { type: String },
  eligibilityCriteria: { type: String },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter" } // optionalstatus: { type: String, enum: ["active", "closed"], default: "active" } // ✅ new field
}, { timestamps: true });

export const Internship = mongoose.model("Internship", internshipSchema);