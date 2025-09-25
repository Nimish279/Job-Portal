// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientModel", // User or Recruiter
      required: true,
    },
    recipientModel: {
      type: String,
      enum: ["User", "Recruiter"],
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      enum: ["User", "Recruiter"],
    },

    type: {
      type: String,
      enum: [
        "job_posted",
        "internship_posted",
        "job_applied",
        "application_status",
        "general",
      ],
      required: true,
    },

    message: { type: String, required: true },

    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },

    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
