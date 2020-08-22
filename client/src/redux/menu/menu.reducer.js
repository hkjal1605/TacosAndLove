import MenuActionTypes from "./menu.types";

const INITIAL_STATE = {
  menu: null,
  isFetching: false,
  errorMessage: undefined,
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MenuActionTypes.FETCH_MENU_START:
      return {
        ...state,
        isFetching: true,
      };
    case MenuActionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        isFetching: false,
        menu: action.payload,
      };
    case MenuActionTypes.FETCH_MENU_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default menuReducer;
