import React, { useContext, useEffect, useState } from "react";
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Boton from "../ui/Boton";
import { FirebaseContext } from "../../firebase";
import SliderBarra from "../ui/SliderBarra";
import BarraSimple from "../ui/BarraSimple";
import BarraRedes from "../ui/BarraRedes";
import BarraLateral from "../ui/BarraLateral";
import obtenerSaldo from "@/Validacion/obtenerSaldo";
import { doc, onSnapshot } from "firebase/firestore";
const ContenedorHeader = styled.div`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  height: 10vh;
  border-bottom: 4px solid black;
  z-index: 5;
  top: 0;
  background-color: var(--colorBarraSuperior);
  display: flex;
  justify-content: space-between;
  color: white;
  @media (min-width: 1000px) {
    width: calc(100% - 300px);
  }
  .contenedorImagen {
    width: 50px;
    height: 50px;
    margin-left: 10px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }

    @media (max-width: 750px) {
      width: 30px;
      height: 30px;
    }
  }
`;
const Logo = styled.div`
  .iconoEscritorio {
    width: 150px;
    margin-right: 15px;
    margin-left: 5px;
  }

  .iconoCelular {
    display: none;
  }

  @media (max-width: 800px) {
    .iconoEscritorio {
      display: none;
    }

    .iconoCelular {
      display: block;
      width: 20px;
      margin-right: 15px;
      margin-left: 5px;
    }
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

const Header = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  const [saldo, setSaldo] = useState();

  const recuperarSaldo = async () => {
    if (usuario) {
      const saldoUsuario = await obtenerSaldo(usuario.uid);
      setSaldo(saldoUsuario);
    }
  };
  useEffect(() => {
    if (usuario) {
      // Suscribirse a cambios en el documento individual del usuario
      const usuarioDocRef = doc(firebase.db, "usuarios", usuario.uid);

      const unsuscribeUsuario = onSnapshot(usuarioDocRef, (usuarioDoc) => {
        // Lógica para manejar cambios en el documento individual del usuario
        // console.log("El documento del usuario ha cambiado:", usuarioDoc.data());

        // Asegúrate de que el campo 'saldo' esté presente antes de intentar recuperarlo
        if (usuarioDoc.exists() && usuarioDoc.data().saldo !== undefined) {
          recuperarSaldo();
        }
      });

      // La función de limpieza se ejecutará al desmontar el componente
      return () => {
        unsuscribeUsuario();
      };
    }
  }, [usuario]);
  const formatearPresupuesto = (cantidad) => {
    return cantidad.toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });
  };
  recuperarSaldo();
  return (
    <>
      <BarraLateral />
      <div
        css={css`
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        <header>
          <ContenedorHeader>
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <Link
                href="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                <Logo>
                  <img src="/static/img/logo.png" className="iconoCelular" />
                  <img
                    src="/static/img/future.png"
                    className="iconoEscritorio"
                  />
                </Logo>
              </Link>
              {/* Buscador aqui */}
              <Buscar />
              {/* Nav aqui */}
              {/* <Navegacion /> */}
            </div>

            <div
              css={css`
                display: flex;
                align-items: center;
                margin-right: 10px;
              `}
            >
              {usuario ? (
                <>
                  {/* Menu de administracion */}
                  <p
                    css={css`
                      text-align: center;
                      @media (max-width: 490px) {
                        font-size: 1.1rem;
                        margin-right: 2rem;
                      }
                      @media (max-width: 750px) {
                        display: none;
                      }
                    `}
                  >
                    Hola: {usuario.displayName}
                  </p>

                  {saldo >= 0 && (
                    <p
                      css={css`
                        margin-left: 10px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;

                        @media (max-width: 600px) {
                          font-size: 10px;
                        }
                      `}
                    >
                      <span>
                        Saldo: {formatearPresupuesto(parseFloat(saldo))}
                      </span>
                      <div
                        css={css`
                          a {
                            width: 100%;
                          }
                          @media (max-width: 480px) {
                            display: flex;
                            flex-direction: column;
                            gap: 5px;
                          }
                        `}
                      >
                        <Link
                          href="/recargarBilletera"
                          css={css`
                            color: white;
                            background-color: #019f09;
                            margin-right: 10px;
                            padding: 0 5px;
                          `}
                        >
                          Recargar
                        </Link>
                        <Link
                          href="/retirarBilletera"
                          css={css`
                            color: white;
                            background-color: #d82918;
                            padding: 0 5px;
                          `}
                        >
                          Retirar
                        </Link>
                      </div>
                    </p>
                  )}

                  <Link href="/Login">
                    <Boton
                      bgColor="true"
                      onClick={() => {
                        firebase.cerrarSesion();
                      }}
                      css={css`
                        margin-left: 10px !important;
                        @media (max-width: 750px) {
                          font-size: 10px !important;
                        }
                      `}
                    >
                      Cerrar Sesión
                    </Boton>
                  </Link>

                  <div className="contenedorImagen">
                    <img
                      src={
                        usuario.photoURL != null && usuario.photoURL
                          ? usuario.photoURL
                          : "/static/img/imagenPerfil.png"
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <Link href="/Login">
                    <Boton
                      bgColor="true"
                      css={css`
                        margin-right: 10px !important;
                        padding: 6px 6px !important;
                      `}
                    >
                      Login
                    </Boton>
                  </Link>
                  <Link href="/crear-cuenta">
                    <Boton
                      css={css`
                        margin-right: 10px !important;
                        padding: 6px 6px !important;
                      `}
                    >
                      Crear Cuenta
                    </Boton>
                  </Link>
                </>
              )}
            </div>
          </ContenedorHeader>
        </header>

        <SliderBarra />
        <div
          css={css`
            position: fixed;
            bottom: 0;
            z-index: 1;
            width: 100%;
          `}
        >
          <BarraSimple />
        </div>
      </div>
    </>
  );
};

export default Header;
