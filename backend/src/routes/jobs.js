const express = require("express");
const router = express.Router();
const { pool } = require("../db");

// GET /jobs?from=2025-01-01&to=2025-01-31&estado=pendiente
router.get("/", async (req, res) => {
  try {
    const { from, to, estado } = req.query;
    const params = [];
    const where = [];

    if (from) {
      params.push(from);
      where.push(`fecha_programada >= $${params.length}`);
    }
    if (to) {
      params.push(to);
      where.push(`fecha_programada <= $${params.length}`);
    }
    if (estado) {
      params.push(estado);
      where.push(`estado = $${params.length}`);
    }

    const sql = `
      SELECT * FROM jobs
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY fecha_programada ASC
    `;
    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching jobs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      tipo_servicio,
      cliente,
      direccion,
      lat,
      lng,
      unidad_id,
      fecha_programada,
      estado,
      notas
    } = req.body;

    const sql = `
      INSERT INTO jobs (tipo_servicio, cliente, direccion, lat, lng, unidad_id, fecha_programada, estado, notas, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW())
      RETURNING *
    `;
    const { rows } = await pool.query(sql, [
      tipo_servicio,
      cliente,
      direccion,
      lat,
      lng,
      unidad_id,
      fecha_programada,
      estado || "pendiente",
      notas || null
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating job" });
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
      UPDATE jobs
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;
    const { rows } = await pool.query(sql, values);
    if (!rows.length) return res.status(404).json({ error: "Job not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating job" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM jobs WHERE id = $1", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting job" });
  }
});

module.exports = router;
