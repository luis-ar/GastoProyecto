import { css } from "@emotion/react";
import { FirebaseContext } from "../../firebase";
import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
const MapaAnimada = () => {
  const [productos, guardarProductos] = useState([]);
  const [id, guardarId] = useState("");
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      let articlesSnapshot = await getDocs(
        query(collection(firebase.db, "lotes"))
      );
      const productos = articlesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      guardarProductos(productos);
      guardarId(localStorage.getItem("id"));
    };

    obtenerProductos();

    const handleStorageChange = () => {
      obtenerProductos();
    };

    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const datosFiltrados = productos.filter((item) => item.id === id);
  if (datosFiltrados) {
    const evento = new CustomEvent("datosCargados");

    localStorage.setItem("datos", JSON.stringify(datosFiltrados));
    window.dispatchEvent(evento);
  }

  return (
    <>
      <iframe
        css={css`
          width: 100%;
          height: 300px;
          box-sizing: border-box;
          overflow: hidden;
          border: 4px solid black;
          margin-top: 15px;
        `}
        src="/prueba2.html"
      />
    </>
  );
};

export default MapaAnimada;
