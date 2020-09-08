import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsUserDropdownHidden = createSelector(
  [selectUser],
  (user) => user.hidden
);

export const selectIsPasswordResetMailSent = createSelector(
  [selectUser],
  (user) => user.mailSent
);

export const selectShowLoader = createSelector(
  [selectUser],
  (user) => user.showLoader
);
