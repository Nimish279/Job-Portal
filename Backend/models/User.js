import { connection } from '../config/db.js';

export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('Seeker', 'Recruiter') DEFAULT 'Seeker',
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      university VARCHAR(255),
      city VARCHAR(255),
      degree VARCHAR(255),
      github VARCHAR(255),
      about VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await connection.execute(query);
};

// Insert a new user
export const insertUser = async (user) => {
  const query = `
    INSERT INTO Users
    (name, email, password, role, status, university, city, degree, github, about)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    user.name,
    user.email,
    user.password,
    user.role || 'Seeker',
    user.status || 'Active',
    user.university || null,
    user.city || null,
    user.degree || null,
    user.github || null,
    user.about || null,
  ];

  const [result] = await connection.execute(query, values);
  return result.insertId;
};
