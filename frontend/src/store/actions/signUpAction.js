
import {
  TOGGLE_CODE_SENT,
  SEND_SIGNUP_ERROR,
  NEXT_PAGE,
  TOGGLE_SIGNUP,
  RESET_REGISTRATION,
} from "../types";
import Axios from "../../axios";

export const sendCode = data => async (dispatch) => {
  try {
    const response = await Axios.post('auth/registration/', data);
    await dispatch({ type: TOGGLE_CODE_SENT, data })
    console.log("successads!", response.data)
    return response
  } catch (e) {
    await dispatch(sendSignUpError(e.response.data.email[0]));
    console.log("error message", e.response )
    return e.response
  }
}

export const validate = data => async (dispatch) => {
  try {
    const response = await Axios.post('auth/registration/validation/', data);
    await dispatch({ type: TOGGLE_SIGNUP })
    await dispatch({ type: RESET_REGISTRATION })
    return response
  } catch (e) {
    return e.response
  }
}

export const sendSignUpError = (error) => {
  return {
    type: SEND_SIGNUP_ERROR,
    error,
  };
};

export const nextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};
