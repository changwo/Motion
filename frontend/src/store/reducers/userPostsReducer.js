import {SET_USER_PROFILE_POSTS, RESET_USER_PROFILE_POSTS, SET_SINGLE_PROFILE_POST} from "../types";

const initialState = {
    postList: null,

};

export const userPostsReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case SET_USER_PROFILE_POSTS: {
            return {...newState, postList: action.posts};
        }
        case RESET_USER_PROFILE_POSTS: {
            return initialState
        }
        case SET_SINGLE_PROFILE_POST: {
            let index = newState.postList.findIndex(post => post.id === action.post.id)
            newState.postList[index] = action.post
            return {...newState, postList: newState.postList};
        }
        default:
            return state;
    }
};
