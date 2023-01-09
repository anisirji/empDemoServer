const { writeDb } = require("../dbUtil");

async function locationStamp(data) {
  console.log(data);
  const { employee_id, latitude, longitude } = data;
  const db_table = "data_tracing";

  try {
    const fields = ["employee_id", "latitude", "longitude", "timestamp"];
    const values = [
      employee_id,
      latitude,
      longitude,
      new Date().toISOString().slice(0, 19).replace("T", " "),
    ];
    const createCus = await writeDb(db_table, fields, values);
    if (createCus.flag) {
      console.log("location stamp created for" + employee_id);
      return {
        flag: true,
        message: `location stamp Created ${employee_id}`,
      };
    }
  } catch (e) {
    console.log("create user Error : " + e);
    return {
      flag: false,
      message: `Error : ${e}`,
    };
  }
}

module.exports = locationStamp;
