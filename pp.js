// sample data for user creation
// {
//     "entry_by":1221312,
//     "entry_date":"2023-03-21",
//     "mod_by":"1221312",
//     "mod_date":"2023-03-21",
//     "active":"yes",
//     "employee_name":"Sian",
//     "employee_mobile":2222211,
//     "employee_email":"sitaraman23@gmail.com",
//     "employee_dob":"2003-03-13",
//     "employee_doj":"2021-09-21",
//     "employee_UAN":"UA2N",
//     "employee_ESICN":"ES2ICN"}

// sample to create locationstamp
// {
//     "employee_id":43217,	"latitude":12.21211,	"longitude":12.12121
// }

//leave request creation
// {
//     "employee_id":43217,
//      "reason_for_leave":"vacation",
//      "from_date":"2022-02-21",
//      "to_date":"2022-02-29"
// }

// punchInRequest
// {
//     "employee_id":43217,
//      "reason":"Late because of corona"
// }

//Create holiday
// {
//     "holiday_from_date":"2021-12-2",
//      "holiday_to_date":"2021-12-2",
//      "holiday_reason":"none"
// }

//UpdateLeaveRequest
//URL: http://localhost:3002/updateLeaveReq
// BODY:
//{
//     "id":"43217-2023-02-22 13:02:16",
//     "status":"Denied"
// }

//Update REiPUNCHIN REQUEST
//URL: http://localhost:3002/updatePunchInReq
//BODY:
// {
//     "id":"punchIn43217-2023-02-22 13:45:18",
//     "status":"Denied"
// }

//Ignore This (Update Fromat)
// table = `txn_leave_application`;
// updates = {
//   reason_for_leave: "ESSEHI",
//   status: "Accepted",
// };
// condition = { unique: "id", value: "43217-2023-02-22 13:02:16" };
