import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import upload from "./routes/upload.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import { Job } from "./models/Job.js";

dotenv.config();
const app = express();

// ✅ Allow multiple Vite dev ports to avoid CORS issues
app.use(
  cors({
    origin: [
        "http://localhost:5173",
        // "http://localhost:5174",
        // "http://localhost:5175",
        // "https://job-portal-2qza.onrender.com"  //ye frontend ka url hai deployed wala
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/recruiters", recruiterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", upload);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
// Get all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiter", "companyName name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});
// Get job by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("recruiter", "companyName email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Error fetching job", error: err.message });
  }
});
const PORT = process.env.PORT || 8000;



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  });
