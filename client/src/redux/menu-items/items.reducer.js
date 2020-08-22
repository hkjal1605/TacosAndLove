import ItemActionTypes from "./items.types";

const INITIAL_STATE = {
  item: null,
  isFetching: false,
  errorMessage: undefined,
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.FETCH_ITEMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ItemActionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        item: action.payload,
      };
    case ItemActionTypes.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
