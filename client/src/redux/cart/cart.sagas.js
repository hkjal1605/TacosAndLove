import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  addToCartSuccess,
  addToCartFailure,
  removeFromCartSuccess,
  removeFromCartFailure,
  fetchUserCartSuccess,
  fetchUserCartFailure,
} from "./cart.actions";
import CartActionTypes from "./cart.types";

import axios from "axios";

export function* fetchUserCartAsync() {
  try {
    const cart = yield axios.get("/api/v1/customer/cart");

    yield put(fetchUserCartSuccess(cart.data.data.cart));
  } catch (err) {
    yield put(fetchUserCartFailure(err.response.data.message));
  }
}

export function* addToCartAsync({ payload }) {
  try {
    const cart = yield axios.post(
      `/api/v1/${payload.itemName}/${payload.itemId}`
    );

    yield put(addToCartSuccess(cart.data.data.cart));
  } catch (err) {
    yield put(addToCartFailure(err.response.data.message));
  }
}

export function* removeFromCartAsync({ payload }) {
  try {
    console.log(payload);
    const cart = yield axios.get(
      `/api/v1/${payload.itemName}/remove/${payload.itemId}`
    );

    yield put(removeFromCartSuccess(cart.data.data.cart));
  } catch (err) {
    yield put(removeFromCartFailure(err.response.data.message));
  }
}

export function* fetchUserCartStart() {
  yield takeLatest(CartActionTypes.FETCH_USER_CART_START, fetchUserCartAsync);
}

export function* addToCartStart() {
  yield takeLatest(CartActionTypes.ADD_TO_CART_START, addToCartAsync);
}

export function* removeFromCartStart() {
  yield takeLatest(CartActionTypes.REMOVE_FROM_CART_START, removeFromCartAsync);
}

export function* cartSagas() {
  yield all([
    call(fetchUserCartStart),
    call(addToCartStart),
    call(removeFromCartStart),
  ]);
}
