import { connection } from '../config/db.js'; // your mysql2 connection instance

export const createRecruitersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Recruiters (
      id INT AUTO_INCREMENT PRIMARY KEY,
      recruiterName VARCHAR(255) NOT NULL,
      jobTitle VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(255) NOT NULL,
      alternateContact VARCHAR(255),
      linkedIn VARCHAR(255),
      password VARCHAR(255) NOT NULL,
      companyName VARCHAR(255) NOT NULL,
      website VARCHAR(255),
      companyAddressStreet VARCHAR(255),
      companyAddressCity VARCHAR(255),
      companyAddressState VARCHAR(255),
      companyAddressPostalCode VARCHAR(255),
      industryType VARCHAR(255),
      registrationNumber VARCHAR(255),
      companyPanCardNumber VARCHAR(255),
      role ENUM('Seeker', 'Recruiter') DEFAULT 'Recruiter',
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  await connection.execute(query);
};

// Example: Insert a recruiter
export const insertRecruiter = async (recruiter) => {
  const query = `
    INSERT INTO Recruiters
    (recruiterName, jobTitle, email, phone, alternateContact, linkedIn, password, companyName, website,
    companyAddressStreet, companyAddressCity, companyAddressState, companyAddressPostalCode,
    industryType, registrationNumber, companyPanCardNumber, role, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    recruiter.recruiterName,
    recruiter.jobTitle,
    recruiter.email,
    recruiter.phone,
    recruiter.alternateContact || null,
    recruiter.linkedIn || null,
    recruiter.password,
    recruiter.companyName,
    recruiter.website || null,
    recruiter.companyAddressStreet || null,
    recruiter.companyAddressCity || null,
    recruiter.companyAddressState || null,
    recruiter.companyAddressPostalCode || null,
    recruiter.industryType || null,
    recruiter.registrationNumber || null,
    recruiter.companyPanCardNumber || null,
    recruiter.role || 'Recruiter',
    recruiter.status || 'Active'
  ];

  const [result] = await connection.execute(query, values);
  return result.insertId;
};
