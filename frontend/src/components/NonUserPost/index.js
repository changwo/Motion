import React from "react";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";

import {
    UserPostContainer,
    UserPostAvaDiv,
    UserPostUserImg,
    UserPostNameTimeDiv,
    UserPostBlack,
    UserPostGrey,
    UserPostMenuDiv,
    UserPostMenuImg,
    UserPostTextDiv,
    UserPostText,
    UserPostImageDiv,
    UserPostLikeShareDiv,
    UserPostLikeCountDiv,
    UserPostLikeImg,
    UserPostShareImg,
    ActiveLikeImg,
} from "../../style/userPost";

import {PlaceholderS} from "../../style/images";
import {likePostAction} from "../../store/actions/postAction";
import {Link} from "react-router-dom";
import {likeProfilePostsAction} from "../../store/actions/userProfileAction";
import Carousel from "../Carousel";

const NonUserPost = (props) => {
    const dispatch = useDispatch();

    const {
        postTypeCode,
        post: {
            shared,
            id,
            images,
            created,
            logged_in_user_liked,
            amount_of_likes,
            content,
            user: {first_name, last_name, avatar, id: theirID},
        },
    } = props;

    dayjs.extend(relativeTime);
    const timeAgo = dayjs(created).fromNow();

    const handleLike = (e) => {
        const ID = Number(e.currentTarget.id);
        if (postTypeCode === 4) {
            dispatch(likeProfilePostsAction(ID));
        } else {
            dispatch(likePostAction(ID, postTypeCode));
        }

    };

    return (
        <UserPostContainer>
            <UserPostAvaDiv>
                {avatar ? (
                    <Link to={`user/${theirID}`}>
                        <UserPostUserImg src={avatar}/>
                    </Link>
                ) : (
                    <Link to={`user/${theirID}`}>
                        <PlaceholderS>
                            {first_name[0].toUpperCase()}
                            {last_name[0].toUpperCase()}
                        </PlaceholderS>
                    </Link>
                )}
            </UserPostAvaDiv>
            <UserPostNameTimeDiv>
                <UserPostBlack>
                    {first_name} {last_name}
                </UserPostBlack>
                <UserPostGrey>{timeAgo}</UserPostGrey>
            </UserPostNameTimeDiv>
            <UserPostMenuDiv></UserPostMenuDiv>
            <UserPostTextDiv>
                <UserPostText>{content}</UserPostText>
            </UserPostTextDiv>
            <UserPostImageDiv>{images.length? <Carousel images={images}/> : null}</UserPostImageDiv>
            <UserPostLikeShareDiv>
                {logged_in_user_liked ? (
                    <ActiveLikeImg id={id} onClick={handleLike}/>
                ) : (
                    <UserPostLikeImg id={id} onClick={handleLike}/>
                )}
                <UserPostText>Like</UserPostText>
                <UserPostShareImg/>
                <UserPostText>Share</UserPostText>
            </UserPostLikeShareDiv>
            <UserPostLikeCountDiv>
                <UserPostText>{amount_of_likes} likes</UserPostText>
            </UserPostLikeCountDiv>
        </UserPostContainer>
    );
};

export default NonUserPost;
