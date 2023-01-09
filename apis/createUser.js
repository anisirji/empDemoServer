const { writeDb } = require("../dbUtil");

async function createUser(data) {
  const { name, mobile, email } = data;
  const db_table = "data_employee";

  try {
    const id = `${Math.floor(Math.random() * 100000)}-${name.slice(0, 4)}`;
    const fields = ["id", "name", "user_name", "mobile", "email", "clinet_id"];
    const values = [
      id,
      name,
      id,
      String(mobile),
      email,
      Math.floor(Math.random() * 100000),
    ];
    console.log(values);
    const createCus = await writeDb(db_table, fields, values);
    if (createCus.flag) {
      console.log("new user created " + name + "\nClient Id : " + id);
      return {
        flag: true,
        message: `New user Created ${name}`,
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
