import React, {useState, useEffect} from "react";
import {connect} from "react-redux";

import {XLAva, PlaceholderxL} from "../../style/images";

import {

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

    UserProfileInfo,
    PostsButton,
} from "../../style/profilePage";
import {
    ThemedButton,
    WhiteButton,

} from "../../style/profileModuleContainer";
import {Banner} from "../../style/banner";
import UserPostsRender from "../UserPostsRender";

import {followUserProfileAction, friendRequestProfileAction} from "../../store/actions/userProfileAction";


const UserProfileBox = (props) => {
    const {
        dispatch,
        authReducer: {token},
        userProfileReducer: {
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
            logged_in_user_is_friends,
            logged_in_user_is_following,
            logged_in_user_sent_fr,
        },
    } = props;

    const handleSendFriendRequest = () => {
        dispatch(friendRequestProfileAction(id));
    };
    const handleFollow = () => {
        dispatch(followUserProfileAction(id));
    };

    const renderThingsLike = things_user_likes.map((item, index) => {
        return <LikeItem key={index}>{item}</LikeItem>;
    });

    const renderBottomModule = [<UserPostsRender/>];

    return (
        <>
            <UserProfileInfo>
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
                    {logged_in_user_is_following ? (
                        <ThemedButton onClick={handleFollow}>✓ FOLLOWING</ThemedButton>
                    ) : (
                        <WhiteButton onClick={handleFollow}>FOLLOW</WhiteButton>
                    )}
                    {logged_in_user_is_friends ? (
                        <ThemedButton style={{cursor: 'auto'}}>✓ FRIEND</ThemedButton>
                    ) : logged_in_user_sent_fr ? (
                        <WhiteButton style={{cursor: 'auto'}}>REQUEST SENT</WhiteButton>
                    ) : (
                        <WhiteButton onClick={handleSendFriendRequest}>ADD FRIEND</WhiteButton>
                    )}
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
                    <p>{'000-000-00-00'}</p>
                </Phone>
                <PostsButton active>
                    <Posts>
                        <h1>{amount_of_posts}</h1>
                        <p>Posts</p>
                    </Posts>
                </PostsButton>


                <Likes>
                    <h1>{amount_of_likes}</h1>
                    <p>Likes</p>
                </Likes>


                <Friends>
                    <h1>{amount_of_friends}</h1>
                    <p>Friends</p>
                </Friends>


                <Followers>
                    <h1>{amount_of_followers}</h1>
                    <p>Followers</p>
                </Followers>


                <Following>
                    <h1>{amount_following}</h1>
                    <p>Following</p>
                </Following>

            </UserProfileInfo>
            {renderBottomModule[0]}
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
        userProfileReducer: state.userProfileReducer,
    };
};
export default connect(mapStateToProps)(UserProfileBox);
