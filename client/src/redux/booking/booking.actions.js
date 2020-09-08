import bookingActionTypes from "./booking.types";

export const getCheckoutSession = (session) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION,
  payload: session,
});

export const getCheckoutSessionStart = (cartId) => ({
  type: bookingActionTypes.GET_CHECKOUT_SESSION_START,
  payload: { cartId },
});

export const fetchUserBookingsStart = () => ({
  type: bookingActionTypes.GET_USER_BOOKINGS_START,
});

export const fetchUserBookingsSuccess = (booking) => ({
  type: bookingActionTypes.GET_USER_BOOKINGS_SUCCESS,
  payload: booking,
});

export const fetchUserBookingsFailure = (err) => ({
  type: bookingActionTypes.GET_USER_BOOKINGS_FAILURE,
  payload: err,
});
