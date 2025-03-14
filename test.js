import pool from "./src/config/db.js"; // Import your database connection

const checkUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    console.log("Existing Users:", result.rows);
  } catch (error) {
    console.error("Database error:", error);
  }
};

checkUsers(); // Run the function
