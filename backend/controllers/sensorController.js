const db = require("../database/database");

const addSensor = (req, res) => {
  console.log("========== DATA MASUK ==========");
  console.log(req.body);
  const { temperature, pressure, status } = req.body;
  if (temperature === undefined || pressure === undefined || !status) {
    return res.status(400).json({
      success: false,
      message: "temperature, pressure, dan status wajib diisi",
    });
  }
  db.run(
    `INSERT INTO sensor_data
        (temperature,pressure,status)
        VALUES(?,?,?)`,
    [temperature, pressure, status],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        id: this.lastID,
      });
    },
  );
};

const getLatest = (req, res) => {
  db.get(
    `SELECT * FROM sensor_data
        ORDER BY id DESC LIMIT 1`,
    [],
    (err, row) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(row);
    },
  );
};

const getHistory = (req, res) => {
  db.all(
    `SELECT * FROM sensor_data
        ORDER BY id DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    },
  );
};

module.exports = {
  addSensor,
  getLatest,
  getHistory,
};
