require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { init } = require("./db");

const jobsRouter = require("./routes/jobs");
const unitsRouter = require("./routes/units");
const photosRouter = require("./routes/photos");
const syncRouter = require("./routes/sync");
const offlineRouter = require("./routes/offline");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Field app backend running" });
});

app.use("/jobs", jobsRouter);
app.use("/units", unitsRouter);
app.use("/photos", photosRouter);
app.use("/sync", syncRouter);
app.use("/offline", offlineRouter);

init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB init error:", err);
    process.exit(1);
  });
