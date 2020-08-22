import { createSelector } from "reselect";

export const selectItem = (state) => state.item;

export const selectItemList = createSelector([selectItem], (item) =>
  item ? item.item : null
);

export const selectIsItemListFetching = createSelector(
  [selectItem],
  (item) => item.isFetching
);
