import {
    GET_MY_POSTS,
    GET_FOLLOWING_POSTS,
    DELETE_LOCAL_POST,
    GET_MY_LIKED_POSTS,
    CHANGE_POST_MODULE,
    GET_MY_FRIENDS_POSTS, LIKE_POST, ADD_POST_TO_LIST, UPDATE_POST_IN_LIST,
} from "../types";

import axios from "axios";
import Axios from "../../axios";
import {resetError, setError} from "./userAction";

export const changeRightPostModule = (index) => {
    return {
        type: CHANGE_POST_MODULE,
        payload: index,
    };
};

export const getPosts = (array, typeProperty) => {
    return {
        type: typeProperty,
        payload: array,
    };
};

export const getPostsAction = typeProperty => async (dispatch) => {

    let path;
    if (typeProperty === GET_MY_POSTS) {
        path = '/social/posts/me/'
    } else if (typeProperty === GET_FOLLOWING_POSTS) {
        path = '/social/posts/following/'
    } else if (typeProperty === GET_MY_LIKED_POSTS) {
        path = '/social/posts/likes/'
    } else if (typeProperty === GET_MY_FRIENDS_POSTS) {
        path = '/social/posts/friends/'
    }


    try {
        const response = await Axios.get(path);
        dispatch(getPosts(response.data, typeProperty));
    } catch (error) {
        console.log(`${typeProperty} error`, error);
    }
}

export const addPostToList = (post) => {
    return {
        type: ADD_POST_TO_LIST,
        payload: {post},
    };
}

export const createPostAction = data => async (dispatch, getState) => {

    try {
        const response = await Axios.post('/social/posts/', data);
        console.log("response", response.data)
        dispatch(addPostToList(response.data))
        dispatch(resetError('createPostError'))
        return response
    } catch (error) {
        console.log(`error`, error.response)
        const errorMessage = Object.entries(error.response.data)[0][0]
        dispatch(setError(errorMessage, 'createPostError'))
        return error
    }
}

export const updatePostInList = (post) => {
    return {
        type: UPDATE_POST_IN_LIST,
        payload: {post},
    };
}

export const updatePostAction = (data, postID) => async (dispatch) => {
    const formData = new FormData();
    formData.set("content", data.content);
    formData.set("images", data.images);
    formData.set("shared", data.shared);
    try {
        const response = await Axios.patch(`social/posts/${postID}/`, formData);
        console.log("response data", response.data)
        dispatch(updatePostInList(response.data))
        return response
    } catch (error) {
        console.log(`Updating Error Content: ${error.response.data.content.join(' ')}`)
    }
}

export const removePostFromList = (postId) => {
    return {
        type: DELETE_LOCAL_POST,
        payload: {postId},
    };
}

export const deletePostAction = postID => async (dispatch, getState) => {

    try {
        const response = await Axios.delete(`social/posts/${postID}/`);
        dispatch(removePostFromList(postID))
        return response
    } catch (error) {
        console.error('catch in deletePostAction:', error)
    }
}


export const sendLike = (postId, postData, postTypeName) => {
    return {
        type: LIKE_POST,
        payload: {postId, postData, postTypeName}
    }
};
export const likePostAction = (postID, postTypeCode) => async (dispatch, getState) => {

    let target;
    switch (postTypeCode) {
        case 0:
            target = 'likedPosts'
            break;
        case 1:
            target = 'friendPosts'
            break
        case 2:
            target = 'followingPosts'
            break
        case 3:
            target = 'userPosts'
            break
    }

    try {

        const response = await Axios.post(`social/posts/toggle-like/${postID}/`)
        console.log("payload data", response.data)
        dispatch(sendLike(postID, response.data, target))
    } catch (error) {
        console.error('catch in likePostAction:', error.data)
    }
}