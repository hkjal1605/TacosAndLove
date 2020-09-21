import { createSelector } from "reselect";

const selectEmployee = (state) => state.employee;

export const selectCurrentEmployee = createSelector(
  [selectEmployee],
  (employee) => employee.employee
);
