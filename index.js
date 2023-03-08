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
const { updateDb, runQuary } = require("./dbUtil");

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
app.get("/getPunchInRequest/:status", async (req, res) => {
  const response = await getAllPunchInRequests(req.params.status);
  console.log(response);
  res.send(response);
});

app.get("/getPunchInRequest/:id", async (req, res) => {
  const response = await getSinglePunchInRequest({ id: req.params.id });
  console.log(response);
  res.send(response);
});

app.post("/updateLeaveReq", async (req, res) => {
  const response = await updateDb(
    `txn_leave_application`,
    { status: req.body.status, remarks: req.body.remarks },
    { unique: "id", value: req.body.id }
  );
  res.send(response);
});

app.post("/updatePunchInReq", async (req, res) => {
  const response = await updateDb(
    `txn_re_punch_in`,
    { status: req.body.status, remarks: req.body.remarks },
    { unique: "id", value: req.body.id }
  );
  res.send(response);
});

app.get("/tAction/:employee_id", async (req, res) => {
  const punchIn = await runQuary(
    `SELECT timestamp FROM txn_geolocation WHERE employee_id = '${req.params.employee_id}' AND flag_value = 'PUNCH-IN' ORDER BY timestamp DESC LIMIT 1;`
  );
  const punchOut = await runQuary(
    `SELECT timestamp FROM txn_geolocation WHERE employee_id = '${req.params.employee_id}' AND flag_value = 'PUNCH-OUT' ORDER BY timestamp DESC LIMIT 1;`
  );

  const response = {
    last_punchIn: punchIn[0][0].timestamp,
    last_punchOut: punchOut[0][0].timestamp,
  };
  console.log(response);
  res.send({
    flag: true,
    data: response,
  });
});

//Server start
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("\nBacked Started " + process.env.HOST_URL));
