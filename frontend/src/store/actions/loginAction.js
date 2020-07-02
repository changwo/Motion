import {USER_LOGIN, SEND_ERROR} from "../types";
import Axios from "../../axios";
import {getLoggedInUserAction, setLoggedInUser} from "./userAction";

export const login = (token) => {
    return {
        type: USER_LOGIN,
        token,
    };
};



export const sendError = (error) => {
    return {
        type: SEND_ERROR,
        error,
    };
};

export const sendLogin = data => async (dispatch) => {
    try {

        const response = await Axios.post('auth/token/', data);
        const {data: {access: token, user},} = response
        dispatch(getLoggedInUserAction())
        dispatch(login(token));
        localStorage.setItem("token", token);
        // dispatch(setLoggedInUser(user));
        // localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
        console.log("error", error)
        // const {
        //     response: {
        //         data: {detail},
        //     },
        // } = error;
        dispatch(sendError('The credentials are not valid'));
        return error
    }
}
