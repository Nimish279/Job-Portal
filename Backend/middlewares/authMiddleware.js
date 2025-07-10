import jwt from 'jsonwebtoken';
import { connection } from '../config/db.js';

export const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded should contain user id at least
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isRecruiter = async (req, res, next) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM Recruiters WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0 || rows[0].role !== 'Recruiter') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.recruiter = rows[0];
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const isSeeker = async (req, res, next) => {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM Users WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0 || rows[0].role !== 'Seeker') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = rows[0];
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
