import styled, { keyframes } from "styled-components";
import { DefaultDiv } from "./navs";

import attachImg from "../assets/attach-pic.png";
import linkImg from "../assets/link-pic.png";
import {
  PromptAvaDiv,
  PromptInputDiv,
  PromptUserImg,
  PostButtonDiv,
  PostButtonOuter,
  PostButtonImg,
} from "./userPropmt";

export const DropDownAnimation = keyframes`
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;

export const UserPromptModalContainer = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const UPModalBox = styled.div`
  display: grid;
  grid-template-areas:
    ". . . close"
    "avatar input input input"
    ". input input input"
    ". input input input"
    "imgL image image button"
    "imgL image image button";
  grid-template-columns: minmax(80px, 20%) 2fr minmax(80px, 20%);
  grid-template-rows: 30px repeat(4, 1fr) 10%;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #fefefe;
  padding: 20px;
  margin: 50px;
  width: 60%;
  min-width: 280px;
  height: 50%;
  animation-name: ${DropDownAnimation};
  animation-duration: 0.6s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const UPMCloseBUttonDiv = styled.div`
  grid-area: close;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export const UPMInputDiv = styled(PromptInputDiv)`
  grid-area: input;
`;
export const UPMAvaDiv = styled(PromptAvaDiv)`
  justify-content: flex-start;
  align-items: flex-start;
  grid-area: avatar;
`;

export const UPMButtonDiv = styled(PostButtonDiv)`
  justify-content: flex-end;
  grid-area: button;
`;

export const UPMAttachImgDiv = styled(DefaultDiv)`
  grid-area: imgL;
  justify-content: flex-start;
`;

export const UPMDisplayImgDiv = styled(DefaultDiv)`
  grid-area: image;
  justify-content: space-around;
  overflow: auto;
`;

export const UPMButtonOuter = styled(PostButtonOuter)``;

export const UPMButtonImg = styled(PostButtonImg)``;

export const UPMCloseBUtton = styled.p`
  color: ${(props) => props.theme.themeColor};
  font-size: 30px;
  height: 30px;
  cursor: pointer;
`;


export const UPMInputBox = styled.textarea`
  resize: none;
  border: none;
  width: 100%;
  height: 100%;
`;

export const UPMAttachImg = styled.img`
  cursor: pointer;
  width: 60px;
  height: 60px;
  content: url(${attachImg});
`;
export const UPMDisplayImg = styled.img`
  border-radius: 4px;
  margin: 0 0.3rem 0 0.3rem;

  cursor: pointer;
  width: 80px;
  height: 80px;
`;
