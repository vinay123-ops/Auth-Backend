import pool from "../src/config/db.js";

async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Users table created successfully!");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  } finally {
    pool.end(); // Close connection
  }
}

createUsersTable();
