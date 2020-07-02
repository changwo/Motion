import styled from "styled-components";
import backgroundImage from "../assets/background_image.png";

export const BasePageContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;

export const PostsPageContainer = styled.div`
  height: 100vh;
  overflow: auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LoginLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
  height: 100vh;
  background-color: brown;
  background-image: url(${backgroundImage}),
    ${(props) => props.theme.imageColor};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  color: #ffffff;
`;

export const LoginRight = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  height: 100vh;
`;

export const VeriContainer = styled.form`
  width: 100%;
  display: grid;
  grid-template-areas:
    "title title title title"
    ". veri veri ."
    ". email username ."
    ". first_name last_name ."
    ". password password_repeat ."
    "button button button button"
    ". e e .";
  grid-template-rows: 1fr repeat(4, 80px) 1fr 1fr;
  grid-template-columns: 1fr 40% 40% 1fr;
  height: 100%;
  grid-column-gap: 15px;
`;

export const LoginPageContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "p p p b"
    "s s s s"
    ". i i ."
    ". i i ."
    ". . . ."
    ". . . .";
`;

export const SignUpPageContainer = styled(LoginPageContainer)`
  grid-template-areas:
    "p p p b"
    "s s s s"
    ". i i ."
    ". i i ."
    ". . . ."
    ". e e .";
`;

export const CongratsPageContainer = styled(SignUpPageContainer)`
  grid-template-areas:
    "s s s s"
    ". m m ."
    ". i i ."
    ". i i ."
    ". b b ."
    ". e e .";
`;
