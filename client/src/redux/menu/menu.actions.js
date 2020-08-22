import MenuActionTypes from "./menu.types";

export const fetchMenuStart = () => ({
  type: MenuActionTypes.FETCH_MENU_START,
});

export const fetchMenuSuccess = (menu) => ({
  type: MenuActionTypes.FETCH_MENU_SUCCESS,
  payload: menu,
});

export const fetchMenuFailure = (errMessage) => ({
  type: MenuActionTypes.FETCH_MENU_FAILURE,
  payload: errMessage,
});
