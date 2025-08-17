import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import upload from "./routes/upload.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// ✅ Allow multiple Vite dev ports to avoid CORS issues
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
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
