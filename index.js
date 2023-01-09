require("dotenv").config();
const pool = require("./dbConnection");
const express = require("express");
const cors = require("cors");
const app = express();
const createUser = require("./apis/createUser");
const locationStamp = require("./apis/locationStamp");
const { getAllStamp, getStamp } = require("./apis/getStamp");

app.use(cors({ "access-control-allow-origin": "*" })); //yha per client side ka url dalna hai bss
app.use(express.json({ limit: "5mb", extended: true }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.send("server Started");
});

app.post("/createUser", async (req, res) => {
  const response = await createUser(req.body);
  console.log(response);
  res.send(response);
});
app.post("/createStamp", async (req, res) => {
  const response = await locationStamp(req.body);
  console.log(response);
  res.send(response);
});
app.get("/getAllStamp", async (req, res) => {
  const response = await getAllStamp();
  console.log(response);
  res.send(response);
});
app.post("/getStamp", async (req, res) => {
  const response = await getStamp(req.body);
  console.log(response);
  res.send(response);
});

//Server start
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("\nBacked Started " + process.env.HOST_URL));
