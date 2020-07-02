import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {XLAva, PlaceholderxL} from "../../style/images";
import {DefaultButton} from "../../style/buttons";
import {
    ProfileInfo,
    Followers,
    Following,
    User,
    Friends,
    Likes,
    About,
    Things,
    Email,
    Phone,
    Posts,
    ThingsLikedBox,
    LikeItem,
    PostsButton,
    LikesButton,
    FriendsButton,
    FollowersButton,
    FollowingButton,
} from "../../style/profilePage";
import {Banner} from "../../style/banner";
import PostRenderer from "../PostRenderer";
import LikesRenderer from "../LikesRenderer";
import {
    getPostsAction,
} from "../../store/actions/postAction";
import {
    getProfilesAction,
} from "../../store/actions/profileAction";
import FollowingContainer from "../FollowingContainer";
import FollowersContainer from "../FollowersContainer";
import FriendsContainer from "../FriendsContainer";
import {useHistory} from "react-router";
import {
    GET_FOLLOWERS,
    GET_FOLLOWING,
    GET_FOLLOWING_POSTS,
    GET_FRIENDS,
    GET_MY_LIKED_POSTS,
    GET_MY_POSTS
} from "../../store/types";

const ProfileBox = (props) => {
    const [moduleIndex, setModule] = useState(0);
    const {push} = useHistory();
    useEffect(() => {
        dispatch(getPostsAction(GET_MY_POSTS));
        dispatch(getPostsAction(GET_FOLLOWING_POSTS));
    }, []);

    const {
        dispatch,
        userReducer: {
            about_me,
            amount_following,
            amount_of_followers,
            amount_of_friends,
            amount_of_likes,
            amount_of_posts,
            avatar,
            banner,
            email,
            first_name,
            last_name,
            location,
            id,
            things_user_likes,
        },
    } = props;

    const handleGetPosts = () => {
        dispatch(getPostsAction(GET_MY_POSTS));
        setModule(0);
    };

    const handleGetLikes = () => {
        dispatch(getPostsAction(GET_MY_LIKED_POSTS));
        setModule(1);
    };
    const handleGetFollowing = () => {
        dispatch(getProfilesAction(GET_FOLLOWING));
        setModule(2);
    };

    const handleGetFollowers = () => {
        dispatch(getProfilesAction(GET_FOLLOWERS));
        setModule(3);
    };

    const handleGetFriends = () => {
        dispatch(getProfilesAction(GET_FRIENDS));
        setModule(4);
    };

    const renderThingsLike = things_user_likes.map((item, index) => {
        return <LikeItem key={index}>{item}</LikeItem>;
    });

    const handleEdit = () => {
        push("/updateprofile");
    };

    const renderBottomModule = [
        <PostRenderer/>,
        <LikesRenderer/>,
        <FollowingContainer/>,
        <FollowersContainer/>,
        <FriendsContainer/>,
    ];

    return (
        <>
            <ProfileInfo>
                <Banner src={banner}/>
                <User>
                    {avatar ? (
                        <XLAva src={avatar}/>
                    ) : (
                        <PlaceholderxL>
                            {first_name[0].toUpperCase()}
                            {last_name[0].toUpperCase()}
                        </PlaceholderxL>
                    )}
                    <h1>
                        {first_name} {last_name}
                    </h1>
                    <h2>{location ? location : "Adress..."}</h2>
                    <DefaultButton onClick={handleEdit}>EDIT PROFILE</DefaultButton>
                </User>
                <About>
                    <p>About</p>
                    <p>{about_me}</p>
                </About>
                <Things>
                    <p>Things I like</p>
                    <ThingsLikedBox>{renderThingsLike}</ThingsLikedBox>
                </Things>
                <Email>
                    <p>Email</p>
                    <p>{email}</p>
                </Email>
                <Phone>
                    <p>Phone</p>
                    <p>Phone Number</p>
                </Phone>
                <PostsButton active={moduleIndex === 0} onClick={handleGetPosts}>
                    <Posts>
                        <h1>{amount_of_posts}</h1>
                        <p>Posts</p>
                    </Posts>
                </PostsButton>

                <LikesButton active={moduleIndex === 1} onClick={handleGetLikes}>
                    <Likes>
                        <h1>{amount_of_likes}</h1>
                        <p>Likes</p>
                    </Likes>
                </LikesButton>
                <FriendsButton active={moduleIndex === 4} onClick={handleGetFriends}>
                    <Friends>
                        <h1>{amount_of_friends}</h1>
                        <p>Friends</p>
                    </Friends>
                </FriendsButton>
                <FollowersButton
                    active={moduleIndex === 3}
                    onClick={handleGetFollowers}
                >
                    <Followers>
                        <h1>{amount_of_followers}</h1>
                        <p>Followers</p>
                    </Followers>
                </FollowersButton>
                <FollowingButton
                    active={moduleIndex === 2}
                    onClick={handleGetFollowing}
                >
                    <Following>
                        <h1>{amount_following}</h1>
                        <p>Following</p>
                    </Following>
                </FollowingButton>
            </ProfileInfo>
            {renderBottomModule[moduleIndex]}
        </>
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
export default connect(mapStateToProps)(ProfileBox);
