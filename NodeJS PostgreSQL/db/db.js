const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  await pool.connect();
  console.log("Connected to PostgreSQL");
};

module.exports = { connectDB, pool };
