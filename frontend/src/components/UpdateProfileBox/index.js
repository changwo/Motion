import React, {useState} from "react";

import {
    UpdateInfo,
    UserNameDiv,
    UserDiv,
    EmailDiv,
    FristNameDiv,
    LastNameDiv,
    LocationDiv,
    PhoneDiv,
    AboutDiv,
    PasswordDiv,
    ThingsDiv,
    AddThingsDiv,
    SaveDiv,
    DeleteDiv,
    UpdateButton,
    DeleteButton,
    SaveButton,
    FileUpload,
} from "../../style/updatePage";
import {connect} from "react-redux";
import {XLAva, PlaceholderxL} from "../../style/images";

import {useHistory} from "react-router-dom";
import {updateUserAction} from "../../store/actions/userAction";
import styled from "styled-components";
import {Banner} from "../../style/banner";
import {DefaultButton} from "../../style/buttons";

export const ErrorMessage = styled.p`
  position: relative;
  top: 125px;
  color: red;
`
const AvatarLabel = styled.label`
  margin: 10px 10px;
  padding: 15px 20px;
  border-radius: 30px;
  border: solid 1px #00000041;
  background-color: transparent;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.athensGray};
  }
`
const AvatarInput = styled.input`
  display: none;
`

const ThingsULikeInput = styled.input`
  display: flex;
  width: 100%;
`
const BoldP = styled.p`
  font-weight: bold;
`

const UpdateProfileBox = (props) => {
    const {push} = useHistory();
    const {
        dispatch,
        errorReducer: {updatePostError},
        userReducer: {
            about_me,
            avatar,
            banner,
            first_name,
            username,
            last_name,
            location,
            things_user_likes,
        },
    } = props;


    const [userInfo, setUserInfo] = useState({
        first_name: `${first_name}`,
        last_name: `${last_name}`,
        username: `${username}`,
        location: `${location}`,
        about_me: `${about_me}`,
        things_user_likes: `${things_user_likes}`,
        avatar: null,
        avatarUrl: ``,
        banner: null,
        bannerUrl: ``
    });


    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setUserInfo({...userInfo, [property]: value});
    };


    const handleSubmit = async e => {
        e.preventDefault();
        const form = new FormData()
        form.append('first_name', userInfo.first_name)
        form.append('last_name', userInfo.last_name)
        form.append('username', userInfo.username)
        form.append('location', userInfo.location)
        form.append('about_me', userInfo.about_me)
        if (userInfo.things_user_likes.length) {
            userInfo.things_user_likes.split(",").forEach((el, ind) => {
                form.append(`things_user_likes`, el)
            })
        }
        if (userInfo.avatar) {
            form.append('avatar', userInfo.avatar)
        }
        if (userInfo.banner) {
            form.append('banner', userInfo.banner)
        }
        const response = await dispatch(updateUserAction(form));
        if (response.status === 200) push("/profile");
    };

    const avatarSelectHandler = e => {
        if (e.target.files[0]) {
            setUserInfo({...userInfo, avatarUrl: URL.createObjectURL(e.target.files[0]), avatar: e.target.files[0]})
        }
    }
    const bannerSelectHandler = e => {
        if (e.target.files[0]) {
            setUserInfo({...userInfo, bannerUrl: URL.createObjectURL(e.target.files[0]), banner: e.target.files[0]})
        }
    }


    return (
        <>
            <ErrorMessage>{updatePostError ? `${updatePostError} is invalid` : null}</ErrorMessage>
            <UpdateInfo>

                {userInfo.bannerUrl.length ? <Banner src={userInfo.bannerUrl}/> : <Banner src={banner}/>}
                <UserDiv>
                    {
                        userInfo.avatarUrl.length ? (
                            <XLAva src={userInfo.avatarUrl}/>
                        ) : (avatar ? <XLAva src={avatar}/> : (
                            <PlaceholderxL>
                                {first_name[0].toUpperCase()}
                                {last_name[0].toUpperCase()}
                            </PlaceholderxL>
                        ))
                    }
                    <AvatarLabel htmlFor="avatar">Upload Avatar</AvatarLabel>
                    <AvatarInput id="avatar" accept={"image/*"} onChange={avatarSelectHandler} type="file"/>
                    <AvatarLabel htmlFor="banner">Upload Banner</AvatarLabel>
                    <AvatarInput id="banner" accept={"image/*"} onChange={bannerSelectHandler} type="file"/>
                </UserDiv>
                <SaveDiv>
                    <SaveButton onClick={handleSubmit}>SAVE</SaveButton>
                </SaveDiv>
                <DeleteDiv>
                    <DeleteButton>DELETE ACCOUNT</DeleteButton>
                </DeleteDiv>

                <FristNameDiv>
                    <BoldP>First Name:</BoldP>
                    <input
                        onChange={(e) => onChangeHandler(e, "first_name")}
                        placeholder="Enter first name"
                        defaultValue={first_name}
                        type="text"
                        required
                    />
                </FristNameDiv>
                <LastNameDiv>
                    <BoldP>Last Name:</BoldP>
                    <input
                        onChange={(e) => onChangeHandler(e, "last_name")}
                        placeholder="Enter last name"
                        defaultValue={last_name}
                        type="text"
                        required
                    />
                </LastNameDiv>
                <UserNameDiv>
                    <BoldP>Username:</BoldP>
                    <input
                        onChange={(e) => onChangeHandler(e, "username")}
                        placeholder="Enter username"
                        defaultValue={username}
                        type="text"
                        required
                    />
                </UserNameDiv>
                <LocationDiv>
                    <BoldP>Location:</BoldP>
                    <input
                        onChange={(e) => onChangeHandler(e, "location")}
                        placeholder="Enter location"
                        defaultValue={location}
                        type="text"
                        required
                    />
                </LocationDiv>
                <AboutDiv>
                    <BoldP>About:</BoldP>
                    <textarea
                        onChange={(e) => onChangeHandler(e, "about_me")}
                        placeholder="About you"
                        defaultValue={about_me}
                        rows={10}
                    />
                </AboutDiv>
                <ThingsDiv>
                    <BoldP>Things I like:</BoldP>
                    <ThingsULikeInput
                        onChange={(e) => onChangeHandler(e, "things_user_likes")}
                        placeholder="Add things you like separated by comas..."
                        defaultValue={things_user_likes}
                        type="text"
                    /></ThingsDiv>
            </UpdateInfo>
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
        errorReducer: state.errorReducer,
    };
};
export default connect(mapStateToProps)(UpdateProfileBox);
