import styled from "styled-components";
import { DefaultDiv } from "./navs";
import { DefaulInput } from "./inputs";

import postButton from "../assets/send_button.png";

export const PromptContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-areas: "avatar input button";
  grid-template-columns: minmax(80px, 20%) minmax(220px, 60%) minmax(80px, 20%);
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  width: 100%;
  min-width: 375px;
  background-color: white;
  height: 120px;
`;

export const PromptAvaDiv = styled(DefaultDiv)`
  grid-area: avatar;
`;

export const PromptInputDiv = styled(DefaultDiv)`
  grid-area: input;
`;

export const PostButtonDiv = styled(DefaultDiv)`
  grid-area: button;
`;
export const PostButtonOuter = styled(DefaultDiv)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) => props.theme.signInBotton};
`;
export const PostButtonImg = styled.img`
  content: url(${postButton});
`;

export const PromptP = styled.p`
  color: grey;
  width: 100%;
`;

export const PromptUserImg = styled.img`
  cursor: pointer;
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0;
`;
