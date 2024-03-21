import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import InicioBilletera from "@/components/ui/InicioBilletera";

const Usuario = () => {
  const router = useRouter();
  const {
    query: { token },
  } = router;
  return (
    <Layout>
      <div
        css={css`
          color: white;
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        <InicioBilletera token={token} />
      </div>
    </Layout>
  );
};

export default Usuario;
