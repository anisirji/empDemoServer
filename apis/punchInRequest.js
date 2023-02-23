const { writeDb } = require("../dbUtil");

async function punchInRequest(application) {
  try {
    const { employee_id, reason } = application;
    const id = `punchIn${employee_id}-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}`;
    const table = "txn_re_punch_in";
    const fields = [
      "id",
      "employee_id",
      "reason",
      "status",
      "entry_date",
      "activity",
    ];
    const value = [
      id,
      employee_id,
      reason,
      "Active",
      new Date().toISOString().slice(0, 19).replace("T", " "),
      `Requested Re-Punch-In, on ${new Date()
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
    } else {
      return {
        flag: false,
        message: putData.message,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      flag: false,
      message: `Error occurred ${e}`,
    };
  }
}

module.exports = { punchInRequest };
