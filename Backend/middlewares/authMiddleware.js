import jwt from "jsonwebtoken";
import { Recruiter } from "../models/Recruiter.js";
import { User } from "../models/User.js";

// export const protect = (req, res, next) => {
//     const token = req.cookies.token
//     if (!token) return res.status(403).json({ message: 'No token provided' });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log(decoded)

//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Yahan user fetch karo aur req.user mein set karo
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const isRecruiter = async (req, res, next) => {
  const user = await Recruiter.findById(req.user.id);
  req.recruiter = user;
  if (user === null || user.role !== "Recruiter") {
    // console.log(req.user)
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const isSeeker = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user);
  req.user = user;
  if (user.role !== "Seeker") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
