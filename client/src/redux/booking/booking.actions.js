import bookingActionTypes from "./booking.types";

export const getCheckoutSession = (session) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION,
  payload: session,
});

export const getCheckoutSessionStart = (cartId) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION_START,
  payload: { cartId },
});
