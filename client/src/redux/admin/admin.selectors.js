import { createSelector } from "reselect";

const selectAdmin = (state) => state.admin;

export const selectAllBookings = createSelector([selectAdmin], (admin) =>
  admin.bookings ? admin.bookings : null
);

export const selectIsBookingsFetching = createSelector(
  [selectAdmin],
  (admin) => admin.isBookingsFetching
);

export const selectAllEmployees = createSelector([selectAdmin], (admin) =>
  admin.employees ? admin.employees : null
);

export const selectIsEmployeesFetching = createSelector(
  [selectAdmin],
  (admin) => admin.isEmployeesFetching
);

export const selectEmployee = createSelector([selectAdmin], (admin) =>
  admin.employee ? admin.employee : null
);

export const selectisEmployeeFetching = createSelector(
  [selectAdmin],
  (admin) => admin.isEmployeeFetching
);

export const selectIsEmployeeUpdating = createSelector(
  [selectAdmin],
  (admin) => admin.isEmployeeUpdating
);
