import { connection } from '../config/db.js';

export const createJobsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ctc VARCHAR(255) NOT NULL,
      requiredDocuments TEXT NOT NULL,
      eligibilityCriteria TEXT NOT NULL,
      skillsRequired TEXT NOT NULL,
      jobRole VARCHAR(255) NOT NULL,
      jobDescription TEXT NOT NULL,
      experience VARCHAR(255) NOT NULL,
      qualifications VARCHAR(255) NOT NULL,
      jobType ENUM('Full-Time', 'Part-Time') DEFAULT 'Full-Time',
      location VARCHAR(255) NOT NULL,
      status ENUM('closed', 'open') DEFAULT 'open',
      recruiterId INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (recruiterId) REFERENCES Recruiters(id) ON DELETE CASCADE
    );
  `;
  await connection.execute(query);
};

export const createUserJobsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS UserJobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      jobId INT NOT NULL,
      appliedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
      FOREIGN KEY (jobId) REFERENCES Jobs(id) ON DELETE CASCADE,
      UNIQUE KEY unique_application (userId, jobId)
    );
  `;
  await connection.execute(query);
};
