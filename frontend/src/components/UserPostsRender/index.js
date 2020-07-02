import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    ProfilePostsContainer,
    ProfilePostsLeft,
    ProfilePostsRight,
} from "../../style/profilePosts";
import NonUserPost from "../NonUserPost";
import {getUserProfilePostsAction, resetUserProfilePosts} from "../../store/actions/userProfileAction";
import PurpleSpinner from "../../spinners";
import UserPost from "../UserPost";

const UserPostsRender = (props) => {
    const {
        authReducer: {token},
        userProfileReducer: {id},
        userPostsReducer: {postList},
        dispatch,
        currentList,
    } = props;



    let renderLeft;
    if (postList) {
        renderLeft = postList.map((post, index) => {
            if (index % 2 !== 0) {
                return (
                    <NonUserPost token={token} index={index} post={post} key={index} postTypeCode={4}/> // postTypeCode={4} is for posts on another user's profile page
                );
            }
        });
    }

    let renderRight;
    if (postList) {
        renderRight = postList.map((post, index) => {
            if (index % 2 === 0) {
                return (
                    <NonUserPost token={token} index={index} post={post} key={index} postTypeCode={4}/> // postTypeCode={4} is for posts on another user's profile page
                );
            }
        });
    }

    return (
        <ProfilePostsContainer>
            <ProfilePostsLeft>{postList ? renderLeft : <PurpleSpinner/>}</ProfilePostsLeft>
            <ProfilePostsRight>{postList ? renderRight : <PurpleSpinner/>}</ProfilePostsRight>
        </ProfilePostsContainer>
    );
};

const mapStateToProps = (state) => {
    console.log("state", state)
    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
        registration: state.registrationReducer,
        userPostsReducer: state.userPostsReducer,
        userProfileReducer: state.userProfileReducer,
    };
};
export default connect(mapStateToProps)(UserPostsRender);
