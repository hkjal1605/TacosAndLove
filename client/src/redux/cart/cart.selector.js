import { createSelector } from "reselect";

export const selectCart = (state) => state.cart;

export const selectUserCart = createSelector([selectCart], (cart) =>
  cart ? cart.cart : null
);

export const selectIsCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);
