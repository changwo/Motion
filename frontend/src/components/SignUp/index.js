import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import { sendCode, validate } from "../../store/actions/signUpAction";

import { BlackP, ValiP, LoginP, LoginGrey } from "../../style/paragraphs";
import { SignInH1, ErrorHeader, Title, LoginH1 } from "../../style/headers";
import { InputFieldsForm, LoginField } from "../../style/forms";
import {
  InputWrapper,
  Column,
  CircleDiv,
  VeriCode,
  Email,
  Username,
  FirstName,
  LastName,
  Password1,
  Password2,
  Button,
  InputFields,
  LoginCricle,
} from "../../style/divs";
import {
  UserIcon,
  PassIcon,
  CheckMark,
  Ellipsis1,
  Ellipsis2,
  Ellipsis3,
} from "../../style/images";
import { DefaulInput } from "../../style/inputs";
import { ColoredButton, ThemedB, LoginB, DefaultButton } from "../../style/buttons";
import {
  VeriContainer,
  SignUpPageContainer,
  CongratsPageContainer,
} from "../../style/containers";
import { WhiteButton } from "../../style/profileModuleContainer";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onEmailHandler = (event) => {
    const value = event.currentTarget.value;
    setEmail(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(sendCode({ email }, "api/auth/registration/"));
  };

  const errorMessage = (
    <Column>
      <ErrorHeader>Try again...</ErrorHeader>
      <ErrorHeader>{props.registration.error}</ErrorHeader>
    </Column>
  );

  return (
    <SignUpPageContainer>
      <LoginP>Already have an account?</LoginP>
      <WhiteButton onClick={props.toggleSignUp}>Sign In</WhiteButton>
      <LoginH1>Sign Up</LoginH1>
      <LoginField onSubmit={onSubmitHandler}>
        {props.registration.error ? errorMessage : null}
        <InputWrapper>
          <UserIcon />
          <DefaulInput
            onChange={onEmailHandler}
            type="email"
            placeholder="Enter email"
          />
        </InputWrapper>
        <ColoredButton type="submit">CONTINUE</ColoredButton>
      </LoginField>
      <Ellipsis1 />
    </SignUpPageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    registration: state.registrationReducer,
  };
};

export default connect(mapStateToProps)(SignUp);

export const CongratsPage = (props) => {
  const congratsMsg = (
    <LoginGrey>
      We've sent a confirmation code to your email: {props.email}
    </LoginGrey>
  );
  return (
    <CongratsPageContainer>
      <LoginH1>Congratulations!</LoginH1>
      {congratsMsg}
      <LoginCricle>
        <CheckMark />
      </LoginCricle>
      <ThemedB onClick={props.handleNextPage}>CONTINUE</ThemedB>
      <Ellipsis2 />
    </CongratsPageContainer>
  );
};

export const VerificationPage = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    code: "",
    password: "",
    password_repeat: "",
    first_name: "",
    last_name: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(validate(userInfo, "api/auth/registration/validation/"));
  };

  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setUserInfo({ ...userInfo, [property]: value });
  };

  return (
    <VeriContainer onSubmit={handleSubmit}>
      <Title>Verification</Title>

      <VeriCode>
      <ValiP>Verification code:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "code")}
          type="text"
          placeholder="Enter Validation Code"
          required
        />
      </VeriCode>

      <Email>
        <ValiP>Email:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "email")}
          placeholder="Enter email"
          type="email"
          required
        />
      </Email>
      <Username>
        <ValiP>Username:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "username")}
          placeholder="Enter username"
          type="text"
          required
        />
      </Username>
      <FirstName>
      <ValiP>First Name:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "first_name")}
          type="text"
          placeholder="Enter First Name"
          required
        />
      </FirstName>

      <LastName>
      <ValiP>Last Name:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "last_name")}
          type="text"
          placeholder="Enter Last Name"
          required
        />
      </LastName>
      <Password1>
      <ValiP>Password:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "password")}
          type="password"
          placeholder="Enter password"
          required
        />
      </Password1>
      <Password2>
      <ValiP>Re-type Password:</ValiP>
        <DefaulInput
          onChange={(e) => onChangeHandler(e, "password_repeat")}
          type="password"
          placeholder="Password"
          required
        />
      </Password2>
      <Button>
        <ColoredButton className="button" type="submit">
          COMPLETE
        </ColoredButton>
      </Button>
      <Ellipsis3 />
    </VeriContainer>
  );
};
