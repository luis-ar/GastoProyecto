import {
  Formulario,
  Campo,
  InputSubmit,
  ErrorMostrar,
} from "../components/ui/Formulario";
import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import { css } from "@emotion/react";
import firebase from "../firebase";
import Router from "next/router";
//Validaciones
import useValidacion from "../Hooks/useValidacion";
import validarIniciarSesion from "../Validacion/validarIniciarSesion";
const STATE_INICIAL = {
  email: "",
  password: "",
};
const Login = () => {
  const [error, guardarError] = useState(false);
  const iniciarSesion = async () => {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.error("hubo un error al autenticar el usuario", error.message);
      guardarError(error.message);
    }
  };
  const { valores, errores, handleSumit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
  //OnBlur -> cuando salgo del input lo valida sin la necesidad de presion el boton de crear cuenta
  const { email, password } = valores;
  return (
    <div>
      <Layout>
        <div
          css={css`
            color: white;
            @media (min-width: 1000px) {
              margin-left: 300px;
            }
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar Sesión
          </h1>
          <Formulario onSubmit={handleSumit} noValidate>
            {errores.email && <ErrorMostrar>{errores.email}</ErrorMostrar>}

            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu Email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && (
              <ErrorMostrar>{errores.password}</ErrorMostrar>
            )}

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {error && <ErrorMostrar>{error}</ErrorMostrar>}
            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Formulario>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
