const express = require("express");
const cors = require("cors");

const app = express();

require("./database/database");
require("./mqtt");

const sensorRoutes = require("./routes/sensorRoutes");

app.use(cors());

app.use(express.json());

app.use("/api/sensor", sensorRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Industrial Tank Monitoring API"
  });
});

app.listen(3000, () => {
  console.log("Server Running");
});