import React from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
const anima = keyframes`
to {
      transform: rotate(360deg);
   }
`;
const AnimatedBox = styled.div`
  width: 11.2px;
  height: 11.2px;
  border-radius: 11.2px;
  box-shadow: 28px 0px 0 0 rgba(71, 75, 255, 0.2),
    22.7px 16.5px 0 0 rgba(71, 75, 255, 0.4),
    8.68px 26.6px 0 0 rgba(71, 75, 255, 0.6),
    -8.68px 26.6px 0 0 rgba(71, 75, 255, 0.8), -22.7px 16.5px 0 0 #474bff;
  animation: ${anima} 1s infinite linear;
`;
const SpinnerHistorial = () => {
  return (
    <div
      css={css`
        height: 100%;
        z-index: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
      `}
    >
      <AnimatedBox />
    </div>
  );
};

export default SpinnerHistorial;
