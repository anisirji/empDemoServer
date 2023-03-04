const { writeDb } = require("../dbUtil");

async function locationStamp(data) {
  console.log(data);
  const { employee_id, latitude, longitude, timestamp, flag_value } = data;
  const db_table = "txn_geolocation";

  try {
    const fields = [
      "employee_id",
      "latitude",
      "longitude",
      "timestamp",
      "flag_value",
    ];
    const values = [
      employee_id,
      latitude,
      longitude,
      timestamp,
      //new Date().toISOString().slice(0, 19).replace("T", " "),
      flag_value,
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
