require("dotenv").config();
const pool = require("./dbConnection");
const express = require("express");
const cors = require("cors");
const app = express();
const createUser = require("./apis/createUser");
const locationStamp = require("./apis/locationStamp");
const { getAllStamp, getStamp } = require("./apis/getStamp");
const Login = require("./apis/login");
const { requestLeave } = require("./apis/leaveApplication");
const { punchInRequest } = require("./apis/punchInRequest");
const createholiday = require("./apis/createHoliday");
const {
  getAllUserList,
  getAllHolidayList,
  getSingleLeaveApplicaion,
  getAllLeaveApplications,
  getAllPunchInRequests,
  getSinglePunchInRequest,
} = require("./apis/getValues");

app.use(cors({ "access-control-allow-origin": "*" })); //yha per client side ka url dalna hai bss
app.use(express.json({ limit: "5mb", extended: true }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.send("server Started");
});
app.use((req) => {
  console.log(req.url);
  req.next();
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
app.post("/login", async (req, res) => {
  const response = await Login(req.body);
  console.log(response);
  res.send(response);
});
app.post("/requestLeave", async (req, res) => {
  const response = await requestLeave(req.body);
  console.log(response);
  res.send(response);
});
app.post("/punchInRequest", async (req, res) => {
  const response = await punchInRequest(req.body);
  console.log(response);
  res.send(response);
});
app.post("/createHoliday", async (req, res) => {
  const response = await createholiday(req.body);
  console.log(response);
  res.send(response);
});
app.get("/getUsers", async (req, res) => {
  const response = await getAllUserList();
  console.log(response);
  res.send(response);
});
app.get("/getHolidays", async (req, res) => {
  const response = await getAllHolidayList();
  console.log(response);
  res.send(response);
});
app.get("/getLeaveApplication/:id", async (req, res) => {
  const response = await getSingleLeaveApplicaion({ id: req.params.id });
  console.log(response);
  res.send(response);
});

app.get("/getLeaveApplication", async (req, res) => {
  const response = await getAllLeaveApplications();
  console.log(response);
  res.send(response);
});

app.get("/getPunchInRequest", async (req, res) => {
  const response = await getAllPunchInRequests();
  console.log(response);
  res.send(response);
});

app.get("/getPunchInRequest/:id", async (req, res) => {
  const response = await getSinglePunchInRequest({ id: req.params.id });
  console.log(response);
  res.send(response);
});

//Server start
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("\nBacked Started " + process.env.HOST_URL));
