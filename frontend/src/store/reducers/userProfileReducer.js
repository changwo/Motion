import {RESET_USER_PROFILE, SET_USER_PROFILE} from "../types";

const initialState = {};

export const userProfileReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {...newState, ...action.userObj};
        }
        case RESET_USER_PROFILE: {
            return initialState
        }
        default:
            return state;
    }
};
