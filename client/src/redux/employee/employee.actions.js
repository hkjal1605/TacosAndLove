import EmployeeActionTypes from "./employee.types";

export const loginEmployeeStart = (employeeId, password) => ({
  type: EmployeeActionTypes.LOGIN_EMPLOYEE_START,
  payload: { employeeId, password },
});

export const loginEmployeeSuccess = (employee) => ({
  type: EmployeeActionTypes.LOGIN_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const loginEmployeeFailure = (err) => ({
  type: EmployeeActionTypes.LOGIN_EMPLOYEE_FAILURE,
  payload: err,
});

export const logoutEmployeeStart = () => ({
  type: EmployeeActionTypes.LOGOUT_EMPLOYEE_START,
});

export const logoutEmployeeSuccess = () => ({
  type: EmployeeActionTypes.LOGOUT_EMPLOYEE_SUCCESS,
});

export const logoutEmployeeFailure = (err) => ({
  type: EmployeeActionTypes.LOGOUT_EMPLOYEE_FAILURE,
  payload: err,
});
