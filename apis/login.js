const { readDb, readDbs } = require("../dbUtil");
const db_table = "data_employee";

async function Login({ employee_id }) {
  const mobile_no = employee_id;
  try {
    const stamp = await readDbs(db_table, {
      field: "employee_mobile",
      value: mobile_no,
    });

    if (stamp.flag) {
      return {
        flag: true,
        message: "User Logged in",
        data: stamp.data,
      };
    } else if (stamp.data > 0) {
      return {
        flag: false,
        message: "no User found",
      };
    } else {
      return stamp.message;
    }
  } catch (e) {
    return {
      flag: false,
      message: `Error Occured ${e.message}`,
    };
  }
}

module.exports = Login;
