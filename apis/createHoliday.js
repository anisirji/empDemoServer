const { writeDb } = require("../dbUtil");

async function createholiday(data) {
  const { holiday_from_date, holiday_to_date, holiday_reason } = data;
  const db_table = "data_calendar";

  try {
    const id = `${new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")}-${holiday_reason.slice(0, 4)}`;
    const fields = [
      "id",
      "holiday_from_date",
      "holiday_to_date",
      "holiday_reason",
      "active",
    ];
    const values = [
      id,
      holiday_from_date,
      holiday_to_date,
      holiday_reason,
      "yes",
    ];
    console.log(values);
    const createCus = await writeDb(db_table, fields, values);
    if (createCus.flag) {
      console.log(
        "new holiday created " + holiday_reason + "\nClient Id : " + id
      );
      return {
        flag: true,
        message: `New holiday Created ${holiday_reason}`,
      };
    } else {
      return {
        flag: false,
        message: createCus.message,
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

module.exports = createholiday;
