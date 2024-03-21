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
import validarCrearCuenta from "../Validacion/validarCrearCuenta";
const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  telefono: "",
};

const crearCuenta = () => {
  const [error, guardarError] = useState(false);
  const [imagen, setImagen] = useState("");
  const crearCuenta = async () => {
    try {
      await firebase.registrar(nombre, email, password, imagen, telefono);
      Router.push("/");
    } catch (error) {
      console.error("hubo un error al crear el usuario", error.message);
      guardarError(error.message);
    }
  };
  const { valores, errores, handleSumit, handleChange, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
  //OnBlur -> cuando salgo del input lo valida sin la necesidad de presion el boton de crear cuenta
  const { nombre, email, password, telefono } = valores;
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
            Crear Cuenta
          </h1>
          <Formulario onSubmit={handleSumit} noValidate>
            {errores.nombre && <ErrorMostrar>{errores.nombre}</ErrorMostrar>}
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu Nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
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
            {/*{" "}
            {errores.telefono && (
              <ErrorMostrar>{errores.telefono}</ErrorMostrar>
            )}
            <Campo>
              <label htmlFor="telefono">Telefono</label>
              <input
                type="telefono"
                id="telefono"
                name="telefono"
                placeholder="Tu telefono"
                value={telefono}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>{" "}
            */}
            {errores.imagen && <ErrorMostrar>{errores.imagen}</ErrorMostrar>}
            <Campo>
              <label htmlFor="imagen">Imagen</label>
              <input
                type="file"
                id="imagen"
                name="imagen"
                onChange={(e) => {
                  setImagen(e.target.files[0]);
                }}
              />
            </Campo>
            {error && <ErrorMostrar>{error}</ErrorMostrar>}
            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </div>
      </Layout>
    </div>
  );
};

export default crearCuenta;
