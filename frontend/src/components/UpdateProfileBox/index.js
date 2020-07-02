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
            id,
        },
    } = props;


    const [userInfo, setUserInfo] = useState({
        first_name: `${first_name}`,
        last_name: `${last_name}`,
        username: `${username}`,
        location: `${location}`,
        about_me: `${about_me}`,
        things_user_likes: `${things_user_likes}`,
        avatar: ``,
        avatarUrl: ``
    });
    // console.log("UpdateProfileBox -> userInfo", userInfo);

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
        form.append('things_user_likes', userInfo.things_user_likes)
        form.append('avatar', userInfo.avatar)

        const response = await dispatch(updateUserAction(form));
        if (response.status === 200) push("/profile");
    };

    const avatarSelectHandler = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = function (e) {
                setUserInfo({...userInfo, avatarUrl: reader.result, avatar: file})
            }
        }
    }


    return (
        <>
            <ErrorMessage>{updatePostError ? `${updatePostError} is invalid` : null}</ErrorMessage>
            <UpdateInfo>

                <Banner src={banner}/>
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
                    <AvatarLabel htmlFor="hiddenFileInput">Upload Avatar</AvatarLabel>
                    <AvatarInput id="hiddenFileInput" accept={"image/*"} onChange={avatarSelectHandler} type="file"/>
                </UserDiv>
                <SaveDiv>
                    <SaveButton onClick={handleSubmit}>SAVE</SaveButton>
                </SaveDiv>
                <DeleteDiv>
                    <DeleteButton>DELETE ACCOUNT</DeleteButton>
                </DeleteDiv>

                <FristNameDiv>
                    <p>First Name:</p>
                    <input
                        onChange={(e) => onChangeHandler(e, "first_name")}
                        placeholder="Enter first name"
                        defaultValue={first_name}
                        type="text"
                        required
                    />
                </FristNameDiv>
                <LastNameDiv>
                    <p>Last Name:</p>
                    <input
                        onChange={(e) => onChangeHandler(e, "last_name")}
                        placeholder="Enter last name"
                        defaultValue={last_name}
                        type="text"
                        required
                    />
                </LastNameDiv>
                <UserNameDiv>
                    <p>Username:</p>
                    <input
                        onChange={(e) => onChangeHandler(e, "username")}
                        placeholder="Enter username"
                        defaultValue={username}
                        type="text"
                        required
                    />
                </UserNameDiv>
                <LocationDiv>
                    <p>Location:</p>
                    <input
                        onChange={(e) => onChangeHandler(e, "location")}
                        placeholder="Enter location"
                        defaultValue={location}
                        type="text"
                        required
                    />
                </LocationDiv>
                <AboutDiv>
                    <p>About:</p>
                    <input
                        onChange={(e) => onChangeHandler(e, "about_me")}
                        placeholder="About you"
                        defaultValue={about_me}
                        type="text"
                        required
                    />
                </AboutDiv>
                <ThingsDiv>
                    <p>About:</p>
                    <input
                        onChange={(e) => onChangeHandler(e, "things_user_likes")}
                        placeholder="Add things you like separated by spaces..."
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
