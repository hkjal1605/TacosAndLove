import AdminActionTypes from "./admin.types";

export const getAllBookingsStart = () => ({
  type: AdminActionTypes.GET_ALL_BOOKINGS_START,
});

export const getAllBookingsSuccess = (bookings) => ({
  type: AdminActionTypes.GET_ALL_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const getAllBookingsFailure = (err) => ({
  type: AdminActionTypes.GET_ALL_BOOKINGS_FAILURE,
  payload: err,
});
