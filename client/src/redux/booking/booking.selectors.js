import { createSelector } from "reselect";

const selectBooking = (state) => state.booking;

export const selectBookingsList = createSelector([selectBooking], (booking) =>
  booking ? booking.bookings : null
);

export const selectIsBookingListFetching = createSelector(
  [selectBooking],
  (booking) => booking.isFetching
);
