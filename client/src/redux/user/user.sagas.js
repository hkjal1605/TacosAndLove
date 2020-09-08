import { takeLatest, call, put, all } from "redux-saga/effects";

import axios from "axios";

import {
  setCurrentUser,
  loginUserFailure,
  signupUserFailure,
  logoutCurrentUserSuccess,
  logoutCurentUserFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordFailure,
} from "./user.actions";

import { fetchUserCartSuccess } from "../cart/cart.actions";

import UserActionTypes from "./user.types";

export function* loginUserAsync({ payload }) {
  try {
    const user = yield axios.post("/api/v1/customer/login", {
      email: payload.email,
      password: payload.password,
    });

    yield put(setCurrentUser(user.data.data.user));

    const cart = yield axios.get("/api/v1/customer/cart");

    yield put(fetchUserCartSuccess(cart.data.data.cart));
  } catch (err) {
    yield put(loginUserFailure(err.response.data.message));
  }
}

export function* signupUserAsync({ payload }) {
  try {
    const user = yield axios.post("/api/v1/customer/signup", {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    });

    yield put(setCurrentUser(user.data.data.user));

    const cart = yield axios.get("/api/v1/customer/cart");

    yield put(fetchUserCartSuccess(cart.data.data.cart));
  } catch (err) {
    yield put(signupUserFailure(err.response.data.message));
  }
}

export function* logoutUserAsync() {
  try {
    yield axios.get("/api/v1/customer/logout");

    yield put(logoutCurrentUserSuccess());
  } catch (err) {
    yield put(logoutCurentUserFailure(err.response.data.message));
  }
}

export function* forgotPasswordAsync({ payload }) {
  try {
    yield axios.post("/api/v1/customer/forgotPassword", {
      email: payload,
    });

    yield put(forgotPasswordSuccess());
  } catch (err) {
    yield put(forgotPasswordFailure(err.response.data.message));
  }
}

export function* resetPasswordAsync({ payload }) {
  console.log(payload);
  try {
    const user = yield axios.patch(
      `/api/v1/customer/resetPassword/${payload.token}`,
      {
        password: payload.password,
        confirmPassword: payload.confirmPassword,
      }
    );

    yield put(setCurrentUser(user.data.data.user));
  } catch (err) {
    yield put(resetPasswordFailure(err.response.data.message));
  }
}

export function* loginUserStart() {
  yield takeLatest(UserActionTypes.LOGIN_CURRENT_USER_START, loginUserAsync);
}

export function* signupUserStart() {
  yield takeLatest(UserActionTypes.SIGNUP_CURRENT_USER_START, signupUserAsync);
}

export function* logoutUserStart() {
  yield takeLatest(UserActionTypes.LOGOUT_CURRENT_USER_START, logoutUserAsync);
}

export function* forgotPasswordStart() {
  yield takeLatest(UserActionTypes.FORGOT_PASSWORD, forgotPasswordAsync);
}

export function* resetPasswordStart() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD, resetPasswordAsync);
}

export function* userSagas() {
  yield all([
    call(loginUserStart),
    call(signupUserStart),
    call(logoutUserStart),
    call(forgotPasswordStart),
    call(resetPasswordStart),
  ]);
}
