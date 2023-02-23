const { writeDb } = require("../dbUtil");

async function requestLeave(application) {
  try {
    const { employee_id, reason_for_leave, from_date, to_date } = application;
    const id = `${employee_id}-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}`;
    const table = "txn_leave_application";
    const fields = [
      "id",
      "employee_id",
      "reason_for_leave",
      "from_date",
      "to_date",
      "status",
      "activity",
    ];
    const value = [
      id,
      employee_id,
      reason_for_leave,
      from_date,
      to_date,
      "Active",
      `Requested Leave Application on ${new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")}~`,
    ];

    const putData = await writeDb(table, fields, value);
    if (putData.flag) {
      return {
        flag: true,
        message: `Application Submitted`,
      };
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { requestLeave };
