import {
    GET_FOLLOWING,
    GET_FRIENDS,
    GET_FOLLOWERS,
    GET_ALL_USERS, UPDATE_PROFILE
} from "../types";

import Axios from "../../axios";



export const getProfiles = (array, typeProperty) => {
    return {
        type: typeProperty,
        payload: array,
    };
};

export const getProfilesAction = typeProperty => async (dispatch) => {

    let path;
    if (typeProperty === GET_ALL_USERS) {
        path = '/users/'
    } else if (typeProperty === GET_FOLLOWERS) {
        path = '/social/followers/followers/'
    } else if (typeProperty === GET_FOLLOWING) {
        path = '/social/followers/following/'
    } else if (typeProperty === GET_FRIENDS) {
        path = '/social/friends/'
    }
    try {
        const response = await Axios.get(path);
        dispatch(getProfiles(response.data, typeProperty));
        console.log("profiles list", response.data);
    } catch (error) {
        console.log(`${typeProperty} error`, error, error.data);
    }

}

export const updateProfile = (profile, type) => {
    return {
        type: UPDATE_PROFILE,
        payload: {profile, type}
    };
};

export const followUserAction = (userID, type) => async (dispatch) => {
    try {
        const response = await Axios.post(`/social/followers/toggle-follow/${userID}/`)
        dispatch(updateProfile(response.data, type))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}


export const friendRequestAction = (userID, type) => async (dispatch) => {
    try {
        const response = await Axios.post(`/social/friends/request/${userID}/`)
        console.log("friend request receiver info", response.data.receiver)
        dispatch(updateProfile(response.data.receiver, type))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}

export const AcceptOrRejectRequestAction = (requesterID, status, type) => async (dispatch) => {
    try {
        const response = await Axios.patch(`/social/friends/requests/${requesterID}/`, status)
        dispatch(updateProfile(response.data.receiver, type))
        return response
    } catch (error) {
        console.log("error", error.data)
    }
}
