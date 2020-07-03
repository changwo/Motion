import React from "react";
import {
    SingleProfile,
    BigDiv,
    Div,
    ThemedButton,
    WhiteButton,
    ButtonDiv,
} from "../../style/profileModuleContainer";
import {PlaceholderxL, XLAva} from "../../style/images";
import {LikeItem} from "../../style/profilePage";
import {useDispatch, connect} from "react-redux";
import {
    AcceptOrRejectRequestAction,
    followUserAction, friendRequestAction,

} from "../../store/actions/profileAction";
import {Link, useHistory} from "react-router-dom";
import styled from "styled-components";

export const DoubleButtonContainer = styled.div`
display: flex;

`
export const AcceptButton = styled(ThemedButton)`

  color: white;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.7rem;
  
`
export const RejectButton = styled(WhiteButton)`
  background-image: linear-gradient(to right, #c21500, #ffc500);;
  color: white;
  padding: 0.7rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const FollowerCard = (props) => {
    const {push} = useHistory();
    const {
        type,
        profile: {
            id,
            avatar,
            first_name,
            last_name,
            about_me,
            logged_in_user_is_friends,
            logged_in_user_is_following,
            logged_in_user_is_rejected,
            logged_in_user_received_fr,
            logged_in_user_sent_fr,
            things_user_likes,
            location,
        },
    } = props;


    const dispatch = useDispatch();
    const handleSendFriendRequest = () => {
        dispatch(friendRequestAction(id, type));
    };

    const handleRejectFriendRequest = () => {
        dispatch(AcceptOrRejectRequestAction(id, {status: "R"}, type));
    };

    const handleAcceptFriendRequest = () => {
        dispatch(AcceptOrRejectRequestAction(id, {status: "A"}, type));
    };

    const handleFollow = () => {
        dispatch(followUserAction(id, type));
    };

    const renderIsFollwing = logged_in_user_is_following ? (
        <ThemedButton onClick={handleFollow}>✓ FOLLOWING</ThemedButton>
    ) : (
        <WhiteButton onClick={handleFollow}>FOLLOW</WhiteButton>
    );

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
    return (
        <>
            <SingleProfile>
                <BigDiv>
                    {avatar ? (
                        <Link to={`user/${id}`}>
                            <XLAva src={avatar}/>
                        </Link>
                    ) : (
                        <Link to={`user/${id}`}>
                            <PlaceholderxL>
                                {first_name ? first_name[0].toUpperCase() : "?"}
                                {last_name ? last_name[0].toUpperCase() : null}
                            </PlaceholderxL>
                        </Link>
                    )}
                    <h1>
                        {first_name} {last_name}
                    </h1>
                    <h2>{location}</h2>
                </BigDiv>
                <ButtonDiv>
                    {renderIsFollwing}
                    {FriendRequestButton()}
                </ButtonDiv>
                <Div>
                    <p>{about_me}</p>
                </Div>
                <Div>{renderThingsLike}</Div>
            </SingleProfile>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
    };
};
export default connect(mapStateToProps)(FollowerCard);
