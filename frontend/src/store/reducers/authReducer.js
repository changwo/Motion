import { USER_LOGIN, USER_LOGOUT, SEND_ERROR } from "../types";

const initialState = {
  token: null,
  authenticated: null,
  error: null,
  
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      const newState = {
        ...state,
        token: action.token,
        authenticated: true,
        error: null,
      };
      return newState;
    }
    case USER_LOGOUT: {
      localStorage.clear()
      const newState = {
        ...state,
        token: null,
        authenticated: false,
        error: null,
      };
      return newState;
    }
    case SEND_ERROR: {
      const newState = {
        ...state,
        token: null,
        authenticated: false,
        error: action.error,
      };
      return newState;
    }

    default:
      return state;
  }
};
