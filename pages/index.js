import Layout from "../components/layout/Layout";
import React, { useEffect, useState, useContext } from "react";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import Slider from "@/components/ui/Slider";
// npm i @emotion/core @emotio/styled babel-plugin-emotion @emotion/babel-preset-css-prop
// npm install @emotion/core @emotion/styled babel-plugin-emotion @emotion/babel-preset-css-prop @babel-core @emotion/react –save
import { css } from "@emotion/react";

export default function Home() {
  const { productos } = useProductos("creado");

  const datosFiltrados = productos.filter(
    (item) => item.categoria !== "habilitacionUrbana"
  );

  return (
    <>
      <Layout>
        <Slider />
        <div
          className="listado-productos"
          css={css`
            @media (min-width: 1000px) {
              margin-left: 300px;
            }
          `}
        >
          <div className="contenedor">
            <ul
              css={css`
                margin-bottom: 60px;
                width: 100%;
                display: grid;
                gap: 30px;
                grid-auto-rows: auto;
                grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
                /* display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                gap: 15px; */
              `}
            >
              {datosFiltrados.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
