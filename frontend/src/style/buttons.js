import styled from "styled-components";

export const DefaultButton = styled.button`
  padding: 15px 20px;
  border-radius: 30px;
  border: solid 1px #00000041;
  background-color: transparent;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.athensGray};
  }
`;

export const ColoredButton = styled(DefaultButton)`
  background-image: ${(props) => props.theme.signInBotton};
  color: white;
  border: none;
  padding: 10px;
  width: 260px;
  height: 60px;
  margin-left: 0;
`;

export const LoginB = styled(DefaultButton)`
  grid-area: b;
`;

export const ThemedB = styled(ColoredButton)`
  display: flex;
  justify-self: center;
  grid-area: b;
  justify-content: center;
  align-items: center;
`;
export const TransButton = styled(DefaultButton)`
  border-radius: 100px;
  border: solid 2px #ffffff80;
  color: #ffffff;
`;
