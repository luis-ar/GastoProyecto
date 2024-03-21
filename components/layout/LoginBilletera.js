import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FirebaseContext } from "@/firebase";
import Router from "next/router";
import Spinner from "../ui/Spinner";
import { ErrorMostrar } from "../ui/Formulario";

const Contenedor = styled.div`
  background-color: var(--contCard);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  .caja1 {
    background-color: var(--fondoBilletera);
    min-width: 300px;
    height: 400px;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .botones {
    height: 85%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .teclas {
    width: 100%;
    height: 60px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-evenly;

    @media (max-width: 1000px) {
      height: 70px;
    }
  }
  .teclas1 {
    width: 85px;
    height: 50px;
    border-radius: 15px;
    font-size: 30px;
    color: #e7e6e8;
    border: solid 0.5px #5b02da;
    cursor: pointer;
    background-color: var(--botonesBilletera);
    :hover {
      background-color: rgb(0, 0, 0, 0.7);
    }
  }
  .panelContra {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 30px;
    div {
      height: 10px;
      width: 10px;
      border-radius: 50px;
      background-color: #cbcacc;
    }
  }
  .pintado {
    background-color: black !important;
  }
  img {
    margin-bottom: 10px;
  }
  .nuevoRegistro {
    color: white;
    margin-top: 10px;
    a {
      color: blue;
    }
  }
`;
const LoginBilletera = () => {
  const [clave, guardarClave] = useState("");
  const { firebase, usuario } = useContext(FirebaseContext);
  const [error, guardarError] = useState();
  const [pase, guardarPase] = useState(false);
  // Actualizar círculos al cambiar la clave
  useEffect(() => {
    const circuloContra = document.querySelectorAll(".circuloContra");

    for (let i = 0; i < circuloContra.length; i++) {
      circuloContra[i].classList.toggle("pintado", i < clave.length);
    }
  }, [clave]);

  const crearCuenta = async (password) => {
    const data = {
      email: usuario.email,
      password: password,
    };
    try {
      const response = await fetch(
        "https://billapp-57e4b0e7460c.herokuapp.com/api/user/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        guardarPase(true);
        const token = responseData.data.accessToken;
        setTimeout(() => {
          Router.push(`/usuarios/${token}`);
        }, 1000);
      } else {
        console.error(
          "Error al enviar los datos:",
          response.status,
          response.statusText
        );

        // Imprimir más detalles sobre la respuesta
        const responseBody = await response.json();

        // Acceder al valor de la propiedad 'data'
        if (responseBody && responseBody.data) {
          guardarError(responseBody.data);
          console.log("errorrrr");
          setTimeout(() => {
            guardarError("");
            guardarClave("");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  const enviarClave = async (e) => {
    if (clave.length < 6) {
      const nuevo = clave + e.target.value;
      if (nuevo.length < 6) {
        guardarClave(nuevo);
        return;
      }
      if (nuevo.length == 6) {
        guardarClave(nuevo);
        await crearCuenta(nuevo);
        return;
      }
      return;
    }
  };

  const borrarDigito = () => {
    guardarClave((clave) => clave.slice(0, -1));
  };
  return (
    <>
      {pase && <Spinner />}
      <Contenedor className="contenedor">
        <img width="100" src="/static/img/yape.png" />
        {error && <ErrorMostrar>{error}</ErrorMostrar>}

        <div className="caja1">
          <span
            css={css`
              color: white;
              text-align: center;
            `}
          >
            Ingresa tu clave de Cass
          </span>
          <div className="panelContra" id="panelContra">
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
            <div className="circuloContra"></div>
          </div>
          <div className="botones">
            <div className="botones1 teclas">
              <button
                className="teclas1"
                id="siete"
                value={7}
                onClick={enviarClave}
              >
                7
              </button>
              <button
                className="teclas1"
                id="ocho"
                value={8}
                onClick={enviarClave}
              >
                8
              </button>
              <button
                value={9}
                className="teclas1"
                id="nueve"
                onClick={enviarClave}
              >
                9
              </button>
            </div>
            <div className="botones2 teclas">
              <button
                value={4}
                className="teclas1"
                id="cuatro"
                onClick={enviarClave}
              >
                4
              </button>
              <button
                value={5}
                className="teclas1"
                id="cinco"
                onClick={enviarClave}
              >
                5
              </button>
              <button
                value={6}
                className="teclas1"
                id="seis"
                onClick={enviarClave}
              >
                6
              </button>
            </div>
            <div className="botones3 teclas">
              <button
                value={1}
                className="teclas1"
                id="uno"
                onClick={enviarClave}
              >
                1
              </button>
              <button
                value={2}
                className="teclas1"
                id="dos"
                onClick={enviarClave}
              >
                2
              </button>
              <button
                value={3}
                className="teclas1"
                id="tres"
                onClick={enviarClave}
              >
                3
              </button>
            </div>
            <div className="botones4 teclas">
              <button
                value={0}
                className="teclas1"
                id="cero"
                onClick={enviarClave}
              >
                0
              </button>
              <button
                className="bx bx-message-square-x teclas1"
                id="borrar"
                value={"borrar"}
                onClick={borrarDigito}
              ></button>
              <button
                className="teclas1 bx bxs-send"
                id="enviar"
                onClick={enviarClave}
              ></button>
            </div>
          </div>
        </div>
        <div className="nuevoRegistro">
          <h3>
            ¿No tienes Cuenta? <a href="/registroBilletera">Registrate aqui</a>
          </h3>
        </div>
      </Contenedor>
    </>
  );
};

export default LoginBilletera;
