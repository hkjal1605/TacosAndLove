import UserActionTypes from "./user.types";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const loginUserStart = (email, password) => ({
  type: UserActionTypes.LOGIN_CURRENT_USER_START,
  payload: { email, password },
});

export const loginUserFailure = (err) => ({
  type: UserActionTypes.LOGIN_CURRENT_USER_FAILURE,
  payload: err,
});

export const signupUserStart = (name, email, password, confirmPassword) => ({
  type: UserActionTypes.SIGNUP_CURRENT_USER_START,
  payload: { name, email, password, confirmPassword },
});

export const signupUserFailure = (err) => ({
  type: UserActionTypes.SIGNUP_CURRENT_USER_FAILURE,
  payload: err,
});

export const logoutCurrentUserStart = () => ({
  type: UserActionTypes.LOGOUT_CURRENT_USER_START,
});

export const logoutCurrentUserSuccess = () => ({
  type: UserActionTypes.LOGOUT_CURRENT_USER_SUCCESS,
});

export const logoutCurentUserFailure = (err) => ({
  type: UserActionTypes.LOGOUT_CURRENT_USER_FAILURE,
  payload: err,
});
