import bookingActionTypes from "./booking.types";

export const getCheckoutSessionStart = (cartId) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION_START,
  payload: { cartId },
});

export const getCheckoutSession = (session) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION,
  payload: session,
});
