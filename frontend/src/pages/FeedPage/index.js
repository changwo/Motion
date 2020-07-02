import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { PostsPageContainer } from "../../style/containers";


import SearchBar from "../../components/SearchBar";
import PostsFeed from "../../components/PostsFeed";
import UserPromptModal from "../../components/UserPromptModal";
import FeedNav from "../../components/FeedNav";

const FeedPage = (props) => {
  const [isUPModal, setUPModal] = useState(false);

  const {
    authReducer: { token },
    userReducer: { id, email, first_name, last_name },
    registration,
    postReducer: { userPosts, friendPosts },
    dispatch,
  } = props;
  
  const handleMakePost = (e) => {
    const value = e.currenTarget.value
  }
  
  const handleCloseModal = () => {
    setUPModal(!isUPModal);
  };

  const UPModal = <UserPromptModal token={token} handleMakePost={handleMakePost} handleCloseModal={handleCloseModal} />;

  return (
    <>
      {isUPModal ? UPModal : null}
      <PostsPageContainer>
        <FeedNav />
        <SearchBar />
        <PostsFeed handleCloseModal={handleCloseModal} />
      </PostsPageContainer>
    </>
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

export default connect(mapStateToProps)(FeedPage);
