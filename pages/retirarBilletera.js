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
import recuperarDatosUsuario from "@/Validacion/recuperarDatosUsuario";
import enviarDineroPropia from "@/Validacion/enviarDineroPropia";
import obtenerSaldo from "@/Validacion/obtenerSaldo";
import restarSaldoCreador from "@/Validacion/restarSaldoCreador";
import Mensaje from "@/components/ui/Mensaje";
import enviarDineroGeneralUsuario from "@/Validacion/enviarDineroGeneralUsuario";

const STATE_INICIAL = {
  password: "",
  monto: "",
};
const retirarBilletera = () => {
  const { firebase, usuario } = useContext(FirebaseContext);
  const [error, guardarError] = useState("");
  const [datosUsuario, setDatosUsuario] = useState(STATE_INICIAL);
  const [pase, guardarPase] = useState(false);
  const [mensaje, setMensaje] = useState();

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
        console.log(usuario.email);
        console.log(password);
        console.error(
          "Error al enviar los datos:",
          response.status,
          response.statusText
        );

        // Imprimir más detalles sobre la respuesta
        const responseBody = await response.json();

        // Acceder al valor de la propiedad 'data'
        if (responseBody && responseBody.data) {
          console.log(responseBody.data);
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

  const Retiro = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: -15px;
    z-index: 200;
    width: 100%;
    height: 81vh;
    font-size: 40px;
    font-weight: bold;
  `;
  const recarga = async () => {
    const token = await crearToken();
    if (error == "") {
      const respuesta = await recuperarDatosUsuario(token);
      const id = respuesta["data"]["id"];
      const saldo = await obtenerSaldo(usuario.uid);
      if (saldo >= monto) {
        const res = await enviarDineroGeneralUsuario(monto, id);
        await restarSaldoCreador(usuario.uid, monto);
        console.log("desde retiro", res);
        if (!res["error"]) {
          setMensaje("Retiro con exito");
          setTimeout(() => {
            setMensaje("");
            Router.push(`/`);
          }, 1500);
        }
      } else {
        guardarError("El monto excede al saldo");
        setTimeout(() => {
          guardarError("");
        }, 1500);
      }
    }
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
          position: relative;
          @media (min-width: 1000px) {
            margin-left: 300px;
          }
        `}
      >
        {pase && <Spinner />}
        {mensaje && <Retiro>{mensaje}</Retiro>}
        <h2
          css={css`
            text-align: center;
            margin-top: 15px;
          `}
        >
          Retirar Saldo
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
              placeholder="Ingrese el monto a retirar"
              value={monto}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Campo>

          {error && <ErrorMostrar>{error}</ErrorMostrar>}
          <InputSubmit type="submit" value="Retirar Saldo" />
        </Formulario>
      </div>
    </Layout>
  );
};

export default retirarBilletera;
