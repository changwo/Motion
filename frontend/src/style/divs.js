import styled from "styled-components";

const Evenly = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const Around = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Between = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
`;
export const End = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconsWrapper = styled(Around)`
  width: 10rem;
`;
export const LoginLeftWrapper = styled(Around)`
  align-items: center;
  height: 75%;
  flex-direction: column;
  width: 100%;
`;

export const GoogleApplWrapper = styled(Between)`
  width: 260px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px rgba(0, 0, 0, 0.16);
  max-width: 340px;
  width: 100%;
  height: 80px;
`;

export const DefaultGirdElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px rgba(0, 0, 0, 0.16);
`;
export const VeriCode = styled(DefaultGirdElement)`
  grid-area: veri;
  align-items: flex-start;
  flex-direction: column;
`;
export const Email = styled(DefaultGirdElement)`
  align-items: flex-start;
  flex-direction: column;
  grid-area: email;
`;
export const Username = styled(DefaultGirdElement)`
  align-items: flex-start;
  flex-direction: column;
  grid-area: username;
`;
export const FirstName = styled(DefaultGirdElement)`
  align-items: flex-start;
  flex-direction: column;
  grid-area: first_name;
`;
export const LastName = styled(DefaultGirdElement)`
  align-items: flex-start;
  flex-direction: column;
  grid-area: last_name;
`;
export const Password1 = styled(DefaultGirdElement)`
  align-items: flex-start;
  flex-direction: column;
  grid-area: password;
`;
export const Password2 = styled(DefaultGirdElement)`
  align-items: flex-start;
  flex-direction: column;
  grid-area: password_repeat;
`;
export const Button = styled(DefaultGirdElement)`
  border-bottom: none;
  grid-area: button;
`;

export const VeriCodeWrap = styled(InputWrapper)`
  max-width: none;
`;

export const CircleDiv = styled.div`
  width: 220px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 5px solid ${(props) => props.theme.themeColor};
`;

export const LoginCricle = styled(CircleDiv)`
  grid-area: i;
  width: 200px;
  height: 200px;
  display: flex;
  justify-self: center;
  align-self: center;
`;

export const VeriInfoWrap = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CenterForms = styled(VeriCodeWrap)``;

export const InputFields = styled.div`
  display: flex;
  height: 20%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  min-width: 220px;
`;


