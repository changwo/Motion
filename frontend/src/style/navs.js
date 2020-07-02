import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import posts from "../assets/posts_logo.png";
import friends from "../assets/svgs/icon-friends.svg";
import bell from "../assets/svgs/notification_bell.svg";
import menu from "../assets/svgs/menu.svg";

export const FeedNavContainer = styled.nav`
  display: grid;
  grid-template-areas: "logo posts friends . notif ava settings";
  grid-template-columns: repeat(3, minmax(120px, 10%)) 1fr repeat(
      3,
      minmax(60px, 5%)
    );
  position: relative;
  width: 100%;
  height: 80px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
`;

/*     FEED NAV BAR DIVS   */

export const DefaultDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoDiv = styled(DefaultDiv)`
  grid-area: logo;
`;

const activeClassName = "nav-item-active";

export const PostsLink = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: posts;

  :hover {
    background-color: #f5f5f5;
  }

  &.${activeClassName} {
    border-bottom: 2px solid ${(props) => props.theme.themeColor};
  }
`;
export const FriendsLink = styled(NavLink).attrs({ activeClassName })`
  grid-area: friends;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #f5f5f5;
  }

  &.${activeClassName} {
    border-bottom: 2px solid ${(props) => props.theme.themeColor};
  }
`;
export const NotifDiv = styled(DefaultDiv)`
  grid-area: notif;
`;
export const AvaDiv = styled(DefaultDiv)`
  grid-area: ava;
`;
export const SettDiv = styled(DefaultDiv)`
  grid-area: settings;
`;

export const DropDown = styled.div`
  top: 80px;
  right: 20px;
  padding: 5px 0;
  border-radius:${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 100px;
  Button {
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
      filter:${(props) => props.theme.filterTheme}     
    }
  }
`;

/*     FEED NAV BAR elemnts   */

export const LogoImg = styled.img`
  content: url(${logo});
  width: 26px;
  height: 26px;
`;

export const Navh1 = styled.h1`
  cursor: pointer;
  font-size: 1.5em;
  margin-left: 10px;
`;

export const PostsImg = styled.img`
  content: url(${posts});
`;

export const NavP = styled.p`
  margin-left: 10px;
  cursor: pointer;
`;

export const FriendsImg = styled.img`
  content: url(${friends});
  width: 22px;
  width: 14px;
`;

export const BellImg = styled.img`
  content: url(${bell});
  cursor: pointer;
  width: 18px;
  width: 22px;
`;

export const NotifCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${(props) => props.theme.themeColor};
  height: 21px;
  width: 21px;
  border-radius: 50%;
`;

export const UserImg = styled.img`
  cursor: pointer;
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0;
`;

export const MenuImg = styled.img`
  content: url(${menu});
  cursor: pointer;
  width: 4px;
  height: 16px;
`;
