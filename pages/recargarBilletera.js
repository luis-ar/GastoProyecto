import styled from "@emotion/styled";
import { css } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Router from "next/router";
import { FirebaseContext } from "@/firebase";
import {
  Formulario,
  Campo,
  InputSubmit,
  ErrorMostrar,
} from "../components/ui/Formulario";

import useValidacion from "../Hooks/useValidacion";
import Spinner from "@/components/ui/Spinner";
import { convertirUsuarioBilletera } from "@/Validacion/convertirUsuarioBilletera";
import validarRecargarBilletera from "@/Validacion/validarRecargarBilletera";
import sumarSaldo from "@/Validacion/actualizarSaldo";

const STATE_INICIAL = {
  password: "",
  monto: "",
};
const recargarBilletera = () => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [error, guardarError] = useState();
  const [datosUsuario, setDatosUsuario] = useState(STATE_INICIAL);
  const [pase, guardarPase] = useState(false);

  const crearToken = async () => {
    let token;
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
        token = responseData.data.accessToken;
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
          setTimeout(() => {
            guardarError("");
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
    return token;
  };

  const recarga = async () => {
    const url = "https://billapp-57e4b0e7460c.herokuapp.com/api/wallet/send";
    const token = await crearToken();
    const data = {
      depositUserID: "bb9b1c0d-c664-4b12-b0de-00a77723edea",
      amount: parseInt(monto),
    };

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Respuesta:", result);
        if (result["error"]) {
          guardarError(result["data"][0]);
          setTimeout(() => {
            guardarError("");
          }, 2000);
        } else {
          sumarSaldo(usuario.uid, monto);
          Router.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const { valores, errores, handleSumit, handleChange, handleBlur } =
    useValidacion(datosUsuario, validarRecargarBilletera, recarga);

  const { password, monto } = valores;

  return (
    <Layout>
      <div
        css={css`
          color: white;
          margin-bottom: 45px;
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        {pase && <Spinner />}

        <h2
          css={css`
            text-align: center;
            margin-top: 15px;
          `}
        >
          Recargar Saldo{" "}
        </h2>

        <Formulario onSubmit={handleSumit} noValidate>
          {errores.email && <ErrorMostrar>{errores.email}</ErrorMostrar>}
          <Campo>
            <label htmlFor="nombre">Correo</label>

            {usuario && (
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Tu Correo"
                value={usuario.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}
          </Campo>
          {errores.password && <ErrorMostrar>{errores.password}</ErrorMostrar>}
          <Campo>
            <label htmlFor="nombre">Contraseña</label>
            <input
              type="password"
              maxlength="6"
              id="password"
              name="password"
              placeholder="Tu Contraseña de cass"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>
          {errores.monto && <ErrorMostrar>{errores.monto}</ErrorMostrar>}
          <Campo>
            <label htmlFor="nombre">Monto</label>
            <input
              type="text"
              id="monto"
              name="monto"
              placeholder="Ingrese el monto a recargar"
              value={monto}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          {error && <ErrorMostrar>{error}</ErrorMostrar>}
          <InputSubmit type="submit" value="Recargar Saldo" />
        </Formulario>
      </div>
    </Layout>
  );
};

export default recargarBilletera;
