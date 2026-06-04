const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// Simple: devuelve versiones de recursos offline
router.get("/resources", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM offline_resources");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching offline resources" });
  }
});

module.exports = router;
