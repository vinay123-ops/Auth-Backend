// backend/src/config/db.js
import pkg from "pg"; // Import the default export
import dotenv from "dotenv";

const { Pool } = pkg; // Destructure Pool from the default export

dotenv.config({ path: "E:/practice1/myapp/backend/.env" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

pool.connect()
  .then(() => console.log("✅ Connected to Vercel Postgres"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    console.error("Full error details:", JSON.stringify(err, null, 2));
  });

export default pool;
