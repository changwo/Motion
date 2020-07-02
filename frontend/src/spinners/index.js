import React from "react";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const PurpleSpinner = () => {
  return (
    <ScaleLoader
      css={override}
      height={95}
      width={10}
      color={"#A580FF"}
      loading
    />
  );
};

export default PurpleSpinner;
