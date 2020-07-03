import React, {useEffect, useState} from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
    UserPostContainer,
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
    PostDropDown, ActiveLikeImg, UserPostImageDiv, AmountCommentsDiv,
} from "../../style/userPost";
import editPic from "../../assets/png-edit.png";
import deletePic from "../../assets/png-delete.png";

import UserEditModal from "../UserEditModal";
import {Link} from "react-router-dom";
import {
    createCommentAction,
    deleteCommentAction,
    getCommentsAction,
    getPostsAction,
    likePostAction
} from "../../store/actions/postAction";
import {useDispatch} from "react-redux";
import Carousel from "../Carousel";
import {likeProfilePostsAction} from "../../store/actions/userProfileAction";
import Avatar from "./Avatar";
import Comments from "./Comments";


const PostLink = styled(Link)`

`

const CommentLink = styled.a`
  cursor: pointer;
`
const UserPost = (props) => {
    const {
        postTypeCode,
        handlePostDelete,
        index,
        post: {
            id,
            created,
            amount_of_likes,
            logged_in_user_liked,
            is_from_logged_in_user,
            amount_of_comments,
            content,
            images,
            user: {first_name, last_name, avatar, id:userID},
        },
    } = props;

    const dispatch = useDispatch()
    dayjs.extend(relativeTime);
    const [isDropDown, toggleDropDown] = useState(false);
    const [isModal, setUPModal] = useState(false);
    const [commentsData, setComments] = useState({
        showComments: false,
        commentsList: null,
        content: ``,
    })
    const handleDeleteComment = (e) => {
        const ID = Number(e.currentTarget.id)
        dispatch(deleteCommentAction(ID))
        const newCommentsList = commentsData.commentsList
        const updatedComments = newCommentsList.filter(comment => comment.id !== ID)
        setComments({...commentsData, commentsList: updatedComments})
    };

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


    const handleLike = (e) => {
        const ID = Number(e.currentTarget.id);
        if (postTypeCode === 4) {
            dispatch(likeProfilePostsAction(ID));
        } else {
            dispatch(likePostAction(ID, postTypeCode));
        }
    };

    const handleRenderComments = async (e) => {
        if (commentsData.showComments === false) {
            const response = await dispatch(getCommentsAction(id))
            setComments({
                ...commentsData, commentsList: response.data,
                showComments: !commentsData.showComments
            })
        } else {
            setComments({
                showComments: false,
                commentsList: null,
                content: ``,
            })
        }
    }
    console.log(commentsData)

    const handleNewComment = e => {
        const value = e.currentTarget.value;
        setComments({...commentsData, content: value});
    }

    const submitComment = async (e) => {
        e.preventDefault();
        console.log("in the submit!")
        const response = await dispatch(createCommentAction(id, {content: commentsData.content}))
        setComments({...commentsData, commentsList: [response.data, ...commentsData.commentsList], content: ``})

    }

    const timeAgo = dayjs(created).fromNow();
    const renderDropDown = (
        <PostDropDown>
            <button
                onClick={() => {
                    handleToggle();
                    handleCloseModal();
                }}
            >
                <img src={editPic} alt={"edit post"}/>
                Edit
            </button>
            <button className={index} id={id} onClick={handleCloseDropDown}>
                <img alt={"delete post"} src={deletePic}/>
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
                <Avatar first_name={first_name} last_name={last_name} avatar={avatar}
                        is_from_logged_in_user={is_from_logged_in_user} id={userID}/>
                <UserPostNameTimeDiv>
                    <UserPostBlack>
                        {first_name} {last_name}
                    </UserPostBlack>
                    <UserPostGrey>{timeAgo}</UserPostGrey>
                </UserPostNameTimeDiv>
                {isDropDown ? renderDropDown : null}
                <UserPostMenuDiv>
                    {is_from_logged_in_user ? <UserPostMenuImg onClick={handleToggle} id={id}/> : null}
                </UserPostMenuDiv>
                <UserPostTextDiv>
                    <UserPostText>{content}</UserPostText>
                </UserPostTextDiv>
                <UserPostImageDiv>{images.length ? <Carousel images={images}/> : null}</UserPostImageDiv>
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
                <AmountCommentsDiv><CommentLink onClick={handleRenderComments}>
                    <p>{amount_of_comments ? `${amount_of_comments} Comments` : "Be the first to comment"}</p>
                </CommentLink></AmountCommentsDiv>
                <UserPostLikeCountDiv>
                    <UserPostText>{amount_of_likes} likes</UserPostText>
                </UserPostLikeCountDiv>
                {commentsData.showComments ?
                    <Comments handleDeleteComment={handleDeleteComment} content={commentsData.content} id={id} submitComment={submitComment}
                              handleNewComment={handleNewComment}
                              comments={commentsData.commentsList}/> : null}
            </UserPostContainer>
        </>
    );
};

export default UserPost;
