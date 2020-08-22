import { takeLatest, call, put, all } from "redux-saga/effects";

import { getCheckoutSession } from "./booking.actions";

import axios from "axios";
import bookingActionTypes from "./booking.types";

export function* getCheckoutSessionAsync({ payload }) {
  try {
    const session = yield axios.get(
      `/api/v1/booking/checkout-session/${payload.cartId}`
    );

    yield put(getCheckoutSession(session));

    yield payload.stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* getCheckoutSessionStart() {
  yield takeLatest(
    bookingActionTypes.GET_CHECKOUT_SESSION_START,
    getCheckoutSessionAsync
  );
}

export function* bookingSagas() {
  yield all([call(getCheckoutSessionStart)]);
}
