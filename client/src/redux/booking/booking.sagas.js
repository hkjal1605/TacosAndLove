import { takeLatest, call, put, all } from "redux-saga/effects";

import { getCheckoutSession } from "./booking.actions";

import axios from "axios";
import bookingActionTypes from "./booking.types";

/* global Stripe */
// const stripe = Stripe(
//   "pk_test_51HH8C9DmhdHRcXnzhvTtC5tr3bHnZju3Y6NfARBqIiQ6WMuZm5pFEA12tXd5h4ZudV3eP1rN3Lp0PZlNOmtS5KHD00tw3OonWr"
// );

export function* getCheckoutSessionAsync({ payload }) {
  try {
    const session = yield axios.get(
      `/api/v1/booking/checkout-session/${payload.cartId}`
    );

    yield put(getCheckoutSession(session));

    // yield stripe.redirectToCheckout({
    //   sessionId: session.data.session.id,
    // });
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
