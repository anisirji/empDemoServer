const { readDb, readDbs } = require("../dbUtil");

async function getAllUserList() {
  try {
    const users = await readDb("data_employee");
    return users;
  } catch (e) {
    return {
      flag: false,
      message: `error Occured ${e.message}`,
    };
  }
}

async function getAllHolidayList() {
  try {
    const holidays = await readDb("data_calendar");
    return holidays;
  } catch (e) {
    return {
      flag: false,
      message: `error Occured ${e.message}`,
    };
  }
}

async function getAllLeaveApplications() {
  const table = "txn_leave_application";
  try {
    const applications = await readDb(table);
    return applications;
  } catch (e) {
    return {
      flag: false,
      message: `error Occured ${e.message}`,
    };
  }
}

async function getSingleLeaveApplicaion({ id }) {
  const table = "txn_leave_application";
  try {
    const applications = await readDbs(table, {
      field: "id",
      value: id,
    });
    return applications;
  } catch (e) {
    return {
      flag: false,
      message: `error Occured ${e.message}`,
    };
  }
}

async function getAllPunchInRequests(status) {
  const table = "txn_re_punch_in";
  if (status) {
    try {
      const request = await readDb(table);
      return request;
    } catch (e) {
      return {
        flag: false,
        message: `error Occured ${e.message}`,
      };
    }
  } else {
    try {
      status = status.toUpperCase();
      console.log(status);
      const request = await readDbs(table, { field: "status", value: status });
      return request;
    } catch (e) {
      return {
        flag: false,
        message: `error Occured ${e.message}`,
      };
    }
  }
}

async function getSinglePunchInRequest({ id }) {
  const table = "txn_re_punch_in";
  try {
    let request = await readDbs(table, {
      field: "id",
      value: id,
    });
    const user = await readDbs("data_employee", {
      field: "id",
      value: request.data[0]["employee_id"],
    });
    // console.log(user);
    const infos = user.data[0];
    const data = request.data[0];
    // console.log("data", data);
    request = {
      ...data,
      employee_name: infos["employee_name"],
      employee_mobile: infos["employee_mobile"],
    };
    return request;
  } catch (e) {
    return {
      flag: false,
      message: `error Occured ${e.message}`,
    };
  }
}

module.exports = {
  getAllHolidayList,
  getAllLeaveApplications,
  getAllUserList,
  getSingleLeaveApplicaion,
  getAllPunchInRequests,
  getSinglePunchInRequest,
};
