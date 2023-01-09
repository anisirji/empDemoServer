const { readDb, readDbs } = require("../dbUtil");
const db_table = "data_employee";

async function Login({ employee_id }) {
  try {
    const stamp = await readDbs(db_table, {
      field: "id",
      value: employee_id,
    });
    const { data } = stamp;
    if (data.length > 0) {
      return {
        flag: true,
        message: "User Logged in",
        data: data,
      };
    } else {
      return {
        flag: false,
        message: "no User found",
      };
    }
  } catch (e) {
    return {
      flag: false,
      message: "error occured",
      errorMessage: e.message,
    };
  }
}

module.exports = Login;
