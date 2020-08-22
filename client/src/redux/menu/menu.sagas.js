import { takeLatest, call, put, all } from "redux-saga/effects";

import { fetchMenuSuccess, fetchMenuFailure } from "./menu.actions";
import MenuActionTypes from "./menu.types";
import axios from "axios";

export function* fetchMenuAsync() {
  try {
    const menu = yield axios.get("/api/v1/menu");
    yield put(fetchMenuSuccess(menu.data.data.menu));
  } catch (err) {
    yield put(fetchMenuFailure(err.response.data.message));
  }
}

export function* fetchMenuStart() {
  yield takeLatest(MenuActionTypes.FETCH_MENU_START, fetchMenuAsync);
}

export function* menuSagas() {
  yield all([call(fetchMenuStart)]);
}
