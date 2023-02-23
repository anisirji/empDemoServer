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

async function getAllPunchInRequests() {
  const table = "txn_re_punch_in";
  try {
    const request = await readDb(table);
    return request;
  } catch (e) {
    return {
      flag: false,
      message: `error Occured ${e.message}`,
    };
  }
}

async function getSinglePunchInRequest({ id }) {
  const table = "txn_re_punch_in";
  try {
    const request = await readDbs(table, {
      field: "id",
      value: id,
    });
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
