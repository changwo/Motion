import styled from "styled-components";
import logo from "../assets/logo_white.png";
import appleStoreLogo from "../assets/svgs/apple.svg";
import googleLogo from "../assets/svgs/google.svg";
import user from "../assets/svgs/avatar.svg";
import password from "../assets/svgs/password.svg";
import checkIcon from "../assets/svgs/check-solid.svg";
import ellipsis1 from "../assets/ellipsis-1.png";
import ellipsis2 from "../assets/ellipsis-2.png";
import ellipsis3 from "../assets/ellipsis-3.png";

export const DefaultAvaSmall = styled.img`
  cursor: pointer;
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0;
`;

export const AvaL = styled(DefaultAvaSmall)`
  height: 60px;
  width: 60px;
`;
export const XLAva = styled(DefaultAvaSmall)`
  height: 95px;
  width: 95px;
`;
export const DefaultPlaceHolder = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  color: white;
  font-size: 25px;
`;
export const PlaceholderS = styled(DefaultPlaceHolder)``;
export const PlaceholderL = styled(DefaultPlaceHolder)`
  height: 60px;
  width: 60px;
  font-size: 30px;
`;
export const PlaceholderxL = styled(DefaultPlaceHolder)`
  height: 90px;
  width: 90px;
  font-size: 40px;
`;

export const LoginLogo = styled.img`
  width: 80px;
  content: url(${logo});
`;
export const AppleIcon = styled.img`
  cursor: pointer;
  padding: 10px;
  width: 120px;
  height: 40px;
  border-radius: 30px;
  background-color: transparent;
  border: solid 2px #ffffff80;
  content: url(${appleStoreLogo});
`;
export const GoogleIcon = styled(AppleIcon)`
  content: url(${googleLogo});
`;

export const IconDiv = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  color: black;
  mix-blend-mode: screen;
`;

export const UserIcon = styled.img`
  margin-right: 10px;
  content: url(${user});
`;

export const PassIcon = styled.img`
  margin-right: 10px;
  content: url(${password});
`;

export const CheckMark = styled.img`
  padding: 40px;
  width: 180px;
  height: 180px;
  filter: ${(props) => props.theme.filterTheme};
  content: url(${checkIcon});
`;

export const Ellipsis1 = styled.img`
  content: url(${ellipsis1});
  /* position: absolute;
  left: 67%;
  bottom: 5px; */
  display: flex;
  justify-self: center;
  align-self: flex-end;
  grid-area: e;
`;

export const Ellipsis2 = styled(Ellipsis1)`
  content: url(${ellipsis2});
`;
export const Ellipsis3 = styled(Ellipsis1)`
  content: url(${ellipsis3});
`;
