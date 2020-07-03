import React from "react";
import { connect } from "react-redux";
import {
  ProfilePostsContainer,
  ProfilePostsLeft,
  ProfilePostsRight,
} from "../../style/profilePosts";
import PurpleSpinner from "../../spinners";
import UserPost from "../UserPost";

const LikesRenderer = (props) => {
  const {
    postReducer: { likedPosts },
  } = props;

  let renderLeft;
  if (likedPosts) {
    renderLeft = likedPosts.map((post, index) => {
      if (index % 2 !== 0) {
        return (
          <UserPost  index={index} post={post} key={index} postTypeCode={0} /> // postTypeCode={0} is for liked posts
        );
      }
    });
  }

  let renderRight;
  if (likedPosts) {
    renderRight = likedPosts.map((post, index) => {
      if (index % 2 === 0) {
        return (
          <UserPost index={index} post={post} key={index} postTypeCode={0}/> // postTypeCode={0} is for liked posts
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
    postReducer: state.postReducer,
  };
};
export default connect(mapStateToProps)(LikesRenderer);
