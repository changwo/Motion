import styled from "styled-components";

export const InputFieldsForm = styled.form`
  display: flex;
  height: 20%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  min-width: 220px;
`;

export const LoginField= styled(InputFieldsForm)`
  grid-area: i;
  width: 100%;
  height: 100%;

`

export const VeriForm = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 700px;
  width: 600px;
  min-width: 600px;
  flex-direction: column;
`;
