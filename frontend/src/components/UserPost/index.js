import React, {useState} from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
    UserPostContainer,
    UserPostAvaDiv,
    UserPostNameTimeDiv,
    UserPostBlack,
    UserPostGrey,
    UserPostMenuDiv,
    UserPostMenuImg,
    UserPostTextDiv,
    UserPostText,
    UserPostLikeShareDiv,
    UserPostLikeCountDiv,
    UserPostLikeImg,
    UserPostShareImg,
    PostDropDown, ActiveLikeImg, UserPostImageDiv,
} from "../../style/userPost";
import editPic from "../../assets/png-edit.png";
import deletePic from "../../assets/png-delete.png";

import UserEditModal from "../UserEditModal";
import {DefaultAvaSmall, PlaceholderS} from "../../style/images";
import {Link} from "react-router-dom";
import {likePostAction} from "../../store/actions/postAction";
import {useDispatch} from "react-redux";
import ProfileCard from "../ProfileCard";
import Carousel from "../Carousel";

const UserPost = (props) => {
    const dispatch = useDispatch()
    dayjs.extend(relativeTime);
    const [isDropDown, toggleDropDown] = useState(false);
    const [isModal, setUPModal] = useState(false);
    const handleCloseModal = () => {
        setUPModal(!isModal);
    };

    const handleToggle = () => {
        toggleDropDown(!isDropDown);
    };
    const handleCloseDropDown = (e) => {
        toggleDropDown(!isDropDown);
        handlePostDelete(e);
    };


    const {
        postTypeCode,
        handlePostDelete,
        index,
        post: {
            id,
            created,
            amount_of_likes,
            logged_in_user_liked,
            content,
            images,
            user: {first_name, last_name, avatar},
        },
    } = props;
    const handleLike = (e) => {
        const ID = Number(e.currentTarget.id);
        dispatch(likePostAction(ID, postTypeCode));
    };

    const timeAgo = dayjs(created).fromNow();
    const renderDropDown = (
        <PostDropDown>
            <button
                onClick={() => {
                    handleToggle();
                    handleCloseModal();
                }}
            >
                <img src={editPic}/>
                Edit
            </button>
            <button className={index} id={id} onClick={handleCloseDropDown}>
                <img src={deletePic}/>
                Delete
            </button>
        </PostDropDown>
    );
    const modal = (
        <UserEditModal index={index} handleCloseModal={handleCloseModal}/>
    );
    return (
        <>
            <UserPostContainer>
                {isModal ? modal : null}
                <UserPostAvaDiv>
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
                </UserPostAvaDiv>
                <UserPostNameTimeDiv>
                    <UserPostBlack>
                        {first_name} {last_name}
                    </UserPostBlack>
                    <UserPostGrey>{timeAgo}</UserPostGrey>
                </UserPostNameTimeDiv>
                {isDropDown ? renderDropDown : null}
                <UserPostMenuDiv>
                    <UserPostMenuImg onClick={handleToggle} id={id}/>
                </UserPostMenuDiv>
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
        </>
    );
};

export default UserPost;
