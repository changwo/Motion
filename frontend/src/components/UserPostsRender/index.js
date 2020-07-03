import React from "react";
import {connect} from "react-redux";
import {
    ProfilePostsContainer,
    ProfilePostsLeft,
    ProfilePostsRight,
} from "../../style/profilePosts";

import PurpleSpinner from "../../spinners";
import UserPost from "../UserPost";

const UserPostsRender = (props) => {
    const {
        userPostsReducer: {postList},
    } = props;



    let renderLeft;
    if (postList) {
        renderLeft = postList.map((post, index) => {
            if (index % 2 !== 0) {
                return (
                    <UserPost index={index} post={post} key={index} postTypeCode={4}/> // postTypeCode={4} is for posts on another user's profile page
                );
            }
        });
    }

    let renderRight;
    if (postList) {
        renderRight = postList.map((post, index) => {
            if (index % 2 === 0) {
                return (
                    <UserPost  index={index} post={post} key={index} postTypeCode={4}/> // postTypeCode={4} is for posts on another user's profile page
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

    return {
        userPostsReducer: state.userPostsReducer,
    };
};
export default connect(mapStateToProps)(UserPostsRender);
