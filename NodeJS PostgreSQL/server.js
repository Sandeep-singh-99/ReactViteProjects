const express = require("express");
const { connectDB, pool } = require("./db/db");
const morgan = require("morgan");

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(morgan("dev"));

app.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO people (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read One
app.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
app.put("/:id", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      "UPDATE people SET name = $1 WHERE id = $2 RETURNING *",
      [name, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM people WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
