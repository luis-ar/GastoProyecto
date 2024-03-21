import Layout from "@/components/layout/Layout";
import React, { useContext } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import { FirebaseContext } from "@/firebase";
const ContenedorInversiones = styled.div`
  color: white;
  h3 {
    text-align: center;
    text-transform: uppercase;
    font-size: 3.5rem;
    margin-top: 10px;
  }
  @media (min-width: 1000px) {
    margin-left: 300px;
  }
`;
const misInversiones = () => {
  const { productos } = useProductos("creado");
  const { firebase, usuario } = useContext(FirebaseContext);

  const datosFiltrados = productos.filter(
    (item) => item.categoria !== "habilitacionUrbana"
  );

  const inversiones = productos.filter((producto) => {
    return producto.inversores.some(
      (inversor) => inversor.usuarioId === usuario.uid
    );
  });
  return (
    <div>
      <Layout>
        <ContenedorInversiones className="listado-productos">
          <h3>Mis Inversiones</h3>
          <div className="contenedor">
            {inversiones.length == 0 ? (
              <h2
                css={css`
                  text-align: center;
                `}
              >
                "Aun no tiene inversiones"
              </h2>
            ) : (
              <ul
                css={css`
                  width: 100%;
                  display: grid;
                  gap: 2rem;
                  grid-auto-rows: auto;
                  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
                `}
              >
                {inversiones.map((producto) => (
                  <DetallesProducto key={producto.id} producto={producto} />
                ))}
              </ul>
            )}
          </div>
        </ContenedorInversiones>
      </Layout>
    </div>
  );
};

export default misInversiones;
