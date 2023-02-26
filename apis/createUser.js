const { writeDb } = require("../dbUtil");

async function createUser(data) {
  const {
    entry_by,
    mod_by,
    mod_date,
    active,
    employee_name,
    employee_mobile,
    employee_email,
    employee_dob,
    employee_doj,
    employee_UAN,
    employee_ESICN,
  } = data;
  const db_table = "data_employee";

  try {
    const id = `${Math.floor(Math.random() * 100000)}-${employee_name.slice(
      0,
      4
    )}`;
    const fields = [
      "entry_by",
      "entry_date",
      "mod_by",
      "mod_date",
      "active",
      "employee_code",
      "employee_name",
      "employee_mobile",
      "employee_email",
      "employee_dob",
      "employee_doj",
      "employee_UAN",
      "employee_ESICN",
    ];
    const values = [
      entry_by,
      new Date().toISOString().slice(0, 19).replace("T", " "),
      mod_by,
      mod_date,
      active,
      id,
      employee_name,
      employee_mobile,
      employee_email,
      employee_dob,
      employee_doj,
      employee_UAN,
      employee_ESICN,
    ];
    console.log(values);
    const createCus = await writeDb(db_table, fields, values);
    if (createCus.flag) {
      console.log("new user created " + employee_name + "\nClient Id : " + id);
      return {
        flag: true,
        message: `New user Created ${employee_name}`,
        data: {
          id: id,
        },
      };
    }
  } catch (e) {
    console.log("create user Error : " + e);
    return {
      flag: false,
      message: `Error : ${e.message}`,
    };
  }
}

module.exports = createUser;
