import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
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

import {
    AcceptOrRejectRequestProfileAction,
    followUserProfileAction,
    friendRequestProfileAction
} from "../../store/actions/userProfileAction";
import {AcceptButton, DoubleButtonContainer, RejectButton} from "../ProfileCard";

const MultiP = styled.p`
  white-space:pre-line;"
`
const BoldP = styled.p`
  font-weight: bold;
`


const UserProfileBox = (props) => {
    const {
        dispatch,
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
            logged_in_user_is_rejected,
            logged_in_user_received_fr,
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

    const handleRejectFriendRequest = () => {
        dispatch(AcceptOrRejectRequestProfileAction(id, {status: "R"}));
    };

    const handleAcceptFriendRequest = () => {
        dispatch(AcceptOrRejectRequestProfileAction(id, {status: "A"}));
    };

    const FriendRequestButton = () => {
        if (logged_in_user_is_friends) return <ThemedButton style={{cursor: 'auto'}}>✓ FRIEND</ThemedButton>
        if (logged_in_user_is_rejected) return <WhiteButton style={{cursor: 'auto'}}>REJECTED</WhiteButton>
        if (logged_in_user_sent_fr) return <WhiteButton style={{cursor: 'auto'}}>PENDING</WhiteButton>
        if (logged_in_user_received_fr) return <DoubleButtonContainer><AcceptButton
            onClick={handleAcceptFriendRequest}>ACCEPT</AcceptButton><RejectButton
            onClick={handleRejectFriendRequest}>REJECT</RejectButton></DoubleButtonContainer>
        return <WhiteButton onClick={handleSendFriendRequest}>ADD FRIEND</WhiteButton>
    }

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
                    {FriendRequestButton()}
                </User>
                <About>
                    <BoldP>About</BoldP>
                    <MultiP>{about_me}</MultiP>
                </About>
                <Things>
                    <BoldP>Things I like</BoldP>
                    <ThingsLikedBox>{renderThingsLike}</ThingsLikedBox>
                </Things>
                <Email>
                    <BoldP>Email</BoldP>
                    <p>{email}</p>
                </Email>
                <Phone>
                    <BoldP>Phone</BoldP>
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
