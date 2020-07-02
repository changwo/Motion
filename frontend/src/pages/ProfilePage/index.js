import React, { useEffect } from "react";
import { connect } from "react-redux";
import FeedNav from "../../components/FeedNav";
import ProfileBox from "../../components/ProfileBox";
import { ProfilePageContainer } from "../../style/profilePage";

const ProfilePage = (props) => {

  const {
    authReducer: { token },
    userReducer: { id, email, first_name, last_name, avatar },
    registration,
    postReducer: { userPosts, friendPosts, followingPosts },
    dispatch,
  } = props;


  return (
    <ProfilePageContainer>
      <FeedNav />
      <ProfileBox userReducer={props.userReducer} />
      
    </ProfilePageContainer>
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
export default connect(mapStateToProps)(ProfilePage);
