import React from "react";
import { css } from "@emotion/react";

const Mensaje = ({ children, tipo }) => {
  return (
    <div
      css={css`
        padding: 2rem 5rem;
        max-width: 60rem;
        margin: 2rem auto 2rem auto;
        font-weight: 900;
        text-transform: uppercase;
        font-size: 1.8rem;
        text-align: center;
        background-color: white;
        border-left: 5px solid #b91c1c;
        color: #b91c1c;
      `}
      className={`alerta ${tipo}`}
    >
      {children}
    </div>
  );
};

export default Mensaje;
