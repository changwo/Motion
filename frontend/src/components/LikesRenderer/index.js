import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  ProfilePostsContainer,
  ProfilePostsLeft,
  ProfilePostsRight,
} from "../../style/profilePosts";
import NonUserPost from "../NonUserPost";
import PurpleSpinner from "../../spinners";

const LikesRenderer = (props) => {
  const {
    authReducer: { token },
    userReducer: { id, email, first_name, last_name, avatar },
    postReducer: { likedPosts },
    dispatch,
    currentList,
  } = props;

  let renderLeft;
  if (likedPosts) {
    renderLeft = likedPosts.map((post, index) => {
      if (index % 2 !== 0) {
        return (
          <NonUserPost token={token} index={index} post={post} key={index} postTypeCode={0} /> // postTypeCode={0} is for liked posts
        );
      }
    });
  }

  let renderRight;
  if (likedPosts) {
    renderRight = likedPosts.map((post, index) => {
      if (index % 2 === 0) {
        return (
          <NonUserPost token={token} index={index} post={post} key={index} postTypeCode={0}/> // postTypeCode={0} is for liked posts
        );
      }
    });
  }

  return (
    <ProfilePostsContainer>
      <ProfilePostsLeft>
        {likedPosts ? renderLeft : <PurpleSpinner />}
      </ProfilePostsLeft>
      <ProfilePostsRight>
        {likedPosts ? renderRight : <PurpleSpinner />}
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
export default connect(mapStateToProps)(LikesRenderer);
