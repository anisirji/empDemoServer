const pool = require("./dbConnection");

async function writeDb(table, fields, values) {
  const sql = `INSERT INTO ${table} (${convertToSql(
    fields,
    "n"
  )}) VALUES (${convertToSql(values, "c")})`;

  console.log("inserting data in table: " + table);
  //   console.log(sql);

  try {
    const f = await pool.execute(sql, values);
    return {
      flag: true,
      message: "data inserted successsfully",
      response: f,
    };
  } catch (e) {
    return {
      flag: false,
      message: `encountered error: ${e.message}`,
    };
  }
}

async function readDbs(table, condition) {
  const { field, value } = condition;
  const sql = `SELECT * FROM ${table} WHERE ${field}='${value}'`;
  //   console.log(sql);
  try {
    const ff = await pool.execute(sql);
    const [data, info] = ff;
    if (data.length > 0) {
      return {
        flag: true,
        message: "Successfully got the data",
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
      message: `encountered error: ${e.message}`,
    };
  }
}

async function readDb(table) {
  const sql = `SELECT * FROM ${table}`;

  try {
    const ff = await pool.execute(sql);
    const [data, info] = ff;
    if (data.length > 0) {
      return {
        flag: true,
        message: "Successfully got the data",
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
      message: `encountered error: ${e.message}`,
    };
  }
}
//use to convert array of data into sql commands ... ignore this
function convertToSql(data, l) {
  let ff = "";
  for (let i = 0; i < data.length; i++) {
    if (l == "n") {
      if (i == data.length - 1) ff += data[i];
      else ff += data[i] + ",";
    } else {
      if (i == data.length - 1) ff += "?";
      else ff += "?,";
    }
  }
  return ff;
}

module.exports = { writeDb, readDb, readDbs };
