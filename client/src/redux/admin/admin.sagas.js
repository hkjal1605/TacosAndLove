import axios from "axios";
import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  getAllBookingsFailure,
  getAllBookingsSuccess,
  getAllEmployeesFailure,
  getAllEmployeesSuccess,
  getEmployeeFailure,
  getEmployeeSuccess,
  updateEmployeeFailure,
  updateEmployeeSuccess,
} from "./admin.actions";

import AdminActionTypes from "./admin.types";

export function* getAllBookingsAsync() {
  try {
    const bookings = yield axios.get("/api/v1/booking");

    yield put(getAllBookingsSuccess(bookings.data.data.doc));
  } catch (err) {
    yield put(getAllBookingsFailure(err.response.data.message));
  }
}

export function* getAllEmployeesAsync() {
  console.log("here");
  try {
    const employees = yield axios.get("/api/v1/employees");

    yield put(getAllEmployeesSuccess(employees.data.data.doc));
  } catch (err) {
    yield put(getAllEmployeesFailure(err.response.data.message));
  }
}

export function* updateEmployeeAsync(payload) {
  try {
    const data = yield axios.patch(
      `/api/v1/employees/${payload.payload.employeeId}`,
      payload.payload.updatedBody
    );

    yield put(updateEmployeeSuccess(data.data.message));
  } catch (err) {
    yield put(updateEmployeeFailure(err.response.data.message));
  }
}

export function* getEmployeeAsync(payload) {
  try {
    console.log(payload);
    const employee = yield axios.get(`/api/v1/employees/${payload.payload}`);

    yield put(getEmployeeSuccess(employee.data.data.doc));
  } catch (err) {
    yield put(getEmployeeFailure(err.response.data.message));
  }
}

export function* getAllBookingsStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_BOOKINGS_START,
    getAllBookingsAsync
  );
}

export function* getAllEmployeesStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_EMPLOYEES_START,
    getAllEmployeesAsync
  );
}

export function* updateEmployeeStart() {
  yield takeLatest(AdminActionTypes.UPDATE_EMPLOYEE_START, updateEmployeeAsync);
}

export function* getEmployeeStart() {
  yield takeLatest(AdminActionTypes.GET_EMPLOYEE_START, getEmployeeAsync);
}

export function* adminSagas() {
  yield all([
    call(getAllBookingsStart),
    call(getAllEmployeesStart),
    call(updateEmployeeStart),
    call(getEmployeeStart),
  ]);
}
