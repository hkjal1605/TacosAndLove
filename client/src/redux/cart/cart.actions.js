import CartActionTypes from "./cart.types";

export const addToCartStart = (itemName, itemId) => ({
  type: CartActionTypes.ADD_TO_CART_START,
  payload: { itemName, itemId },
});

export const addToCartSuccess = (cart) => ({
  type: CartActionTypes.ADD_TO_CART_SUCCESS,
  payload: cart,
});

export const addToCartFailure = (err) => ({
  type: CartActionTypes.ADD_TO_CART_FAILURE,
  payload: err,
});

export const removeFromCartStart = (itemName, itemId) => ({
  type: CartActionTypes.REMOVE_FROM_CART_START,
  payload: { itemName, itemId },
});

export const removeFromCartSuccess = (cart) => ({
  type: CartActionTypes.REMOVE_FROM_CART_SUCCESS,
  payload: cart,
});

export const removeFromCartFailure = (err) => ({
  type: CartActionTypes.REMOVE_FROM_CART_FAILURE,
  payload: err,
});

export const fetchUserCartStart = () => ({
  type: CartActionTypes.FETCH_USER_CART_START,
});

export const fetchUserCartSuccess = (cart) => ({
  type: CartActionTypes.FETCH_USER_CART_SUCCESS,
  payload: cart,
});

export const fetchUserCartFailure = (err) => ({
  type: CartActionTypes.FETCH_USER_CART_FAILURE,
  payload: err,
});

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
