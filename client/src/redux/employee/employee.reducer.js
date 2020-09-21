import EmployeeActionTypes from "./employee.types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const INITIAL_STATE = {
  employee: null,
  isFetching: false,
  errorMessage: undefined,
};

const MySwal = withReactContent(Swal);

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EmployeeActionTypes.LOGIN_EMPLOYEE_START:
      return {
        ...state,
        isFetching: true,
      };
    case EmployeeActionTypes.LOGIN_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        employee: action.payload,
      };
    case EmployeeActionTypes.LOGIN_EMPLOYEE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case EmployeeActionTypes.LOGOUT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employee: null,
      };
    case EmployeeActionTypes.LOGOUT_EMPLOYEE_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
