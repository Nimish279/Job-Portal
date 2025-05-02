import express from 'express';
import upload from '../middlewares/multer.js';
import cloudinary from '../config/cloudinaryConfig.js';
import streamifier from 'streamifier';
import jwt from 'jsonwebtoken';

const router = express.Router();

const uploadToCloudinary = (buffer, mimetype, folder = "resume", filename) => {
  const resourceType = mimetype.startsWith("image") ? "image" : "raw";

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename,   // ✅ now correctly passed
        resource_type: resourceType,
        overwrite: true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

router.post("/resume", upload.single("resume"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userName = decoded.name || decoded.id || "anonymous";

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const safeName = userName.trim().toLowerCase().replace(/\s+/g, "_");
    const fileExt = req.file.originalname.split('.').pop();
    const filename = `resume_${safeName}.${fileExt}`;

    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.mimetype,
      "resume",
      filename
    );

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;