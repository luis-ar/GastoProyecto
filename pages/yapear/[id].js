import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import PanelYapear from "@/components/ui/PanelYapear";

const Usuario = () => {
  const router = useRouter();
  const {
    query: { token, id, tipo },
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
        <PanelYapear token={token} id={id} tipo={tipo} />
      </div>
    </Layout>
  );
};

export default Usuario;
