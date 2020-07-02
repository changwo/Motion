import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { TOGGLE_SIGNUP } from "../../store/types";
import { useHistory } from "react-router-dom";

import {
  BasePageContainer,
  LoginLeft,
  LoginRight,
} from "../../style/containers";

import { LoginLogo, GoogleIcon, AppleIcon, IconDiv } from "../../style/images";

import { LogoH1 } from "../../style/headers";
import { WhiteP, LogRights } from "../../style/paragraphs";
import {
  GoogleApplWrapper,
  IconsWrapper,
  LoginLeftWrapper,
} from "../../style/divs";
import Login from "../../components/Login";
import SignUp, {
  VerificationPage,
  CongratsPage,
} from "../../components/SignUp";
import { nextPage } from "../../store/actions/signUpAction";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const {
    authReducer: { token, authenticated, error: authError},
    registration: {
      isVeriCodeSent,
      willSignUp,
      veriStep,
      error,
      email,
      isValidated,
    },
  } = props;

  useEffect(() => {
    if (isVeriCodeSent) {
      dispatch(nextPage());
    }
  }, [isVeriCodeSent]);

  useEffect(() => {
    if (authenticated) {
      push("/feed");
    }
  }, [push, authenticated]);

  useEffect(() => {
    if (isValidated) {
      dispatch({ type: TOGGLE_SIGNUP });
    }
  }, [isValidated]);

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const toggleSignUp = () => {
    dispatch({ type: TOGGLE_SIGNUP });
  };

  const LoginPage = <Login toggleSignUp={toggleSignUp} />;
  const SignUpPages = [
    <SignUp toggleSignUp={toggleSignUp} />,
    <CongratsPage handleNextPage={handleNextPage} email={email} />,
    <VerificationPage />,
  ];

  return (
    <BasePageContainer>
      <LoginLeft>
        <LoginLeftWrapper>
          <LoginLogo />
          <LogoH1>Motion</LogoH1>
          <WhiteP>
            Connect with friends and the world <br /> around you with Motion
          </WhiteP>
          <GoogleApplWrapper>
            <GoogleIcon />
            <AppleIcon />
          </GoogleApplWrapper>

          <IconsWrapper>
            <IconDiv>
              <i className="fab fa-twitter"></i>
            </IconDiv>
            <IconDiv>
              <i className="fab fa-facebook-f"></i>
            </IconDiv>
            <IconDiv>
              <i className="fab fa-instagram"></i>
            </IconDiv>
          </IconsWrapper>
          <LogRights>© Motion 2018. All rights reserved.</LogRights>
        </LoginLeftWrapper>
      </LoginLeft>
      <LoginRight>{willSignUp ? SignUpPages[veriStep] : LoginPage}</LoginRight>
    </BasePageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    userReducer: state.userReducer,
    registration: state.registrationReducer,
  };
};

export default connect(mapStateToProps)(HomePage);
