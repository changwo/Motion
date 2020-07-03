import axios from "axios";

import {SET_USER_PROFILE, SET_USER_PROFILE_POSTS, RESET_USER_PROFILE_POSTS, RESET_USER_PROFILE, SET_SINGLE_PROFILE_POST} from "../types";
import Axios from "../../axios";

export const setUserProfile = (userObj) => {
    return {
        type: SET_USER_PROFILE,
        userObj,
    };
};
export const setProfilePosts = (posts) => {
    return {
        type: SET_USER_PROFILE_POSTS,
        posts,
    };
};
export const setSingleProfilePost = (post) => {
    return {
        type: SET_SINGLE_PROFILE_POST,
        post,
    };
};

export const resetUserProfilePosts = () => {
    return {
        type: RESET_USER_PROFILE_POSTS,
    };
};

export const resetUserProfile = () => {
    return {
        type: RESET_USER_PROFILE,
    };
};



export const getUserProfileAction = userID => async (dispatch) => {
    try {
        const response = await Axios.get(`/users/${userID}/`);
        dispatch(setUserProfile(response.data));
    } catch (error) {
        console.log(`error`, error, error.data);
    }
}

export const followUserProfileAction = (userID) => async (dispatch) => {
    try {
        const response = await Axios.post(`/social/followers/toggle-follow/${userID}/`)
        dispatch(setUserProfile(response.data))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}

export const friendRequestProfileAction = (userID) => async (dispatch) => {
    try {
        const response = await Axios.post(`/social/friends/request/${userID}/`)

        dispatch(setUserProfile(response.data.receiver))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}
export const AcceptOrRejectRequestProfileAction = (requesterID, status) => async (dispatch) => {
    try {
        const response = await Axios.patch(`/social/friends/requests/${requesterID}/`, status)
        dispatch(setUserProfile(response.data.receiver))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}

export const getUserProfilePostsAction = userID => async (dispatch) => {

    try {
        const response = await Axios.get(`/social/posts/user/${userID}/`)
        dispatch(setProfilePosts(response.data))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}

export const likeProfilePostsAction = postID => async (dispatch) => {

    try {
        const response = await Axios.post(`social/posts/toggle-like/${postID}/`)
        dispatch(setSingleProfilePost(response.data))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}


