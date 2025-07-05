import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connection } from '../config/db.js';

// Helper functions
const getRecruiterByEmail = async (email) => {
  const [rows] = await connection.execute('SELECT * FROM Recruiters WHERE email = ?', [email]);
  return rows[0];
};

const getRecruiterById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM Recruiters WHERE id = ?', [id]);
  return rows[0];
};

const getJobById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM Jobs WHERE id = ?', [id]);
  return rows[0];
};

const getCandidatesForJob = async (jobId) => {
  const [rows] = await connection.execute(
    `SELECT u.* FROM Users u
     JOIN UserJobs uj ON u.id = uj.userId
     WHERE uj.jobId = ?`,
    [jobId]
  );
  return rows;
};

export const loginRecruiter = async (req, res) => {
  const { email, password } = req.body;
  try {
    const recruiter = await getRecruiterByEmail(email);
    if (!recruiter) return res.status(404).json({ message: 'Recruiter not found' });

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: recruiter.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerRecruiter = async (req, res) => {
  try {
    const {
      recruiterName, jobTitle, email, phone, alternateContact, linkedIn, password,
      companyName, website, street, city, state, postalCode,
      industryType, registrationNumber, companyPanCardNumber
    } = req.body;

    const existingRecruiter = await getRecruiterByEmail(email);
    if (existingRecruiter) return res.status(400).json({ message: 'Recruiter already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(`
      INSERT INTO Recruiters (
        recruiterName, jobTitle, email, phone, alternateContact, linkedIn, password,
        companyName, website, companyAddressStreet, companyAddressCity,
        companyAddressState, companyAddressPostalCode, industryType, registrationNumber,
        companyPanCardNumber
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      recruiterName, jobTitle, email, phone, alternateContact || null, linkedIn || null, hashedPassword,
      companyName, website || null, street || null, city || null,
      state || null, postalCode || null, industryType || null, registrationNumber || null,
      companyPanCardNumber || null
    ]);

    res.status(201).json({
      message: "Recruiter registered Successfully",
      recruiter: {
        id: result.insertId,
        recruiterName,
        email,
        companyName,
        status: 'Active', // default value
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const recruiter = await getRecruiterById(req.recruiter.id);
    if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });
    res.status(200).json({ recruiter, message: "Recruiter Profile Fetched Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};

export const recruiterLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postJob = async (req, res) => {
  try {
    const {
      hiringWorkflow,
      jobRole,
      ctc,
      experience,
      requiredDocuments,
      qualifications,
      eligibilityCriteria,
      skillsRequired,
      jobDescription,
      jobType,
      location,
    } = req.body;

    const recruiterId = req.recruiter.id;

    const [result] = await connection.execute(`
      INSERT INTO Jobs (
        recruiterId, hiringWorkflow, jobRole, ctc, experience, requiredDocuments,
        qualifications, eligibilityCriteria, skillsRequired, jobDescription, jobType, location
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      recruiterId,
      JSON.stringify(hiringWorkflow),
      jobRole,
      ctc,
      experience,
      requiredDocuments,
      qualifications,
      eligibilityCriteria,
      skillsRequired,
      jobDescription,
      jobType,
      location
    ]);

    const newJobId = result.insertId;

    const [newJobRows] = await connection.execute('SELECT * FROM Jobs WHERE id = ?', [newJobId]);

    res.status(201).json({ message: "Job created successfully", job: newJobRows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const seeCandidates = async (req, res) => {
  try {
    const jobId = req.params.id;
    const candidates = await getCandidatesForJob(jobId);

    if (!candidates.length) {
      return res.status(200).json({ message: "No Candidates Yet", candidates: [] });
    }

    res.status(200).json({ success: true, candidates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const [jobRows] = await connection.execute('SELECT * FROM Jobs WHERE id = ?', [jobId]);
    if (jobRows.length === 0) return res.status(404).json({ error: "Job not found" });

    const job = jobRows[0];

    const fieldsToUpdate = [
      "hiringWorkflow", "jobRole", "ctc", "requiredDocuments", "eligibilityCriteria",
      "skillsRequired", "jobDescription", "location"
    ];

    const updates = [];
    const values = [];

    for (const field of fieldsToUpdate) {
      if (req.body[field] !== undefined) {
        let value = req.body[field];
        if (field === "hiringWorkflow" && typeof value === "string") {
          try {
            value = JSON.parse(value);
          } catch {
            // ignore parse error and keep original string
          }
        }
        updates.push(`${field} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    values.push(jobId);

    await connection.execute(
      `UPDATE Jobs SET ${updates.join(", ")} WHERE id = ?`,
      values
    );

    const [updatedJobRows] = await connection.execute('SELECT * FROM Jobs WHERE id = ?', [jobId]);

    res.status(200).json({ success: true, job: updatedJobRows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postInternship = async (req, res) => {
  try {
    const {
      internshipRole,
      stipendAmount,
      stipendType,
      skillsRequired,
      internshipDuration,
      internshipType,
      location,
      eligibilityCriteria,
    } = req.body;

    const recruiterId = req.recruiter.id;

    const [result] = await connection.execute(`
      INSERT INTO Internships (
        recruiterId, internshipRole, stipendAmount, stipendType, skillsRequired,
        internshipDuration, internshipType, location, eligibilityCriteria
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      recruiterId,
      internshipRole,
      stipendAmount,
      stipendType,
      skillsRequired,
      internshipDuration,
      internshipType,
      location,
      eligibilityCriteria
    ]);

    const newInternshipId = result.insertId;
    const [internshipRows] = await connection.execute('SELECT * FROM Internships WHERE id = ?', [newInternshipId]);

    res.status(201).json({ message: "Internship created successfully", internship: internshipRows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const [result] = await connection.execute('DELETE FROM Jobs WHERE id = ?', [jobId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job Posting Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const myJobs = async (req, res) => {
  try {
    const recruiterId = req.recruiter.id;
    const [jobs] = await connection.execute('SELECT * FROM Jobs WHERE recruiterId = ?', [recruiterId]);

    if (jobs.length === 0) {
      return res.status(200).json({ message: "No Jobs Posted by you", jobs: [] });
    }

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
