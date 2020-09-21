import axios from "axios";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { getAllBookingsFailure, getAllBookingsSuccess } from "./admin.actions";

import AdminActionTypes from "./admin.types";

export function* getAllBookingsAsync() {
  try {
    const bookings = yield axios.get("/api/v1/booking");

    yield put(getAllBookingsSuccess(bookings.data.data.doc));
  } catch (err) {
    yield put(getAllBookingsFailure(err.response.data.message));
  }
}

export function* getAllBookingsStart() {
  yield takeLatest(
    AdminActionTypes.GET_ALL_BOOKINGS_START,
    getAllBookingsAsync
  );
}

export function* adminSagas() {
  yield all([call(getAllBookingsStart)]);
}
