import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connection } from '../config/db.js';

// Helper function to get user by email
const getUserByEmail = async (email) => {
  const [rows] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};

// Helper function to get user by id
const getUserById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM Users WHERE id = ?', [id]);
  return rows[0];
};

// Helper function to get job by id
const getJobById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM Jobs WHERE id = ?', [id]);
  return rows[0];
};

// Helper to check if user already applied for a job
const hasUserAppliedToJob = async (userId, jobId) => {
  const [rows] = await connection.execute(
    'SELECT * FROM UserJobs WHERE userId = ? AND jobId = ?',
    [userId, jobId]
  );
  return rows.length > 0;
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "User login successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await getUserByEmail(email);
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await connection.execute(
      'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashed]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, github, degree, university, email, city, about } = req.body;

    // Build dynamic update query only with provided fields
    const fields = [];
    const values = [];
    if (name) { fields.push("name = ?"); values.push(name); }
    if (github) { fields.push("github = ?"); values.push(github); }
    if (degree) { fields.push("degree = ?"); values.push(degree); }
    if (university) { fields.push("university = ?"); values.push(university); }
    if (email) { fields.push("email = ?"); values.push(email); }
    if (city) { fields.push("city = ?"); values.push(city); }
    if (about) { fields.push("about = ?"); values.push(about); }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(req.user.id);
    const sql = `UPDATE Users SET ${fields.join(", ")} WHERE id = ?`;
    await connection.execute(sql, values);

    res.status(200).json({ success: true, message: "User profile edited successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const userlogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const [jobs] = await connection.execute('SELECT * FROM Jobs WHERE status = "open"');
    if (jobs.length === 0) return res.status(203).json({ message: "No Active jobs" });

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const applyToJobs = async (req, res) => {
  try {
    const { jobId } = req.body;
    const job = await getJobById(jobId);
    const user = await getUserById(req.user.id);

    if (!job) return res.status(404).json({ message: "Job Not found" });
    if (job.status === 'closed') return res.status(403).json({ message: "Job Opening Is closed" });

    const alreadyApplied = await hasUserAppliedToJob(user.id, job.id);
    if (alreadyApplied) return res.status(403).json({ message: "Already applied to this job" });

    await connection.execute(
      'INSERT INTO UserJobs (userId, jobId) VALUES (?, ?)',
      [user.id, job.id]
    );

    res.status(200).json({ message: "Applied to job successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    // Get jobs the user applied to by joining UserJobs and Jobs
    const [appliedJobs] = await connection.execute(`
      SELECT j.* FROM Jobs j
      JOIN UserJobs uj ON j.id = uj.jobId
      WHERE uj.userId = ?
    `, [req.user.id]);

    if (appliedJobs.length === 0) {
      return res.status(203).json({
        success: false,
        message: "You haven't applied to any jobs yet.",
        appliedJobs: []
      });
    }

    res.status(200).json({ success: true, appliedJobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
