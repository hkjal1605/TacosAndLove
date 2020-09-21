import { createSelector } from "reselect";

const selectAdmin = (state) => state.admin;

export const selectAllBookings = createSelector([selectAdmin], (admin) =>
  admin.bookings ? admin.bookings : null
);

export const selectIsBookingsFetching = createSelector(
  [selectAdmin],
  (admin) => admin.isBookingsFetching
);
