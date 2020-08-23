import bookingActionTypes from "./booking.types";

import axios from "axios";
const stripe = window.Stripe(
  "pk_test_51HH8C9DmhdHRcXnzhvTtC5tr3bHnZju3Y6NfARBqIiQ6WMuZm5pFEA12tXd5h4ZudV3eP1rN3Lp0PZlNOmtS5KHD00tw3OonWr"
);

export const getCheckoutSession = (session) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION,
  payload: session,
});

export const getCheckoutSessionStartAsync = (cartId) => {
  return async (dispatch) => {
    try {
      const session = await axios.get(
        `/api/v1/booking/checkout-session/${cartId}`
      );
      dispatch(getCheckoutSession(session));

      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
