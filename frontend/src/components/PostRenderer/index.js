import React from "react";

import {connect} from "react-redux";
import {
    ProfilePostsContainer,
    ProfilePostsLeft,
    ProfilePostsRight,
} from "../../style/profilePosts";
import PurpleSpinner from "../../spinners";
import UserPost from "../UserPost";
import {deletePostAction} from "../../store/actions/postAction";


const PostRenderer = (props) => {
    const {
        dispatch,
        authReducer: {token},
        postReducer: {userPosts},
    } = props;

    const handlePostDelete = (e) => {

        const ID = Number(e.currentTarget.id);
        dispatch(deletePostAction(ID));

    };

    let renderLeft;
    if (userPosts) {
        renderLeft = userPosts.map((post, index) => {
            if (index % 2 !== 0) {
                return (
                    <UserPost handlePostDelete={handlePostDelete} token={token} index={index} post={post} key={index} postTypeCode={3}/>
                );
            }
        });
    }

    let renderRight;
    if (userPosts) {
        renderRight = userPosts.map((post, index) => {
            if (index % 2 === 0) {
                return (
                    <UserPost handlePostDelete={handlePostDelete}  token={token} index={index} post={post} key={index} postTypeCode={3}/>
                );
            }
        });
    }

    return (
        <ProfilePostsContainer>
            <ProfilePostsLeft>
                {userPosts ? renderLeft : <PurpleSpinner/>}
            </ProfilePostsLeft>
            <ProfilePostsRight>
                {userPosts ? renderRight : <PurpleSpinner/>}
            </ProfilePostsRight>
        </ProfilePostsContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
        registration: state.registrationReducer,
        postReducer: state.postReducer,
    };
};
export default connect(mapStateToProps)(PostRenderer);
