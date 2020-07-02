import React from "react";

import { connect } from "react-redux";
import { ProfilesContainer } from "../../style/profileModuleContainer";
import ProfileCard from "../ProfileCard";
import PurpleSpinner from "../../spinners";

const FollowingContainer = (props) => {
  const {
    profileReducer: { followingList},
    authReducer: { token },
    userReducer: { id, email, first_name, last_name, avatar },
    postReducer: { userPosts, friendPosts, followingPosts },
    dispatch,
    currentList,
  } = props;

  let renderFollowingList;
  if (followingList) {
    renderFollowingList = followingList.map((profile, index) => (
      <ProfileCard key={index} profile={profile} type={'followingList'}/>
    ));
  }

  return (
    <ProfilesContainer>
      {followingList? renderFollowingList : <PurpleSpinner/>}
    </ProfilesContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    registration: state.registrationReducer,
    postReducer: state.postReducer,
    profileReducer: state.profileReducer,
  };
};
export default connect(mapStateToProps)(FollowingContainer);
