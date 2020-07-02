import {CLEAR_ERROR, SET_ERROR} from "../types";

const initialState = {
    updateProfileError: null,
    updatePostError: null,
    createPostError: null,
    loginError: null,
};

export const errorReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_ERROR: {
            return {...newState, [action.payload.errorType]: action.payload.errorMessage};
        }
        case CLEAR_ERROR: {
            return {...newState, [action.payload.errorType]: null};
        }
        default:
            return state;
    }
};
