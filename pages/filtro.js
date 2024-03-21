import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../Hooks/useProductos";
import { css } from "@emotion/react";
const filtro = () => {
  //leer lo q me manda del querry en el link

  const router = useRouter();
  const {
    query: { q },
  } = router;
  //todos los productos
  const { productos } = useProductos("creado");
  const [resultado, guardarResultado] = useState([]);
  useEffect(() => {
    const busqueda = q !== undefined && q.toLowerCase();
    const filtro = productos.filter((producto) => {
      return producto.categoria.toLowerCase().includes(busqueda);
    });
    guardarResultado(filtro);
  }, [q, productos]);
  return (
    <div>
      <Layout>
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
                width: 100%;
                display: grid;
                gap: 2rem;
                grid-auto-rows: auto;
                grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
              `}
            >
              {resultado.map((producto) => (
                <DetallesProducto key={producto.id} producto={producto} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default filtro;
