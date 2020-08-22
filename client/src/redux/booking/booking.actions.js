import bookingActionTypes from "./booking.types";

const stripe = Stripe(
  "pk_test_51HH8C9DmhdHRcXnzhvTtC5tr3bHnZju3Y6NfARBqIiQ6WMuZm5pFEA12tXd5h4ZudV3eP1rN3Lp0PZlNOmtS5KHD00tw3OonWr"
);

export const getCheckoutSessionStart = (cartId) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION_START,
  payload: { cartId, stripe },
});

export const getCheckoutSession = (session) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION,
  payload: session,
});
