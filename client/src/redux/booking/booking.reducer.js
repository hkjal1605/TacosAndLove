import bookingActionTypes from "./booking.types";

const INITIAL_STATE = {
  session: null,
  bookings: null,
  isFetching: false,
  errorMessage: undefined,
};

const bookingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case bookingActionTypes.GET_CHECKOUT_SESSION:
      return {
        ...state,
        session: action.payload,
      };
    case bookingActionTypes.GET_USER_BOOKINGS_START:
      return {
        ...state,
        isFetching: true,
      };
    case bookingActionTypes.GET_USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookings: action.payload,
      };
    case bookingActionTypes.GET_USER_BOOKINGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;
