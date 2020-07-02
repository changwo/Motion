import React from "react";
import {
  PromptContainer,
  PromptUserImg,
  PromptAvaDiv,
  PromptInputDiv,
  PromptInput,
  PostButtonDiv,
  PostButtonOuter,
  PostButtonImg,
  PromptP,
} from "../../style/userPropmt";

import { AvaL, PlaceholderL } from "../../style/images";

const UserPrompt = (props) => {
  const { first_name, last_name, avatar } = props;
  return (
    <PromptContainer onClick={props.handleCloseModal}>
      <PromptAvaDiv>
        {avatar ? (
          <AvaL src={avatar} />
        ) : (
          <PlaceholderL>
            {first_name[0].toUpperCase()}
            {last_name[0].toUpperCase()}
          </PlaceholderL>
        )}
      </PromptAvaDiv>
      <PromptInputDiv>
        <PromptP>Whats on your mind {first_name}?</PromptP>
      </PromptInputDiv>
      <PostButtonDiv>
        <PostButtonOuter>
          <PostButtonImg />
        </PostButtonOuter>
      </PostButtonDiv>
    </PromptContainer>
  );
};

export default UserPrompt;
