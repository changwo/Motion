import styled from "styled-components";

export const OutterPostsContainer = styled.div`
  padding-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: #f8f8f9;
`;
export const InnerPostsContainer = styled.div`
  width: 80%;
  display: flex;
`;
export const InnerPostsLeftUser = styled.div`
  width: 50%;
  min-width: 360px;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 20px;
  
`;
export const InnerPostsRightFriends = styled.div`
  margin-left: 20px;
  min-width: 360px;
  width: 50%;
  display: grid;
  grid-auto-rows: min-content;
  grid-row-gap: 20px;
`;

// export const Post1 = styled.div`
//   background-color: red;

//   height: 300px;
// `;
// export const Post2 = styled.div`
//   background-color: lightblue;

//   height: 200px;
// `;
// export const Post3 = styled.div`
//   background-color: lightgrey;

//   height: 400px;
// `;

export const TitleDiv = styled.div`
  background-color: pink;
  padding: 20px;
`;

export const PostTitle = styled.h3``;

export const PostTextDiv = styled.p`
  padding: 10px 10px 5px 10px;
`;

export const PostText = styled.p`
  margin-bottom: 10px;
`;

export const Content = styled.div``;
