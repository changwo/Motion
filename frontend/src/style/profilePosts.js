import styled from "styled-components";
import { InnerPostsLeftUser, InnerPostsRightFriends } from "./postsFeed";

export const ProfilePostsContainer = styled.div`
  margin-top: 80px;
  width: 80%;
  display: flex;
`;

export const ProfilePostsLeft = styled(InnerPostsLeftUser)``;
export const ProfilePostsRight = styled(InnerPostsRightFriends)``;
