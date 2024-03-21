import { FirebaseContext } from "../firebase";
import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function useProductos(orden) {
  const [productos, guardarProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = async () => {
      let articlesSnapshot = await getDocs(
        query(collection(firebase.db, "productos"), orderBy(orden, "desc"))
      );
      const productos = articlesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      guardarProductos(productos);
    };
    obtenerProductos();
  }, []);
  return {
    productos,
  };
}
