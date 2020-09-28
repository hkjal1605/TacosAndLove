import AdminActionTypes from "./admin.types";

export const getAllBookingsStart = () => ({
  type: AdminActionTypes.GET_ALL_BOOKINGS_START,
});

export const getAllBookingsSuccess = (bookings) => ({
  type: AdminActionTypes.GET_ALL_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const getAllBookingsFailure = (err) => ({
  type: AdminActionTypes.GET_ALL_BOOKINGS_FAILURE,
  payload: err,
});

export const getAllEmployeesStart = () => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEES_START,
});

export const getAllEmployeesSuccess = (employees) => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const getAllEmployeesFailure = (err) => ({
  type: AdminActionTypes.GET_ALL_EMPLOYEES_FAILURE,
  payload: err,
});

export const updateEmployeeStart = (employeeId, updatedBody) => ({
  type: AdminActionTypes.UPDATE_EMPLOYEE_START,
  payload: { employeeId, updatedBody },
});

export const updateEmployeeSuccess = (message) => ({
  type: AdminActionTypes.UPDATE_EMPLOYEE_SUCCESS,
  payload: message,
});

export const updateEmployeeFailure = (err) => ({
  type: AdminActionTypes.UPDATE_EMPLOYEE_FAILURE,
  payload: err,
});

export const getEmployeeStart = (employeeId) => ({
  type: AdminActionTypes.GET_EMPLOYEE_START,
  payload: employeeId,
});

export const getEmployeeSuccess = (employee) => ({
  type: AdminActionTypes.GET_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const getEmployeeFailure = (err) => ({
  type: AdminActionTypes.GET_EMPLOYEE_FAILURE,
  payload: err,
});
