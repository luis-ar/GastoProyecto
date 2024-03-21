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
const Spinner = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        width: 100%;
        z-index: 200;
        @media (min-width: 1000px) {
          width: calc(100% - 300px);
        }
      `}
    >
      <AnimatedBox />
    </div>
  );
};

export default Spinner;
