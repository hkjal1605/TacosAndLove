import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const { default: AdminActionTypes } = require("./admin.types");

const INITIAL_STATE = {
  bookings: null,
  employees: null,
  employee: null,
  isBookingsFetching: false,
  isEmployeesFetching: false,
  isEmployeeUpdating: false,
  isEmployeeFetching: false,
  errorMessage: undefined,
};

const MySwal = withReactContent(Swal);

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
    case AdminActionTypes.GET_ALL_EMPLOYEES_START:
      return {
        ...state,
        isEmployeesFetching: true,
      };
    case AdminActionTypes.GET_ALL_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isEmployeesFetching: false,
        employees: action.payload,
      };
    case AdminActionTypes.GET_ALL_EMPLOYEES_FAILURE:
      return {
        ...state,
        isEmployeesFetching: false,
        errorMessage: action.payload,
      };
    case AdminActionTypes.UPDATE_EMPLOYEE_START:
      return {
        ...state,
        isEmployeeUpdating: true,
      };
    case AdminActionTypes.UPDATE_EMPLOYEE_SUCCESS:
      MySwal.fire({
        title: action.payload,
        timer: 4000,
        timerProgressBar: false,
      });
      return {
        ...state,
        isEmployeeUpdating: false,
      };
    case AdminActionTypes.UPDATE_EMPLOYEE_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 4000,
        timerProgressBar: false,
      });
      return {
        ...state,
        isEmployeeUpdating: false,
      };
    case AdminActionTypes.GET_EMPLOYEE_START:
      return {
        ...state,
        isEmployeeFetching: true,
      };
    case AdminActionTypes.GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isEmployeeFetching: false,
        employee: action.payload,
      };
    case AdminActionTypes.GET_EMPLOYEE_FAILURE:
      return {
        ...state,
        isEmployeeFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
