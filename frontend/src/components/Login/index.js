import React, { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { sendLogin } from "../../store/actions/loginAction";

import { LoginH1, ErrorHeader } from "../../style/headers";
import { UserIcon, PassIcon } from "../../style/images";
import { LoginP } from "../../style/paragraphs";
import { InputWrapper, Column, InputFields } from "../../style/divs";
import { LoginField } from "../../style/forms";
import { DefaulInput } from "../../style/inputs";

import { ColoredButton, LoginB } from "../../style/buttons";
import { LoginPageContainer } from "../../style/containers";

const Login = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(sendLogin({ email, password }, "api/auth/token/"));
  };

  const onEmailHandler = (event) => {
    const value = event.currentTarget.value;
    setEmail(value);
  };

  const onPasswordHandler = (event) => {
    const value = event.currentTarget.value;
    setPassword(value);
  };

  const errorMessage = (
    <Column>
      <ErrorHeader>Try again...</ErrorHeader>
      <ErrorHeader>{props.authReducer.error}</ErrorHeader>
    </Column>
  );

  return (
    <LoginPageContainer onSubmit={loginHandler}>
      <LoginP>Don't have an account?</LoginP>
      <div>
        <LoginB onClick={props.toggleSignUp}>Sign Up</LoginB>
      </div>

      <LoginH1>Sign In</LoginH1>
      <LoginField>
        {props.authReducer.error ? errorMessage : null}
        <InputWrapper>
          <UserIcon />
          <DefaulInput
            onChange={onEmailHandler}
            type="email"
            placeholder="Enter email"
          />
        </InputWrapper>
        <InputWrapper>
          <PassIcon />
          <DefaulInput
            onChange={onPasswordHandler}
            type="password"
            placeholder="Enter Password"
          />
        </InputWrapper>
        <ColoredButton type="submit">Sign In</ColoredButton>
      </LoginField>
    </LoginPageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(Login);
