import React from "react";

import { connect } from "react-redux";
import { ProfilesContainer } from "../../style/profileModuleContainer";
import ProfileCard from "../ProfileCard";
import PurpleSpinner from "../../spinners";

const FollowersContainer = (props) => {
  const {
    profileReducer: { followersList },
  } = props;

  let renderFollowersList;
  if (followersList) {
    renderFollowersList = followersList.map((profile, index) => (
      <ProfileCard key={index} profile={profile} type={'followersList'}/>
    ));
  }

  return (
    <ProfilesContainer>
      {followersList? renderFollowersList : <PurpleSpinner/>}
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
export default connect(mapStateToProps)(FollowersContainer);
