const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
});

const check = async () => {
  try {
    const b = await pool.execute(`SELECT * FROM data_employee`);
    console.log(
      "...🔥\n.....🔥\n......🔥\nMySql Database Server Connected Successfully"
    );
  } catch (e) {
    console.log("\n...\n....\nServer Not connected, \nError: " + e.message);
  }
};
check();
module.exports = pool;
