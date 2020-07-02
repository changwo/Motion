import React, {useState} from "react";

import {

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
    CloseP, EditPostContainer, EditPostImageDiv, EditPostDisplayImg, AttachImgiv, EditPostAttachImg,
} from "../../style/editPost";
import {PlaceholderS, DefaultAvaSmall} from "../../style/images";

import {ColoredButton} from "../../style/buttons";
import {Link} from "react-router-dom";
import {useDispatch, connect} from "react-redux";
import {updatePostAction} from "../../store/actions/postAction";
import {UPMAttachImg, UPMAttachImgDiv} from "../../style/userPromptModal";


const EditPost = (props) => {
    const dispatch = useDispatch();

    const {
        handleCloseModal,
        post: {
            id,
            created,
            content,
            images,
            user: {first_name, last_name, avatar},
        },
    } = props;

    const [postInfo, setPostInfo] = useState({
        content: ``,
        images: null,
        imageUrls: images,
    })


    const handleEdit = (event) => {
        const value = event.currentTarget.value;
        setPostInfo({...postInfo, content: value});
    };
    const imagesSelectHandler = e => {
        let files = e.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file))
        setPostInfo({...postInfo, images: files, imageUrls: urls})
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('content', postInfo.content)
        if (postInfo.images) {
            for (const file of postInfo.images) {
                form.append('images', file)
            }
        }
        const response = await dispatch(updatePostAction(form, id));
        if (response.status === 201) {
            handleCloseModal();
        }
    }

    return (
        <EditPostContainer>
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
                <UserPostGrey>{created}</UserPostGrey>
            </UserPostNameTimeDiv>
            <UserPostMenuDiv>
                <UserPostMenuImg id={id}/>
                <CloseP onClick={handleCloseModal}>X</CloseP>
            </UserPostMenuDiv>
            <UserPostTextDiv>
                <UserPostText rows={10} onChange={handleEdit} defaultValue={content}/>
            </UserPostTextDiv>
            <EditPostImageDiv>{postInfo.imageUrls ? postInfo.imageUrls.map((url, index) => <EditPostDisplayImg
                key={index} src={url}/>) : null}</EditPostImageDiv>
            <AttachImgiv>
                <label htmlFor="hiddenFileInput"><EditPostAttachImg/></label>
                <input style={{display: "none"}} id="hiddenFileInput" multiple={"multiple"} accept={"image/*"}
                       onChange={imagesSelectHandler}
                       type="file"/>
            </AttachImgiv>
            <UserPostLikeShareDiv>
                <ColoredButton
                    onClick={(e) => {
                        onSubmitHandler(e);
                        handleCloseModal();
                    }}
                >
                    SAVE
                </ColoredButton>
            </UserPostLikeShareDiv>
            <UserPostLikeCountDiv></UserPostLikeCountDiv>
        </EditPostContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
    };
};
export default connect(mapStateToProps)(EditPost);
