import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/BarraCelular.module.css";
import styled from "@emotion/styled";
import Link from "next/link";
import { FirebaseContext } from "@/firebase";
import { useRouter } from "next/router";

const MenuContenedor = styled.div`
  display: none;
  width: 100vw;
  @media (max-width: 1000px) {
    display: block;
  }
`;
const MenuCelular = () => {
  let valorInicial = "lista2"; // Valor por defecto
  const router = useRouter();

  if (typeof window !== "undefined") {
    valorInicial = localStorage.getItem("clave") || "lista1";
  }

  const [isActive, setIsActive] = useState("lista1");
  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const loadDataFromLocalStorage = async () => {
      // Esperar hasta que se lea el valor del localStorage
      const valorInicial1 = (await localStorage.getItem("clave")) || "lista1";
      setIsActive(valorInicial1);
    };

    loadDataFromLocalStorage();
  }, [router]);
  return (
    <>
      <MenuContenedor>
        <div className={styles.navigation}>
          <ul>
            <li
              className={`${styles.list} ${
                isActive == "lista1" ? styles.active : ""
              }`}
            >
              <Link
                href="/"
                onClick={(e) => {
                  setIsActive("lista1");
                  localStorage.setItem("clave", "lista1");
                  localStorage.removeItem("indice");
                }}
              >
                <span className={styles.icon}>
                  <i className="bx bx-home-heart"></i>
                </span>
                <span className={styles.text}>Inicio</span>
              </Link>
            </li>
            <li
              className={`${styles.list} ${
                isActive == "lista2" ? styles.active : ""
              }`}
            >
              <Link
                href="/populares"
                onClick={(e) => {
                  setIsActive("lista2");
                  localStorage.setItem("clave", "lista2");
                  localStorage.removeItem("indice");
                }}
              >
                <span className={styles.icon}>
                  <i className="bx bx-star"></i>
                </span>
                <span className={styles.text}>Destacados</span>
              </Link>
            </li>

            {usuario && (
              <li
                className={`${styles.list} ${
                  isActive == "lista3" ? styles.active : ""
                }`}
              >
                <Link
                  href="/nuevoProducto"
                  onClick={(e) => {
                    setIsActive("lista3");
                    localStorage.setItem("clave", "lista3");
                    localStorage.removeItem("indice");
                  }}
                >
                  <span className={styles.icon}>
                    <i className="bx bx-news"></i>
                  </span>
                  <span className={styles.text}>Nuevo Producto</span>
                </Link>
              </li>
            )}
            {!usuario ? (
              <div className={styles.contenedorIndicator} id="container">
                <div className={styles.indicator}></div>
              </div>
            ) : (
              <div className={styles.contenedorIndicator1}>
                <div className={styles.indicator}></div>
              </div>
            )}
          </ul>
        </div>
      </MenuContenedor>
    </>
  );
};

export default MenuCelular;
