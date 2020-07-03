import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import {getTimeAgo} from "../../../helpers";
import TextareaAutosize from 'react-autosize-textarea';
import {ThemedButton} from "../../../style/profileModuleContainer";
import deleteUrl from "../../../assets/delete_icon.png";
import {useDispatch} from "react-redux";
import {deleteCommentAction} from "../../../store/actions/postAction";


const CommentsContainer = styled.div`
grid-area: comments;
padding: 10px;
`
const CommentDiv = styled.div`
  
  width: 100%;
  min-width: 375px;
  
  border-top: 1px solid rgba(128,128,128,0.32);
`
const NameTimeDiv = styled.div`
margin: 10px;
`
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Name = styled.p`
`
const Time = styled.p`
  color: gray;
`
const Content = styled.p`
  white-space: pre-line;
`
const ContentDiv = styled.div`
`
const AvatarDiv = styled.div`
`
const InputDiv = styled.form`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const AvaNameTimeDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const MenuDiv = styled.div``

const PostComment = styled(ThemedButton)`
width: 5rem;
height: 2rem;
padding: 5px;
margin: 0.5rem 0 0.5rem 0;
`
const Input = styled(TextareaAutosize)`
padding: 1rem;
border-radius: 30px;
display: flex;
width: 100%;
resize: none;
margin-top: 1rem;
height: 3rem;
max-height: 300px;
align-items: center;
`

export const CommentDeleteImg = styled.img`
  content: url(${deleteUrl});
  height: 1rem;
  width: 1rem;
  cursor: pointer;
`;


const Comments = props => {
    const {comments, handleNewComment, submitComment, content, handleDeleteComment} = props


    let renderComments = comments.map((comment, index) => {
        
        return (
            <CommentDiv key={index}>
                <HeaderDiv>
                    <AvaNameTimeDiv>
                        <AvatarDiv>
                            <Avatar first_name={comment.user.first_name} last_name={comment.user.last_name}
                                    avatar={comment.user.avatar}
                                    is_from_logged_in_user={comment.is_from_logged_in_user} id={comment.user.id}/>
                        </AvatarDiv>
                        <NameTimeDiv>
                            <Name>{comment.user.first_name}</Name>
                            <Time>{getTimeAgo(comment.created)}</Time>
                        </NameTimeDiv>
                    </AvaNameTimeDiv>
                    <MenuDiv>
                        {comment.is_from_logged_in_user ?
                            <CommentDeleteImg onClick={handleDeleteComment} id={comment.id}/> : null}
                    </MenuDiv>
                </HeaderDiv>
                <ContentDiv>
                    <Content>{comment.content}</Content>
                </ContentDiv>
            </CommentDiv>
        )
    })


    return (
        <CommentsContainer>
            {renderComments}
            <InputDiv>
                <Input onResize={(e) => {
                }} value={content} onChange={handleNewComment}/>
                <PostComment onClick={submitComment}>Post</PostComment>
            </InputDiv>
        </CommentsContainer>
    )
}

export default Comments;