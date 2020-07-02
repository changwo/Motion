import React, {useState, useEffect} from "react";

import {connect, useDispatch} from "react-redux";
import profile from "../../assets/profile.png";
import logout from "../../assets/logout.png";

import {
    FeedNavContainer,
    LogoDiv,
    PostsLink,
    FriendsLink,
    NotifDiv,
    AvaDiv,
    SettDiv,
    LogoImg,
    PostsImg,
    Navh1,
    NavP,
    FriendsImg,
    BellImg,
    NotifCount,
    UserImg,
    MenuImg,
    DropDown,
} from "../../style/navs";
import {Link, useHistory} from "react-router-dom";
import {GET_ALL_USERS, USER_LOGOUT} from "../../store/types";
import {DefaultAvaSmall, PlaceholderS} from "../../style/images";


const FeedNav = (props) => {
    const refreshPage = () => {
        window.location.reload(false);
    };
    const {
        userReducer: {avatar, first_name, last_name},
    } = props;

    // useEffect(() => {
    //     console.log("getting all users")
    //     dispatch(getProfilesAction(GET_ALL_USERS))
    // }, [allUsersList])

    const [isDropDown, toggleDropDown] = useState(false);
    const dispatch = useDispatch();
    const {push} = useHistory();

    const handeLogout = () => {
        dispatch({type: USER_LOGOUT});
        push("/");
    };

    const handleToggle = () => {
        toggleDropDown(!isDropDown);
    };

    const renderDropDown = (
        <DropDown>
            <button onClick={() => push("/profile")}>
                <img src={profile}/>
                Profile
            </button>
            <button onClick={handeLogout}>
                <img src={logout}/>
                Logout
            </button>
        </DropDown>
    );
    return (
        <FeedNavContainer>
            <LogoDiv>
                <LogoImg/>
                <Navh1>Motion</Navh1>
            </LogoDiv>
            <PostsLink to="/feed">
                <PostsImg/>
                <NavP>Posts</NavP>
            </PostsLink>
            <FriendsLink to="/friends">
                <FriendsImg/>
                <NavP>Find Friends</NavP>
            </FriendsLink>
            <NotifDiv>
                <BellImg/>
                <NotifCount>3</NotifCount>
            </NotifDiv>
            <AvaDiv>
                {avatar ? (
                    <Link to={`/profile`}>
                        <DefaultAvaSmall src={avatar}/>
                    </Link>
                ) : (
                    <Link to={`/profile`}>
                        <PlaceholderS>
                            {first_name ? first_name[0].toUpperCase() : "?"}
                            {last_name ? last_name[0].toUpperCase() : null}
                        </PlaceholderS>
                    </Link>
                )}
            </AvaDiv>
            <SettDiv>
                {isDropDown ? renderDropDown : null}
                <MenuImg onClick={handleToggle}/>
            </SettDiv>
        </FeedNavContainer>
    );
};

const mapStateToProps = (state) => {

    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
        registration: state.registrationReducer,
        postReducer: state.postReducer,
        profileReducer: state.profileReducer,
    };
};
export default connect(mapStateToProps)(FeedNav);
