import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React from "react";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import PanelTransferencia from "@/components/ui/PanelTransferencia";

const Recarga = () => {
  const router = useRouter();
  const {
    query: { token },
  } = router;
  const tipo = "recarga";
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
        <PanelTransferencia token={token} tipo={tipo} />
      </div>
    </Layout>
  );
};

export default Recarga;
