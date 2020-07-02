import styled from "styled-components";
import { DefaultDiv } from "./navs";
import { ColoredButton, DefaultButton } from "./buttons";
import { LikeItem } from "./profilePage";

export const ProfilesContainer = styled.div`
  margin-top: 80px;
  width: 80%;
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(360px, 1fr) minmax(
      360px,
      1fr
    );
  grid-auto-rows: auto;
  grid-gap: 2rem;
`;

export const SingleProfile = styled.div`
  display: grid;
  height: 500px;
  grid-template-rows: 40% repeat(3, 1fr);
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: white;
`;

export const BigDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const Div = styled(DefaultDiv)`
  display: inline-flex;
  flex-wrap: wrap;
  p {
    padding: 1rem;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ThemedButton = styled(ColoredButton)`
  width: auto;
  padding: 10px 25px;
`;

export const WhiteButton = styled(ThemedButton)`
  width: auto;
  color: black;
  background-color: white;
  background-image: none;
  border: 1px solid grey;
`;

export const RefreshButton = styled(WhiteButton)`
  position: relative;
  height: 40px;
  top: 60px;
`;

export const ThingsILike = styled(LikeItem)``;
