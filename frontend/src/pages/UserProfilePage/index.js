import React, {useEffect} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import FeedNav from "../../components/FeedNav";
import UserProfileBox from "../../components/UserProfileBox";
import {ProfilePageContainer} from "../../style/profilePage";
import {
    getUserProfileAction,
    getUserProfilePostsAction, resetUserProfile,
    resetUserProfilePosts
} from "../../store/actions/userProfileAction";
import PurpleSpinner from "../../spinners";

const UserProfilePage = (props) => {
    const {
        userProfileReducer,
        match: {
            params: {id},
        },
        dispatch,
    } = props;

    useEffect(() => {

        const userID = Number(id)
        dispatch(getUserProfilePostsAction(userID))
        dispatch(getUserProfileAction(userID));
        return () => {// reset the posts array and profile object once component has unmounted
            dispatch(resetUserProfilePosts())
            dispatch(resetUserProfile())
        }
    }, []);


    return (
        <ProfilePageContainer>
            <FeedNav/>
            {Object.keys(userProfileReducer).length ? <UserProfileBox/> : <PurpleSpinner/>}
        </ProfilePageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
        postReducer: state.postReducer,
        userProfileReducer: state.userProfileReducer,
    };
};

export default withRouter(connect(mapStateToProps)(UserProfilePage));
