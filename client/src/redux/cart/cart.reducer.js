import CartActionTypes from "./cart.types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const INITIAL_STATE = {
  cart: null,
  isFetching: false,
  errorMessage: undefined,
  hidden: true,
};

const MySwal = withReactContent(Swal);

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.FETCH_USER_CART_START:
      return {
        ...state,
        isFetching: true,
      };
    case CartActionTypes.FETCH_USER_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cart: action.payload,
      };
    case CartActionTypes.FETCH_USER_CART_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    case CartActionTypes.ADD_TO_CART_START:
      return {
        ...state,
        isFetching: true,
      };
    case CartActionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cart: action.payload,
      };
    case CartActionTypes.ADD_TO_CART_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case CartActionTypes.REMOVE_FROM_CART_START:
      return {
        ...state,
        isFetching: true,
      };
    case CartActionTypes.REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cart: action.payload,
      };
    case CartActionTypes.REMOVE_FROM_CART_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default cartReducer;
