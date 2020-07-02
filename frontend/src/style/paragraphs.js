import styled from "styled-components";

export const WhiteP = styled.p`
  color: white;
  line-height: 1.5;
  font-weight: normal;
  opacity: 0.6;
`;
export const BlackP = styled.p`
  line-height: 1.5;
  font-size: 0.875rem;
  margin-left: 30px;
`;
export const ValiP = styled(BlackP)`
  font-size: 1rem;
  margin-left: 0;
`;

export const LoginP = styled(BlackP)`
  padding-top: 10px;
  grid-area: p;
  display: flex;
  justify-content: flex-end;
`;

export const GreyP = styled(BlackP)`
  color: #696969;
  margin-left: 0;
  justify-content: center;
`;

export const LoginGrey = styled(GreyP)`
  grid-area: m;
  justify-self: center;
`;

export const LogRights = styled.p`
  color: white;
  font-weight: 300;
  opacity: 0.6;
  text-align: center;
  font-size: 0.75rem;
`;
