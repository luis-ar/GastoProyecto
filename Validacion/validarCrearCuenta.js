import React from "react";

const validarCrearCuenta = (valores) => {
  let errores = {};
  const regex = /^9\d{8}$/;

  //validar nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }
  //validar email
  if (!valores.email) {
    errores.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no válido";
  }

  //validar el password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El password debe tener al menos 6 caracteres";
  }
  //validar el telefono
  // if (!valores.telefono) {
  //   errores.telefono = "El telefono es obligatorio";
  // } else if (!regex.test(valores.telefono)) {
  //   errores.telefono =
  //     "Número de celular no válido. Debe empezar con 9 y tener 9 dígitos";
  // }
  return errores;
};

export default validarCrearCuenta;
