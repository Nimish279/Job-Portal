import { connection } from '../config/db.js';

export const createInternshipTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Internships (
      id INT AUTO_INCREMENT PRIMARY KEY,
      internshipRole VARCHAR(255) NOT NULL,
      stipendType ENUM('Fixed', 'Performance Based', 'Unpaid') NOT NULL,
      stipendAmount VARCHAR(255),
      skillsRequired TEXT,
      internshipType ENUM('Full-Time', 'Part-Time') NOT NULL,
      internshipDuration VARCHAR(255),
      location VARCHAR(255),
      eligibilityCriteria TEXT,
      recruiterId INT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (recruiterId) REFERENCES Recruiters(id) ON DELETE CASCADE
    )
  `;
  await connection.execute(query);
};
