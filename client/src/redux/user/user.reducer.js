import UserActionTypes from "./user.types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const INITIALSTATE = {
  currentUser: null,
  hidden: true,
  mailSent: false,
  showLoader: false,
};

const MySwal = withReactContent(Swal);

const userReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      MySwal.fire({
        title: "Sucessfully Logged In!",
        timer: 2000,
        timerProgressBar: false,
      });
      return {
        ...state,
        currentUser: action.payload,
        mailSent: false,
      };
    case UserActionTypes.LOGIN_CURRENT_USER_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        errorMessage: action.payload,
      };
    case UserActionTypes.SIGNUP_CURRENT_USER_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        errorMessage: action.payload,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER_START:
      return {
        ...state,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: null,
        mailSent: false,
      };
    case UserActionTypes.TOGGLE_USER_OPTIONS_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case UserActionTypes.FORGOT_PASSWORD:
      return {
        ...state,
        mailSent: false,
        showLoader: true,
      };
    case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
      MySwal.fire({
        title: "Password reset token sent to your email",
        timer: 6000,
        timerProgressBar: false,
      });
      return {
        ...state,
        mailSent: true,
        showLoader: false,
      };
    case UserActionTypes.FORGOT_PASSWORD_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        mailSent: false,
        showLoader: false,
      };
    case UserActionTypes.RESET_PASSWORD:
      return {
        ...state,
      };
    case UserActionTypes.RESET_PASSWORD_FAILURE:
      MySwal.fire({
        title: action.payload,
        timer: 8000,
        timerProgressBar: false,
      });
      return {
        ...state,
        errorMessage: action.payload,
      };
    case UserActionTypes.CANCEL_RESET_PASSWORD_PROCESS:
      return {
        ...state,
        mailSent: false,
      };
    default:
      return state;
  }
};

export default userReducer;
