import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Router from "next/router";
const ContenedorHijo = styled.div`
  text-align: center;
  i {
    margin-top: 1rem;
    font-size: 2.3rem;
  }

  h2 {
    font-size: 1.5rem;
  }
  :hover {
    cursor: pointer;
    background-color: var(--gris3);
  }
`;
const ContenedorPadre = styled.div`
  border-bottom: 2px solid var(--gris3);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: space-evenly;
  grid-gap: 4px;
  position: relative;
  margin-bottom: 12vh;
  top: 12vh;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr); /* Dos columnas de igual ancho */
    grid-template-rows: repeat(2, 1fr); /* Tres filas de igual altura */
  }
`;

const BarraFiltro = () => {
  const [filtro, guardarFiltro] = useState("");

  useEffect(() => {
    if (filtro !== "regreso" && filtro !== "") {
      //redireccionar a /buscar
      Router.push({
        pathname: "/filtro",
        query: { q: filtro },
      });
    } else if (filtro === "regreso") {
      Router.push("/");
    }
  }, [filtro]);
  return (
    <>
      <ContenedorPadre>
        <ContenedorHijo
          onClick={() => {
            guardarFiltro("casa");
          }}
        >
          <i className="bx bxs-home-alt-2"></i>
          <h2>Casa</h2>
        </ContenedorHijo>
        <ContenedorHijo
          onClick={() => {
            guardarFiltro("oficina");
          }}
        >
          <i className="bx bxs-business"></i> <h2>Oficina</h2>
        </ContenedorHijo>
        <ContenedorHijo
          onClick={() => {
            guardarFiltro("localComercial");
          }}
        >
          <i className="bx bxs-store-alt"></i> <h2>Local Comercial</h2>
        </ContenedorHijo>
        <ContenedorHijo
          onClick={() => {
            guardarFiltro("departamento");
          }}
        >
          <i className="bx bxs-building-house"></i>
          <h2>Departamento</h2>
        </ContenedorHijo>
        <ContenedorHijo
          onClick={() => {
            guardarFiltro("terreno");
          }}
        >
          <i className="bx bxs-landmark"></i> <h2>Terreno</h2>
        </ContenedorHijo>
        <ContenedorHijo
          onClick={() => {
            guardarFiltro("habilitacionUrbana");
          }}
        >
          <i className="bx bxs-map"></i>
          <h2>Habilitación Urbana</h2>
        </ContenedorHijo>
      </ContenedorPadre>
    </>
  );
};

export default BarraFiltro;
