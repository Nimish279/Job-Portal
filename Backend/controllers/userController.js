import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Job } from "../models/Job.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour but in cookie form
    });
    res.status(200).json({
      success: true,
      message: "User login successful",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const editProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     console.log(user);
//     const fields = ({ name, github, degree, university, email, city, about } =
//       req.body);
//     const updatedFields = [
//       "name",
//       "github",
//       "degree",
//       "city",
//       "university",
//       "email",
//       "about",
//     ];
//     console.log(req.body.github);

//     updatedFields.forEach((field) => {
//       if (req.body[field]) {
//         user[field] = req.body[field];
//       }
//     });

//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "User profile edited successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//     console.log(error);
//   }
// };

// export const editProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const updatedFields = [
//       "name",
//       "github",
//       "degree",
//       "university",
//       "email",
//       "city",
//       "about",
//       "skills",
//       "experience", // Added experience field
//     ];

//     updatedFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         user[field] = req.body[field];
//       }
//     });

//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "User profile edited successfully",
//     });
//   } catch (error) {
//     console.log("Edit profile error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error", error: error.message });
//   }
// };

export const editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const fieldsToUpdate = [
      "name",
      "github",
      "degree",
      "city",
      "university",
      "email",
      "about",
      "skills",
      "experience",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error("Edit Profile Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const userlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (jobs.length === 0) {
      return res.status(203).json({ message: "No Active jobs" });
    }
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const applyToJobs = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await Job.findById(jobId);
    if (job === null) {
      return res.status(404).json({ message: "Job Not found" });
    }

    if (job.status === "closed") {
      return res.status(403).json({ message: "Job Opening Is closed" });
    }
    const user = req.user;

    const alreadyApplied = job.candidates.includes(user._id);
    if (alreadyApplied) {
      return res.status(403).json({ message: "Already applied to this job" });
    }
    job.candidates.push(user._id); //ye job pe kitno ne apply kiya
    user.appliedJobs.push(job._id); //ye bande ke kitne job pe apply kiya
    await job.save({
      validateBeforeSave: false,
    });
    await user.save({
      validateBeforeSave: false,
    });

    res.status(200).json({ message: "Applied To Job successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("appliedJobs");
    console.log(user?.appliedJobs);
    if (user.appliedJobs.length === 0 || !user) {
      return res.status(203).json({
        success: false,
        message: "You haven't applied to any jobs yet.",
        appliedJobs: [],
      });
    }

    return res
      .status(200)
      .json({ success: true, appliedJobs: user.appliedJobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = req.user;
//     res.status(200).json({
//       success: true,
//       user: {
//         name: user.name,
//         email: user.email,
//         id: user._id,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
