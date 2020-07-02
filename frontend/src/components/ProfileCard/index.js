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
    followUserAction, friendRequestAction,

} from "../../store/actions/profileAction";
import {Link, useHistory} from "react-router-dom";

const FollowerCard = (props) => {
    const {push} = useHistory();
    const {
        type,
        userReducer: {id: myID},
        profile: {
            id,
            avatar,
            first_name,
            last_name,
            about_me,
            logged_in_user_is_friends,
            logged_in_user_is_following,
            logged_in_user_sent_fr,
            things_user_likes,
            location,
        },
    } = props;


    const dispatch = useDispatch();
    const handleSendFriendRequest = () => {
        dispatch(friendRequestAction(id, type));
    };

    const handleFollow = () => {
        dispatch(followUserAction(id, type));
    };

    const renderIsFollwing = logged_in_user_is_following ? (
        <ThemedButton onClick={handleFollow}>✓ FOLLOWING</ThemedButton>
    ) : (
        <WhiteButton onClick={handleFollow}>FOLLOW</WhiteButton>
    );

    const renderIsFriends = logged_in_user_is_friends ? (
        <ThemedButton style={{cursor: 'auto'}}>✓ FRIEND</ThemedButton>
    ) : logged_in_user_sent_fr ? (
        <WhiteButton style={{cursor: 'auto'}}>REQUEST SENT</WhiteButton>
    ) : (
        <WhiteButton onClick={handleSendFriendRequest}>ADD FRIEND</WhiteButton>
    );

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
                    {renderIsFriends}
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
