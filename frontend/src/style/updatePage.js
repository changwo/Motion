import styled from "styled-components";
import {DefaultDiv} from "./navs";
import {NavLink} from "react-router-dom";
import {ThemedButton, WhiteButton} from "./profileModuleContainer";

export const UpdatePageContainer = styled.div`
  height: 100vh;
  overflow: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const UpdateInfo = styled.form`
  padding: 1rem;
  width: 80%;
  grid-column-gap: 1rem;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-top: 100px;
  background-color: white;
  height: 400px;
  display: grid;
  grid-template-areas:
    "user first last"
    "user location username"
    "user about about"
    "delete about about"
    "save things things";

  grid-template-columns: minmax(280px, 25%) repeat(2, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

export const UserDiv = styled(DefaultDiv)`
  grid-area: user;

  flex-direction: column;
  justify-content: flex-start;
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
export const UpdateButton = styled(WhiteButton)`
  width: 15rem;
`;

export const FileUpload = styled.input`
  width: 15rem;
  border-radius: 30px;
  padding: 5px 25px;
  cursor: pointer;
  border: 1px solid black;
  filter:alpha(opacity: 0);
 
`;

export const SaveDiv = styled(DefaultDiv)`
  grid-area: save;
  border-right: 1px solid ${(props) => props.theme.galleryGray};
`;
export const SaveButton = styled(ThemedButton)`
  width: 15rem;
`;

export const DeleteDiv = styled(DefaultDiv)`
  grid-area: delete;
  border-right: 1px solid ${(props) => props.theme.galleryGray};
`;
export const DeleteButton = styled(WhiteButton)`
  width: 15rem;
`;

export const DefaultProfileDiv = styled(DefaultDiv)`
  border-bottom: 1px solid ${(props) => props.theme.galleryGray};
  p {
  }

  input {
    border: none;
  }
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
`;
export const FristNameDiv = styled(DefaultProfileDiv)`
  grid-area: first;
`;
export const LastNameDiv = styled(DefaultProfileDiv)`
  grid-area: last;
`;
export const UserNameDiv = styled(DefaultProfileDiv)`
  grid-area: username;
`;
export const LocationDiv = styled(DefaultProfileDiv)`
  grid-area: location;
`;

export const AboutDiv = styled(DefaultProfileDiv)`
  grid-area: about;
  input {
    width: 100%;
  }
`;

export const ThingsDiv = styled(DefaultProfileDiv)`
  grid-area: things;
  border-bottom: none;
`;
export const AddThingsDiv = styled(DefaultProfileDiv)`
  grid-area: addThings;
  border-bottom: none;
`;
