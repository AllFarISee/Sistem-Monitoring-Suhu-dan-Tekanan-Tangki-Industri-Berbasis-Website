const mqtt = require("mqtt");
const db = require("./database/database");

const client = mqtt.connect("mqtt://broker.emqx.io:1883");

client.on("connect", () => {
  console.log("=================================");
  console.log("MQTT Connected");
  console.log("=================================");

  client.subscribe("industrial/tank/data");
});

client.on("message", (topic, message) => {
  try {
    const data = JSON.parse(message.toString());

    console.log("MQTT DATA:");
    console.log(data);

    db.run(
      `INSERT INTO sensor_data
      (temperature, pressure, status)
      VALUES(?,?,?)`,
      [
        data.temperature,
        data.pressure,  
        data.status
      ]
    );

  } catch (err) {
    console.log(err);
  }
});

module.exports = client;