const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
const PORT = process.env.PORT || 3001;

let latestPayload;
let latestPayload2;
let latestPayload3Light;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/api/light", (req, res) => {
  const message = req.body.message;
  client.publish("esp8266/light", message);
  res.json({ status: "Message sent" });
});

const host = "192.168.100.4";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: "",
  password: "",
  reconnectPeriod: 1000,
});

const topic = "esp8266/temp";
const topic2 = "esp8266/DHT11_Humidity";
const LightTopic = "esp8266/light";

client.on("connect", () => {
  console.log("Connected");

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
  client.subscribe([topic2], () => {
    console.log(`Subscribe to topic '${topic2}'`);
  });
  client.subscribe([LightTopic], () => {
    console.log(`Subscribe to topic '${LightTopic}'`);
  });
});

client.on("message", (topic, payload) => {
  console.log("Received Message:", topic, payload.toString());
  if (topic === "esp8266/temp") {
    latestPayload = payload.toString();
    app.get("/api/temp", (req, res) => {
      res.json({ payload: latestPayload });
    });
  } else if (topic === "esp8266/DHT11_Humidity") {
    latestPayload2 = payload.toString();
    app.get("/api/Humd", (req, res) => {
      res.json({ payload: latestPayload2 });
    });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
