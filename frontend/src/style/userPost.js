import styled from "styled-components";
import { DefaultDiv, DropDown } from "./navs";

import { DefaultAvaSmall } from "./images";
import UserPostMenu from "../assets/svgs/menu.svg";
import heart from "../assets/heartSmall.png";
import share from "../assets/svgs/share.svg";

export const UserPostContainer = styled.div`
  display: grid;
  padding: 20px;
  grid-template-areas:
    "a nameTime .  dots"
    "c c c c"
    "i i i i"
    "like like . likeCount";
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
  width: 100%;
  min-width: 375px;

  background-color: white;
`;
// DefaultAvaSmall

export const UserPostAvaDiv = styled(DefaultDiv)`
  grid-area: a;
`;
export const UserPostNameTimeDiv = styled(DefaultDiv)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  grid-area: nameTime;
`;
export const UserPostMenuDiv = styled(DefaultDiv)`
  grid-area: dots;
`;
export const UserPostTextDiv = styled(DefaultDiv)`
  grid-area: c;
`;
export const UserPostImageDiv = styled(DefaultDiv)`
  grid-area: i;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 10px;
`;
export const UserPostLikeShareDiv = styled(DefaultDiv)`
  justify-content: space-evenly;
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

export const UserPostMenuImg = styled.img`
  content: url(${UserPostMenu});
  cursor: pointer;
`;

export const UserPostText = styled.p``;

export const UserPostLikeImg = styled.img`
  width: 22px;
  height: 22px;
  content: url(${heart});
  filter: ${(props) => props.theme.filterGrey};
  cursor: pointer;
`;

export const ActiveLikeImg = styled(UserPostLikeImg)`
  filter: ${(props) => props.theme.filterTheme};
`;

export const UserPostShareImg = styled.img`
  content: url(${share});
  cursor: pointer;
`;

export const PostDropDown = styled.div`
  top: 40px;
  position: relative;
  left: 100%;
  height: 60px;
  font-size: 34px;
  background-color: white;
  width: 100px;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  button {
    border-radius: ${(props) => props.theme.borderRadius};
    width: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    height: 50%;
    border: none;
    background-color: white;
    :hover {
      background-color: ${(props) => props.theme.galleryGray};
    }
    img {
      filter: ${(props) => props.theme.filterTheme};
    }
  }
`;
