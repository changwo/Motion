import {GET_FOLLOWING, GET_FRIENDS, GET_FOLLOWERS, GET_ALL_USERS, UPDATE_PROFILE} from "../types";

const initialState = {
    followersList: null,
    friendsList: null,
    followingList: null,
    allUsersList: null,
};

export const profileReducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case GET_ALL_USERS: {
            return {...newState, allUsersList: action.payload};
        }
        case GET_FOLLOWING: {
            return {...newState, followingList: action.payload};
        }
        case GET_FRIENDS: {
            return {...newState, friendsList: action.payload};
        }
        case GET_FOLLOWERS: {
            return {...newState, followersList: action.payload};
        }
        case UPDATE_PROFILE: {
            let index = newState[action.payload.type].findIndex(profile => profile.id === action.payload.profile.id)
            newState[action.payload.type][index] = action.payload.profile
            return {...newState, [action.payload.type]: newState[action.payload.type]};
        }
        default:
            return state;
    }
};
