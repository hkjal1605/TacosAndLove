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

export const toggleUserOptionsHidden = () => ({
  type: UserActionTypes.TOGGLE_USER_OPTIONS_HIDDEN,
});

export const forgotPasswordStart = (email) => ({
  type: UserActionTypes.FORGOT_PASSWORD,
  payload: email,
});

export const forgotPasswordSuccess = () => ({
  type: UserActionTypes.FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (err) => ({
  type: UserActionTypes.FORGOT_PASSWORD_FAILURE,
  payload: err,
});

export const resetPasswordStart = (token, password, confirmPassword) => ({
  type: UserActionTypes.RESET_PASSWORD,
  payload: { token, password, confirmPassword },
});

export const resetPasswordFailure = (err) => ({
  type: UserActionTypes.RESET_PASSWORD_FAILURE,
  payload: err,
});

export const cancelResetPasswordProcess = () => ({
  type: UserActionTypes.CANCEL_RESET_PASSWORD_PROCESS,
});
