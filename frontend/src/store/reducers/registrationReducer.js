import {
  TOGGLE_CODE_SENT,
  TOGGLE_SIGNUP,
  SEND_SIGNUP_ERROR,
  NEXT_PAGE,
  TOGGLE_VALIDATED,
  RESET_REGISTRATION,
} from "../types";

const initialState = {
  willSignUp: false,
  isVeriCodeSent: false,
  veriStep: 0,
  error: "",
  email: "",
  isValidated: false,
};

export const registrationReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case TOGGLE_SIGNUP:
      return { ...newState, willSignUp: !newState.willSignUp };
    case TOGGLE_CODE_SENT:
      return {
        ...newState,
        isVeriCodeSent: !newState.isVeriCodeSent,
        email: action.data.email,
      };
    case TOGGLE_VALIDATED:
      return { ...initialState, isValidated: !initialState.isValidated };
    case SEND_SIGNUP_ERROR:
      return { ...newState, error: action.error };
    case NEXT_PAGE:
      return { ...newState, veriStep: newState.veriStep + 1 };
    case RESET_REGISTRATION:
      return { ...initialState };
    default:
      return newState;
  }
};
