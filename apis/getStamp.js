const { readDb, readDbs } = require("../dbUtil");
const db_table = "data_tracing";

async function getAllStamp() {
  try {
    const stamp = await readDb(db_table);
    console.log(stamp);
    const { data } = stamp;
    if (data.length > 0) {
      return {
        flag: true,
        message: "successfully got the data",
        data: data,
      };
    } else {
      return {
        flag: false,
        message: "no data found",
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

async function getStamp({ employee_id }) {
  try {
    const stamp = await readDbs(db_table, {
      field: "employee_id",
      value: employee_id,
    });
    const { data } = stamp;
    if (data.length > 0) {
      return {
        flag: true,
        message: "successfully got the data",
        data: data,
      };
    } else {
      return {
        flag: false,
        message: "no data found",
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

module.exports = { getStamp, getAllStamp };
