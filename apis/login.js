const { runQuary } = require("../dbUtil");
const db_table = "data_employee";

async function Login({ employee_mobile, password }) {
  try {
    const loginData = await runQuary(
      `SELECT
    A.id,
    A.active,
    A.employee_name,
    A.employee_mobile,
    B.password,
    C.role
    FROM data_employee AS A JOIN
    data_users AS B ON A.id = B.employee_id JOIN
    meta_user_role AS C ON B.role_id = C.id
    WHERE employee_mobile = '${employee_mobile}' ORDER BY B.entry_date DESC LIMIT 1;`
    );
    if (!loginData) {
      return {
        flag: false,
        message: "Invalid User",
      };
    } else if (loginData[0][0]["active"] === "NO") {
      return {
        flag: false,
        message: "User is de-activated",
      };
    } else {
      if (loginData[0][0]["password"] === password) {
        return {
          flag: true,
          message: "User Logged In",
          data: {
            employee_id: loginData[0][0]["id"],
            employee_name: loginData[0][0]["employee_name"],
            employee_mobile: loginData[0][0]["employee_mobile"],
            role: loginData[0][0]["role"],
          },
        };
      } else {
        return {
          flag: false,
          message: "Incorrect password entered",
        };
      }
    }
  } catch (e) {
    console.log(e);
    return {
      flag: false,
      message: "Some Error Occured",
    };
  }
}

module.exports = Login;
