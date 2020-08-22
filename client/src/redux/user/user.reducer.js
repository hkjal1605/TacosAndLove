import UserActionTypes from "./user.types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const INITIALSTATE = {
  currentUser: null,
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
      };
    default:
      return state;
  }
};

export default userReducer;
