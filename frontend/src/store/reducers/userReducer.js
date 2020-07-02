import {SET_LOGGED_IN_USER} from "../types";

const initialState = {};

export const userReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_LOGGED_IN_USER: {

            return {...newState, ...action.userObj};
        }
        default:
            return state;
    }
};
