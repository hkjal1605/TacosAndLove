const { default: AdminActionTypes } = require("./admin.types");

const INITIAL_STATE = {
  bookings: null,
  isBookingsFetching: false,
  errorMessage: undefined,
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminActionTypes.GET_ALL_BOOKINGS_START:
      return {
        ...state,
        isBookingsFetching: true,
      };
    case AdminActionTypes.GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        isBookingsFetching: false,
        bookings: action.payload,
      };
    case AdminActionTypes.GET_ALL_BOOKINGS_FAILURE:
      return {
        ...state,
        isBookingsFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
