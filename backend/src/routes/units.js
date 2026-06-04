const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// GET /units
router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM units ORDER BY tipo, estado");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching units" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { tipo, qr_code, estado, ubicacion_lat, ubicacion_lng, notas } = req.body;
    const sql = `
      INSERT INTO units (tipo, qr_code, estado, ubicacion_lat, ubicacion_lng, notas, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,NOW())
      RETURNING *
    `;
    const { rows } = await pool.query(sql, [
      tipo,
      qr_code || null,
      estado || "disponible",
      ubicacion_lat || null,
      ubicacion_lng || null,
      notas || null
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating unit" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(req.body)) {
      fields.push(`${key} = $${idx++}`);
      values.push(value);
    }
    values.push(id);

    const sql = `
      UPDATE units
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;
    const { rows } = await pool.query(sql, values);
    if (!rows.length) return res.status(404).json({ error: "Unit not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating unit" });
  }
});

// QR scan endpoint: /units/scan
router.post("/scan", async (req, res) => {
  try {
    const { qr_code, lat, lng } = req.body;
    const sql = `
      UPDATE units
      SET ubicacion_lat = $1, ubicacion_lng = $2, updated_at = NOW()
      WHERE qr_code = $3
      RETURNING *
    `;
    const { rows } = await pool.query(sql, [lat, lng, qr_code]);
    if (!rows.length) return res.status(404).json({ error: "Unit not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error scanning unit" });
  }
});

module.exports = router;
