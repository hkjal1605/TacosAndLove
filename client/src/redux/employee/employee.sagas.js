import { takeLatest, call, put, all } from "redux-saga/effects";

import EmployeeActionTypes from "./employee.types";

import axios from "axios";
import {
  loginEmployeeFailure,
  loginEmployeeSuccess,
  logoutEmployeeFailure,
  logoutEmployeeSuccess,
} from "./employee.actions";

export function* loginEmployeeAsync({ payload }) {
  try {
    const employee = yield axios.post("api/v1/employees/login", {
      employeeId: payload.employeeId,
      password: payload.password,
    });

    yield put(loginEmployeeSuccess(employee.data.data.user));
  } catch (err) {
    yield put(loginEmployeeFailure(err.response.data.message));
  }
}

export function* logoutEmployeeAsync() {
  try {
    yield axios.get("/api/v1/employees/logout");

    yield put(logoutEmployeeSuccess());
  } catch (err) {
    yield put(logoutEmployeeFailure(err.response.data.message));
  }
}

export function* loginEmployeeStart() {
  yield takeLatest(
    EmployeeActionTypes.LOGIN_EMPLOYEE_START,
    loginEmployeeAsync
  );
}

export function* logoutEmployeeStart() {
  yield takeLatest(
    EmployeeActionTypes.LOGOUT_EMPLOYEE_START,
    logoutEmployeeAsync
  );
}

export function* employeeSagas() {
  yield all([call(loginEmployeeStart), call(logoutEmployeeStart)]);
}
