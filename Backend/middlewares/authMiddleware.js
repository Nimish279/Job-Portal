import jwt from "jsonwebtoken";
import { Recruiter } from "../models/Recruiter.js";
import { User } from "../models/User.js";

// export const protect = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(403).json({ message: "No token provided" });

//   try {
//     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(decoded)

//     // req.user = decoded;
//     // req.user = await User.findById(decoded.id);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check recruiter first
    const recruiter = await Recruiter.findById(decoded.id).select("-password");
    if (recruiter) {
      req.user = recruiter;
      req.recruiter = recruiter;
      return next();
    }

    // If needed, check User
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "User not found" });
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};



export const isRecruiter = async (req, res, next) => {
  // Ensure user exists first
  if (!req.recruiter) {
    return res.status(401).json({ message: "Not authorized, user missing" });
  }

  // Check if recruiter already attached
  let recruiter = req.recruiter;
  if (!recruiter) {
    recruiter = await Recruiter.findById(req.user._id);
  }

  if (!recruiter || recruiter.role !== "Recruiter") {
    return res.status(403).json({ message: "Access denied: Not a recruiter" });
  }

  req.recruiter = recruiter;
  next();
};


export const isSeeker = async (req, res, next) => {
  const user = req.user || await User.findById(req.user?._id);

  if (!user || user.role !== "Seeker") {
    return res.status(403).json({ message: "Access denied: Not a seeker" });
  }

  req.user = user;
  next();
};

