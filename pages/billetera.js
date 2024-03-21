import LoginBilletera from "@/components/layout/LoginBilletera";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import Layout from "@/components/layout/Layout";
const billetera = () => {
  return (
    <Layout>
      <div
        css={css`
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        <LoginBilletera />
      </div>
    </Layout>
  );
};

export default billetera;
