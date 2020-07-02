import React, { useEffect } from "react";
import { connect } from "react-redux";

import { PostsPageContainer } from "../../style/containers";
import FeedNav from "../../components/FeedNav";

import SearchContainer from "../../components/SearchContainer";

const FriendsPage = (props) => {
  const {
  } = props;

  return (
    <PostsPageContainer>
      <FeedNav />
      <SearchContainer/>
    </PostsPageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    registration: state.registrationReducer,
    postReducer: state.postReducer,
    profileReducer: state.profileReducer,
    searchReducer: state.searchReducer,
  };
};
export default connect(mapStateToProps)(FriendsPage);
