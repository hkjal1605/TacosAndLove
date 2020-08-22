import ItemActionTypes from "./items.types";
import Axios from "axios";

export const fetchItemStart = () => ({
  type: ItemActionTypes.FETCH_ITEMS_START,
});

export const fetchItemSuccess = (item) => ({
  type: ItemActionTypes.FETCH_ITEMS_SUCCESS,
  payload: item,
});

export const fetchItemFailure = (err) => ({
  type: ItemActionTypes.FETCH_ITEMS_FAILURE,
  payload: err,
});

export const fetchItemStartAsync = (itemName) => {
  return async (dispatch) => {
    try {
      dispatch(fetchItemStart());

      const item = await Axios.get(`/api/v1/${itemName}`);
      dispatch(fetchItemSuccess(item.data.data.doc));
    } catch (err) {
      dispatch(fetchItemFailure(err.message));
    }
  };
};
