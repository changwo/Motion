import {SET_ERROR, SET_LOGGED_IN_USER} from "../types";
import Axios from "../../axios";


export const setLoggedInUser = (userObj) => {
    return {
        type: SET_LOGGED_IN_USER,
        userObj,
    };
};

export const setError = (errorMessage, errorType) => {
    return {
        type: SET_ERROR,
        payload: {errorMessage, errorType},
    };
};

export const resetError = (errorType) => {
    return {
        type: SET_ERROR,
        payload: {errorType},
    };
};


export const updateUserAction = data => async (dispatch) => {
    try {
        const response = await Axios.patch(`users/me/`, data)
        console.log("in the patch:", response.data)
        dispatch(setLoggedInUser(response.data))
        dispatch(resetError('updatePostError'))
        return response
    } catch (error) {
        console.log('error', error.response.data)
        const errorMessage = Object.entries(error.response.data)[0][0]
        dispatch(setError(errorMessage, 'updatePostError'))
        return error
    }
}

export const getLoggedInUserAction = () => async (dispatch) => {
    try {
        const response = await Axios.get(`users/me/`)
        dispatch(setLoggedInUser(response.data))
        localStorage.setItem("user", JSON.stringify(response.data));
        return response
    } catch (error) {
        console.log('error', error.response.data)
        return error
    }
}

