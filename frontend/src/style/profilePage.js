import styled from "styled-components";
import { DefaultDiv } from "./navs";
import { NavLink } from "react-router-dom";

export const ProfilePageContainer = styled.div`
  height: 100vh;
  overflow: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ProfileInfo = styled.div`
  width: 80%;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-top: 100px;
  background-color: white;
  height: 400px;
  display: grid;
  grid-template-areas:
    "user about about things things things"
    "user email email phone phone phone"
    "user posts likes friends followers following";
  grid-template-columns: minmax(280px, 25%) repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  a {
    display: flex;
    justify-content: center;
    :focus {
      border-bottom: 2px solid ${(props) => props.theme.themeColor};
    }
    :hover {
      background-color: ${(props) => props.theme.athensGray};
    }
  }
`;

export const UserProfileInfo = styled(ProfileInfo)`
`;

export const User = styled(DefaultDiv)`
  grid-area: user;
  flex-direction: column;
  justify-content: space-evenly;
  border-right: 1px solid ${(props) => props.theme.galleryGray};
  h1 {
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    font-style: normal;
    font-weight: normal;
  }

  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
  }
  p {
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  :hover {
    background-color: #f5f5f5;
  }
  cursor: pointer;

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid #A580FF;
  `}
`;

export const PostsButton = styled(ProfileButton)`
  grid-area: posts;
`;
export const LikesButton = styled(ProfileButton)`
  grid-area: likes;
`;
export const FriendsButton = styled(ProfileButton)`
  grid-area: friends;
`;
export const FollowersButton = styled(ProfileButton)`
  grid-area: followers;
`;
export const FollowingButton = styled(ProfileButton)`
  grid-area: following;
`;

export const About = styled(DefaultDiv)`
  grid-area: about;
  padding: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;
export const Things = styled(DefaultDiv)`
  grid-area: things;
  padding: 20px;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

`;

export const ThingsLikedBox = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const LikeItem = styled.div`
  background-color: ${(props) => props.theme.athensGray};
  margin: 4px;
  padding: 5px 10px;
  border-radius: 30px;
`;
export const Email = styled(DefaultDiv)`
  grid-area: email;
  padding: 20px;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.galleryGray};
`;
export const Phone = styled(DefaultDiv)`
  grid-area: phone;
  padding: 20px;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.galleryGray};
`;
export const Posts = styled(DefaultDiv)`
  grid-area: posts;
  flex-direction: column;
`;
export const Likes = styled(DefaultDiv)`
  grid-area: likes;
  flex-direction: column;
`;
export const Friends = styled(DefaultDiv)`
  grid-area: friends;
  flex-direction: column;
`;
export const Followers = styled(DefaultDiv)`
  grid-area: followers;
  flex-direction: column;
`;
export const Following = styled(DefaultDiv)`
  grid-area: following;
  flex-direction: column;
`;
