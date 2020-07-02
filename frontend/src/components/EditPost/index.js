import React, { useState } from "react";

import {
  UserPostContainer,
  UserPostAvaDiv,
  UserPostUserImg,
  UserPostNameTimeDiv,
  UserPostBlack,
  UserPostGrey,
  UserPostMenuDiv,
  UserPostMenuImg,
  UserPostTextDiv,
  UserPostText,
  UserPostImageDiv,
  UserPostLikeShareDiv,
  UserPostLikeCountDiv,
  UserPostLikeImg,
  UserPostShareImg,
  CloseP,
} from "../../style/editPost";
import { PlaceholderS, DefaultAvaSmall } from "../../style/images";

import { ColoredButton } from "../../style/buttons";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {updatePostAction} from "../../store/actions/postAction";

const EditPost = (props) => {
  const dispatch = useDispatch();

  const {
    handleCloseModal,
    post: {
      id,
      created,
      content,
      user: { first_name, last_name, avatar },
    },
  } = props;
  const [textContent, setContent] = useState(content);

  console.log("EditPost -> textContent", textContent);

  const handleEdit = (event) => {
    const value = event.currentTarget.value;
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePostAction({ content: textContent }, id));
  };

  return (
    <UserPostContainer>
      <UserPostAvaDiv>
        {avatar ? (
          <Link to={`/profile`}>
            <DefaultAvaSmall src={avatar} />
          </Link>
        ) : (
          <Link to={`/profile`}>
            <PlaceholderS>
              {first_name ? first_name[0].toUpperCase() : "?"}
              {last_name ? last_name[0].toUpperCase() : null}
            </PlaceholderS>
          </Link>
        )}
      </UserPostAvaDiv>
      <UserPostNameTimeDiv>
        <UserPostBlack>
          {first_name} {last_name}
        </UserPostBlack>
        <UserPostGrey>{created}</UserPostGrey>
      </UserPostNameTimeDiv>
      <UserPostMenuDiv>
        <UserPostMenuImg id={id} />
        <CloseP onClick={handleCloseModal}>X</CloseP>
      </UserPostMenuDiv>
      <UserPostTextDiv>
        <UserPostText onChange={handleEdit} value={textContent}></UserPostText>
      </UserPostTextDiv>
      <UserPostImageDiv></UserPostImageDiv>
      <UserPostLikeShareDiv>
        <ColoredButton
          onClick={(e) => {
            handleSubmit(e);
            handleCloseModal();
          }}
        >
          SAVE
        </ColoredButton>
      </UserPostLikeShareDiv>
      <UserPostLikeCountDiv></UserPostLikeCountDiv>
    </UserPostContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
  };
};
export default connect(mapStateToProps)(EditPost);
