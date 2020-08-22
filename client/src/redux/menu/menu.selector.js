import { createSelector } from "reselect";

export const selectMenu = (state) => state.menu;

export const selectMenuList = createSelector([selectMenu], (menu) =>
  menu ? menu.menu : null
);

export const selectIsMenuListFetching = createSelector(
  [selectMenu],
  (menu) => menu.isFetching
);
