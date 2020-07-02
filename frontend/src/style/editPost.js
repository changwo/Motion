import styled from "styled-components";
import { DefaultDiv } from "./navs";

import { DefaultAvaSmall } from "./images";
import UserPostMenu from "../assets/svgs/menu.svg";
import heart from "../assets/svgs/heart.svg";
import share from "../assets/svgs/share.svg";
import attachImg from "../assets/attach-pic.png";

export const EditPostContainer = styled.form`
  display: grid;
  padding: 20px;
  grid-template-areas:
    "a nameTime .  dots"
    "c c c c"
    "i i i i"
    "U like like likeCount";
  grid-template-columns: minmax(60px, 5%) minmax(150px, 1fr) 1fr minmax(
      60px,
      5%
    );
  grid-template-rows: minmax(60px, 5%) minmax(10px, auto) minmax(0, auto) minmax(
      60px,
      5%
    );
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  min-width: 375px;
  width: 800px;
  height: 450px;
  position: absolute;
  top: 30%;
  left: 30%;

  background-color: white;
`;
// DefaultAvaSmall

export const UserPostAvaDiv = styled(DefaultDiv)`
  grid-area: a;
`;
export const AttachImgiv = styled(DefaultDiv)`
  grid-area: U;
`;
export const UserPostNameTimeDiv = styled(DefaultDiv)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  grid-area: nameTime;
`;
export const UserPostMenuDiv = styled(DefaultDiv)`
  grid-area: dots;
  justify-content: space-evenly;
`;
export const UserPostTextDiv = styled(DefaultDiv)`
  grid-area: c;
`;
export const EditPostImageDiv = styled(DefaultDiv)`
  grid-area: i;
  display: flex;
  justify-content: space-around;
`;
export const UserPostLikeShareDiv = styled(DefaultDiv)`
  justify-content: center;
  grid-area: like;
`;

export const UserPostLikeCountDiv = styled(DefaultDiv)`
  grid-area: likeCount;
`;

export const UserPostUserImg = styled(DefaultAvaSmall)``;

export const UserPostBlack = styled.p``;

export const UserPostGrey = styled.p`
  color: rgba(0, 0, 0, 0.5);
`;
export const CloseP = styled.p`
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export const UserPostMenuImg = styled.img`
  content: url(${UserPostMenu});
  cursor: pointer;
`;

export const UserPostText = styled.textarea`
  border: none;
  width: 100%;
  height: 200px;
`;

export const EditPostDisplayImg = styled.img`
  border-radius: 4px;
  margin: 0 0.3rem 0 0.3rem;

  cursor: pointer;
  width: 80px;
  height: 80px;
`;

export const EditPostAttachImg = styled.img`
  cursor: pointer;
  width: 60px;
  height: 60px;
  content: url(${attachImg});
`;

export const UserPostLikeImg = styled.img`
  content: url(${heart});
`;
export const UserPostShareImg = styled.img`
  content: url(${share});
`;
