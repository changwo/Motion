import React from "react";
import { connect } from "react-redux";
import UserPost from "../UserPost";
import { ModalContainer } from "../../style/userEditModal";
import EditPost from "../EditPost";

const UserEditModal = (props) => {
  
  const {
    authReducer: { token },
    postReducer: { userPosts, friendPosts },
    dispatch,
    handleCloseModal,
    index,
  } = props;
  

  return (
    <ModalContainer>
      <EditPost handleCloseModal={handleCloseModal} post={userPosts[index]} />
    </ModalContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    postReducer: state.postReducer,
  };
};

export default connect(mapStateToProps)(UserEditModal);
