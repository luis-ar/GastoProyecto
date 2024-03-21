import Head from "next/head";
import { css } from "@emotion/react";
import Layout from "../layout/Layout";

const MostrarMapa = () => {
  return (
    <div
      css={css`
        width: 100%;

        height: 100%;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
      `}
    >
      <Head>
        <title>Mi Página</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBB2CViIy1tu-h-NbBqKkNT97q68K6jgww"></script>
      </Head>

      <iframe
        src="/prueba.html"
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          backgroundColor: "black",
          padding: "0",
          margin: "0",
        }}
      />
    </div>
  );
};

export default MostrarMapa;
