import React, {useState} from "react";
import {useDispatch, connect} from "react-redux";

import {
    UserPromptModalContainer,
    UPModalBox,
    UPMCloseBUtton,
    UPMCloseBUttonDiv,
    UPMInputBox,
    UPMAvaDiv,
    UPMInputDiv,
    UPMButtonDiv,
    UPMButtonOuter,
    UPMAttachImgDiv,
    UPMAttachImg,
    UPMDisplayImgDiv, UPMDisplayImg,
} from "../../style/userPromptModal";
import {PostButtonImg} from "../../style/userPropmt";
import {createPostAction} from "../../store/actions/postAction";
import {Link} from "react-router-dom";
import {PlaceholderL, AvaL} from "../../style/images";
import styled from "styled-components";

export const ErrorMessage = styled.p`
  position: relative;
  color: red;
`

const UserPromptModal = (props) => {
    const {
        errorReducer:{createPostError},
        handleCloseModal,
        userReducer: {first_name, last_name, avatar},
    } = props;

    const dispatch = useDispatch();
    const [postInfo, setPostInfo] = useState({
        content: ``,
        images: null,
        imageUrls: null,
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('content', postInfo.content)
        form.append('images', postInfo.images)
        if (postInfo.images.length) {
            for (let key in postInfo.images) {
                form.append(`images`, postInfo.images[key])
            }
        }
        const response = await dispatch(createPostAction(form));
        if (response.status === 201) {
            setPostInfo({
                content: ``,
                images: null,
                imageUrls: null,
            });
            handleCloseModal();
        }
    };

    const handleContent = (event) => {
        const value = event.currentTarget.value;
        setPostInfo({...postInfo, content: value});
    };

    const imagesSelectHandler = e => {
        let files = e.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file))
        setPostInfo({...postInfo, images: files, imageUrls: urls})
    }

    console.log("postInfo", postInfo)

    return (
        <UserPromptModalContainer>
            <UPModalBox>
                <UPMAvaDiv>
                    {avatar ? (
                        <Link to={`/profile`}>
                            <AvaL src={avatar}/>
                        </Link>
                    ) : (
                        <Link to={`/profile`}>
                            <PlaceholderL>
                                {first_name ? first_name[0].toUpperCase() : "?"}
                                {last_name ? last_name[0].toUpperCase() : null}
                            </PlaceholderL>
                        </Link>
                    )}
                </UPMAvaDiv>
                <UPMCloseBUttonDiv>
                    <UPMCloseBUtton onClick={handleCloseModal}>x</UPMCloseBUtton>
                </UPMCloseBUttonDiv>
                <UPMInputDiv>
                    <ErrorMessage>{createPostError ? `${createPostError} is invalid` : null}</ErrorMessage>
                    <UPMInputBox onChange={handleContent}></UPMInputBox>
                </UPMInputDiv>
                <UPMButtonDiv>
                    <UPMButtonOuter onClick={onSubmitHandler}>
                        <PostButtonImg/>
                    </UPMButtonOuter>
                </UPMButtonDiv>
                <UPMAttachImgDiv>
                    <label htmlFor="hiddenFileInput"><UPMAttachImg/></label>
                    <input style={{display: "none"}} id="hiddenFileInput" multiple={"multiple"} accept={"image/*"}
                           onChange={imagesSelectHandler}
                           type="file"/>
                </UPMAttachImgDiv>
                <UPMDisplayImgDiv>
                    {postInfo.imageUrls ? postInfo.imageUrls.map((url, index) => <UPMDisplayImg key={index}
                                                                                                src={url}/>) : null}
                </UPMDisplayImgDiv>
            </UPModalBox>
        </UserPromptModalContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        errorReducer: state.errorReducer,
        userReducer: state.userReducer,
    };
};
export default connect(mapStateToProps)(UserPromptModal);
