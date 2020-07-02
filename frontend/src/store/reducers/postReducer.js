import {
    GET_MY_POSTS,
    GET_FOLLOWING_POSTS,
    DELETE_LOCAL_POST,
    GET_MY_LIKED_POSTS,
    CHANGE_POST_MODULE,
    GET_MY_FRIENDS_POSTS, LIKE_POST, ADD_POST_TO_LIST, UPDATE_POST_IN_LIST,
} from "../types";

const initialState = {
    userPosts: null,
    followingPosts: null,
    friendPosts: null,
    likedPosts: null,
    indexOfPostTypes: 0,
};

export const postReducer = (state = initialState, action) => {
        const newState = {...state};
        switch (action.type) {
            case GET_MY_POSTS: {
                return {...newState, userPosts: action.payload};
            }
            case GET_FOLLOWING_POSTS: {
                return {...newState, followingPosts: action.payload};
            }
            case CHANGE_POST_MODULE: {
                return {...newState, indexOfPostTypes: action.payload};
            }
            case GET_MY_LIKED_POSTS: {
                return {...newState, likedPosts: action.payload};
            }
            case GET_MY_FRIENDS_POSTS: {
                return {...newState, friendPosts: action.payload};
            }
            case ADD_POST_TO_LIST: {
                return {...newState, userPosts: [action.payload.post,...newState.userPosts]};
            }
            case UPDATE_POST_IN_LIST: {
                let index = newState.userPosts.findIndex(post => post.id === action.payload.post.id)
                newState.userPosts[index] = action.payload.post
                return {...newState, userPosts: newState.userPosts};
            }
            case LIKE_POST: {
                let index = newState[action.payload.postTypeName].findIndex(post => post.id === action.payload.postId)
                newState[action.payload.postTypeName][index] = action.payload.postData
                return {...newState, [action.payload.postTypeName]: newState[action.payload.postTypeName]};
            }
            case DELETE_LOCAL_POST: {
                const newUserPosts = newState.userPosts.filter(
                    post => post.id !== action.payload.postId
                );
                return {...newState, userPosts: newUserPosts};
            }
            default: {
                return newState;
            }
        }
    }
;
