import styled from "styled-components";
import { DefaultDiv } from "./navs";
import { DefaulInput } from "./inputs";

import mag from "../assets/svgs/search_icon.svg";
import { GreyP } from "./paragraphs";

export const OuterSearch = styled.nav`
  background-color: #f8f8f9;

  width: 100%;
  border-bottom: 1px solid #00000015;
  display: flex;
  justify-content: center;
`;
export const InnerSearch = styled.nav`
  display: grid;
  grid-template-areas: "mag search search like friends follow";
  grid-template-columns: minmax(20px, 40px) minmax(200px, 30%) 1fr repeat(
      3,
      minmax(60px, 5%)
    );
  background-color: #f8f8f9;
  width: 80%;
  height: 80px;
`;

export const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f9;

  :hover {
    background-color: white;
  }
  cursor: pointer;

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid #A580FF;
  `}
`;

export const Tab = styled(SearchButton)``



export const MagDiv = styled(DefaultDiv)`
  grid-area: mag;
`;
export const SearchDiv = styled(DefaultDiv)`
  justify-content: flex-start;
  grid-area: search;
`;
export const LikeDiv = styled(DefaultDiv)`
  grid-area: like;
`;
export const FriendDiv = styled(DefaultDiv)`
  grid-area: friends;
`;
export const FollowDiv = styled(DefaultDiv)`
  grid-area: follow;
`;

export const Mag = styled.img`
  content: url(${mag});
  filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(339deg) brightness(94%)
    contrast(103%);
`;
export const Search = styled(DefaulInput)``;

export const SearchGreyP = styled(GreyP)``;

export const SearchBlackP = styled.p``;
