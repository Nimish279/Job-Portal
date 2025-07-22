// import express from "express";
// import upload from "../middlewares/multer.js";
// import cloudinary from "../config/cloudinaryConfig.js";
// import streamifier from "streamifier";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";
// // import User from "../models/user.js";
// const router = express.Router();

// const uploadToCloudinary = (buffer, mimetype, folder = "resume", filename) => {
//   const resourceType = mimetype.startsWith("image") ? "image" : "raw";

//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         public_id: filename,
//         resource_type: resourceType,
//         overwrite: true,
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// //old code store resume in local storage
// // router.post("/resume", upload.single("resume"), async (req, res) => {
// //   try {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token) return res.status(401).json({ error: "Unauthorized" });

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const userName = decoded.name || decoded.id || "anonymous";

// //     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

// //     const safeName = userName.trim().toLowerCase().replace(/\s+/g, "_");
// //     const fileExt = req.file.originalname.split(".").pop();
// //     const filename = `resume_${safeName}.${fileExt}`;

// //     const result = await uploadToCloudinary(
// //       req.file.buffer,
// //       req.file.mimetype,
// //       "resume",
// //       filename
// //     );

// //     res.status(200).json({ url: result.secure_url });
// //   } catch (error) {
// //     console.error("Upload error:", error.message);
// //     res.status(500).json({ error: "Upload failed" });
// //   }
// // });

// // new code to store resume in MongoDB
// router.post("/resume", upload.single("resume"), async (req, res) => {
//   console.log(req.file); // req.file.path => Cloudinary URL
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ error: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id || decoded._id;
//     const userName = decoded.name || "anonymous";

//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     // Save file URL to user
//     // const user = await User.findById(req.user.id);
//     const user = await User.findById(userId);
//     user.resume = req.file.path;
//     await user.save();

//     const safeName = userName.trim().toLowerCase().replace(/\s+/g, "_");
//     const fileExt = req.file.originalname.split(".").pop();
//     const filename = `resume_${safeName}.${fileExt}`;

//     // Upload to Cloudinary
//     const result = await uploadToCloudinary(
//       req.file.buffer,
//       req.file.mimetype,
//       "resume",
//       filename
//     );

//     // ✅ Save to MongoDB
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           resume: {
//             fileName: req.file.originalname,
//             fileUrl: result.secure_url,
//           },
//         },
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Resume uploaded and saved to DB",
//       // fileUrl: result.secure_url,
//       fileUrl: req.file.path,
//       user: updatedUser,
//     });

//     // return res.json({
//     //   message: "Upload successful",
//     //   fileUrl: req.file.path,
//     // });
//   } catch (error) {
//     console.error("Upload error:", error.message);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// export default router;

import express from "express";
import upload from "../middlewares/multer.js";
import cloudinary from "../config/cloudinaryConfig.js";
import streamifier from "streamifier";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

// const uploadToCloudinary = (buffer, mimetype, folder = "resume", filename) => {
//   const resourceType = mimetype.startsWith("image") ? "image" : "raw";

//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder,
//         public_id: filename,
//         resource_type: resourceType,
//         overwrite: true,
//       },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

router.post("/resume", upload.single("resume"), async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // ✅ CloudinaryStorage already uploaded file and returned link in req.file.path
    const cloudinaryUrl = req.file.path;

    // ✅ Save Cloudinary URL to MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          resume: {
            fileName: req.file.originalname,
            fileUrl: cloudinaryUrl,
            publicId: req.file.filename,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Resume uploaded and saved to DB",
      fileUrl: cloudinaryUrl,
      user: updatedUser,
    });
    console.log(
      "Uploaded:",
      req.file.path,
      req.file.filename,
      req.file.mimetype
    );
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/resume", async (req, res) => {
  //Fetching resume on resume page (By Tushar)
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    const user = await User.findById(userId);
    // res.status(200).json({ resumes: user.resume }); // assuming resume is an array
    res.status(200).json({
      resumes: user.resume.map((r) => ({
        fileName: r.fileName,
        fileUrl: r.fileUrl,
        publicId: r.publicId, // ✅ send explicitly
      })),
    });
  } catch (err) {
    console.error("Fetch resume error:", err.message);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});
router.delete("/resume/:publicId", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;
    const publicId = req.params.publicId;
    // const publicId = resumeToDelete.publicId;

    // 1. Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    // 2. Delete from MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          resume: { publicId: publicId },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Resume deleted successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Delete resume error:", err.message);
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

export default router;
