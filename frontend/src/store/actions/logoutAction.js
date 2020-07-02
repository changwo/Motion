import { USER_LOGOUT } from "../types";

export const userLogout = () => (dispatch, getState) => {
  localStorage.clear();
  dispatch(logout());
};

export const logout = () => {
  return {
    type: USER_LOGOUT,
    payload: null,
  };
};
